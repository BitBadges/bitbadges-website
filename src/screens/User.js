import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { PageHeader } from '../components/PageHeader';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { useParams } from 'react-router-dom';
const React = require('react');
const { useState, useEffect } = require('react');
const { Layout, Menu, Input, Select } = require('antd');

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { getBadgeDataForAddress } = require('../api/api');

export function User() {
    const [inputAddress, setInputAddress] = useState();
    const [tab, setTab] = useState('received');
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);
    const urlParams = useParams();

    useEffect(() => {
        async function updateValues(value) {
            setInputAddress(value);
            const { issued, received } = await getBadgeDataForAddress(
                'ETH',
                value,
                false
            );
            console.log(issued, received);
            setIssued(issued);
            setReceived(received);
        }
        updateValues(urlParams.userId.split(':')[1]);
    }, [urlParams]);

    return (
        <Content
            style={{
                padding: '0',
                margin: 0,
                width: '100%',
                backgroundColor: '#001529',
            }}
        >
            <ShowingResultsFor address={urlParams.userId.split(':')[1]} />
            <Tabs
                setTab={setTab}
                tabInfo={[
                    { key: 'received', title: 'Owned Badges' },
                    { key: 'offering', title: 'Badges Being Offered' },
                    { key: 'issued', title: 'Created Badges' },
                ]}
                widthPerTab={'33.31%'}
            />
            {tab == 'issued' && <BadgeDisplay badges={issued} />}
            {tab == 'received' && <BadgeDisplay badges={received} />}
            {tab == 'offering' && <BadgeDisplay badges={[]} />}
        </Content>
    );
}
