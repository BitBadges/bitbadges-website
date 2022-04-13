const { createSlice } = require('@reduxjs/toolkit');

export const web3ModalSlice = createSlice({
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

export const web3ModalReducer = web3ModalSlice.reducer;

export const web3ModalActions = web3ModalSlice.actions;
