const { createSlice } = require('@reduxjs/toolkit');

const web3ModalSlice = createSlice({
    name: 'web3Modal',
    initialState: {
        web3Modal: undefined,
    },
    reducers: {
        setWeb3Modal: (state, action) => {
            state.web3Modal = action.payload;
        },
    },
});

module.exports = {
    web3ModalReducer: web3ModalSlice.reducer,
    web3ModalSlice: web3ModalSlice,
    ...web3ModalSlice.actions,
};
