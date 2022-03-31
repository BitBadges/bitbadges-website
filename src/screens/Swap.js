const React = require('react');
const { Layout, Typography } = require('antd');
const PageHeader = require('../components/PageHeader');
const { Content } = Layout;

export function Swap({}) {
    return (
        <Layout>
            <Content
                style={{
                    background: 'linear-gradient(0deg, #3e83f8 0,#001529 75%)',
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '50vh',
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
                            Swap $BADGE Coming Soon!
                        </Typography.Text>
                    </div>
                </div>
            </Content>

            <Content
                style={{
                    background: 'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                    alignItems: 'center',
                    // padding: '3rem 0',
                    textAlign: 'center',
                    width: '100%',
                    padding: '1rem 5rem',
                    minHeight: '20vh',
                }}
            ></Content>

            <Content
                style={{
                    // display: 'flex',
                    alignItems: 'center',
                    minHeight: '10vh',
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
