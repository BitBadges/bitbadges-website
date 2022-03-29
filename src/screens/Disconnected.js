const React = require('react');
const { Layout, Typography, Alert } = require('antd');
const { Content } = Layout;
const { Text } = Typography;
const { getInjectedProviderName } = require('web3modal');
const { useSelector } = require('react-redux');

function Disconnected({}) {
    const address = useSelector((state) => state.user.address);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);

    return (
        <>
            <div style={{ backgroundColor: '#001529', height: 420 }}>
                {web3Modal && web3Modal.cachedProvider && !address && (
                    <Alert
                        message={`Provider Found: ${getInjectedProviderName()}`}
                        description={`Make sure you are signed in on this provider to continue.`}
                        type="warning"
                        closable
                    />
                )}
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
                    <Text strong style={{ fontSize: 36, color: 'white' }}>
                        Welcome!
                    </Text>
                </Content>
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
                    <Text strong style={{ fontSize: 20, color: 'white' }}>
                        Please connect a wallet to continue.
                    </Text>
                </Content>
                <img src="./bitbadgeslogo.png" />
            </div>
        </>
    );
}

export default Disconnected;
