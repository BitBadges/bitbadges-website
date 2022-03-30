const { Typography, Tooltip } = require('antd');
const React = require('react');
const { Text } = Typography;

const blockExplorerLink = (address, blockExplorer) =>
    `${blockExplorer || 'https://etherscan.io/'}address/${address}`;

export function Address({
    address,
    blockExplorer,
    size,
    fontSize,
    fontColor,
    showTooltip,
}) {
    const etherscanLink = blockExplorerLink(address, blockExplorer);
    let displayAddress = '';

    if (address) {
        displayAddress =
            'ETH: ' + address?.substr(0, 5) + '...' + address?.substr(-4);

        if (size === 'short') {
            displayAddress += '...' + address.substr(-4);
        } else if (size === 'long') {
            displayAddress = address;
        }
    } else {
        displayAddress = 'Please Enter an Address';
    }

    const innerContent = showTooltip ? (
        <Tooltip
            placement="bottom"
            title={`ETH:${address}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}
        >
            {displayAddress}
        </Tooltip>
    ) : (
        displayAddress
    );
    return (
        <span>
            <span
                style={{
                    verticalAlign: 'middle',
                    paddingLeft: 5,
                    fontSize: fontSize ? fontSize : 20,
                }}
            >
                {address ? (
                    <Text
                        copyable={{ text: address }}
                        style={{
                            color: fontColor ? fontColor : '#ddd',
                        }}
                    >
                        {innerContent}
                    </Text>
                ) : (
                    <Text
                        copyable={true}
                        style={{
                            color: fontColor ? fontColor : '#ddd',
                        }}
                    >
                        {/* <Tooltip placement="bottom" title={`ETH:${address}`}> */}
                        {innerContent}
                        {/* </Tooltip> */}
                    </Text>
                )}
            </span>
        </span>
    );
}
