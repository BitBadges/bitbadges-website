import { Badge } from './Badge';
const { Typography, Layout, Collapse, Select, Empty } = require('antd');

const React = require('react');

const { Panel } = Collapse;
const { Text } = Typography;
const { Content } = Layout;
const { useSelector } = require('react-redux');
const { useState } = require('react');
const { Option } = Select;

export function BadgeDisplay({ badges, balanceMap }) {
    const badgeMap = useSelector((state) => state.user.badgeMap);
    const [groupBy, setGroupBy] = useState('all');
    const [sortBy, setSortBy] = useState('date');

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

    return (
        <Content
            style={{
                padding: '0',
                margin: 0,
                minHeight: '60vh',
                backgroundColor: 'whitesmoke',
                width: '100%',
            }}
        >
            <div
                style={{
                    height: 30,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                }}
            >
                <Text>Group By: </Text>
                <Select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e)}
                    style={{ marginLeft: 5, marginRight: 10 }}
                    defaultValue="type"
                    size="small"
                >
                    <Option value="all">All</Option>
                    <Option value="type">Type</Option>
                </Select>
                <Text>Sort By: </Text>
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
            {!badges || !badges.length ? (
                <>
                    <Empty
                        description="No Badges Found"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </>
            ) : (
                <Collapse
                    accordion
                    style={{
                        padding: '0',
                        margin: 0,
                        width: '100%',
                        backgroundColor: 'whitesmoke',
                    }}
                >
                    {Object.keys(badgesByType)
                        .sort()
                        .map((type) => (
                            <>
                                {groupBy === 'type' && (
                                    <Panel
                                        header={`${type} (${badgesByType[type].length})`}
                                        key={type}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
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
                                )}
                                {groupBy === 'all' && (
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
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
                                    </>
                                )}
                            </>
                        ))}
                </Collapse>
            )}
        </Content>
    );
}
