import Search from 'antd/lib/input/Search';
import { useSelector } from 'react-redux';
import { Tabs } from './Tabs';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Blockies from 'react-blockies';
import {
    GlobalOutlined,
    HomeOutlined,
    PlusOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { logoutOfSiwe } from '../api/siwe';
import { Typography, Layout, Select, message, Avatar, Menu } from 'antd';
import React from 'react';

const { Header } = Layout;
const { Option } = Select;

export function WalletHeader() {
    const navigate = useNavigate();
    const address = useSelector((state) => state.user.address);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);
    const injectedProvider = useSelector(
        (state) => state.user.injectedProvider
    );

    const onSearch = async (value) => {
        if (!value) return;

        if (!Web3.utils.isAddress(value)) {
            message.warn(`${value} is not a valid ETH address.`, 1);
            return;
        }

        navigate('/user/ETH:' + value);
    };

    const accountDropDownOverlay = (
        <Menu style={{ width: 220 }} theme={'light'} mode="horizontal">
            {!address ? (
                <>
                    <Menu.Item
                        key="account"
                        onClick={() => navigate('/account')}
                    >
                        Connect
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item
                        key="account"
                        onClick={() => navigate('/account')}
                    >
                        Portfolio
                    </Menu.Item>
                    <Menu.Item
                        key="settings"
                        onClick={() => navigate('/account/customize')}
                    >
                        Customize
                    </Menu.Item>
                    <Menu.Item
                        key="disconnect"
                        onClick={async () => {
                            await web3Modal.clearCachedProvider();

                            await logoutOfSiwe();

                            if (
                                injectedProvider &&
                                injectedProvider.provider &&
                                typeof injectedProvider.provider.disconnect ==
                                    'function'
                            ) {
                                await injectedProvider.provider.disconnect();
                            }
                            window.location.reload();
                        }}
                    >
                        Disconnect
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <Header className="App-header">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                className="navbar-super-collapsed"
                onClick={() => navigate('')}
            >
                <img
                    src={'./bitbadgeslogo.png'}
                    className="App-logo"
                    alt="logo"
                />
                <Typography
                    style={{ color: 'white', fontWeight: 'bolder' }}
                    strong
                >
                    BitBadges
                </Typography>
            </div>

            <div
                className="navbar-expanded"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '50%',
                }}
            >
                <Search
                    addonBefore={
                        <Select defaultValue={'eth'}>
                            <Option value="eth">ETH</Option>
                        </Select>
                    }
                    style={{
                        width: '100%',
                        padding: 8,
                    }}
                    defaultValue="0xe00dD9D317573f7B4868D8f2578C65544B153A27"
                    placeholder="Enter Address (0x....)"
                    onSearch={onSearch}
                    enterButton
                    allowClear
                    size="large"
                />
            </div>
            <div
                className="navbar-expanded"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                }}
            >
                <Tabs
                    setTab={(e) => {
                        // setTab(e);

                        navigate(`/${e}`);
                    }}
                    noSelectedKeys
                    tabInfo={[
                        {
                            key: '',
                            content: (
                                <>
                                    <HomeOutlined /> Home
                                </>
                            ),
                        },
                        {
                            key: 'browse',
                            content: (
                                <>
                                    <GlobalOutlined /> Browse
                                </>
                            ),
                        },
                        {
                            key: 'mint',
                            content: (
                                <>
                                    <PlusOutlined /> Mint
                                </>
                            ),
                        },
                        {
                            key: `account`,
                            subMenuOverlay: accountDropDownOverlay,
                            content: (
                                <>
                                    {!address ? (
                                        <Avatar src={<UserOutlined />} />
                                    ) : (
                                        <Avatar
                                            src={
                                                <Blockies
                                                    seed={address.toLowerCase()}
                                                    size={40}
                                                />
                                            }
                                        />
                                    )}
                                </>
                            ),
                        },
                    ]}
                />
            </div>
            <div className="navbar-collapsed">
                <Tabs
                    setTab={(e) => {
                        navigate(`/${e}`);
                    }}
                    noSelectedKeys
                    tabInfo={[
                        { key: '', content: <Avatar src={<HomeOutlined />} /> },
                        {
                            key: 'search',
                            content: <Avatar src={<SearchOutlined />} />,
                            onClick: () => {
                                console.log('Do Nothing');
                            },
                            popoverContent: (
                                <div
                                    style={{
                                        backgroundColor: 'white',
                                        width: '100%',
                                    }}
                                >
                                    <Search
                                        addonBefore={
                                            <Select defaultValue={'eth'}>
                                                <Option value="eth">ETH</Option>
                                            </Select>
                                        }
                                        style={{
                                            width: '100%',
                                            padding: 8,
                                        }}
                                        defaultValue="0xe00dD9D317573f7B4868D8f2578C65544B153A27"
                                        placeholder="Enter Address (0x....)"
                                        onSearch={onSearch}
                                        enterButton
                                        allowClear
                                        size="large"
                                    />
                                </div>
                            ),
                        },

                        {
                            key: 'browse',
                            content: <Avatar src={<GlobalOutlined />} />,
                        },
                        {
                            key: 'mint',
                            content: <Avatar src={<PlusOutlined />} />,
                        },
                        {
                            key: `account`,
                            subMenuOverlay: accountDropDownOverlay,
                            content: (
                                <>
                                    {!address ? (
                                        <Avatar src={<UserOutlined />} />
                                    ) : (
                                        <Avatar
                                            src={
                                                <Blockies
                                                    seed={address.toLowerCase()}
                                                    size={40}
                                                />
                                            }
                                        />
                                    )}
                                </>
                            ),
                        },
                    ]}
                />
            </div>
        </Header>
    );
}
