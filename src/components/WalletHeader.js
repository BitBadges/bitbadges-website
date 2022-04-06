import Search from 'antd/lib/input/Search';
import { useSelector } from 'react-redux';
import { Tabs } from './Tabs';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import Blockies from 'react-blockies';
import { UserOutlined } from '@ant-design/icons';

const { Typography, Layout, Select, message, Avatar, Menu } = require('antd');
const React = require('react');
const { Header } = Layout;
const { Option } = Select;
// const { setScreen } = require('../redux/screenSlice');

export function WalletHeader() {
    const navigate = useNavigate();
    const address = useSelector((state) => state.user.address);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);
    const injectedProvider = useSelector(
        (state) => state.user.injectedProvider
    );

    // const [tab, setTab] = useState('');
    // const [inputAddress, setInputAddress] = useState();
    // const [issued, setIssued] = useState([]);
    // const [received, setReceived] = useState([]);

    const onSearch = async (value) => {
        if (!value) return;

        if (!Web3.utils.isAddress(value)) {
            message.warn(`${value} is not a valid ETH address.`, 1);
            return;
        }

        navigate('/user/ETH:' + value);
        // setInputAddress(value);
        // const { issued, received } = await getBadgeDataForAddress(
        //     'ETH',
        //     value,
        //     false
        // );
        // setIssued(issued);
        // setReceived(received);
    };

    return (
        <Header className="App-header">
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
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
                        { key: '', content: 'Home' },
                        { key: 'browse', content: 'Browse' },
                        {
                            key: 'mint',
                            content: 'Mint',
                            // disabled:
                            //     !web3Modal ||
                            //     !web3Modal.cachedProvider ||
                            //     !address,
                        },
                        {
                            key: `account`,
                            subMenuOverlay: (
                                <Menu
                                    style={{ width: 200, displat: 'flex' }}
                                    theme={'light'}
                                    mode="horizontal"
                                >
                                    <Menu.Item
                                        key="account"
                                        onClick={() => navigate('/account')}
                                    >
                                        Profile
                                    </Menu.Item>
                                    <Menu.Item
                                        key="disconnect"
                                        onClick={async () => {
                                            await web3Modal.clearCachedProvider();
                                            if (
                                                injectedProvider &&
                                                injectedProvider.provider &&
                                                typeof injectedProvider.provider
                                                    .disconnect == 'function'
                                            ) {
                                                await injectedProvider.provider.disconnect();
                                            }
                                            window.location.reload();
                                        }}
                                    >
                                        Disconnect
                                    </Menu.Item>
                                </Menu>
                            ),
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
                            // disabled:
                            //     !web3Modal ||
                            //     !web3Modal.cachedProvider ||
                            //     !address,
                        },
                    ]}
                />
                {/* <Web3ModalButtons /> */}
            </div>
            <div className="navbar-collapsed">TODO: NAVBAR COLLAPSE</div>
        </Header>
    );
}
