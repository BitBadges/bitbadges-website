const {
    UserAddOutlined,
    UploadOutlined,
    DeleteOutlined,
} = require('@ant-design/icons');
const {
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

const { useState } = require('react');
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
        Papa.parse(file, {
            complete: (results) => {
                const data = results.data;
                const newRecipients = [];
                const illegalEntriesArr = [];
                for (const row of data) {
                    const chain = row[0];
                    const address = row[1];
                    const amount = Number(row[2]);

                    if (
                        chain !== 'ETH' ||
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
    const getNumRecipients = () => {
        let sum = 0;
        for (const recipient of recipients) {
            sum += recipient.amount;
        }
        return sum;
    };

    return (
        <>
            <Form.Item
                label={
                    <Text strong style={{ color: 'white' }}>
                        Recipients
                    </Text>
                }
            >
                {recipients.length > 0 && (
                    <>
                        {recipients.map((recipient, idx) => (
                            <div
                                style={{
                                    marginBottom: 3,
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    color: 'white',
                                    fontWeight: 'bold',
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
                                    <button className="link-button">
                                        {' '}
                                        <DeleteOutlined
                                            style={{ color: 'white' }}
                                            onClick={() => {
                                                const recipientsClone = [
                                                    ...recipients,
                                                ];
                                                recipientsClone.splice(idx, 1);
                                                console.log(recipientsClone);
                                                setRecipients(recipientsClone);
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                <div
                    style={{
                        marginBottom: 3,
                        display: 'flex',
                        width: '100%',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    Total: {getNumRecipients()} ({recipients.length} Addresses)
                </div>
                <Divider style={{ margin: 4, color: 'lightgray' }} />
            </Form.Item>

            <Form.Item
                label={
                    <Text strong style={{ color: 'white' }}>
                        {!visible && !fileModalVisible && 'Add More?'}
                        {visible && 'Manual Add'}
                        {fileModalVisible && 'CSV Add'}
                    </Text>
                }
            >
                <div>
                    {!visible && !fileModalVisible && (
                        <>
                            <Button
                                style={{
                                    marginTop: 5,
                                    width: '50%',
                                    backgroundColor: '#001529',
                                    color: 'white',
                                }}
                                onClick={showUserModal}
                            >
                                Add Manually
                                <UserAddOutlined />
                            </Button>
                            <Button
                                style={{
                                    width: '50%',
                                    backgroundColor: '#001529',
                                    color: 'white',
                                }}
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
                        <Input.Group
                            compact
                            style={{
                                marginTop: 5,
                                width: '100%',
                                backgroundColor: '#001529',
                                color: 'white',
                            }}
                        >
                            <Input
                                addonBefore={
                                    <Select
                                        value={addedUserChain}
                                        onSelect={(e) => setAddedUserChain(e)}
                                        defaultValue="ETH"
                                    >
                                        <Option value="ETH">ETH</Option>
                                    </Select>
                                }
                                // style={{ width: '55%' }}
                                value={addedUserAddress}
                                onChange={(e) =>
                                    setAddedUserAddress(e.target.value)
                                }
                                suffix={
                                    <InputNumber
                                        // style={{ width: '20%' }}
                                        value={addedUserAmount}
                                        onChange={(e) => setAddedUserAmount(e)}
                                    />
                                }
                            />
                        </Input.Group>
                        <div>
                            {!web3.utils.isAddress(addedUserAddress) && (
                                <Text style={{ color: 'lightgrey' }}>
                                    *Invalid address specified
                                </Text>
                            )}
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}
                        >
                            <Button
                                htmlType="button"
                                style={{
                                    margin: '0',
                                    width: '48%',
                                    backgroundColor: '#001529',
                                    color: 'white',
                                }}
                                onClick={() => {
                                    hideUserModal();
                                }}
                            >
                                Cancel
                            </Button>

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
                                style={{
                                    margin: '0',
                                    width: '48%',
                                }}
                            >
                                {/* Mint {addedUserAmount} to{' '}
                                {`${addedUserChain}:${
                                    addedUserAddress.length > 9
                                        ? addedUserAddress.substr(0, 4) +
                                          '...' +
                                          addedUserAddress.substr(-3)
                                        : addedUserAddress
                                }`} */}
                                Add Recipient
                            </Button>
                        </div>
                    </>
                )}
                {fileModalVisible && (
                    <>
                        <Form.Item>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
                                showUploadList={false}
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
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#001529',
                                        color: 'white',
                                    }}
                                >
                                    Upload Recipients CSV (Max: 1 File)
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
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        strong
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        Recipients to Add
                                    </Text>
                                </div>
                                {fileRecipients.map((recipient, idx) => (
                                    <div
                                        style={{
                                            marginBottom: 3,
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            color: 'white',
                                            fontWeight: 'bold',
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
                                            <button className="link-button">
                                                {' '}
                                                <DeleteOutlined
                                                    style={{ color: 'white' }}
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
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {illegalEntries.length > 0 && (
                                    <>
                                        <div
                                            style={{
                                                marginTop: 15,
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Text
                                                strong
                                                style={{
                                                    textAlign: 'center',
                                                    color: 'white',
                                                }}
                                            >
                                                Illegal Entries (Delete or
                                                Upload Again)
                                            </Text>
                                        </div>
                                        {illegalEntries.map((recipient) => (
                                            <div
                                                style={{
                                                    marginBottom: 3,
                                                    display: 'flex',
                                                    width: '100%',
                                                    justifyContent:
                                                        'space-between',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                <div>
                                                    <Avatar
                                                        src={
                                                            'https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png'
                                                        }
                                                        style={{
                                                            marginRight: 3,
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            color:
                                                                recipient.amount >
                                                                0
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
                                                    <button className="link-button">
                                                        {' '}
                                                        <DeleteOutlined
                                                            onClick={() => {
                                                                setIllegalEntries(
                                                                    illegalEntries.filter(
                                                                        (
                                                                            elem
                                                                        ) =>
                                                                            elem.id !==
                                                                            recipient.id
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                        )}
                        <div style={{ fontSize: 10 }}>
                            <Text style={{ color: 'lightgrey' }}>
                                *All CSV rows must be in the format:
                                chain,address,amount. Don't include any header
                                or footer rows.
                            </Text>
                        </div>
                        <a href="samplerecipients.csv" download>
                            <Text style={{ color: 'blue' }}>
                                Download Sample CSV
                            </Text>
                        </a>

                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}
                        >
                            <Button
                                htmlType="button"
                                style={{
                                    margin: '0',
                                    width: '48%',
                                    backgroundColor: '#001529',
                                    color: 'white',
                                }}
                                onClick={() => {
                                    hideFileModal();
                                    setFileRecipients([]);
                                }}
                            >
                                Cancel
                            </Button>

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
                                style={{
                                    margin: '0',
                                    width: '48%',
                                }}
                                disabled={
                                    fileRecipients.length <= 0 ||
                                    illegalEntries.length > 0
                                }
                            >
                                Add Recipients
                            </Button>
                        </div>
                        <hr />
                    </>
                )}
            </Form.Item>
        </>
    );
}
