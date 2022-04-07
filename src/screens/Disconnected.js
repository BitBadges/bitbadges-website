import { Web3ModalButtons } from '../components/Web3ModalButtons';
import { getInjectedProviderName } from 'web3modal';

const React = require('react');
const { Layout, Typography, Alert } = require('antd');
const { Content } = Layout;
const { Text } = Typography;
const { useSelector } = require('react-redux');

function DisconnectedWrapper({ screenNode }) {
    const address = useSelector((state) => state.user.address);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);

    return (
        <Layout>
            <Content
                style={{
                    background: 'linear-gradient(0deg, #3e83f8 0,#001529 75%)',
                    display: 'flex',
                    // alignItems: 'center',
                    minHeight: '100vh',
                    padding: '0',
                    textAlign: 'center',
                }}
            >
                {!web3Modal || !web3Modal.cachedProvider || !address ? (
                    <div
                        style={{
                            padding: '20 1rem',
                            width: '100%',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}
                    >
                        <Content
                            style={{
                                padding: '0',
                                textAlign: 'center',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Text
                                strong
                                style={{ fontSize: 36, color: 'white' }}
                            >
                                Welcome!
                            </Text>
                        </Content>
                        <Content
                            style={{
                                padding: '0',
                                textAlign: 'center',
                                color: 'white',
                                // display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <div>
                                <Text
                                    strong
                                    style={{ fontSize: 20, color: 'white' }}
                                >
                                    {web3Modal &&
                                    web3Modal.cachedProvider &&
                                    !address
                                        ? `Please sign in to ${getInjectedProviderName()} or connect a new wallet to continue.`
                                        : 'Please connect a wallet to continue.'}
                                </Text>
                            </div>

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
                ) : (
                    screenNode
                )}
            </Content>
        </Layout>
    );
}

export default DisconnectedWrapper;
