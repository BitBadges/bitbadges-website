const {
    UserAddOutlined,
    UploadOutlined,
    DownloadOutlined,
    DeleteOutlined,
} = require('@ant-design/icons');
const {
    Skeleton,
    Typography,
    Form,
    Avatar,
    Button,
    Input,
    Select,
    InputNumber,
    Divider,
    Upload,
    message,
} = require('antd');
const React = require('react');
const web3 = require('web3');
const Papa = require('papaparse');

const { useEffect, useState } = require('react');
const { Text } = Typography;
const { Option } = Select;

export function RecipientFormItem({ setRecipients, recipients }) {
    const [visible, setVisible] = useState(false);
    const [addedUserAmount, setAddedUserAmount] = useState(0);
    const [addedUserChain, setAddedUserChain] = useState('ETH');
    const [addedUserAddress, setAddedUserAddress] = useState('');
    const [fileModalVisible, setFileModalVisible] = useState(false);
    const [fileRecipients, setFileRecipients] = useState([]);
    const [illegalEntries, setIllegalEntries] = useState([]);

    const showUserModal = () => {
        setVisible(true);
    };

    const hideUserModal = () => {
        setVisible(false);
    };

    const showFileModal = () => {
        setFileModalVisible(true);
    };

    const hideFileModal = () => {
        setFileModalVisible(false);
    };

    function getCSV(file) {
        const res = Papa.parse(file, {
            complete: (results) => {
                const data = results.data;
                const newRecipients = [];
                const illegalEntriesArr = [];
                for (const row of data) {
                    const chain = row[0];
                    const address = row[1];
                    const amount = Number(row[2]);

                    if (
                        chain != 'ETH' ||
                        !web3.utils.isAddress(address) ||
                        amount <= 0
                    ) {
                        illegalEntriesArr.push({
                            to: `${chain}:${address}`,
                            amount,
                            id: illegalEntriesArr.length,
                        });
                    } else {
                        newRecipients.push({
                            to: `${chain}:${address}`,
                            amount,
                        });
                    }
                }
                setIllegalEntries(illegalEntriesArr);
                setFileRecipients(newRecipients);
            },
            error: (error) => {
                message.error(
                    `File uploaded, but could not parse. Make sure file is in CSV format.`,
                    5
                );
            },
        });
    }

    return (
        <Form.Item label={<Text strong>Recipients ({recipients.length})</Text>}>
            {recipients.length > 0 && (
                <>
                    {recipients.map((recipient, idx) => (
                        <div
                            style={{
                                marginBottom: 3,
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <Avatar
                                    src={
                                        'https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png'
                                    }
                                    style={{ marginRight: 3 }}
                                />
                                {`${recipient.to.substr(
                                    0,
                                    10
                                )}...${recipient.to.substr(-4)}`}
                                {` (x${recipient.amount})`}
                            </div>
                            <div>
                                <a>
                                    {' '}
                                    <DeleteOutlined
                                        onClick={() => {
                                            const recipientsClone = [
                                                ...recipients,
                                            ];
                                            recipientsClone.splice(idx, 1);
                                            console.log(recipientsClone);
                                            setRecipients(recipientsClone);
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                    <Divider style={{ margin: 4 }} />
                </>
            )}
            <div>
                {!visible && !fileModalVisible && (
                    <>
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            align="center"
                        >
                            Add Recipients?
                        </Typography>
                        <Button
                            style={{ marginTop: 5, width: '50%' }}
                            size="small"
                            onClick={showUserModal}
                        >
                            Add Manually
                            <UserAddOutlined />
                        </Button>
                        <Button
                            style={{ width: '50%' }}
                            size="small"
                            onClick={showFileModal}
                        >
                            Add by CSV
                            <UserAddOutlined />
                        </Button>
                        {recipients.length > 0 && <Divider />}
                    </>
                )}
            </div>
            {visible && (
                <>
                    <Form.Item>
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            align="center"
                        >
                            Manual Add
                        </Typography>
                        <Input.Group compact>
                            <Select
                                value={addedUserChain}
                                onSelect={(e) => setAddedUserChain(e)}
                                defaultValue="ETH"
                            >
                                <Option value="ETH">ETH</Option>
                            </Select>
                            <Input
                                style={{ width: '55%' }}
                                value={addedUserAddress}
                                onChange={(e) =>
                                    setAddedUserAddress(e.target.value)
                                }
                            />
                            <InputNumber
                                style={{ width: '20%' }}
                                value={addedUserAmount}
                                onChange={(e) => setAddedUserAmount(e)}
                            />
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => {
                                setRecipients([
                                    ...recipients,
                                    {
                                        to: `${addedUserChain}:${addedUserAddress}`,
                                        amount: addedUserAmount,
                                    },
                                ]);
                                setAddedUserAddress('');
                                setAddedUserAmount(0);
                                hideUserModal();
                            }}
                            disabled={
                                addedUserAmount <= 0 ||
                                !web3.utils.isAddress(addedUserAddress)
                            }
                        >
                            Mint {addedUserAmount} to{' '}
                            {`${addedUserChain}:${
                                addedUserAddress.length > 9
                                    ? addedUserAddress.substr(0, 4) +
                                      '...' +
                                      addedUserAddress.substr(-3)
                                    : addedUserAddress
                            }`}
                        </Button>
                        <Button
                            htmlType="button"
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => {
                                hideUserModal();
                            }}
                        >
                            Cancel
                        </Button>
                    </Form.Item>

                    {!web3.utils.isAddress(addedUserAddress) && (
                        <Text>*Invalid address specified</Text>
                    )}
                    <hr />
                </>
            )}
            {fileModalVisible && (
                <>
                    <Form.Item>
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            align="center"
                        >
                            CSV Add
                        </Typography>
                        <Upload
                            maxCount={1}
                            name="file"
                            onChange={(info) => {
                                console.log(info);
                                if (info.file.status !== 'uploading') {
                                    console.log(info.file, info.fileList);
                                }
                                if (info.file.status === 'done') {
                                    message.success(
                                        `${info.file.name} file uploaded successfully`,
                                        5
                                    );

                                    getCSV(info.file.originFileObj);
                                } else if (info.file.status === 'error') {
                                    message.error(
                                        `${info.file.name} file upload failed.`,
                                        5
                                    );
                                }
                            }}
                            onRemove={() => {
                                setFileRecipients([]);
                            }}
                            style={{ width: '100%' }}
                            accept=".csv"
                            beforeUpload={(file, fileList) => {
                                // console.log(file);
                                // console.log(fileList);
                                // const isCSV = file.type === 'txt/csv';
                                // if (!isCSV) {
                                //     message.error(
                                //         `${file.name} is not a csv file`
                                //     );
                                //     return UPLOAD.LIST_IGNORE;
                                // }
                            }}
                        >
                            <Button
                                icon={<UploadOutlined />}
                                style={{ width: '100%' }}
                            >
                                Upload Recipients CSV (Max: 1)
                            </Button>
                        </Upload>
                        {/* <Input.Group compact>
                            <Select
                                value={addedUserChain}
                                onSelect={(e) => setAddedUserChain(e)}
                                defaultValue="ETH"
                            >
                                <Option value="ETH">ETH</Option>
                            </Select>
                            <Input
                                style={{ width: '55%' }}
                                value={addedUserAddress}
                                onChange={(e) =>
                                    setAddedUserAddress(e.target.value)
                                }
                            />
                            <InputNumber
                                style={{ width: '20%' }}
                                value={addedUserAmount}
                                onChange={(e) => setAddedUserAmount(e)}
                            />
                        </Input.Group> */}
                    </Form.Item>
                    {fileRecipients.length > 0 && (
                        <>
                            <Form.Item
                                label={<Text strong>Recipients to Add</Text>}
                            >
                                {fileRecipients.map((recipient, idx) => (
                                    <div
                                        style={{
                                            marginBottom: 3,
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div>
                                            <Avatar
                                                src={
                                                    'https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png'
                                                }
                                                style={{ marginRight: 3 }}
                                            />
                                            {`${recipient.to.substr(
                                                0,
                                                10
                                            )}...${recipient.to.substr(
                                                -4
                                            )}  (x${recipient.amount})`}
                                        </div>
                                        <div>
                                            <a>
                                                {' '}
                                                <DeleteOutlined
                                                    onClick={() => {
                                                        const recipientsClone =
                                                            [...fileRecipients];
                                                        recipientsClone.splice(
                                                            idx,
                                                            1
                                                        );
                                                        console.log(
                                                            recipientsClone
                                                        );
                                                        setFileRecipients(
                                                            recipientsClone
                                                        );
                                                    }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </Form.Item>
                            {illegalEntries.length > 0 && (
                                <Form.Item
                                    label={
                                        <Text strong>
                                            Illegal Entries (Delete or Upload
                                            Again)
                                        </Text>
                                    }
                                >
                                    {illegalEntries.map((recipient) => (
                                        <div
                                            style={{
                                                marginBottom: 3,
                                                display: 'flex',
                                                width: '100%',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div>
                                                <Avatar
                                                    src={
                                                        'https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png'
                                                    }
                                                    style={{ marginRight: 3 }}
                                                />
                                                <span
                                                    style={{
                                                        color:
                                                            recipient.amount > 0
                                                                ? 'red'
                                                                : undefined,
                                                    }}
                                                >{`${recipient.to.substr(
                                                    0,
                                                    10
                                                )}...${recipient.to.substr(
                                                    -4
                                                )}`}</span>
                                                <span
                                                    style={{
                                                        color:
                                                            recipient.amount <=
                                                            0
                                                                ? 'red'
                                                                : undefined,
                                                    }}
                                                >{` (x${recipient.amount})`}</span>
                                            </div>
                                            <div>
                                                <a>
                                                    {' '}
                                                    <DeleteOutlined
                                                        onClick={() => {
                                                            setIllegalEntries(
                                                                illegalEntries.filter(
                                                                    (elem) =>
                                                                        elem.id !=
                                                                        recipient.id
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </Form.Item>
                            )}
                        </>
                    )}
                    <Form.Item>
                        <a href="/assets/samplerecipients.csv" download>
                            <Text style={{ color: 'blue' }}>
                                Download Sample CSV
                            </Text>
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => {
                                setRecipients([
                                    ...recipients,
                                    ...fileRecipients,
                                ]);
                                hideFileModal();
                                setFileRecipients([]);
                            }}
                            disabled={
                                fileRecipients.length <= 0 ||
                                illegalEntries.length > 0
                            }
                        >
                            Confirm Added Recipients
                        </Button>
                        <Button
                            htmlType="button"
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => {
                                hideFileModal();
                                setFileRecipients([]);
                            }}
                        >
                            Cancel
                        </Button>
                        <br />
                        <div style={{ fontSize: 10 }}>
                            <Text>
                                *All CSV rows must be in the format:
                                chain,address,amount. Don't include any header
                                or footer rows.
                            </Text>
                        </div>
                    </Form.Item>

                    <hr />
                </>
            )}
        </Form.Item>
    );
}
