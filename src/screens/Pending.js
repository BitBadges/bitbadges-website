import { Badge } from '../components/Badge';

const React = require('react');
const { Layout, Button, Tooltip, Empty, List, Typography } = require('antd');
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

export function Pending({ tab }) {
    // const [tab, setTab] = useState('incoming');
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

    const pending = tab === 'incoming' ? inPending : outPending;

    return (
        <Content
            style={{
                margin: '0',
                padding: '0',
                width: '100%',
                // backgroundColor: '#',
            }}
        >
            {/* <Tabs
                setTab={setTab}
                tabInfo={[
                    { key: 'incoming', title: 'Inbox' },
                    { key: 'outgoing', title: 'Outbox' },
                ]}
                widthPerTab={'50%'}
            /> */}
            <div style={{ width: '100%' }}></div>
            {pending && pending.length > 0 ? (
                <>
                    {pending.map((pendingData) => (
                        <>
                            <div>
                                {tab === 'incoming' && (
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 20,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Text
                                                strong
                                                style={{ color: 'white' }}
                                            >
                                                {pendingData.from !==
                                                ETH_NULL_ADDRESS ? (
                                                    <>
                                                        <Tooltip
                                                            title={
                                                                pendingData.from
                                                            }
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
                                                                pendingData
                                                                    .badge
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
                                        <br />
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 16,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Text style={{ color: 'white' }}>
                                                Badge Preview:
                                            </Text>
                                        </div>

                                        <div
                                            style={{
                                                alignItems: 'center',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Badge
                                                badge={
                                                    badgeMap[pendingData.badge]
                                                }
                                                size={100}
                                                balance={pendingData.amount}
                                            />
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 14,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {[
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
                                            ].map((item) => (
                                                <List.Item
                                                    style={{
                                                        padding: '4px 0px',
                                                        color: 'white',
                                                    }}
                                                >
                                                    <Typography.Text>
                                                        <div
                                                            style={{
                                                                color: 'white',
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
                                        </div>
                                    </>
                                )}
                                {tab === 'outgoing' && (
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 20,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Text
                                                strong
                                                style={{ color: 'white' }}
                                            >
                                                You are sending{' '}
                                                {pendingData.amount}{' '}
                                                {
                                                    badgeMap[pendingData.badge]
                                                        .metadata.name
                                                }{' '}
                                                badges to{' '}
                                                <Tooltip title={pendingData.to}>
                                                    {' '}
                                                    {pendingData.to.substr(
                                                        0,
                                                        10
                                                    ) +
                                                        '...' +
                                                        pendingData.to.substr(
                                                            -4
                                                        )}{' '}
                                                </Tooltip>
                                            </Text>
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 16,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Text style={{ color: 'white' }}>
                                                Badge Preview:
                                            </Text>
                                        </div>

                                        <div
                                            style={{
                                                alignItems: 'center',
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Badge
                                                badge={
                                                    badgeMap[pendingData.badge]
                                                }
                                                size={100}
                                                // balance={pendingData.amount}
                                            />
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 12,
                                                color: 'white',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontSize: 14,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {[
                                                    `If the recipient declines this
                                                transfer request, the badges will be
                                                added back to your account's
                                                balances.`,
                                                ].map((item) => (
                                                    <List.Item
                                                        style={{
                                                            padding: '4px 0px',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        <Typography.Text>
                                                            <div
                                                                style={{
                                                                    color: 'white',
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
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {tab === 'incoming' && (
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
                                    )}
                                </div>
                            </div>
                            <hr
                                style={{
                                    backgroundColor: 'white',
                                    fontSize: '50px',
                                    // borderWidth: '4px',
                                }}
                            />
                        </>
                    ))}
                </>
            ) : (
                <div
                    className="site-layout-content"
                    style={{ color: 'white', backgroundColor: '#001529' }}
                >
                    <Empty
                        description={`No Badges Found`}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
            )}
        </Content>
    );
}
