import { Badge } from './Badge';
import React from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { signAndSubmitTxn } from '../api/api';
import { PRIMARY_TEXT } from '../constants';

const { Text } = Typography;

export function PendingModalItem({
    title,
    info,
    showButtons,
    badge,
    balance,
    id,
}) {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 20,
                    textAlign: 'center',
                }}
            >
                <Text strong style={{ color: PRIMARY_TEXT }}>
                    {title}
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
                <Text style={{ color: PRIMARY_TEXT }}>Badge Preview:</Text>
            </div>

            <div
                style={{
                    alignItems: 'center',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Badge badge={badge} size={100} balance={balance} />
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
                {info}
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {showButtons && (
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
                                        ids: [id],
                                    };
                                    signAndSubmitTxn('/badges/accept', data);
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
                                        ids: [id],
                                    };
                                    signAndSubmitTxn('/badges/decline', data);
                                }}
                            />
                        </Tooltip>
                    </>
                )}
            </div>
            <hr
                style={{
                    backgroundColor: PRIMARY_TEXT,
                    fontSize: '50px',
                }}
            />
        </div>
    );
}
