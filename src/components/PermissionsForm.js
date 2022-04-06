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

    let supply = 0;
    for (const recipient of recipients) {
        supply += recipient.amount;
    }

    return (
        <div>
            <Form.Provider>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item label={<Text strong>Can Mint More?</Text>}>
                        {
                            <Switch
                                checked={canMintMore}
                                onChange={() => {
                                    setCanMintMore(!canMintMore);
                                }}
                            />
                        }
                        <br />
                        <br />
                        <Text>
                            {canMintMore &&
                                'Yes: You will be able to mint more of this badge in the future. You can lock the supply at anytime.'}
                            {!canMintMore &&
                                `No: This badge's supply will be locked forever at ${supply} after the initial ${supply} mints to ${recipients.length} recipients specified in the metadata section.`}
                        </Text>
                    </Form.Item>

                    <Form.Item label={<Text strong>Revocable?</Text>}>
                        {
                            <Switch
                                checked={canRevoke}
                                onChange={() => {
                                    setCanRevoke(!canRevoke);
                                }}
                            />
                        }
                        <br />
                        <br />
                        <Text>
                            {canRevoke &&
                                'Yes: You will be able to revoke this badge from another user at anytime.'}
                            {!canRevoke &&
                                `No: You will not be able to revoke this badge. Once it is issued and accepted, it will live forever in their account.`}
                        </Text>
                    </Form.Item>

                    <Form.Item
                        label={
                            <Text strong style={{ display: 'flex' }}>
                                Transferable?
                            </Text>
                        }
                    >
                        {
                            <Switch
                                checked={canOwnerTransfer}
                                onChange={() => {
                                    setCanOwnerTransfer(!canOwnerTransfer);
                                }}
                            />
                        }
                        <br />
                        <br />
                        <Text>
                            {canOwnerTransfer &&
                                'Yes: Badge owners will be able to transfer this asset at anytime, including burning.'}
                            {!canOwnerTransfer &&
                                `No: Badge owners will not have transfer or burn permissions.`}
                        </Text>
                    </Form.Item>
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
                    </div>
                </Form>
            </Form.Provider>
        </div>
    );
}
