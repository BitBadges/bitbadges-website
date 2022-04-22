export function parseId(partitionedAddress) {
    const chain = partitionedAddress.split(':')[0];
    const address = partitionedAddress.split(':')[1];

    return { chain, address };
}

export function getChainFromPartitionedAddress(partitionedAddress) {
    return partitionedAddress.split(':')[0];
}

export function getAddressFromPartitionedAddress(partitionedAddress) {
    return partitionedAddress.split(':')[1];
}

export function getAbbreviatedAddress(address) {
    return address.substr(0, 10) + '...' + address.substr(-4);
}
