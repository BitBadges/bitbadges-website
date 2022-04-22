import { getAbbreviatedAddress } from '../utils/AddressUtils';
import { UserAddOutlined } from '@ant-design/icons';
import { Typography, Form, Button, Input, Select, InputNumber } from 'antd';
import React from 'react';
import web3 from 'web3';
import { useState } from 'react';
import { RecipientList } from './RecipientList';

const { Text } = Typography;
const { Option } = Select;

export function BurnOwnerFormItem({ setOwners, owners }) {
    const [visible, setVisible] = useState(false);
    const [addedUserAmount, setAddedUserAmount] = useState(0);
    const [addedUserChain, setAddedUserChain] = useState('ETH');
    const [addedUserAddress, setAddedUserAddress] = useState('');

    const showUserModal = () => {
        setVisible(true);
    };

    const hideUserModal = () => {
        setVisible(false);
    };

    const formatOwnersForRecipientList = () => {
        const formattedOwners = [];
        for (const owner of owners) {
            formattedOwners.push({
                to: owner.address,
                amount: owner.amount,
            });
        }
        return formattedOwners;
    };

    return (
        <Form.Item
            label={
                <Text strong style={{ color: 'white' }}>
                    Owners
                </Text>
            }
        >
            <RecipientList
                recipients={formatOwnersForRecipientList()}
                setRecipients={setOwners}
            />

            <div>
                {!visible && (
                    <Button
                        style={{ width: '100%' }}
                        size="small"
                        className="screen-button"
                        onClick={showUserModal}
                    >
                        Add Owner
                        <UserAddOutlined />
                    </Button>
                )}
            </div>

            {visible && (
                <>
                    <Input
                        addonBefore={
                            <Select
                                value={addedUserChain}
                                onSelect={(e) => setAddedUserChain(e)}
                                defaultValue="ETH"
                            >
                                <Option value="ETH">ETH</Option>
                            </Select>
                        }
                        style={{ width: '100%' }}
                        value={addedUserAddress}
                        onChange={(e) => setAddedUserAddress(e.target.value)}
                        suffix={
                            <InputNumber
                                value={addedUserAmount}
                                onChange={(e) => setAddedUserAmount(e)}
                            />
                        }
                    />
                    <div
                        style={{
                            marginTop: 10,
                        }}
                    >
                        <RecipientList
                            recipients={[
                                {
                                    to: `${addedUserChain}:${addedUserAddress}`,
                                    amount: addedUserAmount,
                                    reason: '',
                                },
                            ]}
                            setRecipients={() => {}}
                            showWarnings
                            hideTotals
                        />
                    </div>

                    <div
                        style={{
                            marginTop: 10,
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            htmlType="button"
                            style={{ width: '48%' }}
                            onClick={hideUserModal}
                            className="screen-button"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            style={{
                                width: '48%',
                            }}
                            onClick={() => {
                                setOwners([
                                    ...owners,
                                    {
                                        address: `${addedUserChain}:${addedUserAddress}`,
                                        amount: addedUserAmount,
                                        reason: '',
                                    },
                                ]);
                                setAddedUserAddress('');
                                setAddedUserAmount(0);
                                hideUserModal();
                            }}
                            disabled={
                                addedUserAmount <= 0 ||
                                !web3.utils.isAddress(addedUserAddress)
                            }
                        >
                            Revoke {addedUserAmount} from{' '}
                            {`${addedUserChain}:${
                                addedUserAddress.length > 9
                                    ? getAbbreviatedAddress(addedUserAddress)
                                    : addedUserAddress
                            }`}
                        </Button>
                    </div>

                    <hr />
                </>
            )}
        </Form.Item>
    );
}
