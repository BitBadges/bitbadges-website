import { Tabs } from '../components/Tabs';
import { AccountDisplay } from '../components/AccountDisplay';
import { useSelector } from 'react-redux';
import { WalletDisplay } from '../components/AccountDisplayButtons';
import Text from 'antd/lib/typography/Text';
import { useNavigate } from 'react-router-dom';
import isuri from 'isuri';
import React from 'react';
import { useState, useEffect } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { signAndSubmitPrivateApiTxn } from '../api/api';
import { PRIMARY_BLUE, PRIMARY_TEXT, SECONDARY_TEXT } from '../constants';

const { Content } = Layout;
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

    const navigate = useNavigate();

    useEffect(() => {
        setUsername(profileInfo.username);
        setBio(profileInfo.bio);
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
            className="full-area"
            style={{ backgroundColor: PRIMARY_BLUE }}
        >
            <div
                style={{
                    background: `linear-gradient(0deg, ${
                        bannerColorTwo ? bannerColorTwo : '#001529'
                    }, ${bannerColorOne ? bannerColorOne : '#3e83f8'} 75%)`,
                }}
            >
                <AccountDisplay
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
            <hr
                color="black"
                style={{ borderWidth: '3px', marginTop: 0, paddingTop: 0 }}
            />
            <div className="primary-text" style={{ fontSize: 25 }}>
                Account Customization
            </div>
            <div
                className="primary-text"
                style={{ fontSize: 16, color: SECONDARY_TEXT, marginBottom: 4 }}
            >
                *The top of this page is just a preview. To save changes, you
                must click submit.
            </div>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
            >
                <div style={{ marginBottom: 20 }}>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
                                Bio
                            </Text>
                        }
                    >
                        <Input.TextArea
                            defaultValue={profileInfo.bio}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                        <div className="form-input-helper-text">
                            *We currently only support image URIs.
                        </div>
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ color: PRIMARY_TEXT }} strong>
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
                            className="form-input"
                        />
                        <div className="form-input-helper-text">
                            *Colors must be valid HTML color names. For more
                            details, click{' '}
                            <a
                                href="https://htmlcolorcodes.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="link-button-nav"
                            >
                                here
                            </a>
                            . The shades of blue used for this site are #001529
                            (dark) and #3e83f8 (light).
                        </div>
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
                            } catch (err) {
                                console.log(err);
                            }
                        }}
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
