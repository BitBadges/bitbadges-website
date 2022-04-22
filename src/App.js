import { WalletHeader } from './components/WebsiteHeader';
import { Home } from './screens/Home';
import { Mint } from './screens/Mint';
import { Browse } from './screens/Browse';
import { User } from './screens/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletFooter } from './components/WebsiteFooter';
import { Account } from './screens/Account';
import DisconnectedWrapper from './screens/Disconnected';
import { AccountSettings } from './screens/AccountSettings';
import React from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { createWeb3Modal } from './utils/Web3Modal';
import { web3ModalActions } from './redux/web3ModalSlice';

const createdWeb3Modal = createWeb3Modal();

function App() {
    const dispatch = useDispatch();
    dispatch(web3ModalActions.setWeb3Modal(createdWeb3Modal));

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
