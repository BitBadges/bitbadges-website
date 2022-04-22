import { MintTimeline } from '../components/MintTimeline';
import React from 'react';
import { Layout } from 'antd';
import { PRIMARY_BLUE, SECONDARY_BLUE } from '../constants';

const { Content } = Layout;

export function Mint() {
    return (
        <Layout>
            <Content
                style={{
                    background: `linear-gradient(0deg, ${SECONDARY_BLUE} 0,${PRIMARY_BLUE} 75%)`,
                    textAlign: 'center',
                    minHeight: '100vh',
                }}
            >
                <div className="primary-text">Mint a Badge</div>
                <div
                    style={{
                        marginLeft: '10vw',
                        marginRight: '10vw',
                        paddingLeft: '2vw',
                        paddingRight: '2vw',
                        paddingTop: '20px',
                        border: '5px solid black',
                        background: PRIMARY_BLUE,
                        minHeight: '60vh',
                    }}
                >
                    <MintTimeline />
                </div>
            </Content>
        </Layout>
    );
}
