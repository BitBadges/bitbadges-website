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
    InputNumber,
} from 'antd';
import { useState } from 'react';
import React from 'react';
import {
    LockOutlined,
    PlusOutlined,
    UndoOutlined,
    SwapRightOutlined,
    RightOutlined,
    DownOutlined,
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { signAndSubmitTxn } from '../api/api';
import web3 from 'web3';
import { ETH_LOGO, PRIMARY_TEXT, SECONDARY_TEXT } from '../constants';
import { RecipientList } from './RecipientList';

const { Option } = Select;
const { Text } = Typography;

export function BadgeModalManagerActions({
    conceptBadge,
    badge,
    hidePermissions,
}) {
    const [recipients, setRecipients] = useState([]);
    const [owners, setOwners] = useState([]);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);
    const [lockSupplyIsVisible, setLockSupplyIsVisible] = useState(false);
    const [mintMoreIsVisible, setMintMoreIsVisible] = useState(false);
    const [mintApprovalIsVisible, setMintApprovalIsVisible] = useState(false);
    const [lockRevokeIsVisible, setLockRevokeIsVisible] = useState(false);
    const [revokeIsVisible, setRevokeIsVisible] = useState(false);
    const [newManagerChain, setnewManagerChain] = useState('ETH');
    const [newManagerAddress, setnewManagerAddress] = useState('');

    const [approveeChain, setApproveeChain] = useState('ETH');
    const [approveeAddress, setApproveeAddress] = useState('');
    const [approveeAmount, setApproveeAmount] = useState(0);

    const [transferManagerIsVisible, setTransferManagerIsVisible] =
        useState(false);

    const address = useSelector((state) => state.user.address);
    // const navigate = useNavigate();

    if (!badge) return <></>;

    const mintRequests = [];
    if (badge.mintRequests) {
        for (const user of Object.keys(badge.mintRequests)) {
            mintRequests.push({
                address: user,
                amount: badge.mintRequests[user],
            });
        }
    }

    const mintApprovals = [];
    if (badge.mintApprovals) {
        for (const user of Object.keys(badge.mintApprovals)) {
            mintApprovals.push({
                address: user,
                amount: badge.mintApprovals[user],
            });
        }
    }

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
    const allUserActions = [];

    if (badge.permissions) {
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
                title: (
                    <div style={{ color: PRIMARY_TEXT }}>Approve a Mint</div>
                ),
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Add a mint approval.
                    </div>
                ),
                icon: <PlusOutlined />,
                visible: mintApprovalIsVisible,
                content: (
                    <>
                        {mintApprovalIsVisible && (
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
                                    <Form.Item
                                        label={
                                            <Text
                                                strong
                                                style={{ color: PRIMARY_TEXT }}
                                            >
                                                Approved Address
                                            </Text>
                                        }
                                    >
                                        <Input
                                            addonBefore={
                                                <Select
                                                    value={approveeChain}
                                                    onSelect={(e) =>
                                                        setApproveeChain(e)
                                                    }
                                                    defaultValue="ETH"
                                                >
                                                    <Option value="ETH">
                                                        ETH
                                                    </Option>
                                                </Select>
                                            }
                                            placeholder="Enter Address (0x....)"
                                            value={approveeAddress}
                                            onChange={(e) =>
                                                setApproveeAddress(
                                                    e.target.value
                                                )
                                            }
                                            suffix={
                                                <InputNumber
                                                    value={approveeAmount}
                                                    onChange={(e) =>
                                                        setApproveeAmount(e)
                                                    }
                                                />
                                            }
                                        />
                                        <div
                                            style={{
                                                marginTop: 10,
                                            }}
                                        >
                                            <RecipientList
                                                hideTotals
                                                showWarnings
                                                recipients={[
                                                    {
                                                        to: `${approveeChain}:${approveeAddress}`,
                                                        amount: approveeAmount,
                                                    },
                                                ]}
                                                setRecipients={() => {
                                                    setApproveeAddress('');
                                                    setApproveeAmount(0);
                                                }}
                                            />
                                        </div>
                                    </Form.Item>
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            approvedAddress: approveeAddress,
                                            badgeId: badge._id,
                                            amount: approveeAmount,
                                        };

                                        submitTransaction(
                                            data,
                                            '/badges/addMintApproval'
                                        );
                                    }, txnSubmitted)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setMintApprovalIsVisible(!mintApprovalIsVisible);
                },
                popover: getPopover(
                    mintApprovalIsVisible,
                    setMintApprovalIsVisible
                ),
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
                    {badge.permissions.canMintMore && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 30,
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    marginLeft: 10,
                                    marginRight: 10,
                                    maxHeight: 450,
                                    overflow: 'auto',
                                }}
                            >
                                <>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                color: PRIMARY_TEXT,
                                                fontWeight: 'bolder',
                                                fontSize: 30,
                                            }}
                                        >
                                            Mint Requests
                                        </Text>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                color: PRIMARY_TEXT,
                                                fontWeight: 'bolder',
                                                fontSize: 14,
                                            }}
                                        >
                                            These users have requested to
                                            receive this badge.
                                        </Text>
                                    </div>
                                </>
                                <Divider
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'white',
                                        margin: 0,
                                    }}
                                />
                                {mintRequests.length ? (
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={mintRequests}
                                        renderItem={(item) => (
                                            <>
                                                <div>
                                                    <List.Item
                                                        actions={[
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        fontSize: 20,
                                                                        padding: 0,
                                                                        marginLeft: 8,
                                                                        marginRight: 8,
                                                                        alignItems:
                                                                            'center',
                                                                    }}
                                                                    size="large"
                                                                    onClick={() => {
                                                                        console.log(
                                                                            'ASDJAFGHJ',
                                                                            item
                                                                        );
                                                                        const data =
                                                                            {
                                                                                approvedAddress:
                                                                                    item.address,
                                                                                badgeId:
                                                                                    badge._id,
                                                                                amount: item.amount,
                                                                            };
                                                                        submitTransaction(
                                                                            data,
                                                                            '/badges/acceptFromMintRequestToMintApproval'
                                                                        );
                                                                    }}
                                                                    className="screen-button"
                                                                >
                                                                    <CheckOutlined />
                                                                </Avatar>

                                                                <Avatar
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        fontSize: 20,
                                                                        padding: 0,
                                                                        marginLeft: 8,
                                                                        marginRight: 8,
                                                                        alignItems:
                                                                            'center',
                                                                    }}
                                                                    size="large"
                                                                    onClick={() => {
                                                                        const data =
                                                                            {
                                                                                badgeId:
                                                                                    badge._id,
                                                                                amount: item.amount,
                                                                            };
                                                                        submitTransaction(
                                                                            data,
                                                                            '/badges/removeMintRequest'
                                                                        );
                                                                    }}
                                                                    className="screen-button"
                                                                >
                                                                    <CloseOutlined />
                                                                </Avatar>
                                                            </div>,
                                                        ]}
                                                        style={{
                                                            paddingLeft: 8,
                                                        }}
                                                    >
                                                        <List.Item.Meta
                                                            avatar={
                                                                <Avatar
                                                                    style={{
                                                                        backgroundColor:
                                                                            'black',
                                                                    }}
                                                                    src={
                                                                        ETH_LOGO
                                                                    }
                                                                />
                                                            }
                                                            title={
                                                                <div
                                                                    style={{
                                                                        color: PRIMARY_TEXT,
                                                                    }}
                                                                >
                                                                    {
                                                                        item.address
                                                                    }
                                                                </div>
                                                            }
                                                            description={
                                                                <Text
                                                                    style={{
                                                                        color: SECONDARY_TEXT,
                                                                        fontSize: 14,
                                                                    }}
                                                                >
                                                                    This user
                                                                    has
                                                                    requested to
                                                                    mint{' '}
                                                                    {
                                                                        item.amount
                                                                    }{' '}
                                                                    of this
                                                                    badge.
                                                                </Text>
                                                            }
                                                        />
                                                    </List.Item>
                                                </div>

                                                <div>{item.content}</div>
                                                <Divider
                                                    style={{
                                                        color: 'black',
                                                        backgroundColor:
                                                            'black',
                                                        margin: 0,
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                ) : (
                                    <Empty
                                        style={{ color: PRIMARY_TEXT }}
                                        description="No users are currently requesting this badge."
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                )}
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    marginLeft: 10,
                                    marginRight: 10,
                                    maxHeight: 450,
                                    overflow: 'auto',
                                }}
                            >
                                <>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                color: PRIMARY_TEXT,
                                                fontWeight: 'bolder',
                                                fontSize: 30,
                                            }}
                                        >
                                            Mint Approvals
                                        </Text>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Text
                                            style={{
                                                color: PRIMARY_TEXT,
                                                fontWeight: 'bolder',
                                                fontSize: 14,
                                            }}
                                        >
                                            You have approved these users to
                                            mint this badge.
                                        </Text>
                                    </div>
                                </>
                                <Divider
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'white',
                                        margin: 0,
                                    }}
                                />
                                {mintApprovals.length ? (
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={mintApprovals}
                                        renderItem={(item) => (
                                            <>
                                                <div>
                                                    <List.Item
                                                        actions={[
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        fontSize: 20,
                                                                        padding: 0,
                                                                        marginLeft: 8,
                                                                        marginRight: 8,
                                                                        alignItems:
                                                                            'center',
                                                                    }}
                                                                    size="large"
                                                                    onClick={() => {
                                                                        console.log(
                                                                            item
                                                                        );
                                                                        const data =
                                                                            {
                                                                                approvedAddress:
                                                                                    item.address,
                                                                                badgeId:
                                                                                    badge._id,
                                                                                amount: item.amount,
                                                                            };
                                                                        submitTransaction(
                                                                            data,
                                                                            '/badges/removeMintApproval'
                                                                        );
                                                                    }}
                                                                    className="screen-button"
                                                                >
                                                                    <DeleteOutlined />
                                                                </Avatar>
                                                            </div>,
                                                        ]}
                                                        style={{
                                                            paddingLeft: 8,
                                                        }}
                                                    >
                                                        <List.Item.Meta
                                                            avatar={
                                                                <Avatar
                                                                    style={{
                                                                        backgroundColor:
                                                                            'black',
                                                                    }}
                                                                    src={
                                                                        ETH_LOGO
                                                                    }
                                                                />
                                                            }
                                                            title={
                                                                <div
                                                                    style={{
                                                                        color: PRIMARY_TEXT,
                                                                    }}
                                                                >
                                                                    {
                                                                        item.address
                                                                    }
                                                                </div>
                                                            }
                                                            description={
                                                                <Text
                                                                    style={{
                                                                        color: SECONDARY_TEXT,
                                                                        fontSize: 14,
                                                                    }}
                                                                >
                                                                    You have
                                                                    approved
                                                                    this user to
                                                                    mint{' '}
                                                                    {
                                                                        item.amount
                                                                    }{' '}
                                                                    of this
                                                                    badge.
                                                                </Text>
                                                            }
                                                        />
                                                    </List.Item>
                                                </div>

                                                <div>{item.content}</div>
                                                <Divider
                                                    style={{
                                                        color: 'black',
                                                        backgroundColor:
                                                            'black',
                                                        margin: 0,
                                                    }}
                                                />
                                            </>
                                        )}
                                    />
                                ) : (
                                    <Empty
                                        style={{ color: PRIMARY_TEXT }}
                                        description="No users are currently approved to mint this badge."
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    {allUserActions.length > 0 ? (
                        <List
                            header={
                                <div style={{ textAlign: 'center' }}>
                                    <Text
                                        style={{
                                            color: PRIMARY_TEXT,
                                            fontWeight: 'bolder',
                                            fontSize: 30,
                                        }}
                                    >
                                        Actions
                                    </Text>
                                </div>
                            }
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
