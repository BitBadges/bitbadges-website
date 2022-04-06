import { Address } from './Address';
import Blockies from 'react-blockies';

const React = require('react');
const { Layout, Menu, Avatar } = require('antd');

const { Content } = Layout;

export function ShowingResultsFor({ address }) {
    return (
        <Content
            style={{
                padding: '0',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
            }}
        >
            <Menu theme="dark" style={{ width: '100%' }}>
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
                            <Blockies seed={address.toLowerCase()} size={40} />
                        }
                    />

                    <div style={{ height: 20, marginTop: 4 }}>
                        {
                            <Address
                                address={address}
                                fontSize={30}
                                showTooltip
                            />
                        }
                    </div>
                </div>
            </Menu>
        </Content>
    );
}
