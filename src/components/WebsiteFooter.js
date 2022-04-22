import { Content } from 'antd/lib/layout/layout';
import { Row, Col, Button } from 'antd';
import React from 'react';

export function WalletFooter() {
    return (
        <Content
            style={{
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 5rem',
                minHeight: '20vh',
            }}
        >
            <Row justify="space-around" style={{ width: '100%' }}>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            fontWeight: 'bolder',
                            margin: '1rem',
                        }}
                        type="primary"
                        href="https://bitbadges.github.io/"
                        target="_blank"
                    >
                        Docs
                    </Button>
                </Col>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            fontWeight: 'bolder',
                            margin: '1rem',
                        }}
                        type="primary"
                        href="https://decentralizeduniversity.org/"
                        target="_blank"
                    >
                        Decentralized University
                    </Button>
                </Col>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            fontWeight: 'bolder',
                            margin: '1rem',
                        }}
                        type="primary"
                        href="https://github.com/BitBadges"
                        target={'_blank'}
                    >
                        GitHub
                    </Button>
                </Col>
            </Row>
        </Content>
    );
}
