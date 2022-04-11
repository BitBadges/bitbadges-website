import { WalletHeader } from './components/WalletHeader';
import { Home } from './screens/Home';
import { Mint } from './screens/Mint';
import { Pending } from './screens/Pending';
import { Browse } from './screens/Browse';

import { User } from './screens/User';
import { Swap } from './screens/Swap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletFooter } from './components/WalletFooter';
import { Account } from './screens/Account';
import DisconnectedWrapper from './screens/Disconnected';
import { AccountSettings } from './screens/AccountSettings';
const React = require('react');
const { Layout } = require('antd');

const { useDispatch } = require('react-redux');
const { createWeb3Modal } = require('./utils/Web3Modal');
const { setWeb3Modal } = require('./redux/web3ModalSlice');

const createdWeb3Modal = createWeb3Modal();

function App() {
    const dispatch = useDispatch();
    dispatch(setWeb3Modal(createdWeb3Modal));

    return (
        <BrowserRouter>
            <div className="App">
                <Layout className="layout">
                    <WalletHeader />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="mint"
                            element={
                                <DisconnectedWrapper screenNode={<Mint />} />
                            }
                        />
                        <Route path="browse" element={<Browse />} />
                        <Route path="user/:userId" element={<User />} />
                        <Route
                            path="pending"
                            element={
                                <DisconnectedWrapper screenNode={<Pending />} />
                            }
                        />
                        <Route
                            path="swap"
                            element={
                                <DisconnectedWrapper screenNode={<Swap />} />
                            }
                        />
                        <Route
                            path="account"
                            element={
                                <DisconnectedWrapper screenNode={<Account />} />
                            }
                        />
                        <Route
                            path="account/customize"
                            element={
                                <DisconnectedWrapper
                                    screenNode={<AccountSettings />}
                                />
                            }
                        />
                    </Routes>

                    <WalletFooter />
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
