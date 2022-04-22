import { useNavigate } from 'react-router-dom';
import { Badge } from './Badge';
import { Typography, Form, Button, Row, Col, Statistic } from 'antd';
import React from 'react';
import { useState } from 'react';
import { signAndSubmitTxn } from '../api/api';
import { useSelector } from 'react-redux';
import { LINK_COLOR, PRIMARY_TEXT, SECONDARY_TEXT } from '../constants';
import { FormNavigationHeader } from './FormNavigationHeader';

const FINAL_STEP_NUM = 1;
const FIRST_STEP_NUM = 1;
const CURR_TIMELINE_STEP_NUM = 3;

export function TransactionDetails({
    setTimelineStepNumber,
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
        if (stepNum === FINAL_STEP_NUM) {
            // setTimelineStepNumber(CURR_TIMELINE_STEP_NUM + 1);
        } else {
            setStepNum(stepNum + 1);
        }
    };

    const decrementStep = () => {
        if (stepNum === FIRST_STEP_NUM) {
            setTimelineStepNumber(CURR_TIMELINE_STEP_NUM - 1);
        } else {
            setStepNum(stepNum - 1);
        }
    };

    const getStatisticElem = (title, value, suffix, precision) => {
        return (
            <Statistic
                title={<div style={{ color: PRIMARY_TEXT }}>{title}</div>}
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

    return (
        <div>
            <Form.Provider>
                <FormNavigationHeader
                    incrementStep={incrementStep}
                    decrementStep={decrementStep}
                    stepNum={stepNum}
                    backButtonDisabled={txnSubmitted && !transactionIsLoading}
                    finalStepNumber={1}
                />
                <div style={{ paddingLeft: 5 }}>
                    <div
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                    >
                        <Typography.Text
                            style={{
                                color: PRIMARY_TEXT,
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
                                {getStatisticElem(
                                    'Metadata Size',
                                    badge
                                        ? JSON.stringify(badge).length / 1000
                                        : 0,
                                    'KB',
                                    3
                                )}
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: 15,
                                }}
                            >
                                {getStatisticElem('Cost per KB', 'N/A')}
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {getStatisticElem('Gas Fee', 'N/A')}
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {getStatisticElem('Total Fee', 'N/A')}
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
                                        color: PRIMARY_TEXT,
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
                                        color: SECONDARY_TEXT,
                                        fontSize: 15,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    You can view it in{' '}
                                    <button
                                        className="link-button-nav"
                                        style={{ color: LINK_COLOR }}
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
