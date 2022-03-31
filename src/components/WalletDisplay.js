import { useNavigate } from 'react-router-dom';
import { Address } from './Address';
import { Tabs } from './Tabs';
import { Pending } from '../screens/Pending';

const React = require('react');
const { useState } = require('react');
const {
    Layout,
    Menu,
    Avatar,
    Typography,
    Button,
    Badge,
    Drawer,
} = require('antd');

const {
    PlusOutlined,
    SearchOutlined,
    BellOutlined,
    SwapOutlined,
} = require('@ant-design/icons');
const { Content } = Layout;
const { Text } = Typography;
const { useSelector, useDispatch } = require('react-redux');
// const { setScreen } = require('../redux/screenSlice');

export function WalletDisplay({}) {
    const address = useSelector((state) => state.user.address);
    const numPending = useSelector((state) => state.user.numPending);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pendingModalVisible, setPendingModalVisible] = useState(false);
    const [tab, setTab] = useState('incoming');

    const buttons = [
        { name: 'Mint', icon: <PlusOutlined />, screen: 'mint', numPending: 0 },
        {
            name: 'Swap',
            icon: <SwapOutlined />,
            screen: 'swap',
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
                            <div style={{ minWidth: '5vw' }}>
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
                                            onClick={() => {
                                                if (
                                                    button.screen === 'pending'
                                                ) {
                                                    setPendingModalVisible(
                                                        true
                                                    );
                                                } else {
                                                    navigate(
                                                        '../' + button.screen
                                                    );
                                                }
                                            }}
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
            <Drawer
                size="large"
                headerStyle={{ padding: '0px 12px' }}
                title={
                    <Tabs
                        tabInfo={[
                            { key: 'incoming', title: 'Inbox' },
                            { key: 'outgoing', title: 'Outbox' },
                        ]}
                        setTab={setTab}
                        widthPerTab={undefined}
                        theme="light"
                    />
                }
                placement={'bottom'}
                visible={pendingModalVisible}
                key={'bottom'}
                onClose={() => setPendingModalVisible(false)}
                bodyStyle={{ paddingTop: 8, fontSize: 20 }}
            >
                <Pending tab={tab} />
            </Drawer>
        </Content>
    );
}
