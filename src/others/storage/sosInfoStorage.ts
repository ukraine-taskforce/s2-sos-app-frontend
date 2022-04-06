import {SosInfoI} from "../contexts/sosInfo";

const STORAGE_KEY = "ugtSosInfo";

export const getSosInfoStorage = () => {
    const localStorageValue = window.localStorage.getItem(STORAGE_KEY);
    if(localStorageValue) return JSON.parse(localStorageValue);

    return;
}
export const setSosInfoStorage = (sosInfo: SosInfoI) => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sosInfo));