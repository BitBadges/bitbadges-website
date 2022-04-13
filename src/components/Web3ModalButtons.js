/* eslint-disable react-hooks/exhaustive-deps */
// TODO: fix this react hooks warning
const { Button } = require('antd');
const { ethers } = require('ethers');
const React = require('react');
const { useSelector, useDispatch } = require('react-redux');
const { useCallback, useEffect } = require('react');
const { userActions } = require('../redux/userSlice');
const { getBadgeDataForAddress } = require('../api/api');

export function Web3ModalButtons() {
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);
    const injectedProvider = useSelector(
        (state) => state.user.injectedProvider
    );
    const userSigner = useSelector((state) => state.user.userSigner);
    const dispatch = useDispatch();

    const modalButtons = [];

    useEffect(() => {
        async function getAddress() {
            if (userSigner) {
                const newAddress = await userSigner.getAddress();
                dispatch(userActions.setAddress(newAddress));
                getBadgeDataForAddress('ETH', newAddress, true);
            }
        }
        getAddress();
    }, [userSigner]);

    const loadWeb3Modal = useCallback(async () => {
        const returningUser = web3Modal.cachedProvider;

        const provider = await web3Modal.connect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);

        if (!returningUser) {
            await provider.request({
                method: 'wallet_requestPermissions',
                params: [
                    {
                        eth_accounts: {},
                    },
                ],
            });
        }

        dispatch(userActions.setInjectedProvider(ethersProvider));
        dispatch(userActions.setUserSigner(ethersProvider.getSigner()));

        provider.on('chainChanged', (chainId) => {
            console.log(`chain changed to ${chainId}! updating providers`);
            dispatch(userActions.setInjectedProvider(ethersProvider));
            dispatch(userActions.setUserSigner(ethersProvider.getSigner()));
        });

        provider.on('accountsChanged', () => {
            console.log(`account changed!`);
            dispatch(userActions.setInjectedProvider(ethersProvider));
            dispatch(userActions.setUserSigner(ethersProvider.getSigner()));
        });

        // Subscribe to session disconnection
        provider.on('disconnect', (code, reason) => {
            console.log(code, reason);
            logoutOfWeb3Modal();
        });
    }, []);

    const logoutOfWeb3Modal = async () => {
        await web3Modal.clearCachedProvider();
        if (
            injectedProvider &&
            injectedProvider.provider &&
            typeof injectedProvider.provider.disconnect == 'function'
        ) {
            await injectedProvider.provider.disconnect();
        }
        window.location.reload();
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            loadWeb3Modal();
        }
    }, [loadWeb3Modal]);

    if (web3Modal) {
        if (web3Modal.cachedProvider) {
            modalButtons.push(
                <Button
                    key="logoutbutton"
                    className="screen-button"
                    style={{
                        verticalAlign: 'center',
                        marginRight: 5,
                    }}
                    shape="round"
                    size="large"
                    onClick={() => logoutOfWeb3Modal()}
                >
                    logout
                </Button>
            );
        } else {
            modalButtons.push(
                <Button
                    key="loginbutton"
                    className="screen-button"
                    style={{
                        verticalAlign: 'center',
                        marginRight: 5,
                    }}
                    shape="round"
                    size="large"
                    /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
                    onClick={loadWeb3Modal}
                >
                    connect
                </Button>
            );
        }
    }
    return <div style={{ display: 'flex' }}>{modalButtons}</div>;
}
