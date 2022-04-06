import { Badge } from './Badge';
import { BadgeDataForm } from './BadgeDataForm';
import { PermissionsForm } from './PermissionsForm';

const {
    Timeline,
    Typography,
    Button,
    Select,
    Row,
    Col,
    Statistic,
    Form,
} = require('antd');

const React = require('react');
const {
    ClockCircleOutlined,
    CheckCircleOutlined,
} = require('@ant-design/icons');
const { useState } = require('react');

const { Text } = Typography;
const { useSelector } = require('react-redux');
const { signAndSubmitTxn } = require('../api/api');

export function MintTimeline() {
    const [currStepNumber, setCurrStepNumber] = useState(0);
    const [badge, setBadge] = useState();
    const [permissions, setPermissions] = useState();
    const [recipients, setRecipients] = useState([]);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);
    const address = useSelector((state) => state.user.address);

    const steps = [
        {
            idx: 0,
            title: (
                <Text>
                    Confirm Wallet to Issue From (
                    {address?.substr(0, 5) + '...' + address?.substr(-4)})
                </Text>
            ),
            content: (
                <div>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        onClick={async () => {
                            setCurrStepNumber(1);
                        }}
                        disabled={!address}
                    >
                        {address ? (
                            <>
                                {'Use ETH: ' +
                                    address?.substr(0, 5) +
                                    '...' +
                                    address?.substr(-4)}
                            </>
                        ) : (
                            'Please connect wallet.'
                        )}
                    </Button>
                    <Typography>
                        *To use a different wallet, please connect to the site
                        with that wallet.
                    </Typography>
                </div>
            ),
        },
        {
            idx: 1,
            title: <Text>Set Badge Metadata</Text>,
            content: (
                <BadgeDataForm
                    setPermissions={(permissions) => {
                        setPermissions(permissions);
                    }}
                    setCurrStepNumber={setCurrStepNumber}
                    setBadge={(badge) => {
                        setBadge(badge);
                    }}
                    setRecipients={(recipients) => {
                        setRecipients(recipients);
                    }}
                />
            ),
        },
        {
            idx: 2,
            title: <Text>Set Badge Permissions</Text>,
            content: (
                <PermissionsForm
                    setPermissions={(permissions) => {
                        setPermissions(permissions);
                    }}
                    setCurrStepNumber={setCurrStepNumber}
                    recipients={recipients}
                />
            ),
        },
        {
            idx: 3,
            title: <Text>Confirm Transaction Data</Text>,
            content: (
                <div style={{ paddingLeft: 5 }}>
                    <span
                        style={{
                            verticalAlign: 'middle',
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Metadata Size"
                                    value={
                                        badge
                                            ? JSON.stringify(badge).length /
                                              1000
                                            : 0
                                    } //TODO: get actual bytes, not just string length
                                    suffix={'KB'}
                                    precision={3}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Cost per KB" value={'N/A'} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Gas Fee" value={'N/A'} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Total Fee" value={'N/A'} />
                            </Col>
                        </Row>
                    </span>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            type="primary"
                            style={{ width: '48%' }}
                            onClick={async () => {
                                setCurrStepNumber(4);
                            }}
                        >
                            Confirm
                        </Button>
                        <Button
                            style={{ width: '48%' }}
                            onClick={async () => {
                                setCurrStepNumber(2);
                            }}
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            idx: 4,
            title: <Text>Sign and Submit Transaction</Text>,
            content: (
                <div>
                    <div>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                        >
                            <Form.Item

                            // label={<Text strong>Node Select</Text>}
                            // required
                            >
                                <Select
                                    defaultValue={'default'}
                                    style={{ width: '100%' }}
                                    disabled={txnSubmitted}
                                >
                                    <Select.Option value="default">
                                        BitBadges Node (default node)
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                type="primary"
                                style={{ width: '48%' }}
                                onClick={async () => {
                                    setTxnSubmitted(true);
                                    setTransactionIsLoading(true);

                                    const data = {
                                        metadata: {
                                            ...badge,
                                        },
                                        recipients,
                                        permissions,
                                    };

                                    await signAndSubmitTxn(
                                        '/badges/create',
                                        data
                                    );

                                    //once completed, display links to block explorer, where they can view it, etc
                                    window.localStorage.setItem(
                                        'savedBadgeData',
                                        '{}'
                                    );

                                    setTransactionIsLoading(false);
                                }}
                                loading={transactionIsLoading}
                                disabled={txnSubmitted}
                            >
                                Submit Transaction
                            </Button>
                            <Button
                                style={{ width: '48%' }}
                                onClick={async () => {
                                    setCurrStepNumber(3);
                                }}
                                disabled={txnSubmitted}
                            >
                                Go Back
                            </Button>
                        </div>
                    </div>
                    {txnSubmitted && !transactionIsLoading && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 12,
                            }}
                        >
                            <Badge
                                size={150}
                                badge={{
                                    metadata: {
                                        ...badge,
                                    },
                                    permissions,
                                    manager: 'ETH:' + address,
                                }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Timeline>
            {steps.map((step) => {
                return (
                    <Timeline.Item
                        key={step.idx}
                        color={step.idx < currStepNumber ? 'green' : 'blue'}
                        dot={
                            step.idx >= currStepNumber ? (
                                <ClockCircleOutlined
                                    style={{ fontSize: '20px' }}
                                />
                            ) : (
                                <CheckCircleOutlined
                                    style={{ fontSize: '20px' }}
                                />
                            )
                        }
                        style={{
                            textAlign: 'left',
                        }}
                    >
                        <span
                            style={{
                                verticalAlign: 'middle',
                                paddingLeft: 5,
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                        >
                            {step.title}
                        </span>
                        <span
                            style={{
                                verticalAlign: 'middle',
                                paddingLeft: 5,
                                fontSize: 12,
                            }}
                        >
                            {step.idx === currStepNumber && step.content}
                        </span>
                    </Timeline.Item>
                );
            })}
        </Timeline>
    );
}
