interface geoLocation{
    latitude: number,
    longitude: number,
}

interface address {
    value: string,

    distance: number | undefined,
    geoLocation: geoLocation,
}


