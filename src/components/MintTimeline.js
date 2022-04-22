import { Address } from './Address';
import { BadgeDataForm } from './BadgeDataForm';
import { PermissionsForm } from './PermissionsForm';
import Blockies from 'react-blockies';
import { TransactionDetails } from './CreateBadgeTxnDetails';
import { Timeline, Typography, Button, Menu, Avatar } from 'antd';
import React from 'react';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAbbreviatedAddress } from '../utils/AddressUtils';
import { PRIMARY_BLUE, PRIMARY_TEXT } from '../constants';

const { Text } = Typography;

export function MintTimeline() {
    const [currStepNumber, setCurrStepNumber] = useState(0);
    const [badge, setBadge] = useState();
    const [permissions, setPermissions] = useState();
    const [recipients, setRecipients] = useState([]);

    const address = useSelector((state) => state.user.address);

    const steps = [
        {
            stepNumber: 0,
            title: (
                <Text style={{ color: PRIMARY_TEXT }}>
                    Confirm Wallet to Issue From
                </Text>
            ),
            content: (
                <div>
                    <Menu theme="dark" style={{ width: '100%' }}>
                        <div
                            style={{
                                padding: '0',
                                textAlign: 'center',
                                color: PRIMARY_TEXT,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                            }}
                        >
                            <Avatar
                                size={150}
                                src={
                                    <Blockies
                                        seed={address.toLowerCase()}
                                        size={40}
                                    />
                                }
                            />

                            <div style={{ marginBottom: 10, marginTop: 4 }}>
                                <Address
                                    address={address}
                                    fontSize={'2em'}
                                    showTooltip
                                />
                            </div>
                        </div>
                    </Menu>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        onClick={async () => {
                            setCurrStepNumber(1);
                        }}
                        disabled={!address}
                    >
                        {address ? (
                            <>
                                {'Use ' +
                                    getAbbreviatedAddress('ETH: ' + address)}
                            </>
                        ) : (
                            'Please connect wallet.'
                        )}
                    </Button>
                    <Typography style={{ color: 'lightgrey' }}>
                        *To use a different wallet, please disconnect and
                        reconnect with a new wallet.
                    </Typography>
                </div>
            ),
        },
        {
            stepNumber: 1,
            title: (
                <Text style={{ color: PRIMARY_TEXT }}>Set Badge Metadata</Text>
            ),
            content: (
                <BadgeDataForm
                    setPermissions={(permissions) => {
                        setPermissions(permissions);
                    }}
                    setCurrStepNumber={setCurrStepNumber}
                    setBadge={(badge) => {
                        setBadge(badge);
                    }}
                    setRecipients={(recipients) => {
                        setRecipients(recipients);
                    }}
                />
            ),
        },
        {
            stepNumber: 2,
            title: (
                <Text style={{ color: PRIMARY_TEXT }}>
                    Set Badge Permissions
                </Text>
            ),
            content: (
                <PermissionsForm
                    setPermissions={(newPermissions) => {
                        setPermissions(newPermissions);
                    }}
                    setTimelineStepNum={setCurrStepNumber}
                    recipients={recipients}
                />
            ),
        },
        {
            stepNumber: 3,
            title: (
                <Text style={{ color: PRIMARY_TEXT }}>
                    Confirm Transaction Data
                </Text>
            ),
            content: (
                <TransactionDetails
                    badge={badge}
                    setTimelineStepNumber={setCurrStepNumber}
                    recipients={recipients}
                    permissions={permissions}
                />
            ),
        },
    ];

    return (
        <Timeline>
            {steps.map((step) => {
                return (
                    <Timeline.Item
                        key={step.stepNumber}
                        color={
                            step.stepNumber < currStepNumber ? 'green' : 'blue'
                        }
                        dot={
                            step.stepNumber >= currStepNumber ? (
                                <ClockCircleOutlined
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '30px',
                                        backgroundColor: PRIMARY_BLUE,
                                        padding: 0,
                                        margin: 0,
                                    }}
                                />
                            ) : (
                                <CheckCircleOutlined
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '30px',
                                        backgroundColor: PRIMARY_BLUE,
                                        padding: 0,
                                        margin: 0,
                                    }}
                                />
                            )
                        }
                        style={{
                            textAlign: 'left',
                        }}
                    >
                        <span
                            style={{
                                verticalAlign: 'middle',
                                paddingLeft: 5,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: PRIMARY_TEXT,
                            }}
                        >
                            {step.title}
                        </span>
                        <span
                            style={{
                                verticalAlign: 'middle',
                                paddingLeft: 5,
                                fontSize: 12,
                            }}
                        >
                            {step.stepNumber === currStepNumber && step.content}
                        </span>
                    </Timeline.Item>
                );
            })}
        </Timeline>
    );
}
