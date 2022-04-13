import { Address } from './Address';
import Blockies from 'react-blockies';
import {
    InstagramOutlined,
    LinkOutlined,
    ShareAltOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import { WEBSITE_HOSTNAME } from '../constants';

const React = require('react');
const { Layout, Avatar, message, Tooltip } = require('antd');

const { Content } = Layout;

export function ShowingResultsFor({
    address,
    chain,
    userName,
    bio,
    profilePic,
    twitter,
    instagram,
    email,
    website,
    bannerColorOne,
    bannerColorTwo,
}) {
    return (
        <div
            style={
                {
                    // background: 'linear-gradient(0deg, #001529 , #3e83f8 75%)',
                }
            }
        >
            <div style={{ position: 'absolute', right: 10, top: 74 }}>
                {twitter && (
                    <a href={twitter} target="_blank" rel="noreferrer">
                        <Tooltip title="Twitter" placement="bottom">
                            <Avatar
                                style={{
                                    marginBottom: 1,
                                    cursor: 'pointer',
                                    fontSize: 20,
                                    padding: 0,
                                    margin: 5,
                                    alignItems: 'center',
                                }}
                                size="large"
                                onClick={() => {}}
                                className="screen-button"
                            >
                                <TwitterOutlined />
                            </Avatar>
                        </Tooltip>
                    </a>
                )}
                {instagram && (
                    <a href={instagram} target="_blank" rel="noreferrer">
                        <Tooltip title="Instagram" placement="bottom">
                            <Avatar
                                style={{
                                    marginBottom: 1,
                                    cursor: 'pointer',
                                    fontSize: 20,
                                    padding: 0,
                                    margin: 5,
                                    alignItems: 'center',
                                }}
                                size="large"
                                onClick={() => {}}
                                className="screen-button"
                            >
                                <InstagramOutlined />
                            </Avatar>
                        </Tooltip>
                    </a>
                )}
                {website && (
                    <a href={website} target="_blank" rel="noreferrer">
                        <Tooltip title="Website" placement="bottom">
                            <Avatar
                                style={{
                                    marginBottom: 1,
                                    cursor: 'pointer',
                                    fontSize: 20,
                                    padding: 0,
                                    margin: 5,
                                    alignItems: 'center',
                                }}
                                size="large"
                                onClick={() => {}}
                                className="screen-button"
                            >
                                <LinkOutlined />
                            </Avatar>
                        </Tooltip>
                    </a>
                )}
                <Tooltip title="Share (Copy Link)" placement="bottom">
                    <Avatar
                        style={{
                            marginBottom: 1,
                            cursor: 'pointer',
                            fontSize: 20,
                            padding: 0,
                            margin: 5,
                            alignItems: 'center',
                        }}
                        size="large"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `https://${WEBSITE_HOSTNAME}/user/${chain}:${address}`
                            );
                            message.success('Copied to clipboard!');
                        }}
                        className="screen-button"
                    >
                        <ShareAltOutlined />
                    </Avatar>
                </Tooltip>
            </div>
            <Content
                style={{
                    padding: '0',
                    textAlign: 'center',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 10,
                }}
            >
                <div theme="dark" style={{ width: '100%' }}>
                    <div
                        style={{
                            padding: '0',
                            textAlign: 'center',
                            color: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                    >
                        <Avatar
                            size={150}
                            src={
                                profilePic ? (
                                    profilePic
                                ) : (
                                    <Blockies
                                        seed={address.toLowerCase()}
                                        size={40}
                                    />
                                )
                            }
                        />
                        {!userName && (
                            <div style={{ marginTop: 4 }}>
                                {
                                    <Address
                                        address={address}
                                        fontSize={30}
                                        showTooltip
                                    />
                                }
                            </div>
                        )}
                        {userName && (
                            <>
                                <div
                                    style={{
                                        fontSize: 30,
                                    }}
                                >
                                    {userName}
                                </div>
                                <div>
                                    {
                                        <Address
                                            address={address}
                                            fontSize={20}
                                            showTooltip
                                        />
                                    }
                                </div>
                            </>
                        )}
                        {bio && (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: 'lightgray',
                                }}
                            >
                                {bio}
                            </div>
                        )}
                    </div>
                </div>
            </Content>
        </div>
    );
}
