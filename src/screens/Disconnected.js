import { Web3ModalButtons } from '../components/Web3ModalConnectButton';
import { getInjectedProviderName } from 'web3modal';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'antd';
import { PRIMARY_BLUE, PRIMARY_TEXT, SECONDARY_BLUE } from '../constants';

const { Content } = Layout;
const { Text } = Typography;

function DisconnectedWrapper({ screenNode }) {
    const address = useSelector((state) => state.user.address);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);
    const [disconnected, setDisconnected] = useState(
        !web3Modal || !web3Modal.cachedProvider || !address
    );

    useEffect(() => {
        setDisconnected(!web3Modal || !web3Modal.cachedProvider || !address);
    }, [address, web3Modal]);

    return (
        <Layout>
            {disconnected ? (
                <Content
                    style={{
                        background: `linear-gradient(0deg, ${SECONDARY_BLUE} 0, ${PRIMARY_BLUE} 75%)`,
                        minHeight: '100vh',
                    }}
                >
                    <div>
                        <Content>
                            <Text
                                strong
                                style={{ fontSize: 36, color: PRIMARY_TEXT }}
                            >
                                Welcome!
                            </Text>
                        </Content>
                        <Content>
                            <Text
                                strong
                                style={{ fontSize: 20, color: PRIMARY_TEXT }}
                            >
                                {web3Modal &&
                                web3Modal.cachedProvider &&
                                !address
                                    ? `You are connected to ${getInjectedProviderName()}. Please sign in or connect a new wallet to continue.`
                                    : 'Please connect a wallet to continue.'}
                            </Text>

                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: 10,
                                }}
                            >
                                <Web3ModalButtons />
                            </div>
                        </Content>

                        <img src="./bitbadgeslogo.png" alt="BitBadges Logo" />
                    </div>
                </Content>
            ) : (
                screenNode
            )}
        </Layout>
    );
}

export default DisconnectedWrapper;
