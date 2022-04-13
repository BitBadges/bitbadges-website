const { configureStore } = require('@reduxjs/toolkit');
const { userReducer } = require('./userSlice');
const { web3ModalReducer } = require('./web3ModalSlice');

const store = configureStore({
    reducer: {
        user: userReducer,
        web3Modal: web3ModalReducer,
    },
});

export default store;
