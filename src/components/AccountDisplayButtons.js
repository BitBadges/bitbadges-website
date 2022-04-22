import { useNavigate } from 'react-router-dom';
import { Tabs } from './Tabs';
import { Pending } from './PendingModal';
import React from 'react';
import { useState } from 'react';
import { Layout, Avatar, Typography, Badge, Drawer } from 'antd';
import {
    BellOutlined,
    SwapOutlined,
    CloseOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { PRIMARY_BLUE, PRIMARY_TEXT } from '../constants';

const { Content } = Layout;
const { Text } = Typography;

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
        <Content style={{ display: 'flex' }}>
            <div
                style={{
                    width: '100%',
                    padding: '10',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 8,
                    marginBottom: 30,
                }}
            >
                {buttons.map((button) => {
                    return (
                        <div style={{ minWidth: 75 }}>
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
                                        if (button.screen === 'pending') {
                                            setPendingModalVisible(true);
                                        } else {
                                            navigate('../' + button.screen);
                                        }
                                    }}
                                    className="screen-button"
                                >
                                    {button.icon}
                                </Avatar>
                            </Badge>
                            <div style={{ marginTop: 3 }}>
                                <Text style={{ color: PRIMARY_TEXT }}>
                                    {button.name}
                                </Text>
                            </div>
                        </div>
                    );
                })}
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
                        fullWidth
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
                    backgroundColor: PRIMARY_BLUE,
                    color: PRIMARY_TEXT,
                }}
                closeIcon={<CloseOutlined style={{ color: PRIMARY_TEXT }} />}
                bodyStyle={{
                    paddingTop: 8,
                    fontSize: 20,
                    backgroundColor: PRIMARY_BLUE,
                    color: PRIMARY_TEXT,
                }}
            >
                <Pending tab={tab} />
            </Drawer>
        </Content>
    );
}
