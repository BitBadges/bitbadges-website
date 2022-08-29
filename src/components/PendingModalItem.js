import { Badge } from './Badge';
import React from 'react';
import { Avatar, Button, Tooltip, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, MailOutlined } from '@ant-design/icons';
import { signAndSubmitTxn } from '../api/api';
import { PRIMARY_TEXT } from '../constants';
import { getAddressFromPartitionedAddress } from '../utils/AddressUtils';

const { Text } = Typography;

export function PendingModalItem({
    title,
    info,
    showButtons,
    badge,
    balance,
    id,
    address,
}) {
    const blockScanLink =
        'https://chat.blockscan.com/index?a=' +
        getAddressFromPartitionedAddress(address);

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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Tooltip title="Message this User" placement="bottom">
                    <a href={blockScanLink} target="_blank" rel="noreferrer">
                        <Avatar
                            size="large"
                            onClick={() => {}}
                            className="screen-button account-socials-button"
                        >
                            <MailOutlined />
                        </Avatar>
                    </a>
                </Tooltip>
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
