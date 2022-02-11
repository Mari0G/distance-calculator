import * as Location from 'expo-location';

const defaultAccuracy = 3; //Accurate to within one hundred meters

async function FindAddress(address: string): Promise<geoLocation | undefined> {
    try {
        const locationList = await Location.geocodeAsync(address);

        const location = locationList[0];

        let {latitude, longitude} = location;

        return {latitude, longitude};
    } catch (e: any) {

        console.log(`FindingAddress failed: ${e.message}`);
        return undefined;
    }
}

async function GetCurrentLocation(): Promise<geoLocation | undefined> {
    try {
        const location = await Location.getCurrentPositionAsync({accuracy: defaultAccuracy});

        let {latitude, longitude} = location.coords;

        return {latitude, longitude}
    } catch (e: any) {

        console.log(`GetCurrentLocation failed: ${e.message}`);    
        return undefined;
    }
}

export const LocationHandler = {
    FindAddress,
    GetCurrentLocation,
}