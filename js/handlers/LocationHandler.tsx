import * as Location from 'expo-location';

const defaultAccuracy = 3; //Accurate to within one hundred meters

async function RequestLocationPermission() {
    return await Location.requestForegroundPermissionsAsync()
}

async function FindAddress(address: string): Promise<geoLocation | undefined> {
    try {
        const locationList = await Location.geocodeAsync(address);

        const location = locationList[0];

        let { latitude, longitude } = location;

        return { latitude, longitude };
    } catch (e: any) {

        console.log(`FindingAddress failed: ${e.message}`);
        return undefined;
    }
}

async function GetCurrentLocation(): Promise<geoLocation | undefined> {
    try {
        const location = await Location.getCurrentPositionAsync({ accuracy: defaultAccuracy });

        let { latitude, longitude } = location.coords;

        return { latitude, longitude }
    } catch (e: any) {

        console.log(`GetCurrentLocation failed: ${e.message}`);
        return undefined;
    }
}

//Approximation using the "Haversine formula"
//Source: https://stackoverflow.com/a/27943
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number | undefined {
    try {
        const deg2rad = (deg: any) => {
            return deg * (Math.PI / 180)
        }

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km

        return d;
    } catch {

        return undefined;
    }
}


export const LocationHandler = {
    FindAddress,
    GetCurrentLocation,
    RequestLocationPermission,
    GetDistanceInKM: getDistanceFromLatLonInKm
}