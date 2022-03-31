import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { PageHeader } from '../components/PageHeader';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { useParams } from 'react-router-dom';
import { Pending } from './Pending';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/WalletDisplay';
const React = require('react');
const { useState, useEffect } = require('react');
const { Layout, Menu, Input, Select } = require('antd');

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { getBadgeDataForAddress } = require('../api/api');

export function Account() {
    const [tab, setTab] = useState('received');
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);
    const address = useSelector((state) => state.user.address);

    useEffect(() => {
        async function updateValues(value) {
            const { issued, received } = await getBadgeDataForAddress(
                'ETH',
                value,
                false
            );
            console.log(issued, received);
            setIssued(issued);
            setReceived(received);
        }
        updateValues(address);
    }, [address]);

    return (
        <Content
            style={{
                padding: '0',
                margin: 0,
                width: '100%',
                backgroundColor: '#001529',
            }}
        >
            <ShowingResultsFor address={address ? address : ''} />
            <WalletDisplay />
            <Tabs
                setTab={setTab}
                tabInfo={[
                    { key: 'received', title: 'Owned Badges' },
                    { key: 'issued', title: 'Created Badges' },
                    { key: 'offering', title: 'Badges Being Offered' },
                    { key: 'activity', title: 'Activity' },
                ]}
                widthPerTab={'calc(100% / 4)'}
            />
            <div style={{ backgroundColor: 'white' }}>
                {tab === 'issued' && <BadgeDisplay badges={issued} />}
                {tab === 'received' && <BadgeDisplay badges={received} />}
                {tab === 'offering' && <BadgeDisplay badges={[]} />}
                {tab === 'activity' && <BadgeDisplay badges={[]} />}
            </div>
        </Content>
    );
}
