import { RecipientFormItem } from './RecipientFormItem';
import {
    Avatar,
    Button,
    Form,
    List,
    Skeleton,
    Divider,
    Empty,
    Typography,
    Statistic,
    Row,
    Col,
    InputNumber,
    Input,
    Select,
} from 'antd';
import { useState } from 'react';
import React from 'react';
import {
    PlusOutlined,
    SwapOutlined,
    RightOutlined,
    DownOutlined,
    LockOutlined,
    MinusOutlined,
    SendOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { signAndSubmitTxn } from '../api/api';
import { ETH_LOGO, PRIMARY_TEXT, SECONDARY_TEXT } from '../constants';
import { RecipientList } from './RecipientList';

const { Text } = Typography;
const { Option } = Select;

export function BadgeModalUserActions({
    conceptBadge,
    badge,
    hidePermissions,
}) {
    const [recipients, setRecipients] = useState([]);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);
    const [mintMoreIsVisible, setMintMoreIsVisible] = useState(false);
    const [amountToAdd, setAmountToAdd] = useState(0);
    const [amountToRemove, setAmountToRemove] = useState(0);

    const [addToRequestedIsVisible, setAddToRequestedIsVisible] =
        useState(false);
    const [removeFromRequestedIsVisible, setRemoveFromRequestedIsVisible] =
        useState(false);

    const [transferIsVisible, setTransferIsVisible] = useState(false);
    const [transferRecipients, setTransferRecipients] = useState([]);

    const [approveIsVisible, setApproveIsVisible] = useState(false);
    const [approveeChain, setApproveeChain] = useState('ETH');
    const [approveeAddress, setApproveeAddress] = useState('');
    const [approveeAmount, setApproveeAmount] = useState(0);

    const address = useSelector((state) => state.user.address);
    const chain = useSelector((state) => state.user.chain);
    const balanceMap = useSelector((state) => state.user.userBalancesMap);
    // const navigate = useNavigate();

    if (!badge) return <></>;

    let balance =
        balanceMap && balanceMap[badge._id] && balanceMap[badge._id].received
            ? balanceMap[badge._id].received
            : undefined;

    console.log('APPPROOOVE', balanceMap[badge._id]);
    let approvals =
        balanceMap && balanceMap[badge._id] && balanceMap[badge._id].approvals
            ? balanceMap[badge._id].approvals
            : [];

    let approvedAmountToMint = 0;

    if (badge.mintApprovals && badge.mintApprovals[`${chain}:${address}`]) {
        approvedAmountToMint = badge.mintApprovals[`${chain}:${address}`];
    }

    console.log(
        'BALANCE MAP',
        badge.mintApprovals,
        approvedAmountToMint,
        `${chain}:${address}`
    );

    let requestedAmount = 0;
    if (badge.mintRequests && badge.mintRequests[`${chain}:${address}`]) {
        requestedAmount = badge.mintRequests[`${chain}:${address}`];
    }

    const getStatisticElem = (title, value, suffix, precision) => {
        return (
            <Statistic
                title={
                    <div style={{ color: PRIMARY_TEXT, fontSize: 18 }}>
                        {title}
                    </div>
                }
                valueStyle={{
                    color: SECONDARY_TEXT,
                }}
                value={value}
                suffix={suffix}
                precision={precision}
                style={{
                    textAlign: 'center',
                }}
            />
        );
    };

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

    // const managerActions = [];
    const ownerActions = [];
    const allUserActions = [];
    const requestActions = [];

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
                                    <Form.Item>
                                        <Text style={{ color: PRIMARY_TEXT }}>
                                            *Warning: If you have any approvals,
                                            these will not automatically be
                                            removed when you transfer. Please
                                            cancel them before you transfer.
                                        </Text>
                                    </Form.Item>
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
            ownerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Request More</div>,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Increase your requested mint amount.
                    </div>
                ),
                icon: <PlusOutlined />,
                visible: addToRequestedIsVisible,
                content: (
                    <>
                        {addToRequestedIsVisible && (
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
                                                Amount to Increase
                                            </Text>
                                        }
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            value={amountToAdd}
                                            onChange={(e) => setAmountToAdd(e)}
                                        />
                                    </Form.Item>
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            amount: amountToAdd,
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(
                                            data,
                                            '/badges/addMintRequest'
                                        );
                                    }, txnSubmitted)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setAddToRequestedIsVisible(!addToRequestedIsVisible);
                },
                popover: getPopover(
                    addToRequestedIsVisible,
                    setAddToRequestedIsVisible
                ),
            });

            ownerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Request Less</div>,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Decrease your requested mint amount.
                    </div>
                ),
                icon: <MinusOutlined />,
                visible: removeFromRequestedIsVisible,
                content: (
                    <>
                        {removeFromRequestedIsVisible && (
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
                                                Amount to Decrease
                                            </Text>
                                        }
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            value={amountToRemove}
                                            onChange={(e) =>
                                                setAmountToRemove(e)
                                            }
                                        />
                                    </Form.Item>
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            amount: amountToRemove,
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(
                                            data,
                                            '/badges/removeMintRequest'
                                        );
                                    }, txnSubmitted)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setRemoveFromRequestedIsVisible(
                        !removeFromRequestedIsVisible
                    );
                },
                popover: getPopover(
                    removeFromRequestedIsVisible,
                    setRemoveFromRequestedIsVisible
                ),
            });
        }

        if (badge.permissions.canMintMore && approvedAmountToMint > 0) {
            ownerActions.push({
                title: <div style={{ color: PRIMARY_TEXT }}>Mint</div>,
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Mint your approved amount of this badge
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
                                    {getSignAndSubmitButton(async () => {
                                        const data = {
                                            amount: approvedAmountToMint,
                                            badgeId: badge._id,
                                        };
                                        submitTransaction(
                                            data,
                                            '/badges/mintFromMintApproval'
                                        );
                                    }, txnSubmitted || approvedAmountToMint === 0)}
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
        }

        if (badge.permissions.canOwnerTransfer) {
            ownerActions.push({
                title: (
                    <div style={{ color: PRIMARY_TEXT }}>Approve Transfer</div>
                ),
                description: (
                    <div style={{ color: SECONDARY_TEXT }}>
                        Approve someone else to transfer this badge on your
                        behalf.
                    </div>
                ),
                icon: <SendOutlined />,
                visible: approveIsVisible,
                content: (
                    <>
                        {approveIsVisible && (
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
                                            approvedAddress: `${approveeChain}:${approveeAddress}`,
                                            badgeId: badge._id,
                                            amount: approveeAmount,
                                        };

                                        submitTransaction(
                                            data,
                                            '/badges/approve'
                                        );
                                    }, txnSubmitted)}
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setApproveIsVisible(!approveIsVisible);
                },
                popover: getPopover(approveIsVisible, setApproveIsVisible),
            });
        }

        allUserActions.push(...ownerActions);
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
                                        Want This Badge?
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
                            {badge.permissions.canMintMore ? (
                                <Row align="center">
                                    <Col
                                        span={8}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginBottom: 15,
                                        }}
                                    >
                                        {getStatisticElem(
                                            'Requested',
                                            requestedAmount
                                        )}
                                    </Col>
                                    <Col
                                        span={8}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginBottom: 15,
                                        }}
                                    >
                                        {getStatisticElem(
                                            'Approved To Mint',
                                            approvedAmountToMint
                                        )}
                                    </Col>
                                </Row>
                            ) : (
                                <LockOutlined />
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
                                        Owned
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
                            <Row align="center">
                                <Col
                                    span={8}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: 15,
                                    }}
                                >
                                    {getStatisticElem(
                                        'You Currently Own',
                                        balance
                                    )}
                                </Col>
                            </Row>
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
                                        Approvals
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
                            {approvals.length ? (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={approvals}
                                    renderItem={(item) => (
                                        <>
                                            <div>
                                                <List.Item
                                                    actions={[
                                                        <div
                                                            style={{
                                                                display: 'flex',
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
                                                                    const data =
                                                                        {
                                                                            approvalId:
                                                                                item.id,
                                                                        };
                                                                    submitTransaction(
                                                                        data,
                                                                        '/badges/removeApprovalById'
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
                                                                src={ETH_LOGO}
                                                            />
                                                        }
                                                        title={item.address}
                                                        description={
                                                            <Text
                                                                style={{
                                                                    color: SECONDARY_TEXT,
                                                                    fontSize: 14,
                                                                }}
                                                            >
                                                                You have
                                                                approved{' '}
                                                                {
                                                                    item.approvedAddress
                                                                }{' '}
                                                                to transfer{' '}
                                                                {item.amount} of
                                                                this badge on
                                                                your behalf.
                                                            </Text>
                                                        }
                                                    />
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
                                    description="No users are currently approved to transfer this badge on your behalf."
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            )}
                        </div>
                    </div>
                    <>
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
                    </>
                    <Divider
                        style={{
                            color: 'white',
                            backgroundColor: 'white',
                            margin: 0,
                        }}
                    />
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
