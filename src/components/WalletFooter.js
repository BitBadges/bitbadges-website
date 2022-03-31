import Search from 'antd/lib/input/Search';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBadgeDataForAddress } from '../api/api';
import { Tabs } from './Tabs';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
const { Typography, Layout, Select, Row, Col, Button } = require('antd');
const React = require('react');
const Web3ModalButtons = require('./Web3ModalButtons').Web3ModalButtons;
const { Header } = Layout;
const { Text } = Typography;
const { Option } = Select;
// const { setScreen } = require('../redux/screenSlice');

export function WalletFooter() {
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
        <Content
            style={{
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                padding: '1rem 5rem',
                minHeight: '25vh',
            }}
        >
            <Row justify="space-around" style={{ width: '100%' }}>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            // backgroundColor: '#005af0',
                            // borderColor: '#005af0',
                            fontWeight: 'bolder',
                            // color: 'white',
                            margin: '1rem',
                        }}
                        type="primary"
                        href="https://bitbadges.github.io/"
                        target="_blank"
                    >
                        Docs
                    </Button>
                </Col>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            // backgroundColor: '#005af0',
                            // borderColor: '#005af0',
                            fontWeight: 'bolder',
                            // color: 'white',
                            margin: '1rem',
                        }}
                        type="primary"
                        href="https://decentralizeduniversity.org/"
                        target="_blank"
                    >
                        Decentralized University
                    </Button>
                </Col>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            // backgroundColor: '#005af0',
                            // borderColor: '#005af0',
                            fontWeight: 'bolder',
                            // color: 'white',
                            margin: '1rem',
                        }}
                        type="primary"
                        href="https://github.com/BitBadges"
                        target={'_blank'}
                    >
                        GitHub
                    </Button>
                </Col>
            </Row>
        </Content>
    );
}
