import { Content } from 'antd/lib/layout/layout';
const { Row, Col, Button } = require('antd');
const React = require('react');
// const { setScreen } = require('../redux/screenSlice');

export function WalletFooter() {
    return (
        <Content
            style={{
                backgroundColor: 'black',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                padding: '1rem 5rem',
                minHeight: '25vh',
            }}
        >
            <Row justify="space-around" style={{ width: '100%' }}>
                <Col>
                    <Button
                        style={{
                            minWidth: '20vw',
                            // backgroundColor: '#005af0',
                            // borderColor: '#005af0',
                            fontWeight: 'bolder',
                            // color: 'white',
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
                            // backgroundColor: '#005af0',
                            // borderColor: '#005af0',
                            fontWeight: 'bolder',
                            // color: 'white',
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
                            // backgroundColor: '#005af0',
                            // borderColor: '#005af0',
                            fontWeight: 'bolder',
                            // color: 'white',
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
