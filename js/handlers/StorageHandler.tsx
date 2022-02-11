import AsyncStorage from '@react-native-async-storage/async-storage';

async function SaveAddressList(addressList: address[]) {
    try {
        const value = JSON.stringify(addressList);

        await AsyncStorage.setItem('addressList', value);

    } catch (e: any) {

    }
}

async function LoadAddressList(): Promise<address[] | undefined> {
    try {

        const valueString = await AsyncStorage.getItem('addressList');

        if (!valueString)
            return undefined;

        return JSON.parse(valueString);

    } catch (e: any) {
        return undefined;
    }
}

export const StorageHandler = {
    SaveAddressList,
    LoadAddressList
};