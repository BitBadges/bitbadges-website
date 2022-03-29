import Search from 'antd/lib/input/Search';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBadgeDataForAddress } from '../api/api';
import { Tabs } from './Tabs';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
const { Typography, Layout, Select } = require('antd');
const React = require('react');
const Web3ModalButtons = require('./Web3ModalButtons').Web3ModalButtons;
const { Header } = Layout;
const { Text } = Typography;
const { Option } = Select;
// const { setScreen } = require('../redux/screenSlice');

export function WalletHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const address = useSelector((state) => state.user.address);
    const web3Modal = useSelector((state) => state.web3Modal.web3Modal);

    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const [inputAddress, setInputAddress] = useState();
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);

    const onSearch = async (value) => {
        if (!value) return;
        
        navigate('/user/ETH:' + value);
        setInputAddress(value);
        const { issued, received } = await getBadgeDataForAddress(
            'ETH',
            value,
            false
        );
        setIssued(issued);
        setReceived(received);
    };

    return (
        <Header className="App-header">
            <a style={{ display: 'flex', alignItems: 'center' }} href="/">
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
            </a>

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
                        setTab(e);
                        if (e === 'account') {
                            navigate(`/user/ETH:${address}`);
                        } else {
                            navigate(`/${e}`);
                        }
                    }}
                    noSelectedKeys
                    tabInfo={[
                        { key: '', title: 'Home' },
                        { key: 'browse', title: 'Browse' },
                        {
                            key: 'mint',
                            title: 'Mint',
                            disabled:
                                !web3Modal ||
                                !web3Modal.cachedProvider ||
                                !address,
                        },
                        {
                            key: `account`,
                            title: 'Account',
                            disabled:
                                !web3Modal ||
                                !web3Modal.cachedProvider ||
                                !address,
                        },
                    ]}
                />
                <Web3ModalButtons />
            </div>
            <div className="navbar-collapsed">TODO: NAVBAR COLLAPSE</div>
        </Header>
    );
}
