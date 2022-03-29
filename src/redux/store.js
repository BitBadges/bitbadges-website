const { configureStore } = require('@reduxjs/toolkit');
const { userReducer } = require('./userSlice');
const { web3ModalReducer } = require('./web3ModalSlice');

module.exports = configureStore({
    reducer: {
        user: userReducer,
        web3Modal: web3ModalReducer,
    },
});
