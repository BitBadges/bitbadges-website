import { RecipientFormItem } from './RecipientFormItem';
import { BurnOwnerFormItem } from './BurnOwnerFormItem';
import { Tabs } from './Tabs';
import { Address } from './Address';
import Meta from 'antd/lib/card/Meta';

const {
    Avatar,
    Tooltip,
    Drawer,
    Button,
    Form,
    Select,
    List,
    Skeleton,
    Divider,
    Input,
    Typography,
    Table,
    Menu,
    Empty,
    Card,
} = require('antd');
const { default: Text } = require('antd/lib/typography/Text');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const {
    faSnowflake,
    faUserLock,
} = require('@fortawesome/free-solid-svg-icons');
const { useState } = require('react');
const React = require('react');

const { MAX_DATE_TIMESTAMP } = require('../constants');

const {
    LockOutlined,
    PlusOutlined,
    UndoOutlined,
    SwapOutlined,
    SwapRightOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
    WarningFilled,
    LockFilled,
    UnlockFilled,
    RollbackOutlined,
    RightOutlined,
    DownOutlined,
} = require('@ant-design/icons');
const { useSelector } = require('react-redux');
const { signAndSubmitTxn } = require('../api/api');
const web3 = require('web3');
const { default: Title } = require('antd/lib/typography/Title');
const { Content } = require('antd/lib/layout/layout');

const { Option } = Select;

export function Badge({ badge, size, hidePermissions }) {
    const [modalIsVisible, setModalIsVisible] = useState(false);
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
    const [tab, setTab] = useState('overview');
    const balanceMap = useSelector((state) => state.user.userBalancesMap);

    if (!badge) return <></>;

    if (!size) size = 50;

    let balance =
        balanceMap && balanceMap[badge._id] && balanceMap[badge._id].received
            ? balanceMap[badge._id].received
            : undefined;
    console.log(balance);
    console.log(balanceMap);

    let displayAddress =
        badge.metadata.creator.substr(0, 10) +
        '...' +
        badge.metadata.creator.substr(-4);

    const managerPermissionsData = [];
    const ownerPermissionsData = [];
    const permissionsData = [];

    if (badge.permissions) {
        if (badge.permissions.canOwnerTransfer && balance) {
            ownerPermissionsData.push({
                title: 'Transfer',
                description: 'Transfer this badge.',
                icon: <SwapOutlined />,
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
                                    // labelCol={{ span: 4 }}
                                    // wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <RecipientFormItem
                                        recipients={transferRecipients}
                                        setRecipients={setTransferRecipients}
                                    />
                                    <Form.Item
                                        label={<Text strong>Select Node</Text>}
                                    >
                                        <Select
                                            defaultValue={'default'}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select.Option value="default">
                                                BitBadges Node (default node)
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                width: '100%',
                                            }}
                                            type="primary"
                                            onClick={async () => {
                                                setTxnSubmitted(true);
                                                setTransactionIsLoading(true);

                                                const data = {
                                                    recipients:
                                                        transferRecipients,
                                                    badgeId: badge._id,
                                                };

                                                await signAndSubmitTxn(
                                                    '/badges/transfer',
                                                    data
                                                );

                                                setTransactionIsLoading(false);
                                                //once completed, display links to block explorer, where they can view it, etc
                                            }}
                                            loading={transactionIsLoading}
                                            disabled={
                                                txnSubmitted ||
                                                transferRecipients.length == 0
                                            }
                                        >
                                            Sign and Submit
                                        </Button>
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
                popover: (
                    <>
                        {
                            <a
                                key="list-loadmore-edit"
                                onClick={() =>
                                    setTransferIsVisible(!transferIsVisible)
                                }
                            >
                                {transferIsVisible ? (
                                    <DownOutlined />
                                ) : (
                                    <RightOutlined />
                                )}
                            </a>
                        }
                    </>
                ),
            });
        }
        if (badge.permissions.canMintMore) {
            managerPermissionsData.push({
                title: 'Mint',
                description: 'Mint more of this badge.',
                icon: <PlusOutlined />,
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
                                    // labelCol={{ span: 4 }}
                                    // wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <RecipientFormItem
                                        recipients={recipients}
                                        setRecipients={setRecipients}
                                    />
                                    <Form.Item
                                        label={<Text strong>Select Node</Text>}
                                    >
                                        <Select
                                            defaultValue={'default'}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select.Option value="default">
                                                BitBadges Node (default node)
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                width: '100%',
                                            }}
                                            type="primary"
                                            onClick={async () => {
                                                setTxnSubmitted(true);
                                                setTransactionIsLoading(true);

                                                const data = {
                                                    recipients,
                                                    badgeId: badge._id,
                                                };

                                                await signAndSubmitTxn(
                                                    '/badges/mint',
                                                    data
                                                );

                                                setTransactionIsLoading(false);
                                                //once completed, display links to block explorer, where they can view it, etc
                                            }}
                                            loading={transactionIsLoading}
                                            disabled={
                                                txnSubmitted ||
                                                recipients.length == 0
                                            }
                                        >
                                            Sign and Submit
                                        </Button>
                                    </Form.Item>
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setMintMoreIsVisible(!mintMoreIsVisible);
                },
                popover: (
                    <>
                        {
                            <a
                                key="list-loadmore-edit"
                                onClick={() =>
                                    setMintMoreIsVisible(!mintMoreIsVisible)
                                }
                            >
                                {mintMoreIsVisible ? (
                                    <DownOutlined />
                                ) : (
                                    <RightOutlined />
                                )}
                            </a>
                        }
                    </>
                ),
            });

            managerPermissionsData.push({
                title: 'Lock Supply',
                icon: <LockOutlined />,
                description: 'Disable minting privileges permanently.',
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
                                        <Text>
                                            *Warning: This action is permanent.
                                            Once you lock the supply of this
                                            badge, you will never be able to
                                            mint any more.
                                        </Text>
                                    </Form.Item>
                                    <Form.Item
                                        label={<Text strong>Select Node</Text>}
                                    >
                                        <Select
                                            defaultValue={'default'}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select.Option value="default">
                                                BitBadges Node (default node)
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                width: '100%',
                                            }}
                                            type="primary"
                                            onClick={async () => {
                                                setTxnSubmitted(true);
                                                setTransactionIsLoading(true);

                                                const data = {
                                                    badgeId: badge._id,
                                                };

                                                await signAndSubmitTxn(
                                                    '/badges/lockSupply',
                                                    data
                                                );

                                                setTransactionIsLoading(false);
                                                //once completed, display links to block explorer, where they can view it, etc
                                            }}
                                            loading={transactionIsLoading}
                                            disabled={txnSubmitted}
                                        >
                                            Sign and Submit
                                        </Button>
                                    </Form.Item>
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setLockSupplyIsVisible(!lockSupplyIsVisible);
                },
                popover: (
                    <>
                        {
                            <a
                                key="list-loadmore-edit"
                                onClick={() =>
                                    setLockSupplyIsVisible(!lockSupplyIsVisible)
                                }
                            >
                                {lockSupplyIsVisible ? (
                                    <DownOutlined />
                                ) : (
                                    <RightOutlined />
                                )}
                            </a>
                        }
                    </>
                ),
            });
        }
        if (badge.permissions.canRevoke) {
            managerPermissionsData.push({
                title: 'Revoke',
                description: 'Revoke a badge from an existing owner.',
                icon: <UndoOutlined />,
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
                                    // labelCol={{ span: 4 }}
                                    // wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    style={{ width: '50vw' }}
                                >
                                    <BurnOwnerFormItem
                                        owners={owners}
                                        setOwners={setOwners}
                                    />
                                    <Form.Item
                                        label={<Text strong>Select Node</Text>}
                                    >
                                        <Select
                                            defaultValue={'default'}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select.Option value="default">
                                                BitBadges Node (default node)
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                width: '100%',
                                            }}
                                            type="primary"
                                            onClick={async () => {
                                                setTxnSubmitted(true);
                                                setTransactionIsLoading(true);

                                                const data = {
                                                    owners,
                                                    badgeId: badge._id,
                                                };

                                                await signAndSubmitTxn(
                                                    '/badges/burn',
                                                    data
                                                );

                                                setTransactionIsLoading(false);
                                                //once completed, display links to block explorer, where they can view it, etc
                                            }}
                                            loading={transactionIsLoading}
                                            disabled={
                                                txnSubmitted ||
                                                owners.length == 0
                                            }
                                        >
                                            Sign and Submit
                                        </Button>
                                    </Form.Item>
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setRevokeIsVisible(!revokeIsVisible);
                },
                popover: (
                    <>
                        {
                            <a
                                key="list-loadmore-edit"
                                onClick={() =>
                                    setRevokeIsVisible(!revokeIsVisible)
                                }
                            >
                                {revokeIsVisible ? (
                                    <DownOutlined />
                                ) : (
                                    <RightOutlined />
                                )}
                            </a>
                        }
                    </>
                ),
            });
            managerPermissionsData.push({
                title: 'Lock Revoke Permissions',
                description: 'Disable revoking privileges permanently.',
                icon: <LockOutlined />,
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
                                        <Text>
                                            *Warning: This action is permanent.
                                            Once you lock your revoke
                                            permission, you will never be able
                                            to revoke again.
                                        </Text>
                                    </Form.Item>
                                    <Form.Item
                                        label={<Text strong>Select Node</Text>}
                                    >
                                        <Select
                                            defaultValue={'default'}
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select.Option value="default">
                                                BitBadges Node (default node)
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                width: '100%',
                                            }}
                                            type="primary"
                                            onClick={async () => {
                                                setTxnSubmitted(true);
                                                setTransactionIsLoading(true);

                                                const data = {
                                                    badgeId: badge._id,
                                                };

                                                await signAndSubmitTxn(
                                                    '/badges/lockRevoke',
                                                    data
                                                );

                                                setTransactionIsLoading(false);
                                                //once completed, display links to block explorer, where they can view it, etc
                                            }}
                                            loading={transactionIsLoading}
                                            disabled={txnSubmitted}
                                        >
                                            Sign and Submit
                                        </Button>
                                    </Form.Item>
                                    <Divider />
                                </Form>
                            </div>
                        )}
                    </>
                ),
                showModal: () => {
                    setLockRevokeIsVisible(!lockRevokeIsVisible);
                },
                popover: (
                    <>
                        {
                            <a
                                key="list-loadmore-edit"
                                onClick={() =>
                                    setLockRevokeIsVisible(!lockRevokeIsVisible)
                                }
                            >
                                {lockRevokeIsVisible ? (
                                    <DownOutlined />
                                ) : (
                                    <RightOutlined />
                                )}
                            </a>
                        }
                    </>
                ),
            });
        }

        managerPermissionsData.push({
            title: 'Transfer Manager Role',
            description: 'Transfer manager privileges to new address.',
            icon: <SwapRightOutlined />,
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
                            <Form
                                // labelCol={{ span: 4 }}
                                // wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                style={{ width: '50vw' }}
                            >
                                <Form.Item
                                    label={<Text strong>New Manager</Text>}
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
                                    <Text>
                                        *Warning: This action is permanent. Once
                                        you transfer the manager role to this
                                        new address, you will lose privileges on
                                        this address.
                                    </Text>
                                </Form.Item>
                                <Form.Item
                                    label={<Text strong>Select Node</Text>}
                                >
                                    <Select
                                        defaultValue={'default'}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Select.Option value="default">
                                            BitBadges Node (default node)
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        style={{
                                            width: '100%',
                                        }}
                                        type="primary"
                                        onClick={async () => {
                                            setTxnSubmitted(true);
                                            setTransactionIsLoading(true);

                                            const data = {
                                                badgeId: badge._id,
                                                newManager: `${newManagerChain}:${newManagerAddress}`,
                                            };

                                            await signAndSubmitTxn(
                                                '/badges/transferManager',
                                                data
                                            );

                                            setTransactionIsLoading(false);
                                            //once completed, display links to block explorer, where they can view it, etc
                                        }}
                                        loading={transactionIsLoading}
                                        disabled={
                                            txnSubmitted ||
                                            !web3.utils.isAddress(
                                                newManagerAddress
                                            )
                                        }
                                    >
                                        Sign and Submit
                                    </Button>
                                </Form.Item>
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
            popover: (
                <>
                    {
                        <a
                            key="list-loadmore-edit"
                            onClick={() =>
                                setTransferManagerIsVisible(
                                    !transferManagerIsVisible
                                )
                            }
                        >
                            {transferManagerIsVisible ? (
                                <DownOutlined />
                            ) : (
                                <RightOutlined />
                            )}
                        </a>
                    }
                </>
            ),
        });

        permissionsData.push(...ownerPermissionsData);
        if (address == badge.manager.split(':')[1]) {
            permissionsData.push(...managerPermissionsData);
        }
    }

    return (
        <>
            <Card
                style={{
                    width: 230,
                    margin: 8,
                }}
                onClick={() => setModalIsVisible(true)}
                hoverable
                cover={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <Tooltip
                            placement="bottom"
                            title={`${badge.metadata.name}${
                                balance ? ' (x' + balance + ')' : ''
                            }`}
                        >
                            {badge.metadata.image ? (
                                <Avatar
                                    style={{
                                        verticalAlign: 'middle',
                                        border: '3px solid',
                                        borderColor: badge.metadata.color,
                                        margin: '1rem',
                                        cursor: 'pointer',
                                    }}
                                    className="badge-avatar"
                                    src={badge.metadata.image}
                                    size={size}
                                    onError={(e) => {
                                        return false;
                                    }}
                                />
                            ) : (
                                <Avatar
                                    style={{
                                        backgroundColor: badge.metadata.color,
                                        verticalAlign: 'middle',
                                        border: '3px solid black',
                                        margin: '1rem',
                                        cursor: 'pointer',
                                    }}
                                    size={size}
                                    className="badge-avatar"
                                    onClick={() => setModalIsVisible(true)}
                                ></Avatar>
                            )}
                        </Tooltip>
                    </div>
                }
            >
                <Meta
                    title={badge.metadata.name}
                    description={
                        <>
                            <div style={{ fontSize: 20 }}>
                                {badge.supply} Owned
                            </div>
                            <br />
                            <div>Creator </div>
                            <Address
                                address={badge.metadata.creator.split(':')[1]}
                                fontColor="black"
                                fontSize={15}
                                showTooltip
                            />
                            <br />
                            <div>Manager </div>
                            <Address
                                address={badge.metadata.creator.split(':')[1]}
                                fontColor="black"
                                fontSize={15}
                                showTooltip
                            />
                        </>
                    }
                />
            </Card>

            <Drawer
                size="large"
                headerStyle={{ padding: '0px 12px' }}
                title={
                    <Tabs
                        tabInfo={[
                            { key: 'overview', title: 'Overview' },
                            { key: 'actions', title: 'Actions' },
                            { key: 'activity', title: 'Activity' },
                        ]}
                        setTab={setTab}
                        widthPerTab={undefined}
                        theme="light"
                    />
                }
                placement={'bottom'}
                visible={modalIsVisible}
                key={'bottom'}
                onClose={() => setModalIsVisible(false)}
                bodyStyle={{ paddingTop: 8, fontSize: 20 }}
            >
                {tab == 'overview' && (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {badge.metadata.image ? (
                                <Avatar
                                    style={{
                                        verticalAlign: 'middle',
                                        border: '3px solid',
                                        borderColor: badge.metadata.color,
                                        margin: 4,
                                    }}
                                    src={badge.metadata.image}
                                    size={200}
                                />
                            ) : (
                                <Avatar
                                    style={{
                                        backgroundColor: badge.metadata.color,
                                        verticalAlign: 'middle',
                                        border: '3px solid black',
                                        margin: 4,
                                    }}
                                    size={200}
                                ></Avatar>
                            )}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text strong style={{ fontSize: 30 }}>
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
                                        badge.metadata.validFrom.end !=
                                        MAX_DATE_TIMESTAMP
                                            ? 'Until ' +
                                              new Date(
                                                  badge.metadata.validFrom.end
                                              ).toLocaleDateString()
                                            : 'Forever'
                                    }`}
                                >
                                    {Date.now() <=
                                    badge.metadata.validFrom.end ? (
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
                                        <UnlockFilled
                                            style={{ fontSize: 30 }}
                                        />
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
                                        <SwapOutlined
                                            style={{ fontSize: 30 }}
                                        />
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
                                        <RollbackOutlined
                                            style={{ fontSize: 30 }}
                                        />
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
                                        fontColor="black"
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
                                        address={
                                            badge.metadata.creator.split(':')[1]
                                        }
                                        fontColor="black"
                                        fontSize={18}
                                        showTooltip
                                    />
                                </div>
                            </div>
                        </div>
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
                                    <b>
                                        You own {balance ? balance : 0} out of a
                                        total supply of {badge.supply}
                                    </b>
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
                                    }}
                                >
                                    {badge.metadata.description}
                                    <br />
                                </div>
                            </>
                        )}
                        {/* {balance != undefined && (
                    <>  
                        <b>Amount: </b>
                        {balance}
                        <br />
                    </>
                )} */}
                        {/* <b>Expires: </b>
                {badge.metadata.validFrom.end != MAX_DATE_TIMESTAMP
                    ? new Date(
                          badge.metadata.validFrom.end
                      ).toLocaleDateString()
                    : 'Never'}
                <br /> */}
                        {/* {badge.metadata.type != undefined && (
                    <>
                        <b>Type: </b>
                        {badge.metadata.type == 0
                            ? 'Public Badge'
                            : 'Update his when more types are added'}
                        <br />
                    </>
                )} */}
                        {/* {badge.metadata.category && (
                    <>
                        <b>Category: </b>
                        {badge.metadata.category}
                        <br />
                    </>
                )} */}
                        {/* {badge.metadata.url && <></>} */}
                        {/* <b>Editable:</b> No
                <br />
                {!hidePermissions && (
                    <>
                        <b>Revocable:</b>{' '}
                        {badge.permissions.canRevoke
                            ? 'Yes, owner can revoke.'
                            : 'No, this badge is permanently in your account.'}
                        <br />
                        <b>Mintable:</b>{' '}
                        {badge.permissions.canMintMore
                            ? 'Yes, owner can still mint more.'
                            : 'No, this badge has a locked supply forever.'}
                        <br />
                        <b>Transferable:</b>{' '}
                        {badge.permissions.canOwnerTransfer
                            ? 'Yes, this badge can be transferred.'
                            : 'No, this badge cannot be transferred.'}
                        <br />
                    </>
                )} */}
                    </>
                )}
                {tab == 'actions' && (
                    <>
                        <div
                            style={{
                                width: '100%',
                                fontSize: 20,
                            }}
                        >
                            {!hidePermissions && (
                                <>
                                    {permissionsData.length > 0 ? (
                                        <>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={permissionsData}
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
                                                                    <a key="list-loadmore-edit">
                                                                        {
                                                                            item.popover
                                                                        }
                                                                    </a>,
                                                                ]}
                                                                style={{
                                                                    paddingLeft: 8,
                                                                }}
                                                            >
                                                                <Skeleton
                                                                    avatar
                                                                    title={
                                                                        false
                                                                    }
                                                                    loading={
                                                                        item.loading
                                                                    }
                                                                    active
                                                                >
                                                                    <List.Item.Meta
                                                                        avatar={
                                                                            <Avatar
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'black',
                                                                                }}
                                                                                icon={
                                                                                    item.icon
                                                                                }
                                                                            />
                                                                        }
                                                                        title={
                                                                            item.title
                                                                        }
                                                                        description={
                                                                            item.description
                                                                        }
                                                                    />
                                                                </Skeleton>
                                                            </List.Item>
                                                        </div>
                                                        <div>
                                                            {' '}
                                                            {item.content}
                                                        </div>
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
                                        </>
                                    ) : (
                                        <Empty
                                            description="There are no actions you can take. To perform an action, you must either own this badge or be the badge manager."
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                    )}
                                </>
                            )}
                            {hidePermissions && (
                                <Empty
                                    description="This is just a badge preview, so there are no action you can take."
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                            )}
                        </div>
                    </>
                )}
                {tab == 'activity' && (
                    <Empty
                        description="No Activity"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
            </Drawer>
        </>
    );
}
