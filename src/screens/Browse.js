import { Badge } from '../components/Badge';

const React = require('react');
const { Layout, Typography, Col, Row } = require('antd');

const { Content } = Layout;

export function Browse() {
    const sampleBadge = {
        metadata: {
            name: 'Sample',
            description: '',
            image: 'https://bitbadges.web.app/img/icons/logo.png',
            creator: 'ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27',
            validFrom: {
                start: 1649341503574,
                end: 8640000000000000,
            },
            color: 'black',
            type: 0,
            category: 'BitBadge',
            url: '',
        },
        permissions: {
            canMintMore: true,
            canRevoke: true,
            canOwnerTransfer: true,
        },
        supply: 0,
        manager: 'ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27',
        _id: 'f729504ee514b7c2e9c5dbfae92da5493007cb558d44e236dd19aa934dc0254a',
    };

    return (
        <Layout
            style={{
                background: 'linear-gradient(0deg, #3e83f8 0,#001529 75%)',
            }}
        >
            <Content
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '10vh',
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
                    <div style={{ marginBottom: '1rem' }}>
                        <Typography.Text
                            strong
                            level={3}
                            style={{
                                color: 'white',
                                fontFamily: "'Inter',sans-serif",
                                fontSize: '2rem',
                                fontStyle: 'normal',
                                lineHeight: '1.2',
                                width: '100%',
                                wordBreak: 'break-word',
                                wordWrap: 'break-word',
                            }}
                        >
                            Discover and explore new badges!
                        </Typography.Text>
                    </div>
                </div>
            </Content>

            <Content
                style={{
                    // background: 'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                    // alignItems: 'center',
                    // padding: '3rem 0',
                    textAlign: 'center',
                    width: '100%',
                    // padding: '1rem 5rem',
                    minHeight: '10vh',
                }}
            >
                <Row
                    justify="space-around"
                    style={{
                        width: '100%',
                        // marginTop: '5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <Col span={24}>
                        <div
                            style={{
                                color: '#dedede',
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
                            Featured via NFT Ads
                        </div>
                    </Col>
                    {/* <Col span={24}> */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[0, 0, 0, 0, 0].map((elem) => {
                            return <Badge badge={sampleBadge} size={100} />;
                        })}
                    </div>
                    {/* </Col> */}
                </Row>
                <Row
                    justify="space-around"
                    style={{
                        width: '100%',
                        // marginTop: '5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <Col span={24}>
                        <div
                            style={{
                                color: '#dedede',
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
                            Trending / Most Viewed
                        </div>
                    </Col>
                    {/* <Col span={24}> */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[0, 0, 0, 0, 0].map((elem) => {
                            return <Badge badge={sampleBadge} size={100} />;
                        })}
                    </div>
                    {/* </Col> */}
                </Row>
                <Row
                    justify="space-around"
                    style={{
                        width: '100%',
                        // marginTop: '5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <Col span={24}>
                        <div
                            style={{
                                color: '#dedede',
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
                            Picked For You / Feed
                        </div>
                    </Col>
                    {/* <Col span={24}> */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[0, 0, 0, 0, 0].map((elem) => {
                            return <Badge badge={sampleBadge} size={100} />;
                        })}
                    </div>
                    {/* </Col> */}
                </Row>
            </Content>
        </Layout>
    );
}
