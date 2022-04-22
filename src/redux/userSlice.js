const { createSlice } = require('@reduxjs/toolkit');

export const defaultProfileInfo = {
    username: '',
    bio: '',
    email: '',
    twitter: '',
    instagram: '',
    website: '',
    profilePic: '',
    bannerColorOne: '',
    bannerColorTwo: '',
    activity: [],
    likes: [],
    pinned: [],
    customDisplay: {},
    hidden: [],
    blockedUsers: [],
    loading: true,
    offering: [],
    concepts: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        nonce: 0,
        chain: 'ETH',
        address: undefined,
        userSigner: undefined,
        injectedProvider: undefined,
        userPendingBadges: [],
        userCreatedBadges: [],
        userReceivedBadges: [],
        userBalancesMap: {},
        numPending: 0,
        badgeMap: {},
        profileInfo: {
            ...defaultProfileInfo,
        },
    },
    reducers: {
        incrementNonce: (state) => {
            state.nonce += 1;
        },
        setNonce: (state, action) => {
            state.nonce = action.payload;
        },
        setInjectedProvider: (state, action) => {
            state.injectedProvider = action.payload;
        },
        setUserSigner: (state, action) => {
            state.userSigner = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setUserPendingBadges: (state, action) => {
            state.userPendingBadges = action.payload;
        },
        setUserCreatedBadges: (state, action) => {
            state.userCreatedBadges = action.payload;
        },
        setUserReceivedBadges: (state, action) => {
            state.userReceivedBadges = action.payload;
        },
        setUserBalancesMap: (state, action) => {
            state.userBalancesMap = action.payload;
        },
        setNumPending: (state, action) => {
            state.numPending = action.payload;
        },
        setBadgeMap: (state, action) => {
            state.badgeMap = {
                ...state.badgeMap,
                ...action.payload,
            };
        },
        setProfileInfo: (state, action) => {
            state.profileInfo = action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;
