import { Address } from './Address';
import { BadgeDataForm } from './BadgeDataForm';
import { PermissionsForm } from './PermissionsForm';
import Blockies from 'react-blockies';
import { TransactionDetails } from './TransactionDetails';

const {
    Timeline,
    Typography,
    Button,
    Menu,
    Avatar,
} = require('antd');

const React = require('react');
const {
    ClockCircleOutlined,
    CheckCircleOutlined,
} = require('@ant-design/icons');
const { useState } = require('react');

const { Text } = Typography;
const { useSelector } = require('react-redux');

export function MintTimeline() {
    const [currStepNumber, setCurrStepNumber] = useState(0);
    const [badge, setBadge] = useState();
    const [permissions, setPermissions] = useState();
    const [recipients, setRecipients] = useState([]);

    const address = useSelector((state) => state.user.address);

    const steps = [
        {
            idx: 0,
            title: (
                <Text style={{ color: 'white' }}>
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
                                color: 'white',
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
                                {
                                    <Address
                                        address={address}
                                        fontSize={'2em'}
                                        showTooltip
                                    />
                                }
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
                                {'Use ETH: ' +
                                    address?.substr(0, 5) +
                                    '...' +
                                    address?.substr(-4)}
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
            idx: 1,
            title: <Text style={{ color: 'white' }}>Set Badge Metadata</Text>,
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
            idx: 2,
            title: (
                <Text style={{ color: 'white' }}>Set Badge Permissions</Text>
            ),
            content: (
                <PermissionsForm
                    setPermissions={(newPermissions) => {
                        console.log('SETTING NEW PERMISSIONS', newPermissions);
                        setPermissions(newPermissions);
                    }}
                    setCurrStepNumber={setCurrStepNumber}
                    recipients={recipients}
                />
            ),
        },
        {
            idx: 3,
            title: (
                <Text style={{ color: 'white' }}>Confirm Transaction Data</Text>
            ),
            content: (
                <TransactionDetails
                    badge={badge}
                    setCurrStepNumber={setCurrStepNumber}
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
                        key={step.idx}
                        color={step.idx < currStepNumber ? 'green' : 'blue'}
                        dot={
                            step.idx >= currStepNumber ? (
                                <ClockCircleOutlined
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '30px',
                                        backgroundColor: '#001529',
                                        padding: 0,
                                        margin: 0,
                                    }}
                                />
                            ) : (
                                <CheckCircleOutlined
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '30px',
                                        backgroundColor: '#001529',
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
                                color: 'white',
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
                            {step.idx === currStepNumber && step.content}
                        </span>
                    </Timeline.Item>
                );
            })}
        </Timeline>
    );
}
