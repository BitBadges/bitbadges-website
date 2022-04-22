import { BadgeDataForm } from '../components/BadgeDataForm';
import { PermissionsForm } from '../components/PermissionsForm';
import { Badge } from '../components/Badge';
import { signAndSubmitPrivateApiTxn } from '../api/api';
import React from 'react';
import { Button, Form, Typography } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormNavigationHeader } from './FormNavigationHeader';

export function ConceptBadgeForm({ setConceptFormVisible }) {
    const [badge, setBadge] = useState();
    const [currStepNumber, setCurrStepNumber] = useState(0);
    const [permissions, setPermissions] = useState();
    const [supply, setSupply] = useState(0);
    const [transactionIsLoading, setTransactionIsLoading] = useState(false);
    const [txnSubmitted, setTxnSubmitted] = useState(false);

    const address = useSelector((state) => state.user.address);

    return (
        <div
            style={{
                marginLeft: '10vw',
                marginRight: '10vw',
                paddingLeft: '2vw',
                paddingRight: '2vw',
                paddingTop: '20px',
                marginBottom: '20px',
                border: '5px solid black',
                backgroundColor: '#001529',
                minHeight: '60vh',
            }}
        >
            {currStepNumber <= 1 && (
                <BadgeDataForm
                    isConceptForm
                    setCurrStepNumber={setCurrStepNumber}
                    setBadge={setBadge}
                    setRecipients={() => {}}
                    saveSupply={setSupply}
                />
            )}
            {currStepNumber === 2 && (
                <PermissionsForm
                    setTimelineStepNum={setCurrStepNumber}
                    setPermissions={setPermissions}
                    recipients={[]}
                />
            )}
            {currStepNumber === 3 && (
                <Form.Provider>
                    <FormNavigationHeader
                        incrementStep={() => {}}
                        decrementStep={() => setCurrStepNumber(2)}
                        stepNum={1}
                        nextButtonDisabled={true}
                        finalStepNumber={1}
                    />
                    <Form layout="horizontal">
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
                                    }}
                                    strong
                                >
                                    Finalize
                                </Typography.Text>
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 100,
                                }}
                            >
                                <Badge
                                    conceptBadge={true}
                                    badge={{
                                        metadata: {
                                            ...badge,
                                        },
                                        recipients: [],
                                        permissions,
                                        supply,
                                        manager: `ETH:${address}`,
                                    }}
                                    size={100}
                                />
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        width: '90%',
                                        marginTop: 20,
                                    }}
                                    onClick={async () => {
                                        setTxnSubmitted(true);
                                        setTransactionIsLoading(true);

                                        try {
                                            const data = {
                                                metadata: {
                                                    ...badge,
                                                },
                                                recipients: [],
                                                permissions,
                                                supply,
                                                manager: `ETH:${address}`,
                                            };

                                            console.log(data);

                                            await signAndSubmitPrivateApiTxn(
                                                '/badges/addConcept',
                                                data
                                            );

                                            setTransactionIsLoading(false);

                                            setConceptFormVisible(false);
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
                        </>
                    </Form>
                </Form.Provider>
            )}
        </div>
    );
}
