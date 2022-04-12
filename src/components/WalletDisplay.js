import { useNavigate } from 'react-router-dom';
import { Tabs } from './Tabs';
import { Pending } from '../screens/Pending';

const React = require('react');
const { useState } = require('react');
const { Layout, Avatar, Typography, Badge, Drawer } = require('antd');

const {
    BellOutlined,
    SwapOutlined,
    CloseOutlined,
    SettingOutlined,
} = require('@ant-design/icons');
const { Content } = Layout;
const { Text } = Typography;
const { useSelector } = require('react-redux');
// const { setScreen } = require('../redux/screenSlice');

export function WalletDisplay() {
    const numPending = useSelector((state) => state.user.numPending);
    const navigate = useNavigate();
    const [pendingModalVisible, setPendingModalVisible] = useState(false);
    const [tab, setTab] = useState('incoming');
    

    const buttons = [
        {
            name: 'Pending',
            icon: <BellOutlined />,
            screen: 'pending',
            numPending,
        },
        {
            name: 'Swap',
            icon: <SwapOutlined />,
            screen: 'swap',
            numPending: 0,
        },
        {
            name: 'Customize',
            icon: <SettingOutlined />,
            screen: 'account/customize',
            numPending: 0,
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
            <div theme="dark" style={{ width: '100%' }}>
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
                        marginTop: 8,
                        marginBottom: 30,
                        backgroundColor: 'inherit',
                        cursor: 'default',
                    }}
                >
                    {buttons.map((button) => {
                        return (
                            <div
                                style={{
                                    minWidth: 75,
                                }}
                            >
                                <div>
                                    <Badge count={button.numPending}>
                                        <Avatar
                                            style={{
                                                marginBottom: 1,
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
                                <div style={{ marginTop: 3 }}>
                                    <Text style={{ color: '#ddd' }}>
                                        {button.name}
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Drawer
                title={
                    <Tabs
                        tabInfo={[
                            { key: 'incoming', content: 'Inbox' },
                            { key: 'outgoing', content: 'Outbox' },
                        ]}
                        setTab={setTab}
                        widthPerTab={undefined}
                        theme="dark"
                    />
                }
                placement={'right'}
                visible={pendingModalVisible}
                key={'right'}
                onClose={() => setPendingModalVisible(false)}
                headerStyle={{
                    paddingLeft: '12px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    borderBottom: '0px',
                    backgroundColor: '#001529',
                    color: 'white',
                }}
                closeIcon={<CloseOutlined style={{ color: 'white' }} />}
                bodyStyle={{
                    paddingTop: 8,
                    fontSize: 20,
                    backgroundColor: '#001529',
                    color: 'white',
                }}
            >
                <Pending tab={tab} />
            </Drawer>
        </Content>
    );
}
