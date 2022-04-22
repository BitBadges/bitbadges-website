import { PRIMARY_TEXT } from '../constants';
import { RecipientList } from './RecipientList';
import { UserAddOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Typography,
    Form,
    Button,
    Input,
    Select,
    InputNumber,
    Divider,
    Upload,
    message,
} from 'antd';
import React from 'react';
import web3 from 'web3';
import Papa from 'papaparse';
import { useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

export function RecipientFormItem({ setRecipients, recipients }) {
    const [addedUserAmount, setAddedUserAmount] = useState(0);
    const [addedUserChain, setAddedUserChain] = useState('ETH');
    const [addedUserAddress, setAddedUserAddress] = useState('');

    const [addManualModal, setAddManualModal] = useState(false);
    const [addByCsvModal, setAddByCsvModal] = useState(false);

    const [fileRecipients, setFileRecipients] = useState([]);
    const [illegalEntries, setIllegalEntries] = useState([]);

    const showAddManualModal = () => {
        setAddManualModal(true);
    };

    const hideAddManualModal = () => {
        setAddManualModal(false);
    };

    const showAddByCsvModal = () => {
        setAddByCsvModal(true);
    };

    const hideAddByCsvModal = () => {
        setAddByCsvModal(false);
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

    return (
        <>
            <Form.Item
                label={
                    <Text strong style={{ color: PRIMARY_TEXT }}>
                        Recipients
                    </Text>
                }
            >
                <RecipientList
                    recipients={recipients}
                    setRecipients={setRecipients}
                />
                <Divider style={{ margin: 4, color: 'lightgray' }} />
            </Form.Item>

            <Form.Item
                label={
                    <Text strong style={{ color: PRIMARY_TEXT }}>
                        {!addManualModal && !addByCsvModal && 'Add More?'}
                        {addManualModal && 'Manual Add'}
                        {addByCsvModal && 'CSV Add'}
                    </Text>
                }
            >
                <div>
                    {!addManualModal && !addByCsvModal && (
                        <>
                            <Button
                                style={{ width: '50%' }}
                                className="screen-button"
                                onClick={showAddManualModal}
                            >
                                Add Manually
                                <UserAddOutlined />
                            </Button>
                            <Button
                                style={{ width: '50%' }}
                                className="screen-button"
                                onClick={showAddByCsvModal}
                            >
                                Add by CSV
                                <UserAddOutlined />
                            </Button>
                            {recipients.length > 0 && <Divider />}
                        </>
                    )}
                </div>
                {addManualModal && (
                    <>
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
                            placeholder="Enter Address (0x....)"
                            value={addedUserAddress}
                            onChange={(e) =>
                                setAddedUserAddress(e.target.value)
                            }
                            suffix={
                                <InputNumber
                                    value={addedUserAmount}
                                    onChange={(e) => setAddedUserAmount(e)}
                                />
                            }
                        />
                        <div
                            style={{
                                marginTop: 10,
                            }}
                        >
                            <RecipientList
                                hideTotals
                                showWarnings
                                recipients={[
                                    {
                                        to: `${addedUserChain}:${addedUserAddress}`,
                                        amount: addedUserAmount,
                                    },
                                ]}
                                setRecipients={() => {
                                    setAddedUserAddress('');
                                    setAddedUserAmount(0);
                                }}
                            />
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
                                className="screen-button"
                                style={{ width: '48%' }}
                                onClick={() => {
                                    hideAddManualModal();
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
                                    hideAddManualModal();
                                }}
                                disabled={
                                    addedUserAmount <= 0 ||
                                    !web3.utils.isAddress(addedUserAddress)
                                }
                                style={{ width: '48%' }}
                            >
                                Add Recipient
                            </Button>
                        </div>
                    </>
                )}
                {addByCsvModal && (
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
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    style={{
                                        width: '100%',
                                    }}
                                    className="screen-button"
                                >
                                    Upload Recipients CSV (Max: 1 File)
                                </Button>
                            </Upload>
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
                                            color: PRIMARY_TEXT,
                                        }}
                                    >
                                        Recipients to Add
                                    </Text>
                                </div>
                                <RecipientList
                                    recipients={fileRecipients}
                                    setRecipients={setFileRecipients}
                                />
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
                                                    color: PRIMARY_TEXT,
                                                }}
                                            >
                                                Illegal Entries (Delete or
                                                Upload Again)
                                            </Text>
                                        </div>
                                        <RecipientList
                                            recipients={illegalEntries}
                                            setRecipients={setIllegalEntries}
                                            showWarnings
                                        />
                                    </>
                                )}
                            </>
                        )}
                        <div style={{ fontSize: 11 }}>
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
                                className="screen-button"
                                style={{ width: '48%' }}
                                onClick={() => {
                                    hideAddByCsvModal();
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
                                    hideAddByCsvModal();
                                    setFileRecipients([]);
                                }}
                                style={{ width: '48%' }}
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
