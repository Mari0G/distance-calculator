interface geoLocation {
    latitude: number,
    longitude: number,
}

interface address {
    value: string | undefined,

    distance: number | undefined,
    geoLocation: geoLocation | undefined,
}


