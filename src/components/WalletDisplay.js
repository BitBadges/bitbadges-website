import { Address } from './Address';

const React = require('react');
const { Layout, Menu, Avatar, Typography, Button, Badge } = require('antd');

const {
    PlusOutlined,
    SearchOutlined,
    BellOutlined,
} = require('@ant-design/icons');
const { Content } = Layout;
const { Text } = Typography;
const { useSelector, useDispatch } = require('react-redux');
// const { setScreen } = require('../redux/screenSlice');

export function WalletDisplay({}) {
    const address = useSelector((state) => state.user.address);
    const numPending = useSelector((state) => state.user.numPending);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);

    const dispatch = useDispatch();

    const buttons = [
        { name: 'Mint', icon: <PlusOutlined />, screen: 'mint', numPending: 0 },
        {
            name: 'Browse',
            icon: <SearchOutlined />,
            screen: 'browse',
            numPending: 0,
        },
        {
            name: 'Pending',
            icon: <BellOutlined />,
            screen: 'pending',
            numPending,
        },
    ];

    return (
        <Content
            style={{
                padding: '0',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Menu theme="dark" style={{ width: '100%' }}>
                <div
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        style={{ height: 100, width: 100 }}
                        src="https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png"
                    />
                </div>
                <div
                    style={{
                        padding: '0',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        marginTop: 40,
                    }}
                >
                    {web3Modal && web3Modal.cachedProvider && address && (
                        <Address address={address} />
                    )}
                </div>
                {/* <div
                    style={{
                        padding: '10',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        marginTop: 20,
                        marginBottom: 5,
                    }}
                >
                    <Text
                        style={{
                            color: '#ddd',
                            fontSize: 18,
                        }}
                        color="white"
                    >
                        10 $BADGE
                    </Text>
                    <Button
                        style={{ marginLeft: 5 }}
                        type="primary"
                        shape="circle"
                        icon={<SwapOutlined />}
                        size="small"
                        className="screen-button"
                        onClick={() => dispatch(setScreen('swap')}
                    />
                </div>
                <div
                    style={{
                        padding: '0',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        marginTop: 3,
                        marginBottom: 20,
                    }}
                >
                    <Text
                        type="secondary"
                        style={{
                            color: '#ddd',
                            fontSize: 12,
                        }}
                        color="white"
                    >
                        ($1000 USD)
                    </Text>
                </div> */}
                <div
                    style={{
                        padding: '10',
                        textAlign: 'center',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        marginTop: 12,
                        marginBottom: 30,
                        backgroundColor: 'inherit',
                        cursor: 'default',
                    }}
                >
                    {buttons.map((button) => {
                        return (
                            <div style={{ width: '20%' }}>
                                <div>
                                    <Badge count={button.numPending}>
                                        <Avatar
                                            style={{
                                                marginBottom: 15,
                                                cursor: 'pointer',
                                                fontSize: 20,
                                                padding: 0,
                                                margin: 0,
                                                alignItems: 'center',
                                            }}
                                            size="large"
                                            // onClick={() =>
                                            // dispatch(
                                            //     setScreen(button.screen)
                                            // )
                                            // }
                                            className="screen-button"
                                        >
                                            {button.icon}
                                        </Avatar>
                                    </Badge>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <Text style={{ color: '#ddd' }}>
                                        {button.name}
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Menu>
        </Content>
    );
}
