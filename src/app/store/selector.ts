import { createSelector } from '@reduxjs/toolkit';

export const selectAcg = (state: { acgSlice: any }) => state.acgSlice || {};
export const acgSelector = () => createSelector(selectAcg, (acgState:any) => acgState);
