import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { AccountDisplay } from '../components/AccountDisplay';
import { useParams } from 'react-router-dom';
import { PRIMARY_BLUE, SECONDARY_BLUE } from '../constants';
import React from 'react';
import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { getBadgeDataForAddress } from '../api/api';
import { defaultProfileInfo } from '../redux/userSlice';
import {
    getAddressFromPartitionedAddress,
    getChainFromPartitionedAddress,
} from '../utils/AddressUtils';

const { Content } = Layout;

export function User() {
    const [tab, setTab] = useState('received');
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);
    const [liked, setLiked] = useState([]);
    const [managing, setManaging] = useState([]);
    const [profileInfo, setProfileInfo] = useState({ ...defaultProfileInfo });
    const urlParams = useParams();

    useEffect(() => {
        async function updateValues(value) {
            const { issued, received, profileInfo, liked, managing } =
                await getBadgeDataForAddress('ETH', value, false);
            setIssued(issued);
            setReceived(received);
            setLiked(liked);
            setManaging(managing);
            setProfileInfo(profileInfo);
        }
        updateValues(getAddressFromPartitionedAddress(urlParams.userId));
    }, [urlParams]);

    const primaryGradient = profileInfo.bannerColorTwo
        ? profileInfo.bannerColorTwo
        : PRIMARY_BLUE;

    const secondaryGradient = profileInfo.bannerColorOne
        ? profileInfo.bannerColorOne
        : SECONDARY_BLUE;

    return (
        <Content className="primaryBg full-area">
            <div
                className="full-area"
                style={{
                    background: `linear-gradient(0deg, ${primaryGradient}, ${secondaryGradient} 75%)`,
                }}
            >
                <AccountDisplay
                    chain={getChainFromPartitionedAddress(urlParams.userId)}
                    address={getAddressFromPartitionedAddress(urlParams.userId)}
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
                fullWidth
            />
            <div>
                {tab === 'issued' && <BadgeDisplay badges={issued} />}
                {tab === 'received' && <BadgeDisplay badges={received} />}
                {tab === 'offering' && (
                    <BadgeDisplay
                        badges={profileInfo.offering}
                        isOffering={true}
                        conceptBadges={profileInfo.concepts}
                    />
                )}
                {tab === 'activity' && <BadgeDisplay badges={[]} />}
                {tab === 'liked' && <BadgeDisplay badges={liked} />}
                {tab === 'managing' && <BadgeDisplay badges={managing} />}
            </div>
        </Content>
    );
}
