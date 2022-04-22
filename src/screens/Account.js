import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { AccountDisplay } from '../components/AccountDisplay';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/AccountDisplayButtons';
import {
    FOURTH_BLUE,
    PRIMARY_BLUE,
    PRIMARY_TEXT,
    SECONDARY_BLUE,
    TERTIARY_BLUE,
} from '../constants';
import { getBadgeDataForAddress } from '../api/api';
import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Button } from 'antd';
import { ConceptBadgeForm } from '../components/ConceptBadgeForm';

const { Content } = Layout;

export function Account() {
    const [tab, setTab] = useState('received');
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);
    const [liked, setLiked] = useState([]);
    const [managing, setManaging] = useState([]);
    const [conceptFormVisible, setConceptFormVisible] = useState(false);

    const address = useSelector((state) => state.user.address);
    const chain = useSelector((state) => state.user.chain);
    const profileInfo = useSelector((state) => state.user.profileInfo);

    useEffect(() => {
        async function updateValues(value) {
            const { issued, received, liked, managing } =
                await getBadgeDataForAddress('ETH', value, false);
            setIssued(issued);
            setReceived(received);
            setLiked(liked);
            setManaging(managing);
        }
        updateValues(address);
    }, [address]);

    const primaryGradient = profileInfo.bannerColorTwo
        ? profileInfo.bannerColorTwo
        : PRIMARY_BLUE;

    const secondaryGradient = profileInfo.bannerColorOne
        ? profileInfo.bannerColorOne
        : SECONDARY_BLUE;

    return (
        <Content>
            <div
                style={{
                    background: `linear-gradient(0deg, ${primaryGradient}, ${secondaryGradient} 75%)`,
                }}
            >
                <AccountDisplay
                    chain={chain}
                    address={address ? address : ''}
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
                <WalletDisplay />
            </div>
            <Tabs
                setTab={setTab}
                fullWidth
                tabInfo={[
                    { key: 'received', content: 'Collected' },
                    { key: 'offering', content: 'Offering' },
                    { key: 'managing', content: 'Managing' },
                    { key: 'issued', content: 'Created' },
                    { key: 'liked', content: 'Liked' },
                    { key: 'activity', content: 'Activity' },
                ]}
            />
            <div style={{ backgroundColor: TERTIARY_BLUE }}>
                {tab === 'issued' && <BadgeDisplay badges={issued} />}
                {tab === 'received' && (
                    <BadgeDisplay badges={received} collected />
                )}
                {tab === 'offering' && (
                    <div style={{ backgroundColor: FOURTH_BLUE }}>
                        <div
                            style={{
                                fontSize: 16,
                                paddingTop: 10,
                                color: PRIMARY_TEXT,
                            }}
                        >
                            Want to add badges to your offering page?
                        </div>
                        <div>
                            <Button
                                style={{
                                    margin: 10,
                                    background: PRIMARY_BLUE,
                                }}
                                onClick={() => {
                                    document.getElementById('managing').click();
                                }}
                                className="screen-button"
                            >
                                Add Existing Badges
                            </Button>
                            <Button
                                style={{
                                    background: PRIMARY_BLUE,
                                    margin: 10,
                                }}
                                onClick={() => {
                                    setConceptFormVisible(!conceptFormVisible);
                                }}
                                className="screen-button"
                            >
                                {conceptFormVisible &&
                                    'Hide Concept Badge Form'}
                                {!conceptFormVisible && 'Add a Concept Badge'}
                            </Button>
                        </div>
                        {conceptFormVisible && (
                            <ConceptBadgeForm
                                setConceptFormVisible={setConceptFormVisible}
                            />
                        )}
                        <BadgeDisplay
                            badges={profileInfo.offering}
                            isOffering={true}
                            concepts={profileInfo.concepts}
                            isManaging={true}
                        />
                    </div>
                )}
                {tab === 'activity' && <BadgeDisplay badges={[]} />}
                {tab === 'liked' && <BadgeDisplay badges={liked} />}
                {tab === 'managing' && (
                    <BadgeDisplay badges={managing} isManaging={true} />
                )}
            </div>
        </Content>
    );
}
