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
    const [liked, setLiked] = useState([]);
    const [managing, setManaging] = useState([]);

    const [profileInfo, setProfileInfo] = useState({
        username: '',
        bio: '',
        email: '',
        twitter: '',
        instagram: '',
        website: '',
        profilePic: '',
        bannerColorOne: '',
        bannerColorTwo: '',
        activity: [],
        likes: [],
        pinned: [],
        customDisplay: {},
        hidden: [],
        blockedUsers: [],
        loading: true,
        offering: [],
        concepts: [],
    });

    const urlParams = useParams();

    useEffect(() => {
        async function updateValues(value) {
            // setInputAddress(value);
            const { issued, received, profileInfo, liked, managing } =
                await getBadgeDataForAddress('ETH', value, false);
            setIssued(issued);
            setReceived(received);
            setLiked(liked);
            setManaging(managing);
            setProfileInfo(profileInfo);
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
            <div
                style={{
                    padding: '0',
                    margin: 0,
                    width: '100%',
                    // #Ea1795
                    // #3e83f8
                    background: `linear-gradient(0deg, ${
                        profileInfo.bannerColorTwo
                            ? profileInfo.bannerColorTwo
                            : '#001529'
                    }, ${
                        profileInfo.bannerColorOne
                            ? profileInfo.bannerColorOne
                            : '#3e83f8'
                    } 75%)`,
                }}
            >
                <ShowingResultsFor
                    chain={urlParams.userId.split(':')[0]}
                    address={urlParams.userId.split(':')[1]}
                    userName={profileInfo.username}
                    bio={profileInfo.bio}
                    profilePic={profileInfo.profilePic}
                    twitter={profileInfo.twitter}
                    instagram={profileInfo.instagram}
                    email={profileInfo.email}
                    website={profileInfo.website}
                    bannerColorOne={profileInfo.bannerColorOne}
                    bannerColorTwo={profileInfo.bannerColorTwo}
                />
            </div>
            <Tabs
                setTab={setTab}
                tabInfo={[
                    { key: 'received', content: 'Collected' },
                    { key: 'offering', content: 'Offering' },
                    { key: 'managing', content: 'Managing' },
                    { key: 'issued', content: 'Created' },
                    { key: 'liked', content: 'Liked' },
                    { key: 'activity', content: 'Activity' },
                ]}
                widthPerTab={'calc(100% / 4)'}
            />
            <div>
                {tab === 'issued' && <BadgeDisplay badges={issued} />}
                {tab === 'received' && <BadgeDisplay badges={received} />}
                {tab === 'offering' && (
                    <BadgeDisplay
                        badges={profileInfo.offering}
                        offering
                        concepts={profileInfo.concepts}
                    />
                )}
                {tab === 'activity' && <BadgeDisplay badges={[]} />}
                {tab === 'liked' && <BadgeDisplay badges={liked} />}
                {tab === 'managing' && <BadgeDisplay badges={managing} />}
            </div>
        </Content>
    );
}
