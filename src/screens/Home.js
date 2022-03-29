import React from 'react';
import { useState } from 'react';
import { WalletDisplay } from '../components/WalletDisplay';
import { Tabs } from '../components/Tabs';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { useSelector } from 'react-redux';
import { Button, Layout, Typography, Row, Col } from 'antd';
import YoutubeEmbed from '../components/YouTubeEmbed';

const { Header, Content, Footer } = Layout;

export function Home() {
    return (
        <>
            <Layout>
                <Content
                    style={{
                        background:
                            'linear-gradient(0deg, #3e83f8 0,#001529 75%)',
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '40vh',
                        padding: '2rem 0',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            padding: '20 1rem',
                            width: '100%',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}
                    >
                        <div>
                            <Typography.Text
                                strong
                                level={3}
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '4rem',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                BitBadges
                            </Typography.Text>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <Typography.Text
                                strong
                                level={3}
                                style={{
                                    color: '#dedede',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '2rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Issue Digital Badges On The Blockchain!
                            </Typography.Text>
                        </div>
                    </div>
                </Content>
                {/* <Content
                    style={{
                        // backgroundColor: '#5447ff',
                        display: 'flex',
                        alignItems: 'center',
                        height: '40vh',
                        minHeight: '40vh',
                        // padding: '3rem 0',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            padding: '20 1rem',
                            width: '100%',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}
                    >
                        
                    </div>
                </Content> */}
                {/* <Content
                    style={{
                        background:
                            'linear-gradient(225deg,#eeeeee 0,#001529 75%)',

                        alignItems: 'center',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row justify="center" style={{ width: '100%' }}>
                        <Col xs={24} xl={24}>
                            <div>
                                <div
                                    style={{
                                        // color: 'white',
                                        fontFamily: "'Inter',sans-serif",
                                        fontSize: '3em',
                                        fontWeight: 'bolder',
                                        // paddingBottom: '1rem',
                                        fontStyle: 'normal',
                                        lineHeight: '1.2',
                                        width: '100%',
                                        wordBreak: 'break-word',
                                        wordWrap: 'break-word',
                                    }}
                                >
                                    Demos
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={11}>
                            <div>
                                <YoutubeEmbed embedId={'kRnFKrDM-mA'} />
                            </div>
                        </Col>
                        <Col xs={24} xl={11}>
                            <div>
                                <YoutubeEmbed embedId={'vgL1BR4PZNU'} />
                            </div>
                        </Col>
                    </Row>
                </Content> */}
                <Content
                    style={{
                        background:
                            'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                        alignItems: 'center',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    // color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Demos
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={11}>
                            <div>
                                <YoutubeEmbed embedId={'kRnFKrDM-mA'} />
                            </div>
                        </Col>
                        <Col xs={24} xl={11}>
                            <div>
                                <YoutubeEmbed embedId={'vgL1BR4PZNU'} />
                            </div>
                        </Col>
                    </Row>
                    {/* <div
                        style={{
                            padding: '20 1rem',
                            width: '100%',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}
                    >
                        
                    </div> */}
                </Content>

                <Content
                    style={{
                        // display: 'flex',
                        alignItems: 'center',
                        minHeight: '40vh',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                        background:
                            'linear-gradient(0deg, black, #Ea1795 100%)',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    // color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Meet the Team
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={11}>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
                                    <Col
                                        span={4}
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <img
                                            src="untitled-design-56.png"
                                            style={{
                                                maxWidth: '14vw',
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </Col>
                                    <Col span={20}>
                                        <div
                                            style={{
                                                padding: '0 3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Andrew M. K. Nassief
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                Serial entrepreneur with years
                                                of experience across a variety
                                                of startups and big projects.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} xl={11}>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
                                    <Col
                                        span={4}
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <img
                                            src="61992896.jpg"
                                            style={{
                                                maxWidth: '14vw',
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    </Col>
                                    <Col span={20}>
                                        <div
                                            style={{
                                                padding: '0 3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Trevor Miller
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                Trevor Miller is a passionate
                                                creator and blockchain developer
                                                who likes working on many new
                                                things. He is currently
                                                researching disruptive models
                                                for education.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}
