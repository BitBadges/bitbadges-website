import { Tabs } from './Tabs';
import { Drawer, Empty } from 'antd';
import { useState } from 'react';
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { BadgeModalOverview } from './BadgeModalOverview';
import { PRIMARY_TEXT } from '../constants';
import { BadgeModalManagerActions } from './BadgeModalManagerActions';
import { BadgeModalUserActions } from './BadgeModalUserActions';
import { useSelector } from 'react-redux';

export function BadgeModal({
    modalIsVisible,
    setModalIsVisible,
    conceptBadge,
    badge,
    hidePermissions,
}) {
    const [tab, setTab] = useState('overview');
    const address = useSelector((state) => state.user.address);
    const chain = useSelector((state) => state.user.chain);

    if (!badge) return <></>;

    const tabInfo = [{ key: 'overview', content: 'Overview' }];

    if (address && chain) {
        tabInfo.push({
            key: 'status',
            content: 'Status',
        });
    }

    if (badge.manager === `${chain}:${address}`) {
        tabInfo.push({
            key: 'manageractions',
            content: 'Manager Actions',
        });
    }

    tabInfo.push(
        { key: 'owners', content: 'Owners' },
        { key: 'activity', content: 'Activity' }
    );

    return (
        <>
            <Drawer
                size="large"
                headerStyle={{
                    paddingLeft: '12px',
                    paddingRight: '0px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                    borderBottom: '0px',
                    backgroundColor: '#001529',
                    color: PRIMARY_TEXT,
                }}
                title={
                    <Tabs
                        tabInfo={tabInfo}
                        setTab={setTab}
                        widthPerTab={undefined}
                        theme="dark"
                        fullWidth
                    />
                }
                closeIcon={<CloseOutlined style={{ color: PRIMARY_TEXT }} />}
                placement={'bottom'}
                visible={modalIsVisible}
                key={'bottom'}
                onClose={() => setModalIsVisible(false)}
                bodyStyle={{
                    paddingTop: 8,
                    fontSize: 20,
                    backgroundColor: '#001529',
                    color: PRIMARY_TEXT,
                }}
            >
                {tab === 'overview' && (
                    <BadgeModalOverview
                        badge={badge}
                        conceptBadge={conceptBadge}
                        hidePermissions={hidePermissions}
                    />
                )}
                {tab === 'status' && (
                    <BadgeModalUserActions
                        badge={badge}
                        conceptBadge={conceptBadge}
                        hidePermissions={hidePermissions}
                    />
                )}
                {tab === 'manageractions' && (
                    <BadgeModalManagerActions
                        badge={badge}
                        conceptBadge={conceptBadge}
                        hidePermissions={hidePermissions}
                    />
                )}
                {tab === 'activity' && (
                    <Empty
                        style={{ color: PRIMARY_TEXT }}
                        description="This feature is coming soon..."
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}

                {tab === 'owners' && (
                    <Empty
                        style={{ color: PRIMARY_TEXT }}
                        description="This feature is coming soon..."
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
            </Drawer>
        </>
    );
}
