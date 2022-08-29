import React from 'react';
import { Layout, Tooltip, Empty, List, Typography, Avatar } from 'antd';
import { MailOutlined, WarningOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { ETH_NULL_ADDRESS, PRIMARY_TEXT } from '../constants';
import { PendingModalItem } from './PendingModalItem';
import { getAbbreviatedAddress } from '../utils/AddressUtils';

const { Content } = Layout;

export function Pending({ tab }) {
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

    //chooses whether to display inbox or outbox badges
    const pending = tab === 'incoming' ? inPending : outPending;

    return (
        <Content className="full-area">
            {pending.map((pendingData) => (
                <div>
                    {tab === 'incoming' && (
                        <>
                            <PendingModalItem
                                address={
                                    pendingData.from === ETH_NULL_ADDRESS
                                        ? badgeMap[pendingData.badge].manager
                                        : pendingData.from
                                }
                                title={
                                    <>
                                        {pendingData.from !==
                                        ETH_NULL_ADDRESS ? (
                                            <>
                                                <Tooltip
                                                    title={pendingData.from}
                                                >
                                                    {' '}
                                                    {getAbbreviatedAddress(
                                                        pendingData.from
                                                    )}{' '}
                                                </Tooltip>
                                                wants to send you{' '}
                                            </>
                                        ) : (
                                            <>
                                                <Tooltip
                                                    title={
                                                        badgeMap[
                                                            pendingData.badge
                                                        ].manager
                                                    }
                                                >
                                                    {' '}
                                                    {getAbbreviatedAddress(
                                                        badgeMap[
                                                            pendingData.badge
                                                        ].manager
                                                    )}{' '}
                                                </Tooltip>
                                                wants to mint you{' '}
                                            </>
                                        )}
                                        {pendingData.amount}{' '}
                                        {
                                            badgeMap[pendingData.badge].metadata
                                                .name
                                        }{' '}
                                        badges{' '}
                                    </>
                                }
                                info={
                                    <>
                                        {[
                                            badgeMap[pendingData.badge]
                                                .permissions.canOwnerTransfer
                                                ? badgeMap[pendingData.badge]
                                                      .permissions.canRevoke
                                                    ? 'This badge is transferable, but the manager can revoke it at anytime.'
                                                    : 'This badge is transferable and can never be revoked by the manager.'
                                                : badgeMap[pendingData.badge]
                                                      .permissions.canRevoke
                                                ? 'This badge is non-transferable, but the manager can revoke it.'
                                                : 'This badge is non-transferable and can never be revoked by the manager. Once you accept this badge, it will permanently live in your account forever.',
                                            badgeMap[pendingData.badge]
                                                .permissions.canMintMore
                                                ? 'The supply of this badge is not locked. The badge manager can mint more of this badge.'
                                                : 'The supply of this badge is locked. The badge manager can not mint anymore of this badge ever.',
                                        ].map((item) => (
                                            <List.Item
                                                style={{
                                                    padding: '4px 0px',
                                                    color: PRIMARY_TEXT,
                                                }}
                                            >
                                                <Typography.Text>
                                                    <div
                                                        style={{
                                                            color: PRIMARY_TEXT,
                                                        }}
                                                    >
                                                        <WarningOutlined
                                                            style={{
                                                                color: 'orange',
                                                            }}
                                                        />
                                                        {item}
                                                    </div>
                                                </Typography.Text>{' '}
                                            </List.Item>
                                        ))}
                                    </>
                                }
                                badge={badgeMap[pendingData.badge]}
                                balance={pendingData.amount}
                                id={pendingData.id}
                                showButtons
                            />
                        </>
                    )}
                    {tab === 'outgoing' && (
                        <PendingModalItem
                            address={pendingData.to}
                            title={
                                <>
                                    {' '}
                                    You are sending {pendingData.amount}{' '}
                                    {badgeMap[pendingData.badge].metadata.name}{' '}
                                    badges to{' '}
                                    <Tooltip title={pendingData.to}>
                                        {' '}
                                        {getAbbreviatedAddress(
                                            pendingData.to
                                        )}{' '}
                                    </Tooltip>
                                </>
                            }
                            info={
                                <>
                                    {[
                                        `If the recipient declines this
                                            transfer request, the badges will be
                                            added back to your account's
                                            balances.`,
                                    ].map((item) => (
                                        <List.Item
                                            style={{
                                                padding: '4px 0px',
                                                color: PRIMARY_TEXT,
                                            }}
                                        >
                                            <Typography.Text>
                                                <div
                                                    style={{
                                                        color: PRIMARY_TEXT,
                                                    }}
                                                >
                                                    <WarningOutlined
                                                        style={{
                                                            color: 'orange',
                                                        }}
                                                    />
                                                    {item}
                                                </div>
                                            </Typography.Text>{' '}
                                        </List.Item>
                                    ))}
                                </>
                            }
                            badge={badgeMap[pendingData.badge]}
                            balance={pendingData.amount}
                            id={pendingData.id}
                        />
                    )}
                </div>
            ))}
            {(!pending || pending.length === 0) && (
                <Empty
                    description={
                        <div style={{ color: PRIMARY_TEXT }}>
                            No Badges Found
                        </div>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            )}
        </Content>
    );
}
