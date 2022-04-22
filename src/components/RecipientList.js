import Web3 from 'web3';
import { PRIMARY_TEXT } from '../constants';
import {
    getAbbreviatedAddress,
    getAddressFromPartitionedAddress,
} from '../utils/AddressUtils';
const { DeleteOutlined } = require('@ant-design/icons');
const { Avatar } = require('antd');
const React = require('react');

export function RecipientList({
    setRecipients,
    recipients,
    showWarnings,
    hideTotals,
}) {
    const getNumRecipients = () => {
        let sum = 0;
        for (const recipient of recipients) {
            sum += recipient.amount;
        }
        return sum;
    };

    return (
        <>
            {recipients.length > 0 && (
                <>
                    {recipients.map((recipient, idx) => (
                        <div
                            style={{
                                marginBottom: 3,
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                color: PRIMARY_TEXT,
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
                                <span
                                    style={{
                                        color:
                                            showWarnings &&
                                            !Web3.utils.isAddress(
                                                getAddressFromPartitionedAddress(
                                                    recipient.to
                                                )
                                            )
                                                ? 'red'
                                                : undefined,
                                    }}
                                >
                                    {`${getAbbreviatedAddress(recipient.to)}`}
                                </span>
                                <span
                                    style={{
                                        color:
                                            showWarnings &&
                                            recipient.amount <= 0
                                                ? 'red'
                                                : undefined,
                                    }}
                                >{` (x${recipient.amount})`}</span>
                            </div>
                            <div>
                                <button className="link-button">
                                    <DeleteOutlined
                                        style={{ color: PRIMARY_TEXT }}
                                        onClick={() => {
                                            const recipientsClone = [
                                                ...recipients,
                                            ];
                                            recipientsClone.splice(idx, 1);
                                            setRecipients(recipientsClone);
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {!hideTotals && (
                <div
                    style={{
                        marginBottom: 3,
                        display: 'flex',
                        width: '100%',
                        color: PRIMARY_TEXT,
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    Total: {getNumRecipients()} ({recipients.length} Addresses)
                </div>
            )}
        </>
    );
}
