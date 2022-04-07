const { UserAddOutlined } = require('@ant-design/icons');
const {
    Typography,
    Form,
    Avatar,
    Button,
    Input,
    Select,
    InputNumber,
} = require('antd');
const React = require('react');

const web3 = require('web3');

const { useState } = require('react');
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

    return (
        <Form.Item
            label={
                <Text strong style={{ color: 'white' }}>
                    Owners
                </Text>
            }
            shouldUpdate={(prevValues, curValues) =>
                prevValues.users !== curValues.users
            }
        >
            {owners.length > 0 && (
                <>
                    {owners.map((owner) => (
                        <div
                            style={{
                                marginBottom: 3,
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            <Avatar
                                src={
                                    'https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png'
                                }
                                style={{ marginRight: 3 }}
                            />
                            {`${owner.address.substr(
                                0,
                                10
                            )}...${owner.address.substr(-4)}  (x${
                                owner.amount
                            })`}
                        </div>
                    ))}
                </>
            )}
            <div>
                {!visible && (
                    <Button
                        style={{
                            width: '100%',
                            backgroundColor: '#001529',
                            color: 'white',
                        }}
                        size="small"
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
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            htmlType="button"
                            style={{
                                width: '48%',
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                            onClick={hideUserModal}
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
                                    ? addedUserAddress.substr(0, 4) +
                                      '...' +
                                      addedUserAddress.substr(-3)
                                    : addedUserAddress
                            }`}
                        </Button>
                    </div>

                    {!web3.utils.isAddress(addedUserAddress) && (
                        <Text style={{ color: 'lightgrey' }}>
                            *Invalid address specified
                        </Text>
                    )}
                    <hr />
                </>
            )}
        </Form.Item>
    );
}
