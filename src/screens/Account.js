import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { BadgeDataForm } from '../components/BadgeDataForm';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/WalletDisplay';

const React = require('react');
const { useState, useEffect } = require('react');
const { Layout, Button } = require('antd');

const { Content } = Layout;
const { getBadgeDataForAddress } = require('../api/api');

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
            console.log(issued, received);
            setIssued(issued);
            setReceived(received);
            setLiked(liked);
            setManaging(managing);
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
            <div style={{ backgroundColor: '#192c3e' }}>
                {tab === 'issued' && <BadgeDisplay badges={issued} />}
                {tab === 'received' && (
                    <BadgeDisplay badges={received} collected />
                )}
                {tab === 'offering' && (
                    <>
                        <div
                            style={{
                                backgroundColor: '#192c3e',
                                color: 'white',
                                fontSize: 16,
                            }}
                        >
                            Want to edit what appears on your offering page?
                        </div>
                        <div
                            style={{
                                backgroundColor: '#192c3e',
                                color: 'white',
                                // borderBottom: '1px solid white',
                                paddingBottom: 20,
                            }}
                        >
                            <Button
                                // disabled={!title.length}
                                style={{
                                    marginTop: 10,
                                    backgroundColor: '#001529',
                                    color: 'white',
                                    marginRight: 10,
                                    marginLeft: 10,
                                }}
                                onClick={() => {
                                    document.getElementById('managing').click();
                                }}
                            >
                                Add / Remove Managed Badges
                            </Button>
                            <Button
                                style={{
                                    marginTop: 10,
                                    backgroundColor: '#001529',
                                    color: 'white',
                                    marginRight: 10,
                                    marginLeft: 10,
                                }}
                                onClick={() => {
                                    setConceptFormVisible(true);
                                }}
                            >
                                Create a Concept Badge
                            </Button>
                        </div>
                        {conceptFormVisible && (
                            <div
                                style={{
                                    marginLeft: '10vw',
                                    marginRight: '10vw',
                                    paddingLeft: '2vw',
                                    paddingRight: '2vw',
                                    paddingTop: '20px',
                                    marginBottom: '20px',
                                    border: '5px solid black',
                                    backgroundColor: '#001529',
                                    minHeight: '60vh',
                                }}
                            >
                                <BadgeDataForm
                                    isConceptForm
                                    setCurrStepNumber={() => {}}
                                    setBadge={() => {}}
                                    setRecipients={() => {}}
                                />
                            </div>
                        )}
                        <BadgeDisplay
                            badges={profileInfo.offering}
                            offering
                            concepts={profileInfo.concepts}
                        />
                    </>
                )}
                {tab === 'activity' && <BadgeDisplay badges={[]} />}
                {tab === 'liked' && <BadgeDisplay badges={liked} />}
                {tab === 'managing' && (
                    <BadgeDisplay badges={managing} managing />
                )}
            </div>
        </Content>
    );
}
