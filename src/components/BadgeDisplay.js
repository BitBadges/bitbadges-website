import { Badge } from './Badge';
import { Typography, Layout, Collapse, Select, Empty } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { PRIMARY_TEXT, TERTIARY_BLUE } from '../constants';

const { Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

export function BadgeDisplay({
    badges,
    balanceMap,
    collected,
    isOffering,
    conceptBadges,
    isManaging,
}) {
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

    if (conceptBadges) {
        for (const badge of conceptBadges) {
            badgesByType['__concept_badges'] = badgesByType['__concept_badges']
                ? [...badgesByType['__concept_badges'], badge]
                : [badge];
        }
    }

    return (
        <Content
            style={{
                padding: '0',
                margin: 0,
                minHeight: '60vh',
                backgroundColor: TERTIARY_BLUE,
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
                    color: PRIMARY_TEXT,
                }}
            >
                <Text style={{ color: PRIMARY_TEXT }}>Group By: </Text>
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
                <Text style={{ color: PRIMARY_TEXT }}>Sort By: </Text>
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
            (!conceptBadges || !conceptBadges.length) ? (
                <>
                    <Empty
                        style={{ color: PRIMARY_TEXT }}
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
                        backgroundColor: TERTIARY_BLUE,
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
                                    {badgesByType[type].map((badge) => (
                                        <Badge
                                            collectedBadge={collected}
                                            managing={isManaging}
                                            offeredBadge={isOffering}
                                            conceptBadge={
                                                type === '__concept_badges'
                                            }
                                            size={100}
                                            badge={badge}
                                            balance={
                                                balanceMap &&
                                                balanceMap[badge._id] &&
                                                balanceMap[badge._id].received
                                                    ? balanceMap[badge._id]
                                                          .received
                                                    : undefined
                                            }
                                        />
                                    ))}
                                </>
                            ))}
                    </div>
                </Collapse>
            )}
        </Content>
    );
}
