import { Typography, Form, Button, Switch } from 'antd';
import React from 'react';
import { useState } from 'react';
import { PRIMARY_TEXT } from '../constants';
import { FormNavigationHeader } from './FormNavigationHeader';

const { Text } = Typography;

const FINAL_STEP_NUM = 3;
const FIRST_STEP_NUM = 1;
const CURR_TIMELINE_STEP_NUM = 2;

export function PermissionsForm({
    setTimelineStepNum,
    setPermissions,
    recipients,
}) {
    const [canMintMore, setCanMintMore] = useState(true);
    const [canRevoke, setCanRevoke] = useState(true);
    const [canOwnerTransfer, setCanOwnerTransfer] = useState(true);
    const [permissionsStepNum, setPermissionsStepNum] = useState(1);

    const incrementStep = () => {
        if (permissionsStepNum === FINAL_STEP_NUM) {
            setTimelineStepNum(CURR_TIMELINE_STEP_NUM + 1);
        } else {
            setPermissionsStepNum(permissionsStepNum + 1);
        }
    };

    const decrementStep = () => {
        if (permissionsStepNum === FIRST_STEP_NUM) {
            setTimelineStepNum(CURR_TIMELINE_STEP_NUM - 1);
        } else {
            setPermissionsStepNum(permissionsStepNum - 1);
        }
    };

    const getTitleElement = (title) => {
        return (
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
                    {title}
                </Typography.Text>
            </div>
        );
    };

    let supply = 0;
    for (const recipient of recipients) {
        supply += recipient.amount;
    }

    return (
        <div>
            <Form.Provider>
                <FormNavigationHeader
                    incrementStep={incrementStep}
                    decrementStep={decrementStep}
                    stepNum={permissionsStepNum}
                    nextButtonDisabled={permissionsStepNum === FINAL_STEP_NUM}
                    finalStepNumber={FINAL_STEP_NUM}
                />
                <Form layout="horizontal">
                    {/* {permissionsStepNum === 1 && (
                        <>
                            {getTitleElement('Can Mint More?')}
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 100,
                                }}
                            >
                                <Switch
                                    checked={canMintMore}
                                    onChange={() => {
                                        setCanMintMore(!canMintMore);
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: 10,
                                    textAlign: 'center',
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    {canMintMore &&
                                        'Yes: You will be able to mint more of this badge in the future. You can lock the supply at anytime.'}
                                    {!canMintMore &&
                                        `No: This badge's supply will be locked forever at ${supply} after the initial ${supply} mints to ${recipients.length} recipients specified in the metadata section.`}
                                </Text>
                            </div>
                        </>
                    )} */}

                    {permissionsStepNum === 1 && (
                        <>
                            {getTitleElement('Can Revoke?')}
                            <div
                                // label={<Text strong>Can Mint More?</Text>}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 100,
                                }}
                            >
                                <Switch
                                    checked={canRevoke}
                                    onChange={() => {
                                        setCanRevoke(!canRevoke);
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: 10,
                                    textAlign: 'center',
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    {canRevoke &&
                                        'Yes: You will be able to revoke this badge from another user at anytime.'}
                                    {!canRevoke &&
                                        `No: You will not be able to revoke this badge. Once it is issued and accepted, it will live forever in their account.`}
                                </Text>
                            </div>
                        </>
                    )}

                    {permissionsStepNum === 2 && (
                        <>
                            {getTitleElement('Transferable?')}
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontSize: 100,
                                }}
                            >
                                <Switch
                                    checked={canOwnerTransfer}
                                    onChange={() => {
                                        setCanOwnerTransfer(!canOwnerTransfer);
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: 10,
                                    textAlign: 'center',
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    {canOwnerTransfer &&
                                        'Yes: Badge owners will be able to transfer this asset at anytime, including burning.'}
                                    {!canOwnerTransfer &&
                                        `No: Badge owners will not have transfer or burn permissions.`}{' '}
                                </Text>
                            </div>
                        </>
                    )}
                    {permissionsStepNum === 3 && (
                        <>
                            {getTitleElement(
                                'Confirm Permissions and Continue'
                            )}
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
                                            fontSize: 16,
                                            marginBottom: 10,
                                        }}
                                        strong
                                    >
                                        Please take a moment to confirm all
                                        permissions are correct.
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
                                            color: 'white',
                                            fontSize: 14,
                                            marginBottom: 10,
                                        }}
                                    >
                                        -
                                        {
                                            'You will be able to lock the supply at any time in the future. This is standard for all created badges.'
                                        }
                                        {/* {canMintMore
                                            ? 'Supply is not locked (can be locked in the future)'
                                            : 'Supply is locked (can never be unlocked)'} */}
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
                                            color: 'white',
                                            fontSize: 14,
                                            marginBottom: 10,
                                        }}
                                    >
                                        -{' '}
                                        {canOwnerTransfer
                                            ? 'This badge will be transferable.'
                                            : 'This badge will be non-transferable.'}
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
                                            color: 'white',
                                            fontSize: 14,
                                            marginBottom: 10,
                                        }}
                                    >
                                        -{' '}
                                        {canRevoke
                                            ? 'This badge can be revoked by the manager.'
                                            : 'This badge can not be revoked by the manager.'}
                                    </Typography.Text>
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
                                        onClick={() => {
                                            setTimelineStepNum(3);
                                            setPermissions({
                                                canMintMore,
                                                canRevoke,
                                                canOwnerTransfer,
                                            });
                                        }}
                                    >
                                        Confirm Permissions and Continue
                                    </Button>
                                </div>
                            </>
                        </>
                    )}
                </Form>
            </Form.Provider>
        </div>
    );
}
