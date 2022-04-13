import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { BadgeDataForm } from '../components/BadgeDataForm';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/WalletDisplay';
import { PermissionsForm } from '../components/PermissionsForm';
import { Badge } from '../components/Badge';

const React = require('react');
const { useState, useEffect } = require('react');
const { Layout, Button, Form, Typography } = require('antd');
const {
    CaretLeftFilled,
    CaretRightFilled,
} = require('@ant-design/icons');
const { Content } = Layout;
const {
    getBadgeDataForAddress,
    signAndSubmitPrivateApiTxn,
} = require('../api/api');

export function Account() {
    const [tab, setTab] = useState('received');
    const [issued, setIssued] = useState([]);
    const [received, setReceived] = useState([]);
    const [liked, setLiked] = useState([]);
    const [managing, setManaging] = useState([]);
    const [conceptFormVisible, setConceptFormVisible] = useState(false);
    const [badge, setBadge] = useState();
    const [currStepNumber, setCurrStepNumber] = useState(0);
    const [permissions, setPermissions] = useState();
    const [supply, setSupply] = useState(0);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);

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
                    <div style={{ backgroundColor: '#304151' }}>
                        <div
                            style={{
                                backgroundColor: '#304151',
                                color: 'white',
                                fontSize: 16,
                                paddingTop: 10,
                            }}
                        >
                            Want to add badges to your offering page?
                        </div>
                        <div
                            style={{
                                backgroundColor: '#304151',
                                color: 'white',
                                // borderBottom: '1px solid white',
                                paddingBottom: 10,
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
                                Add Existing Badges
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
                                    setConceptFormVisible(!conceptFormVisible);
                                }}
                            >
                                {conceptFormVisible &&
                                    'Hide Concept Badge Form'}
                                {!conceptFormVisible && 'Add a Concept Badge'}
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
                                {currStepNumber <= 1 && (
                                    <BadgeDataForm
                                        isConceptForm
                                        setCurrStepNumber={setCurrStepNumber}
                                        setBadge={setBadge}
                                        setRecipients={() => {}}
                                        saveSupply={setSupply}
                                    />
                                )}
                                {currStepNumber === 2 && (
                                    <PermissionsForm
                                        setCurrStepNumber={setCurrStepNumber}
                                        setPermissions={setPermissions}
                                        recipients={[]}
                                    />
                                )}
                                {currStepNumber === 3 && (
                                    <Form.Provider>
                                        <div
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <button
                                                // className="link-button"
                                                style={{
                                                    // position: 'absolute',
                                                    // left: 5,
                                                    backgroundColor: 'inherit',
                                                    color: '#ddd',
                                                    fontSize: 17,
                                                }}
                                                onClick={() =>
                                                    setCurrStepNumber(2)
                                                }
                                                className="opacity link-button"
                                            >
                                                <CaretLeftFilled size={40} />
                                                Back
                                            </button>
                                            <Typography.Text
                                                strong
                                                style={{
                                                    color: 'white',
                                                    fontSize: 20,
                                                    marginLeft: 50,
                                                    marginRight: 50,
                                                }}
                                                align="center"
                                            >
                                                1 / 1
                                            </Typography.Text>

                                            <button
                                                // className="link-button"
                                                style={{
                                                    // position: 'absolute',
                                                    // left: 5,
                                                    backgroundColor: 'inherit',
                                                    color: '#ddd',
                                                    fontSize: 17,
                                                }}
                                                // onClick={() => incrementStep()}
                                                className="opacity link-button"
                                                disabled
                                            >
                                                Next
                                                <CaretRightFilled size={40} />
                                            </button>
                                        </div>
                                        <Form layout="horizontal">
                                            <>
                                                <div
                                                    style={{
                                                        justifyContent:
                                                            'center',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <Typography.Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: 20,
                                                            marginBottom: 10,
                                                        }}
                                                        strong
                                                    >
                                                        Finalize
                                                    </Typography.Text>
                                                </div>
                                                <div style={{}}>
                                                    <div
                                                        // label={<Text strong>Can Mint More?</Text>}
                                                        style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            fontSize: 100,
                                                        }}
                                                    >
                                                        <Badge
                                                            conceptBadge={true}
                                                            badge={{
                                                                metadata: {
                                                                    ...badge,
                                                                },
                                                                recipients: [],
                                                                permissions,
                                                                supply,
                                                                manager: `ETH:${address}`,
                                                            }}
                                                            size={100}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <Button
                                                            type="primary"
                                                            style={{
                                                                width: '90%',
                                                                marginTop: 20,
                                                            }}
                                                            onClick={async () => {
                                                                setTxnSubmitted(
                                                                    true
                                                                );
                                                                setTransactionIsLoading(
                                                                    true
                                                                );

                                                                try {
                                                                    const data =
                                                                        {
                                                                            metadata:
                                                                                {
                                                                                    ...badge,
                                                                                },
                                                                            recipients:
                                                                                [],
                                                                            permissions,
                                                                            supply,
                                                                            manager: `ETH:${address}`,
                                                                        };

                                                                    console.log(
                                                                        data
                                                                    );

                                                                    await signAndSubmitPrivateApiTxn(
                                                                        '/badges/addConcept',
                                                                        data
                                                                    );

                                                                    setTransactionIsLoading(
                                                                        false
                                                                    );

                                                                    setConceptFormVisible(
                                                                        false
                                                                    );
                                                                } catch (err) {
                                                                    setTxnSubmitted(
                                                                        false
                                                                    );
                                                                    setTransactionIsLoading(
                                                                        false
                                                                    );
                                                                }
                                                            }}
                                                            loading={
                                                                transactionIsLoading
                                                            }
                                                            disabled={
                                                                txnSubmitted
                                                            }
                                                        >
                                                            Create Badge!
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        </Form>
                                    </Form.Provider>
                                )}
                            </div>
                        )}
                        <BadgeDisplay
                            badges={profileInfo.offering}
                            offering
                            concepts={profileInfo.concepts}
                            managing
                        />
                    </div>
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
