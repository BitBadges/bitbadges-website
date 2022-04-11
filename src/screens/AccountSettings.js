import { Tabs } from '../components/Tabs';
import { ShowingResultsFor } from '../components/ShowingResultsFor';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/WalletDisplay';
import Text from 'antd/lib/typography/Text';
import { useNavigate } from 'react-router-dom';
import isuri from 'isuri';
const React = require('react');
const { useState, useEffect } = require('react');
const { Layout, Typography, Form, Input, Button } = require('antd');

const { Content } = Layout;
const { signAndSubmitPrivateApiTxn } = require('../api/api');

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function AccountSettings() {
    const address = useSelector((state) => state.user.address);
    const profileInfo = useSelector((state) => state.user.profileInfo);

    const [username, setUsername] = useState(
        profileInfo.username ? profileInfo.username : ''
    );
    const [bio, setBio] = useState(profileInfo.bio ? profileInfo.bio : '');
    const [email, setEmail] = useState(
        profileInfo.email ? profileInfo.email : ''
    );
    const [twitter, setTwitter] = useState(
        profileInfo.twitter ? profileInfo.twitter.split('/')[3] : ''
    );
    const [instagram, setInstagram] = useState(
        profileInfo.instagram ? profileInfo.instagram.split('/')[3] : ''
    );
    const [website, setWebsite] = useState(
        profileInfo.website ? profileInfo.website : ''
    );
    const [profilePic, setProfilePic] = useState(
        profileInfo.profilePic ? profileInfo.profilePic : ''
    );
    const [bannerColorOne, setBannerColorOne] = useState(
        profileInfo.bannerColorOne ? profileInfo.bannerColorOne : ''
    );
    const [bannerColorTwo, setBannerColorTwo] = useState(
        profileInfo.bannerColorTwo ? profileInfo.bannerColorTwo : ''
    );
    const [defaultNode, setDefaultNode] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setUsername(profileInfo.username);
        setBio(profileInfo.bio);
        // console.log('TWITTER', profileInfo.twitter.split('/')[3]);
        setTwitter(profileInfo.twitter.split('/')[3]);
        setInstagram(profileInfo.instagram.split('/')[3]);
        setWebsite(profileInfo.website);
        setProfilePic(profileInfo.profilePic);
        setEmail(profileInfo.email);
        setBannerColorOne(profileInfo.bannerColorOne);
        setBannerColorTwo(profileInfo.bannerColorTwo);
    }, [profileInfo]);

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
                        bannerColorTwo ? bannerColorTwo : '#001529'
                    }, ${bannerColorOne ? bannerColorOne : '#3e83f8'} 75%)`,
                    // paddingBottom: 20,
                }}
            >
                <div style={{ color: 'white' }}></div>
                <ShowingResultsFor
                    address={address ? address : ''}
                    userName={username}
                    bio={bio}
                    profilePic={profilePic}
                    twitter={twitter}
                    instagram={instagram}
                    email={email}
                    website={website}
                    bannerColorOne={bannerColorOne}
                    bannerColorTwo={bannerColorTwo}
                />
                <WalletDisplay />
            </div>
            <Tabs
                // setTab={setTab}
                tabInfo={[
                    { key: 'received', content: 'Preview Tab 1' },
                    { key: 'issued', content: 'Preview Tab 2' },
                    { key: 'managing', content: 'Preview Tab 3' },
                    { key: 'managing', content: 'Preview Tab 4' },
                ]}
                widthPerTab={'calc(100% / 4)'}
            />
            <hr
                color="black"
                style={{ borderWidth: '3px', marginTop: 0, paddingTop: 0 }}
            />
            <div>
                <Typography.Text
                    strong
                    level={3}
                    style={{
                        color: 'white',
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 25,
                        // paddingBottom: '1rem',
                        fontStyle: 'normal',
                        lineHeight: '1.2',
                        width: '100%',
                        wordBreak: 'break-word',
                        wordWrap: 'break-word',
                    }}
                >
                    Account Customization
                </Typography.Text>
            </div>
            <div>
                <Typography.Text
                    strong
                    style={{
                        color: 'lightgrey',
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 16,
                        // paddingBottom: '1rem',
                        fontStyle: 'normal',
                        lineHeight: '1.2',
                        width: '100%',
                        wordBreak: 'break-word',
                        wordWrap: 'break-word',
                    }}
                >
                    *The top of this page is just a preview. To save changes,
                    you must click submit.
                </Typography.Text>
            </div>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
            >
                <div style={{ marginBottom: 20 }}>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Username
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.username}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Bio
                            </Text>
                        }
                    >
                        <Input.TextArea
                            defaultValue={profileInfo.bio}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Email
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.email}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Twitter Username
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.twitter}
                            value={twitter}
                            onChange={(e) => {
                                setTwitter(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Instagram Username
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.instagram}
                            value={instagram}
                            onChange={(e) => {
                                setInstagram(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Website
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.website}
                            value={website}
                            onChange={(e) => {
                                setWebsite(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Profile Pic
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.profilePic}
                            value={profilePic}
                            onChange={(e) => {
                                setProfilePic(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                        <div style={{ fontSize: 12, textAlign: 'left' }}>
                            <Text style={{ color: 'lightgray' }}>
                                *We currently only support image URIs.
                            </Text>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Banner Color 1
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.bannerColorOne}
                            value={bannerColorOne}
                            onChange={(e) => {
                                setBannerColorOne(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Banner Color 2
                            </Text>
                        }
                    >
                        <Input
                            defaultValue={profileInfo.bannerColorTwo}
                            value={bannerColorTwo}
                            onChange={(e) => {
                                setBannerColorTwo(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        />
                        <div style={{ fontSize: 12, textAlign: 'left' }}>
                            <Text style={{ color: 'lightgray' }}>
                                *Colors must be valid HTML color names. For more
                                details, click{' '}
                                <a
                                    href="https://htmlcolorcodes.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    here
                                </a>
                                . The shades of blue used for this site are
                                #001529 (dark) and #3e83f8 (light).
                            </Text>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text style={{ color: 'white' }} strong>
                                Default Node
                            </Text>
                        }
                    >
                        <Input
                            value={defaultNode}
                            onChange={(e) => {
                                setDefaultNode(e.target.value);
                            }}
                            style={{
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                            disabled
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        style={{ width: '70%' }}
                        onClick={async () => {
                            try {
                                const data = {
                                    username,
                                    bio,
                                    email,
                                    twitter: `https://twitter.com/${twitter}`,
                                    instagram: `https://instagram.com/${instagram}`,
                                    website,
                                    profilePic,
                                    bannerColorOne,
                                    bannerColorTwo,
                                };

                                console.log(data);

                                const error = await signAndSubmitPrivateApiTxn(
                                    '/users/updateProfileData',
                                    data
                                );

                                if (!error) {
                                    navigate('/account');
                                }

                                // setTransactionIsLoading(false);
                            } catch (err) {
                                // setTxnSubmitted(false);
                                // setTransactionIsLoading(false);
                            }
                        }}
                        // loading={transactionIsLoading}
                        disabled={
                            (twitter &&
                                !isuri.isValid(
                                    `https://twitter.com/${twitter}`
                                )) ||
                            (instagram &&
                                !isuri.isValid(
                                    `https://instagram.com/${instagram}`
                                )) ||
                            (website && !isuri.isValid(website)) ||
                            (profilePic && !isuri.isValid(profilePic)) ||
                            (email && !EMAIL_REGEX.test(email))
                        }
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </Content>
    );
}
