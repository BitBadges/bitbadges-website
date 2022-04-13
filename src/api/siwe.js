import { SiweMessage } from 'siwe';
import axios from 'axios';
import store from '../redux/store';
import { PRIVATE_API_URL } from '../constants';

const domain = window.location.host;
const origin = window.location.origin;

export async function signAndVerifySiwe() {
    const currState = store.getState();
    const userSigner = currState.user.userSigner;

    const nonceResponse = await axios.get(`${PRIVATE_API_URL}/auth/nonce`, {
        withCredentials: 'include',
    });

    const message = new SiweMessage({
        domain,
        address: await userSigner.getAddress(),
        statement:
            'This signature request does not cost any fees and will not trigger any blockchain transactions. You will remain authenticated until you choose to disconnect or end your browser session.',
        uri: origin,
        version: '1',
        chainId: '1',
        nonce: nonceResponse.data,
    });

    const signature = await userSigner.signMessage(message.prepareMessage());

    await axios.post(
        `${PRIVATE_API_URL}/auth/login`,
        { message: message.prepareMessage(), signature },
        {
            withCredentials: 'include',
        }
    );
}

export async function testSiwe() {
    let signedIn = false;
    let resAddress = '';
    await axios
        .post(
            `${PRIVATE_API_URL}/auth/test`,
            {},
            {
                withCredentials: 'include',
            }
        )
        .then((res) => {
            signedIn = res.data.authenticated;
            resAddress = res.data.address;
        })
        .catch((err) => {
            signedIn = false;
            resAddress = '';
        });

    return { signedIn, resAddress };
}

export async function logoutOfSiwe() {
    await axios.post(
        `${PRIVATE_API_URL}/auth/logout`,
        {},
        {
            withCredentials: 'include',
        }
    );
}
