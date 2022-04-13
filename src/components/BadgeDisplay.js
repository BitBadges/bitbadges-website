import { Badge } from './Badge';
const { Typography, Layout, Collapse, Select, Empty } = require('antd');

const React = require('react');

const { Text } = Typography;
const { Content } = Layout;
const { useSelector } = require('react-redux');
const { useState } = require('react');
const { Option } = Select;

export function BadgeDisplay({
    badges,
    balanceMap,
    collected,
    offering,
    concepts,
    managing,
}) {
    const badgeMap = useSelector((state) => state.user.badgeMap);
    const [groupBy, setGroupBy] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    // const [badgeDisplay, setBadgeDisplay] = useState('card');


    if (!badges) return <></>;

    let badgesByType = {};
    for (const badge of badges) {
        if (badgeMap[badge].metadata.category) {
            badgesByType[badgeMap[badge].metadata.category] = badgesByType[
                badgeMap[badge].metadata.category
            ]
                ? [
                      ...badgesByType[badgeMap[badge].metadata.category],
                      badgeMap[badge],
                  ]
                : [badgeMap[badge]];
        } else {
            badgesByType['Other'] = badgesByType['Other']
                ? [...badgesByType['Other'], badgeMap[badge]]
                : [badgeMap[badge]];
        }
    }

    if (concepts) {
        for (const badge of concepts) {
            badgesByType['__concept_badges'] = badgesByType['__concept_badges']
                ? [...badgesByType['__concept_badges'], badge]
                : [badge];
        }
    }

    return (
        <>
            <Content
                style={{
                    padding: '0',
                    margin: 0,
                    minHeight: '60vh',
                    backgroundColor: '#192c3e',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        minHeight: 30,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    {/* <Text style={{ color: 'white' }}>Badge Display: </Text>
                <Select
                    value={badgeDisplay}
                    onChange={(e) => setBadgeDisplay(e)}
                    style={{ marginLeft: 5, marginRight: 10 }}
                    defaultValue="card"
                    size="small"
                    disabled
                >
                    <Option value="card">Card</Option>
                    <Option value="circle">Circle</Option>
                </Select> */}
                    <Text style={{ color: 'white' }}>Group By: </Text>
                    <Select
                        value={groupBy}
                        onChange={(e) => setGroupBy(e)}
                        style={{ marginLeft: 5, marginRight: 10 }}
                        defaultValue="type"
                        size="small"
                        disabled
                    >
                        <Option value="all">All</Option>
                        <Option value="type">Type</Option>
                    </Select>
                    <Text style={{ color: 'white' }}>Sort By: </Text>
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e)}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        defaultValue="date"
                        size="small"
                        disabled
                    >
                        <Option value="date">Date</Option>
                    </Select>
                </div>
                {(!badges || !badges.length) &&
                (!concepts || !concepts.length) ? (
                    <>
                        <Empty
                            style={{ color: 'white' }}
                            description="No Badges Found"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </>
                ) : (
                    <Collapse
                        accordion
                        style={{
                            padding: 0,
                            margin: 0,
                            width: '100%',
                            backgroundColor: '#192c3e',
                            border: '0px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            {Object.keys(badgesByType)
                                .sort()
                                .map((type) => (
                                    <>
                                        {/* {groupBy === 'type' && (
                                    <Panel
                                        style={{
                                            color: 'white',
                                            borderBottom: '1px solid black',
                                        }}
                                        header={
                                            <div
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                {type} (
                                                {badgesByType[type].length})
                                            </div>
                                        }
                                        key={type}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                backgroundColor: '#192c3e',
                                                padding: 0,
                                                margin: 0,
                                            }}
                                        >
                                            {badgesByType[type].map((badge) => (
                                                <Badge
                                                    size={100}
                                                    badge={badge}
                                                    balance={
                                                        balanceMap &&
                                                        balanceMap[badge._id] &&
                                                        balanceMap[badge._id]
                                                            .received
                                                            ? balanceMap[
                                                                  badge._id
                                                              ].received
                                                            : undefined
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </Panel>
                                )} */}
                                        {groupBy === 'all' && (
                                            <>
                                                {badgesByType[type].map(
                                                    (badge) => (
                                                        <Badge
                                                            collectedBadge={
                                                                collected
                                                            }
                                                            managing={managing}
                                                            offeredBadge={
                                                                offering
                                                            }
                                                            conceptBadge={
                                                                type ===
                                                                '__concept_badges'
                                                            }
                                                            size={100}
                                                            badge={badge}
                                                            balance={
                                                                balanceMap &&
                                                                balanceMap[
                                                                    badge._id
                                                                ] &&
                                                                balanceMap[
                                                                    badge._id
                                                                ].received
                                                                    ? balanceMap[
                                                                          badge
                                                                              ._id
                                                                      ].received
                                                                    : undefined
                                                            }
                                                        />
                                                    )
                                                )}
                                            </>
                                        )}
                                    </>
                                ))}
                        </div>
                    </Collapse>
                )}
            </Content>
        </>
    );
}
