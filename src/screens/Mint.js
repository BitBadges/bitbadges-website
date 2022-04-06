import { MintTimeline } from '../components/MintTimeline';
const React = require('react');
const { Layout, Row, Typography, Col } = require('antd');
const { Content } = Layout;

export function Mint() {
    return (
        <Layout>
            <Content
                style={{
                    background: 'linear-gradient(0deg, #3e83f8 0,#001529 75%)',
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
                            Mint a Badge
                        </Typography.Text>
                    </div>
                </div>
            </Content>
            <Content
                style={{
                    background: 'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',
                    minHeight: '50vh',
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
                    }}
                >
                    <Col xs={22} sm={20} md={18} lg={12}>
                        <div
                            className="site-layout-content"
                            style={{ border: '5px solid black' }}
                        >
                            <MintTimeline />
                        </div>
                    </Col>
                </Row>
            </Content>
            <Content
                style={{
                    // display: 'flex',
                    alignItems: 'center',
                    minHeight: '5vh',
                    // padding: '3rem 0',
                    textAlign: 'center',
                    width: '100%',
                    padding: '1rem 5rem',
                    background: 'linear-gradient(0deg, black, #Ea1795 100%)',
                }}
            ></Content>
        </Layout>
    );
}
