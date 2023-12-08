export const setToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('Error in local storage', error);
    }
};

export const getFromLocalStorage = (key: string) => {
    if (localStorage.getItem(key)) {
        try {
            const data = JSON.parse(localStorage.getItem(key) || '');
            return data;
        } catch (err) {
            return localStorage.getItem(key);
        }
    }
    return null;
};

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};
