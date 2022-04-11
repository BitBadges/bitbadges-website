import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { useParams } from 'react-router-dom';
const React = require('react');
const { useState, useEffect } = require('react');
const { Layout } = require('antd');

const { Content } = Layout;
const { getBadgeDataForAddress } = require('../api/api');

export function User() {
    // const [inputAddress, setInputAddress] = useState();
    const [tab, setTab] = useState('received');
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);
    const bannerColorOne = undefined;
    const bannerColorTwo = undefined;

    const urlParams = useParams();

    useEffect(() => {
        async function updateValues(value) {
            // setInputAddress(value);
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
                background: `linear-gradient(0deg, ${
                    bannerColorTwo ? bannerColorTwo : '#001529'
                }, ${bannerColorOne ? bannerColorOne : '#3e83f8'} 75%)`,
            }}
        >
            <ShowingResultsFor address={urlParams.userId.split(':')[1]} />

            <Tabs
                setTab={setTab}
                tabInfo={[
                    { key: 'received', content: 'Collected' },
                    { key: 'issued', content: 'Created' },
                    { key: 'managing', content: 'Managing' },
                    { key: 'offering', content: 'Offering' },
                    { key: 'liked', content: 'Liked' },
                    { key: 'activity', content: 'Activity' },
                ]}
                widthPerTab={'calc(100% / 4)'}
            />
            <div>
                {tab === 'issued' && <BadgeDisplay badges={issued} />}
                {tab === 'received' && <BadgeDisplay badges={received} />}
                {tab === 'offering' && <BadgeDisplay badges={[]} />}
                {tab === 'activity' && <BadgeDisplay badges={[]} />}
            </div>
        </Content>
    );
}
