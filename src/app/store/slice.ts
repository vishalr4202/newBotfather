import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getModifiedResponse = (currentAction: any) => {
    let finalState = {};
    const { error, other, token, storeKey, ...newAction } = currentAction;
    finalState = {
        [currentAction?.storeKey]: newAction
    };
    return finalState;
};

const updateIdentifiers = (state: any, payload: any) => {
    const storeKey = payload?.storeKey;
    let newData = state?.[storeKey];
    newData = { ...newData, ...payload?.uniqueScreenIdentifier };
    return {
        [storeKey]: newData
    };
};

const acgSlice = createSlice({
    name: 'acgSlice',
    initialState: {},
    reducers: {
        loadStart: (state: any) => {
            return { ...state, isLoading: true, err: null };
        },
        apiSuccess: (state: any, action: PayloadAction<any>) => {

            return {
                ...state,
                ...getModifiedResponse(action?.payload),
                isLoading: false,
                err: null
            };
        },
        apiFailed: (state: any, action: PayloadAction<any>) => {
            return {
                ...state,
                isLoading: false,
                err: action.payload,
                response: {}
            };
        },
        reset: () => {
            return {};
        },
        resetErr: (state: any) => {
            return { ...state, isLoading: false, err: null };
        },
        updateScreenIdentifiers: (state: any, action: PayloadAction<any>) => {
            return {
                ...state,
                ...updateIdentifiers(state, action?.payload),
                isLoading: false,
                err: null
            };
        },
        setStoreKey: (state: any, action: PayloadAction<any>) => {
            return { ...state, [action?.payload?.storeKey]: action?.payload?.value, isLoading: false, err: null };
        },
        resetStoreKey: (state: any, action: PayloadAction<any>) => {
            return { ...state, [action?.payload?.storeKey]: null, isLoading: false, err: null };
        },
        executeACGAction: (state: any, action: PayloadAction<any>) => {}
    }
});

export const {
    loadStart,
    apiSuccess,
    apiFailed,
    reset,
    resetErr,
    setStoreKey,
    resetStoreKey,
    executeACGAction,
    updateScreenIdentifiers
} = acgSlice.actions;
export const { reducer } = acgSlice;
