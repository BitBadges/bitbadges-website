import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/WalletDisplay';
const React = require('react');
const { useState, useEffect } = require('react');
const { Layout } = require('antd');

const { Content } = Layout;
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
                    { key: 'received', content: 'Collected' },
                    { key: 'issued', content: 'Created' },
                    { key: 'offering', content: 'Offering' },
                    { key: 'activity', content: 'Activity' },
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
