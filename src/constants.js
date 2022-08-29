// export const NODE_URL = 'https://bit-badges.herokuapp.com';
export const NODE_URL = 'http://localhost:1234';

export const WEBSITE_HOSTNAME = 'localhost:3001'; //used for the copy / share profile link

// export const PRIVATE_API_URL = 'https://bitbadges-private-api.herokuapp.com';
// export const PRIVATE_API_URL = 'https://api.circlegame.io';
export const PRIVATE_API_URL = 'http://localhost:3000';

export const MAX_DATE_TIMESTAMP = 8640000000000000;
export const ETH_NULL_ADDRESS =
    'ETH:0x0000000000000000000000000000000000000000';

export const PRIMARY_BLUE = '#001529';
export const SECONDARY_BLUE = '#3e83f8';
export const TERTIARY_BLUE = '#192c3e';
export const FOURTH_BLUE = '#304151';

export const PRIMARY_PINK = '#Ea1795';
export const PRIMARY_TEXT = 'white';
export const SECONDARY_TEXT = '#dedede';
export const LINK_COLOR = '#0000EE';

export const SAMPLE_BADGE = {
    metadata: {
        name: 'Sample',
        description: '',
        image: 'https://bitbadges.web.app/img/icons/logo.png',
        creator: 'ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27',
        validFrom: {
            start: 1649341503574,
            end: 8640000000000000,
        },
        color: 'black',
        type: 0,
        category: 'BitBadge',
        url: '',
    },
    permissions: {
        canMintMore: true,
        canRevoke: true,
        canOwnerTransfer: true,
    },
    supply: 0,
    manager: 'ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27',
    _id: 'f729504ee514b7c2e9c5dbfae92da5493007cb558d44e236dd19aa934dc0254a',
};

export const ETH_LOGO =
    'https://e7.pngegg.com/pngimages/407/710/png-clipart-ethereum-cryptocurrency-bitcoin-cash-smart-contract-bitcoin-blue-angle-thumbnail.png';
