import { Address } from './Address';
import { Avatar, Tooltip, Divider, Alert, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faUserLock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    SwapOutlined,
    CheckCircleFilled,
    WarningFilled,
    LockFilled,
    UnlockFilled,
    RollbackOutlined,
} from '@ant-design/icons';
import { MAX_DATE_TIMESTAMP, PRIMARY_TEXT } from '../constants';

const { Text } = Typography;

export function BadgeModalOverview({ conceptBadge, badge, hidePermissions }) {
    return (
        <>
            {conceptBadge && (
                <Alert
                    style={{ textAlign: 'center' }}
                    message="Warning: This badge is a concept badge and is not currently on the blockchain."
                    description="Concept badges are created by users to showcase a badge they plan to create in the future. There may be differences between the conceptual version and the final on-chain version."
                    type="warning"
                    closable
                />
            )}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    style={{
                        verticalAlign: 'middle',
                        border: '3px solid',
                        borderColor: badge.metadata.color
                            ? badge.metadata.color
                            : 'black',
                        margin: 4,
                        backgroundColor: badge.metadata.image
                            ? PRIMARY_TEXT
                            : badge.metadata.color,
                    }}
                    // className="badge-avatar"   //For scaling on hover
                    src={
                        badge.metadata.image ? badge.metadata.image : undefined
                    }
                    size={200}
                    onError={(e) => {
                        return false;
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text strong style={{ fontSize: 30, color: PRIMARY_TEXT }}>
                    {badge.metadata.name}
                </Text>
            </div>
            {!hidePermissions && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 8,
                    }}
                >
                    <Tooltip
                        title={`Valid ${
                            badge.metadata.validFrom.end !== MAX_DATE_TIMESTAMP
                                ? 'Until ' +
                                  new Date(
                                      badge.metadata.validFrom.end
                                  ).toLocaleDateString()
                                : 'Forever'
                        }`}
                    >
                        {Date.now() <= badge.metadata.validFrom.end ? (
                            <CheckCircleFilled
                                style={{
                                    fontSize: 30,
                                    color: 'green',
                                }}
                            />
                        ) : (
                            <WarningFilled
                                style={{
                                    fontSize: 30,
                                    color: 'red',
                                }}
                            />
                        )}
                    </Tooltip>
                    <Divider type="vertical" />
                    <Tooltip
                        title={`${
                            badge.permissions.canMintMore
                                ? `Supply (${badge.supply}) is Not Locked`
                                : `Supply (${badge.supply}) is Locked`
                        }`}
                    >
                        {badge.permissions.canMintMore ? (
                            <UnlockFilled style={{ fontSize: 30 }} />
                        ) : (
                            <LockFilled style={{ fontSize: 30 }} />
                        )}
                    </Tooltip>
                    <Divider type="vertical" />
                    <Tooltip
                        title={`${
                            badge.permissions.canOwnerTransfer
                                ? 'Transferable'
                                : 'Non-Transferable'
                        }`}
                    >
                        {badge.permissions.canOwnerTransfer ? (
                            <SwapOutlined style={{ fontSize: 30 }} />
                        ) : (
                            <FontAwesomeIcon
                                style={{ fontSize: 30 }}
                                icon={faSnowflake}
                            />
                        )}
                    </Tooltip>
                    <Divider type="vertical" />
                    <Tooltip
                        title={`${
                            badge.permissions.canRevoke
                                ? 'Revocable by Manager'
                                : 'Non-Revocable'
                        }`}
                    >
                        {badge.permissions.canRevoke ? (
                            <RollbackOutlined style={{ fontSize: 30 }} />
                        ) : (
                            <FontAwesomeIcon
                                style={{ fontSize: 30 }}
                                icon={faUserLock}
                            />
                        )}
                    </Tooltip>
                </div>
            )}
            
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 4,
                }}
            >
                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <b>Manager</b>
                    </div>
                    <div>
                        <Address
                            address={badge.manager.split(':')[1]}
                            fontColor="lightgrey"
                            fontSize={18}
                            showTooltip
                        />
                    </div>
                </div>
                <Divider type="vertical" />
                <div
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <b>Creator</b>
                    </div>
                    <div>
                        <Address
                            address={badge.metadata.creator.split(':')[1]}
                            fontColor="lightgrey"
                            fontSize={18}
                            showTooltip
                        />
                    </div>
                </div>
            </div>
            {badge.metadata.url && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 8,
                        }}
                    >
                        <a
                            href={badge.metadata.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {badge.metadata.url}
                        </a>
                        <br />
                    </div>
                </>
            )}
            {badge.metadata.description && (
                <>
                    <Divider style={{ margin: '4px 0px' }} />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        {badge.metadata.description}
                        <br />
                    </div>
                </>
            )}
        </>
    );
}
