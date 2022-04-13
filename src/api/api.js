import store from '../redux/store';

import { testSiwe, signAndVerifySiwe } from './siwe';
import axios from 'axios';
import { userActions } from '../redux/userSlice';

import { NODE_URL, PRIVATE_API_URL } from '../constants';
import {
    EIP712_TXN_TYPE_IDS,
    EIP712_PENDING_TXN,
    EIP712_BITBADGES_DOMAIN,
    EIP712_CREATE_BADGE_TXN,
    EIP712_LOCK_TXN,
    EIP712_MINT_TXN,
    EIP712_REVOKE_TXN,
    EIP712_TRANSFERMANAGER_TXN,
} from './eip712Types';
import { message } from 'antd';

export async function getBadgeDataForAddress(
    chain,
    userAddress,
    isSignedInUser
) {
    let badgesToFetch = [];
    let userNonce,
        issuedBadges,
        receivedBadges,
        pendingBadges,
        likedBadges,
        managingBadges;
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
            managingBadges = res.data.managing;

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
        });

    let profileInfo = {};
    await axios
        .post(`${PRIVATE_API_URL}/users`, {
            chain,
            address: userAddress,
        })
        .then((res) => {
            profileInfo = res.data;
            likedBadges = profileInfo.likes;
            badgesToFetch.push(...profileInfo.likes);
        });

    badgesToFetch = [...new Set(badgesToFetch)];
    if (badgesToFetch.length !== 0) {
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
                store.dispatch(userActions.setBadgeMap(newBadgeMap));
            });
    }

    if (isSignedInUser) {
        store.dispatch(userActions.setNonce(userNonce));
        store.dispatch(userActions.setUserCreatedBadges(issuedBadges));
        store.dispatch(userActions.setUserReceivedBadges(receivedBadges));
        store.dispatch(userActions.setUserPendingBadges(pendingBadges));
        store.dispatch(userActions.setUserBalancesMap(newUserBalancesMap));
        store.dispatch(userActions.setNumPending(numPendingCount));
        store.dispatch(userActions.setProfileInfo(profileInfo));
    }

    return {
        issued: issuedBadges,
        received: receivedBadges,
        pending: pendingBadges,
        liked: likedBadges,
        managing: managingBadges,
        profileInfo,
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

export async function signAndSubmitTxn(route, data) {
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

    let error = false;
    await axios
        .post(`${NODE_URL}${route}`, body)
        .then(() => {
            message.success(`Successfully submitted transaction.`);
        })
        .catch((err) => {
            message.error(
                `Failed to Submit Transaction: ${err.response.data.error}`
            );
            error = true;
        });

    if (error) {
        return error;
    } else {
        getBadgeDataForAddress(chain, address, true);
        return error;
    }
}

export async function signAndSubmitPrivateApiTxn(route, data) {
    const currState = store.getState();
    const chain = currState.user.chain;
    const address = currState.user.address;

    const transaction = {
        data,
    };

    // const signature = await userSigner._signTypedData(
    //     EIP712_BITBADGES_DOMAIN,
    //     txnParams.eip712Types,
    //     transaction
    // );
    const { signedIn, resAddress } = await testSiwe(address);
    if (!signedIn || address !== resAddress) {
        await signAndVerifySiwe();
    }

    const body = {
        authentication: {
            chain,
            address,
            // signature,
        },
        transaction,
    };

    let error = false;
    await axios
        .post(`${PRIVATE_API_URL}${route}`, body, { withCredentials: true })
        .then(() => {
            message.success(`Successfully submitted transaction.`);
        })
        .catch((err) => {
            message.error(
                `Failed to Submit Transaction: ${err.response.data.error}`
            );
            error = true;
        });

    if (error) {
        return error;
    } else {
        getBadgeDataForAddress(chain, address, true);
        return error;
    }
}
