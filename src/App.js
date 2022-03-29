import { WalletHeader } from './components/WalletHeader';
import { Home } from './screens/Home';
import { Mint } from './screens/Mint';
import Disconnected from './screens/Disconnected';
import { Pending } from './screens/Pending';
import { Browse } from './screens/Browse';

import { User } from './screens/User';
import { Swap } from './screens/Swap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletFooter } from './components/WalletFooter';
const React = require('react');
const { Layout } = require('antd');

const { useSelector, useDispatch } = require('react-redux');
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
                        <Route path="mint" element={<Mint />} />
                        <Route path="browse" element={<Browse />} />
                        <Route path="user/:userId" element={<User />} />
                        <Route path="pending" element={<Pending />} />
                        <Route path="swap" element={<Swap />} />
                    </Routes>

                    <WalletFooter />
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
