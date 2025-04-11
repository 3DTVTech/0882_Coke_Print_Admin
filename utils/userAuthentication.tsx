export const getUserToken = () => {
    if (!window.localStorage) {
        return false;
    }
    const key = process.env.USER_TOKEN_KEY;
    return window.localStorage.getItem(key as string);
};

export const setUserToken = async (token:string) => {
    if (!window.localStorage) {
        return false;
    }

    const key = process.env.USER_TOKEN_KEY;
    window.localStorage.setItem(key as string, token as string);
    return true;
};


export const removeUserToken = () => {
    if (!window.localStorage) {
        return false;
    }

    const key = process.env.USER_TOKEN_KEY;
    window.localStorage.removeItem(key as string);
    return true;
};