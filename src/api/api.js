const { default: axios } = require('axios');
const {
    setNonce,
    setUserCreatedBadges,
    setUserReceivedBadges,
    setUserPendingBadges,
    setUserBalancesMap,
    setNumPending,
    setBadgeMap,
} = require('../redux/userSlice');
const store = require('../redux/store');
const { NODE_URL } = require('../constants');
const {
    EIP712_TXN_TYPE_IDS,
    EIP712_PENDING_TXN,
    EIP712_BITBADGES_DOMAIN,
    EIP712_CREATE_BADGE_TXN,
    EIP712_LOCK_TXN,
    EIP712_MINT_TXN,
    EIP712_REVOKE_TXN,
    EIP712_TRANSFERMANAGER_TXN,
} = require('./eip712Types');
const { message } = require('antd');

export async function getBadgeDataForAddress(
    chain,
    userAddress,
    isSignedInUser
) {
    let badgesToFetch = [];
    let userNonce, issuedBadges, receivedBadges, pendingBadges;
    let numPendingCount = 0;
    let newUserBalancesMap = {};

    await axios
        .post(`${NODE_URL}/users`, {
            chain,
            address: userAddress,
        })
        .then((res) => {
            userNonce = res.data.nonce;
            issuedBadges = res.data.created;

            badgesToFetch.push(...res.data.created);

            let received = Object.keys(res.data.balances);
            let pending = [];

            for (const badgeKey of Object.keys(res.data.balances)) {
                newUserBalancesMap[badgeKey] = newUserBalancesMap[badgeKey]
                    ? newUserBalancesMap[badgeKey]
                    : {};

                newUserBalancesMap[badgeKey].received =
                    res.data.balances[badgeKey];
            }

            for (const obj of res.data.inPending) {
                newUserBalancesMap[obj.badgeId] = newUserBalancesMap[
                    obj.badgeId
                ]
                    ? newUserBalancesMap[obj.badgeId]
                    : {};

                newUserBalancesMap[obj.badgeId].inPending = newUserBalancesMap[
                    obj.badgeId
                ].inPending
                    ? newUserBalancesMap[obj.badgeId].inPending
                    : [];

                newUserBalancesMap[obj.badgeId].inPending.push(obj);
                pending.push(obj.badgeId);
            }

            for (const obj of res.data.outPending) {
                newUserBalancesMap[obj.badgeId] = newUserBalancesMap[
                    obj.badgeId
                ]
                    ? newUserBalancesMap[obj.badgeId]
                    : {};

                newUserBalancesMap[obj.badgeId].outPending = newUserBalancesMap[
                    obj.badgeId
                ].outPending
                    ? newUserBalancesMap[obj.badgeId].outPending
                    : [];

                newUserBalancesMap[obj.badgeId].outPending.push(obj);
                pending.push(obj.badgeId);
            }

            pending = [...new Set(pending)];

            numPendingCount += res.data.inPending.length;

            receivedBadges = received;
            pendingBadges = pending;

            badgesToFetch.push(...received);
            badgesToFetch.push(...pending);

            badgesToFetch = [...new Set(badgesToFetch)];
        });

    if (badgesToFetch.length != 0) {
        await axios
            .post(`${NODE_URL}/badges/getByIds`, {
                badgeIds: badgesToFetch,
            })
            .then((res) => {
                let newBadgeMap = {};
                for (const badge of res.data.badges) {
                    newBadgeMap[badge._id] = {
                        metadata: badge.metadata,
                        permissions: badge.permissions,
                        supply: badge.supply,
                        manager: badge.manager,
                        _id: badge._id,
                    };
                }
                store.dispatch(setBadgeMap(newBadgeMap));
            });
    }

    if (isSignedInUser) {
        store.dispatch(setNonce(userNonce));
        store.dispatch(setUserCreatedBadges(issuedBadges));
        store.dispatch(setUserReceivedBadges(receivedBadges));
        store.dispatch(setUserPendingBadges(pendingBadges));
        store.dispatch(setUserBalancesMap(newUserBalancesMap));
        store.dispatch(setNumPending(numPendingCount));
    }

    return {
        issued: issuedBadges,
        received: receivedBadges,
        pending: pendingBadges,
    };
}

const txnParamsMap = {
    '/badges/accept': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_PENDING_TXN,
        eip712Types: EIP712_PENDING_TXN,
    },
    '/badges/decline': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_PENDING_TXN,
        eip712Types: EIP712_PENDING_TXN,
    },
    '/badges/create': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_CREATE_BADGE_TXN,
        eip712Types: EIP712_CREATE_BADGE_TXN,
    },
    '/badges/lockRevoke': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_LOCK_TXN,
        eip712Types: EIP712_LOCK_TXN,
    },
    '/badges/lockSupply': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_LOCK_TXN,
        eip712Types: EIP712_LOCK_TXN,
    },
    '/badges/mint': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_MINT_TXN,
        eip712Types: EIP712_MINT_TXN,
    },
    '/badges/burn': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_REVOKE_TXN,
        eip712Types: EIP712_REVOKE_TXN,
    },
    '/badges/transfer': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_MINT_TXN,
        eip712Types: EIP712_MINT_TXN,
    },
    '/badges/transferManager': {
        txnType: EIP712_TXN_TYPE_IDS.EIP712_TRANSFERMANAGER_TXN,
        eip712Types: EIP712_TRANSFERMANAGER_TXN,
    },
};

async function signAndSubmitTxn(route, data) {
    const currState = store.getState();
    const nonce = currState.user.nonce;
    const userSigner = currState.user.userSigner;
    const txnParams = txnParamsMap[route];
    const chain = currState.user.chain;
    const address = currState.user.address;

    const transaction = {
        data,
        nonce,
        type: txnParams.txnType,
    };

    const signature = await userSigner._signTypedData(
        EIP712_BITBADGES_DOMAIN,
        txnParams.eip712Types,
        transaction
    );

    const body = {
        authentication: {
            chain,
            address,
            signature,
        },
        transaction,
    };

    await axios
        .post(`${NODE_URL}${route}`, body)
        .then(() => {
            message.success(`Successfully submitted transaction.`);
        })
        .catch((err) => {
            message.error(
                `Failed to Submit Transaction: ${err.response.data.error}`
            );
        });

    getBadgeDataForAddress(chain, address, true);
}

module.exports = {
    getBadgeDataForAddress,
    signAndSubmitTxn,
};
