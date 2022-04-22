import { Badge } from '../components/Badge';

import React from 'react';
import { Layout, Col, Row } from 'antd';
import {
    PRIMARY_BLUE,
    SAMPLE_BADGE,
    SECONDARY_BLUE,
    SECONDARY_TEXT,
} from '../constants';

const { Content } = Layout;

export function Browse() {
    return (
        <Layout
            style={{
                background: `linear-gradient(0deg, ${SECONDARY_BLUE} 0,${PRIMARY_BLUE} 75%)`,
            }}
        >
            <Content
                style={{
                    padding: '20 1rem',
                    marginBottom: '1rem',
                }}
            >
                <div className="primary-text">
                    Discover and explore new badges!
                </div>
            </Content>

            <Content>
                <Row
                    justify="space-around"
                    style={{
                        width: '100%',
                        marginBottom: '3rem',
                    }}
                >
                    <Col span={24}>
                        <div
                            className="primary-text"
                            style={{ fontSize: '3em', color: SECONDARY_TEXT }}
                        >
                            Featured (via NFT Ads)
                        </div>
                    </Col>
                    <div className="badge-flex-display">
                        {[0, 0, 0, 0, 0].map(() => {
                            return <Badge badge={SAMPLE_BADGE} size={100} />;
                        })}
                    </div>
                </Row>
                <Row
                    justify="space-around"
                    style={{
                        width: '100%',
                        marginBottom: '3rem',
                    }}
                >
                    <Col span={24}>
                        <div
                            className="primary-text"
                            style={{ fontSize: '3em', color: SECONDARY_TEXT }}
                        >
                            Trending / Most Viewed
                        </div>
                    </Col>
                    <div className="badge-flex-display">
                        {[0, 0, 0, 0, 0].map(() => {
                            return <Badge badge={SAMPLE_BADGE} size={100} />;
                        })}
                    </div>
                </Row>
                <Row
                    justify="space-around"
                    style={{
                        marginBottom: '3rem',
                    }}
                >
                    <Col span={24}>
                        <div
                            className="primary-text"
                            style={{ fontSize: '3em', color: SECONDARY_TEXT }}
                        >
                            Recent Activity / Feed
                        </div>
                    </Col>

                    <div className="badge-flex-display">
                        {[0, 0, 0, 0, 0].map(() => {
                            return <Badge badge={SAMPLE_BADGE} size={100} />;
                        })}
                    </div>

                    <div className="badge-flex-display">
                        {[0, 0, 0, 0, 0].map(() => {
                            return <Badge badge={SAMPLE_BADGE} size={100} />;
                        })}
                    </div>

                    <div className="badge-flex-display">
                        {[0, 0, 0, 0, 0].map(() => {
                            return <Badge badge={SAMPLE_BADGE} size={100} />;
                        })}
                    </div>
                </Row>
            </Content>
        </Layout>
    );
}
