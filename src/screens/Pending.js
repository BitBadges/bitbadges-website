import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { useState } from 'react';
import { Tabs } from '../components/Tabs';

const React = require('react');
const {
    Layout,
    Button,
    Tooltip,
    Divider,
    Empty,
    message,
    List,
    Typography,
} = require('antd');
const {
    CheckOutlined,
    CloseOutlined,
    WarningOutlined,
} = require('@ant-design/icons');
const { default: Text } = require('antd/lib/typography/Text');
const { Content } = Layout;
const { useSelector } = require('react-redux');
const { signAndSubmitTxn } = require('../api/api');
const { ETH_NULL_ADDRESS } = require('../constants');

export function Pending() {
    const [tab, setTab] = useState('incoming');
    const userBalancesMap = useSelector((state) => state.user.userBalancesMap);
    const badgeMap = useSelector((state) => state.user.badgeMap);

    const inPending = [];
    const outPending = [];

    //scan through userBalancesMap and add incoming/outgoing badges
    for (const badgeKey of Object.keys(userBalancesMap)) {
        if (userBalancesMap[badgeKey].inPending) {
            for (const pendingDetails of userBalancesMap[badgeKey].inPending) {
                inPending.push({
                    ...pendingDetails,
                    badge: badgeKey,
                });
            }
        }

        if (userBalancesMap[badgeKey].outPending) {
            for (const pendingDetails of userBalancesMap[badgeKey].outPending) {
                outPending.push({
                    ...pendingDetails,
                    badge: badgeKey,
                });
            }
        }
    }

    const pending = tab == 'incoming' ? inPending : outPending;

    return (
        <Content
            style={{ padding: '0', width: '100%', backgroundColor: 'white' }}
        >
            <Tabs
                setTab={setTab}
                tabInfo={[
                    { key: 'incoming', title: 'Inbox' },
                    { key: 'outgoing', title: 'Outbox' },
                ]}
                widthPerTab={'50%'}
            />
            <div style={{ width: '100%', marginTop: 24 }}></div>
            {pending && pending.length > 0 ? (
                <>
                    {pending.map((pendingData) => (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginLeft: 20,
                                    marginRight: 20,
                                }}
                            >
                                <Badge
                                    badge={badgeMap[pendingData.badge]}
                                    size={100}
                                    balance={pendingData.amount}
                                />

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {tab == 'incoming' ? (
                                        <>
                                            <Tooltip title="Accept">
                                                <Button
                                                    style={{ margin: 5 }}
                                                    size="large"
                                                    type="primary"
                                                    shape="circle"
                                                    icon={<CheckOutlined />}
                                                    onClick={async () => {
                                                        const data = {
                                                            ids: [
                                                                pendingData.id,
                                                            ],
                                                        };
                                                        signAndSubmitTxn(
                                                            '/badges/accept',
                                                            data
                                                        );
                                                    }}
                                                />
                                            </Tooltip>
                                            <Tooltip title="Decline">
                                                <Button
                                                    style={{ margin: 5 }}
                                                    size="large"
                                                    type="primary"
                                                    shape="circle"
                                                    icon={<CloseOutlined />}
                                                    onClick={async () => {
                                                        const data = {
                                                            ids: [
                                                                pendingData.id,
                                                            ],
                                                        };
                                                        signAndSubmitTxn(
                                                            '/badges/decline',
                                                            data
                                                        );
                                                    }}
                                                />
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <div style={{ textAlign: 'right' }}>
                                            <div>
                                                <Text
                                                    strong
                                                    style={{ fontSize: 16 }}
                                                >
                                                    To:{' '}
                                                    <Tooltip
                                                        placement="bottom"
                                                        title={`${pendingData.to}`}
                                                    >
                                                        {pendingData.to.substr(
                                                            0,
                                                            9
                                                        ) +
                                                            '...' +
                                                            pendingData.to.substr(
                                                                -4
                                                            )}
                                                    </Tooltip>
                                                </Text>
                                            </div>
                                            <div>
                                                <Text
                                                    strong
                                                    style={{ fontSize: 16 }}
                                                >
                                                    Amount: {pendingData.amount}
                                                </Text>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {tab == 'incoming' && (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 20,
                                            marginRight: 20,
                                            fontSize: 20,
                                        }}
                                    >
                                        <Text strong>
                                            {pendingData.from !=
                                            ETH_NULL_ADDRESS ? (
                                                <>
                                                    <Tooltip
                                                        title={pendingData.from}
                                                    >
                                                        {' '}
                                                        {pendingData.from.substr(
                                                            0,
                                                            10
                                                        ) +
                                                            '...' +
                                                            pendingData.from.substr(
                                                                -4
                                                            )}{' '}
                                                    </Tooltip>
                                                    wants to send you{' '}
                                                </>
                                            ) : (
                                                <>
                                                    <Tooltip
                                                        title={
                                                            badgeMap[
                                                                pendingData
                                                                    .badge
                                                            ].manager
                                                        }
                                                    >
                                                        {' '}
                                                        {badgeMap[
                                                            pendingData.badge
                                                        ].manager.substr(
                                                            0,
                                                            10
                                                        ) +
                                                            '...' +
                                                            badgeMap[
                                                                pendingData
                                                                    .badge
                                                            ].manager.substr(
                                                                -4
                                                            )}{' '}
                                                    </Tooltip>
                                                    wants to mint you{' '}
                                                </>
                                            )}
                                            {pendingData.amount}{' '}
                                            {
                                                badgeMap[pendingData.badge]
                                                    .metadata.name
                                            }{' '}
                                            badges{' '}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 20,
                                            marginRight: 20,
                                            fontSize: 20,
                                        }}
                                    >
                                        <List
                                            size="small"
                                            dataSource={[
                                                badgeMap[pendingData.badge]
                                                    .permissions
                                                    .canOwnerTransfer
                                                    ? badgeMap[
                                                          pendingData.badge
                                                      ].permissions.canRevoke
                                                        ? 'This badge is transferable, but the manager can revoke it at anytime.'
                                                        : 'This badge is transferable and can never be revoked by the manager.'
                                                    : badgeMap[
                                                          pendingData.badge
                                                      ].permissions.canRevoke
                                                    ? 'This badge is non-transferable, but the manager can revoke it.'
                                                    : 'This badge is non-transferable and can never be revoked by the manager. Once you accept this badge, it will permanently live in your account forever.',
                                                badgeMap[pendingData.badge]
                                                    .permissions.canMintMore
                                                    ? 'The supply of this badge is not locked. The badge manager can mint more of this badge.'
                                                    : 'The supply of this badge is locked. The badge manager can not mint anymore of this badge ever.',
                                            ]}
                                            renderItem={(item) => (
                                                <List.Item
                                                    style={{
                                                        padding: '4px 0px',
                                                    }}
                                                >
                                                    <Typography.Text>
                                                        <WarningOutlined
                                                            style={{
                                                                color: 'orange',
                                                            }}
                                                        />
                                                        {item}
                                                    </Typography.Text>{' '}
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </>
                            )}
                            {tab == 'outgoing' && (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginLeft: 20,
                                            marginRight: 20,
                                            fontSize: 12,
                                        }}
                                    >
                                        <List
                                            size="small"
                                            dataSource={[
                                                `If the recipient declines this
                                                transfer request, the badges will be
                                                added back to your account's
                                                balances.`,
                                            ]}
                                            renderItem={(item) => (
                                                <List.Item
                                                    style={{
                                                        padding: '4px 0px',
                                                    }}
                                                >
                                                    <Typography.Text>
                                                        <WarningOutlined
                                                            style={{
                                                                color: 'orange',
                                                            }}
                                                        />
                                                        {item}
                                                    </Typography.Text>{' '}
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </>
                            )}
                            <Divider />
                        </>
                    ))}
                </>
            ) : (
                <div className="site-layout-content">
                    <Empty
                        description={`No Badges Found`}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
            )}
        </Content>
    );
}
