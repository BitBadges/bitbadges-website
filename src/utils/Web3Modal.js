const Fortmatic = require('fortmatic');
const Portis = require('@portis/web3');
const Web3Modal = require('web3modal').default;

const providerOptions = {
    fortmatic: {
        package: Fortmatic, // required
        options: {
            key: 'pk_live_5A7C91B2FC585A17', // required
        },
    },
    portis: {
        display: {
            logo: 'https://user-images.githubusercontent.com/9419140/128913641-d025bc0c-e059-42de-a57b-422f196867ce.png',
            name: 'Portis',
            description: 'Connect to Portis App',
        },
        package: Portis,
        options: {
            id: '6255fb2b-58c8-433b-a2c9-62098c05ddc9',
        },
    },
};

/*
    IMPORTANT: Make sure injectMetamaskProvider() is called before this, or else it will just load
    with the providerOptions above and not Metamask
*/
export const createWeb3Modal = function () {
    return new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        disableInjectedProvider: false,
        providerOptions,
    });
};
