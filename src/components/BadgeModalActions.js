import { RecipientFormItem } from './RecipientFormItem';
import { BurnOwnerFormItem } from './BurnOwnerFormItem';
import {
    Avatar,
    Button,
    Form,
    Select,
    List,
    Skeleton,
    Divider,
    Input,
    Empty,
    Typography,
} from 'antd';
import { useState } from 'react';
import React from 'react';
import {
    LockOutlined,
    PlusOutlined,
    UndoOutlined,
    SwapOutlined,
    SwapRightOutlined,
    RightOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { signAndSubmitTxn } from '../api/api';
import web3 from 'web3';
import { PRIMARY_TEXT, SECONDARY_TEXT } from '../constants';

const { Option } = Select;
const { Text } = Typography;

export function BadgeModalActions({ conceptBadge, badge, hidePermissions }) {
    const [recipients, setRecipients] = useState([]);
    const [owners, setOwners] = useState([]);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);
    const [lockSupplyIsVisible, setLockSupplyIsVisible] = useState(false);
    const [mintMoreIsVisible, setMintMoreIsVisible] = useState(false);
    const [lockRevokeIsVisible, setLockRevokeIsVisible] = useState(false);
    const [revokeIsVisible, setRevokeIsVisible] = useState(false);
    const [transferIsVisible, setTransferIsVisible] = useState(false);
    const [newManagerChain, setnewManagerChain] = useState('ETH');
    const [newManagerAddress, setnewManagerAddress] = useState('');
    const [transferManagerIsVisible, setTransferManagerIsVisible] =
        useState(false);
    const [transferRecipients, setTransferRecipients] = useState([]);
    const address = useSelector((state) => state.user.address);
    const balanceMap = useSelector((state) => state.user.userBalancesMap);
    // const navigate = useNavigate();

    if (!badge) return <></>;

    let balance =
        balanceMap && balanceMap[badge._id] && balanceMap[badge._id].received
            ? balanceMap[badge._id].received
            : undefined;

    const getPopover = (visible, setVisible) => {
        return (
            <button
                className="link-button"
                style={{ color: PRIMARY_TEXT }}
                key="list-loadmore-edit"
                onClick={() => setVisible(!visible)}
            >
                {visible ? <DownOutlined /> : <RightOutlined />}
            </button>
        );
    };

    const submitTransaction = async (data, route) => {
        setTxnSubmitted(true);
        setTransactionIsLoading(true);

        await signAndSubmitTxn(route, data);

        setTransactionIsLoading(false);
    };

    const getSignAndSubmitButton = (onClick, disabled) => {
        return (
            <Form.Item>
                <Button
                    style={{
                        width: '100%',
                    }}
                    type="primary"
                    onClick={onClick}
                    loading={transactionIsLoading}
                    disabled={disabled}
                >
                    Sign and Submit
                </Button>
            </Form.Item>
        );
    };

    const managerActions = [];
    const ownerActions = [];
    const allUserActions = [];

    if (badge.permissions) {
        if (badge.permissions.canOwnerTransfer && balance) {
            ownerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Transfer</div>,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Transfer this badge
                    </div>
                ),
                icon: <SwapOutlined />,
                visible: transferIsVisible,
                content: (
                    <>
                        {transferIsVisible && (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Form
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <RecipientFormItem
                                        recipients={transferRecipients}
                                        setRecipients={setTransferRecipients}
                                    />
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            recipients: transferRecipients,
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(
                                            data,
                                            '/badges/transfer'
                                        );
                                    }, txnSubmitted || transferRecipients.length === 0)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setTransferIsVisible(!transferIsVisible);
                },
                popover: getPopover(transferIsVisible, setTransferIsVisible),
            });
        }
        if (badge.permissions.canMintMore) {
            managerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Mint</div>,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Mint more of this badge
                    </div>
                ),
                icon: <PlusOutlined />,
                visible: mintMoreIsVisible,
                content: (
                    <>
                        {mintMoreIsVisible && (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Form
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <RecipientFormItem
                                        recipients={recipients}
                                        setRecipients={setRecipients}
                                    />
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            recipients,
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(data, '/badges/mint');
                                    }, txnSubmitted || recipients.length === 0)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setMintMoreIsVisible(!mintMoreIsVisible);
                },
                popover: getPopover(mintMoreIsVisible, setMintMoreIsVisible),
            });

            managerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Lock Supply</div>,
                icon: <LockOutlined />,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Disable minting privileges permanently.
                    </div>
                ),
                visible: lockSupplyIsVisible,
                content: (
                    <>
                        {lockSupplyIsVisible && (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Form
                                    // labelCol={{ span: 4 }}
                                    // wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <Form.Item>
                                        <Text style={{ color: PRIMARY_TEXT }}>
                                            *Warning: This action is permanent.
                                            Once you lock the supply of this
                                            badge, you will never be able to
                                            mint any more.
                                        </Text>
                                    </Form.Item>
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(
                                            data,
                                            '/badges/lockSupply'
                                        );
                                    }, txnSubmitted)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setLockSupplyIsVisible(!lockSupplyIsVisible);
                },
                popover: getPopover(
                    lockSupplyIsVisible,
                    setLockSupplyIsVisible
                ),
            });
        }

        if (badge.permissions.canRevoke) {
            managerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Revoke</div>,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Revoke a badge from an existing owner
                    </div>
                ),
                icon: <UndoOutlined />,
                visible: revokeIsVisible,
                content: (
                    <>
                        {revokeIsVisible && (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Form
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <BurnOwnerFormItem
                                        owners={owners}
                                        setOwners={setOwners}
                                    />
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            owners,
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(data, '/badges/burn');
                                    }, txnSubmitted || owners.length === 0)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setRevokeIsVisible(!revokeIsVisible);
                },
                popover: getPopover(revokeIsVisible, setRevokeIsVisible),
            });
            managerActions.push({
                title: (
                    <div style={{ color: PRIMARY_TEXT }}>
                        Lock Revoke Permissions
                    </div>
                ),
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Disable revoking privileges permanently.
                    </div>
                ),
                icon: <LockOutlined />,
                visible: lockRevokeIsVisible,
                content: (
                    <>
                        {lockRevokeIsVisible && (
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Form
                                    // labelCol={{ span: 4 }}
                                    // wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <Form.Item>
                                        <Text style={{ color: PRIMARY_TEXT }}>
                                            *Warning: This action is permanent.
                                            Once you lock your revoke
                                            permission, you will never be able
                                            to revoke again.
                                        </Text>
                                    </Form.Item>

                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(
                                            data,
                                            '/badges/lockRevoke'
                                        );
                                    }, txnSubmitted)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setLockRevokeIsVisible(!lockRevokeIsVisible);
                },
                popover: getPopover(
                    lockRevokeIsVisible,
                    setLockRevokeIsVisible
                ),
            });
        }

        managerActions.push({
            title: (
                <div style={{ color: PRIMARY_TEXT }}>Transfer Manager Role</div>
            ),
            description: (
                <div style={{ color: SECONDARY_TEXT }}>
                    Transfer manager privileges to new address
                </div>
            ),
            icon: <SwapRightOutlined />,
            visible: transferManagerIsVisible,
            content: (
                <>
                    {transferManagerIsVisible && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Form layout="horizontal" style={{ width: '50vw' }}>
                                <Form.Item
                                    label={
                                        <Text
                                            strong
                                            style={{ color: PRIMARY_TEXT }}
                                        >
                                            New Manager
                                        </Text>
                                    }
                                >
                                    <Input.Group compact>
                                        <Select
                                            value={newManagerChain}
                                            onSelect={(e) =>
                                                setnewManagerChain(e)
                                            }
                                            defaultValue="ETH"
                                        >
                                            <Option value="ETH">ETH</Option>
                                        </Select>
                                        <Input
                                            style={{ width: '75%' }}
                                            value={newManagerAddress}
                                            onChange={(e) =>
                                                setnewManagerAddress(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item>
                                    <Text style={{ color: PRIMARY_TEXT }}>
                                        *Warning: This action is permanent. Once
                                        you transfer the manager role to this
                                        new address, you will lose privileges on
                                        this address.
                                    </Text>
                                </Form.Item>
                                {getSignAndSubmitButton(async () => {
                                    const data = {
                                        badgeId: badge._id,
                                        newManager: `${newManagerChain}:${newManagerAddress}`,
                                    };
                                    submitTransaction(
                                        data,
                                        '/badges/transferManager'
                                    );
                                }, txnSubmitted || !web3.utils.isAddress(newManagerAddress))}

                                {!web3.utils.isAddress(newManagerAddress) && (
                                    <Text>*Invalid address specified</Text>
                                )}
                                <Divider />
                            </Form>
                        </div>
                    )}
                </>
            ),
            showModal: () => {
                setTransferManagerIsVisible(!transferManagerIsVisible);
            },
            popover: getPopover(
                transferManagerIsVisible,
                setTransferManagerIsVisible
            ),
        });

        allUserActions.push(...ownerActions);
        if (address === badge.manager.split(':')[1]) {
            allUserActions.push(...managerActions);
        }
    }

    return (
        <div
            style={{
                width: '100%',
                fontSize: 20,
            }}
        >
            {!hidePermissions && !conceptBadge && (
                <>
                    {allUserActions.length > 0 ? (
                        <List
                            itemLayout="horizontal"
                            dataSource={allUserActions}
                            renderItem={(item) => (
                                <>
                                    <div
                                        className="action-item"
                                        onClick={() => {
                                            item.showModal();
                                        }}
                                    >
                                        <List.Item
                                            actions={[
                                                <button
                                                    className="link-button"
                                                    key="list-loadmore-edit"
                                                >
                                                    {item.popover}
                                                </button>,
                                            ]}
                                            style={{
                                                paddingLeft: 8,
                                            }}
                                        >
                                            <Skeleton
                                                avatar
                                                title={false}
                                                loading={item.loading}
                                                active
                                            >
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar
                                                            style={{
                                                                backgroundColor:
                                                                    'black',
                                                            }}
                                                            icon={item.icon}
                                                        />
                                                    }
                                                    title={item.title}
                                                    description={
                                                        item.description
                                                    }
                                                />
                                            </Skeleton>
                                        </List.Item>
                                    </div>

                                    <div>{item.content}</div>
                                    <Divider
                                        style={{
                                            color: 'black',
                                            backgroundColor: 'black',
                                            margin: 0,
                                        }}
                                    />
                                </>
                            )}
                        />
                    ) : (
                        <Empty
                            style={{ color: PRIMARY_TEXT }}
                            description="There are no actions you can take. To perform an action, you must either own this badge or be the badge manager."
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    )}
                </>
            )}
            {(hidePermissions || conceptBadge) && (
                <Empty
                    style={{ color: PRIMARY_TEXT }}
                    description="This is just a badge preview, so there are no actions you can take."
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            )}
        </div>
    );
}
