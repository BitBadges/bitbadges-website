import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Badge } from './Badge';

const {
    Typography,
    Form,
    Button,
    Row,
    Col,
    Statistic,
} = require('antd');

const React = require('react');
const { useState } = require('react');
const { signAndSubmitTxn } = require('../api/api');

const { useSelector } = require('react-redux');

export function TransactionDetails({
    setCurrStepNumber,
    badge,
    recipients,
    permissions,
}) {
    const [stepNum, setStepNum] = useState(1);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);
    const address = useSelector((state) => state.user.address);
    const navigate = useNavigate();

    const incrementStep = () => {
        if (stepNum === 1) {
            // setCurrStepNumber(4);
        } else {
            setStepNum(stepNum + 1);
        }
    };

    const decrementStep = () => {
        if (stepNum === 1) {
            setCurrStepNumber(2);
        } else {
            setStepNum(stepNum - 1);
        }
    };

    return (
        <div>
            <Form.Provider>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        // className="link-button"
                        style={{
                            // position: 'absolute',
                            // left: 5,
                            backgroundColor: 'inherit',
                            color: '#ddd',
                            fontSize: 17,
                        }}
                        onClick={() => decrementStep()}
                        className="opacity link-button"
                        disabled={txnSubmitted && !transactionIsLoading}
                    >
                        <CaretLeftFilled size={40} />
                        Back
                    </button>
                    <Typography.Text
                        strong
                        style={{
                            color: 'white',
                            fontSize: 20,
                            marginLeft: 50,
                            marginRight: 50,
                        }}
                        align="center"
                    >
                        {stepNum} / 1
                    </Typography.Text>

                    <button
                        // className="link-button"
                        style={{
                            // position: 'absolute',
                            // left: 5,
                            backgroundColor: 'inherit',
                            color: '#ddd',
                            fontSize: 17,
                        }}
                        onClick={() => incrementStep()}
                        className="opacity link-button"
                    >
                        Next
                        <CaretRightFilled size={40} />
                    </button>
                </div>
                <div style={{ paddingLeft: 5 }}>
                    <div
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <Typography.Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                marginBottom: 10,
                            }}
                            strong
                        >
                            Transaction Details
                        </Typography.Text>
                    </div>
                    <span
                        style={{
                            verticalAlign: 'middle',
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                    >
                        <Row gutter={16}>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 15,
                                }}
                            >
                                <Statistic
                                    title={
                                        <div style={{ color: 'white' }}>
                                            Metadata Size
                                        </div>
                                    }
                                    valueStyle={{
                                        color: 'lightgrey',
                                    }}
                                    value={
                                        badge
                                            ? JSON.stringify(badge).length /
                                              1000
                                            : 0
                                    } //TODO: get actual bytes, not just string length
                                    suffix={'KB'}
                                    precision={3}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                />
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 15,
                                }}
                            >
                                <Statistic
                                    title={
                                        <div style={{ color: 'white' }}>
                                            Cost per KB
                                        </div>
                                    }
                                    valueStyle={{
                                        color: 'lightgrey',
                                    }}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    value={'N/A'}
                                />
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Statistic
                                    title={
                                        <div style={{ color: 'white' }}>
                                            Gas Fee
                                        </div>
                                    }
                                    valueStyle={{
                                        color: 'lightgrey',
                                    }}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    value={'N/A'}
                                />
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Statistic
                                    title={
                                        <div style={{ color: 'white' }}>
                                            Total Fee
                                        </div>
                                    }
                                    valueStyle={{
                                        color: 'lightgrey',
                                    }}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                    value={'N/A'}
                                />
                            </Col>
                        </Row>
                    </span>
                </div>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }}
                >
                    <Button
                        type="primary"
                        style={{ width: '90%' }}
                        onClick={async () => {
                            setTxnSubmitted(true);
                            setTransactionIsLoading(true);

                            try {
                                const data = {
                                    metadata: {
                                        ...badge,
                                    },
                                    recipients,
                                    permissions,
                                };

                                console.log(data);

                                await signAndSubmitTxn('/badges/create', data);

                                window.localStorage.setItem(
                                    'savedBadgeData',
                                    '{}'
                                );
                                setTransactionIsLoading(false);
                            } catch (err) {
                                setTxnSubmitted(false);
                                setTransactionIsLoading(false);
                            }
                        }}
                        loading={transactionIsLoading}
                        disabled={txnSubmitted}
                    >
                        Create Badge!
                    </Button>
                </div>
                <div>
                    {txnSubmitted && !transactionIsLoading && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                        marginTop: 25,
                                    }}
                                    strong
                                >
                                    Badge Successfully Created!
                                </Typography.Text>
                            </div>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'lightgrey',
                                        fontSize: 15,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    You can view it in{' '}
                                    <button
                                        className="link-button-nav"
                                        style={{ color: '#0000EE' }}
                                        onClick={() => navigate('/account')}
                                    >
                                        your portfolio
                                    </button>{' '}
                                    or via the preview below!
                                </Typography.Text>
                            </div>

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
                        </>
                    )}
                </div>
            </Form.Provider>
        </div>
    );
}
