import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';

const { Typography, Form, Button, Switch } = require('antd');

const React = require('react');
const { useState } = require('react');

const { Text } = Typography;

export function PermissionsForm({
    setCurrStepNumber,
    setPermissions,
    recipients,
}) {
    const [canMintMore, setCanMintMore] = useState(true);
    const [canRevoke, setCanRevoke] = useState(true);
    const [canOwnerTransfer, setCanOwnerTransfer] = useState(true);
    const [stepNum, setStepNum] = useState(1);

    const incrementStep = () => {
        if (stepNum === 4) {
            setCurrStepNumber(3);
        } else {
            setStepNum(stepNum + 1);
        }
    };

    const decrementStep = () => {
        if (stepNum === 1) {
            setCurrStepNumber(1);
        } else {
            setStepNum(stepNum - 1);
        }
    };

    let supply = 0;
    for (const recipient of recipients) {
        supply += recipient.amount;
    }

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
                        {stepNum} / 4
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
                        disabled={stepNum === 4}
                    >
                        Next
                        <CaretRightFilled size={40} />
                    </button>
                </div>
                <Form layout="horizontal">
                    {stepNum === 1 && (
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
                                    Can Mint More?
                                </Typography.Text>
                            </div>
                            <div style={{}}>
                                <div
                                    // label={<Text strong>Can Mint More?</Text>}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: 100,
                                    }}
                                >
                                    {
                                        <Switch
                                            checked={canMintMore}
                                            onChange={() => {
                                                setCanMintMore(!canMintMore);
                                            }}
                                        />
                                    }
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
                            </div>
                        </>
                    )}

                    {stepNum === 2 && (
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
                                    Can Revoke?
                                </Typography.Text>
                            </div>
                            <div style={{}}>
                                <div
                                    // label={<Text strong>Can Mint More?</Text>}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: 100,
                                    }}
                                >
                                    {
                                        <Switch
                                            checked={canRevoke}
                                            onChange={() => {
                                                setCanRevoke(!canRevoke);
                                            }}
                                        />
                                    }
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
                            </div>
                        </>
                    )}

                    {stepNum === 3 && (
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
                                    Transferable?
                                </Typography.Text>
                            </div>
                            <div style={{}}>
                                <div
                                    // label={<Text strong>Can Mint More?</Text>}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: 100,
                                    }}
                                >
                                    {
                                        <Switch
                                            checked={canOwnerTransfer}
                                            onChange={() => {
                                                setCanOwnerTransfer(
                                                    !canOwnerTransfer
                                                );
                                            }}
                                        />
                                    }
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
                            </div>
                        </>
                    )}
                    {stepNum === 4 && (
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
                                    Confirm Permissions and Continue
                                </Typography.Text>
                            </div>
                            <>
                                {/* <Form.Item
                                    label={
                                        <Text style={{ color: 'white' }} strong>
                                            Expires?
                                        </Text>
                                    }
                                >
                                    {
                                        <Switch
                                            defaultChecked={expirationDate}
                                            onChange={() => {
                                                if (expirationDate) {
                                                    hideExpirationDate();
                                                } else {
                                                    showExpirationDate();
                                                }
                                            }}
                                        />
                                    }
                                </Form.Item> */}
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
                                        -{' '}
                                        {canMintMore
                                            ? 'Supply is not locked (can be locked in the future)'
                                            : 'Supply is locked (can never be unlocked)'}
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
                                            setCurrStepNumber(3);
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

                    {/* <div
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
                            onClick={() => {
                                setCurrStepNumber(3);
                                setPermissions({
                                    canMintMore,
                                    canRevoke,
                                    canOwnerTransfer,
                                });
                            }}
                        >
                            Confirm Data
                        </Button>
                        <Button
                            style={{ width: '48%' }}
                            onClick={async () => {
                                setCurrStepNumber(1);
                            }}
                        >
                            Go Back
                        </Button>
                    </div> */}
                </Form>
            </Form.Provider>
        </div>
    );
}
