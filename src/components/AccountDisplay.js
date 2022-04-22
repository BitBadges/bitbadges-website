import { Address } from './Address';
import Blockies from 'react-blockies';
import {
    InstagramOutlined,
    LinkOutlined,
    ShareAltOutlined,
    TwitterOutlined,
} from '@ant-design/icons';
import { SECONDARY_TEXT, WEBSITE_HOSTNAME } from '../constants';
import React from 'react';
import { Layout, Avatar, message, Tooltip } from 'antd';

const { Content } = Layout;

export function AccountDisplay({
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
    const profilePicSrc = profilePic ? (
        profilePic
    ) : (
        <Blockies seed={address.toLowerCase()} size={40} />
    );

    return (
        <div>
            <div style={{ position: 'absolute', right: 10, top: 74 }}>
                {twitter && (
                    <a href={twitter} target="_blank" rel="noreferrer">
                        <Tooltip title="Twitter" placement="bottom">
                            <Avatar
                                size="large"
                                onClick={() => {}}
                                className="screen-button account-socials-button"
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
                                size="large"
                                onClick={() => {}}
                                className="screen-button account-socials-button"
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
                                size="large"
                                onClick={() => {}}
                                className="screen-button account-socials-button"
                            >
                                <LinkOutlined />
                            </Avatar>
                        </Tooltip>
                    </a>
                )}
                <Tooltip title="Share (Copy Link)" placement="bottom">
                    <Avatar
                        size="large"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `https://${WEBSITE_HOSTNAME}/user/${chain}:${address}`
                            );
                            message.success('Copied to clipboard!');
                        }}
                        className="screen-button account-socials-button"
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
                        <Avatar size={150} src={profilePicSrc} />
                        {!userName && (
                            <div>
                                <Address
                                    style={{ marginTop: 4 }}
                                    address={address}
                                    fontSize={30}
                                    showTooltip
                                />
                            </div>
                        )}
                        {userName && (
                            <>
                                <div style={{ fontSize: 30 }}>{userName}</div>
                                <div>
                                    <Address
                                        address={address}
                                        fontSize={20}
                                        showTooltip
                                    />
                                </div>
                            </>
                        )}
                        {bio && (
                            <div
                                style={{
                                    fontSize: 18,
                                    color: SECONDARY_TEXT,
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
