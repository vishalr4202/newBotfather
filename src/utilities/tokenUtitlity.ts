import { setToLocalStorage, getFromLocalStorage } from './storageUtility';

export const setJWTToken = (token: string): void => {
    setToLocalStorage('token', token);
};
export const setRole = (role:string): void => {
    setToLocalStorage('role',role)
}

export const getJWTToken = (): string => {
    return getFromLocalStorage('token') || '';
};
