# distance-calculator

This is a small *React Native* App that lets the user enter up to four addresses to find the closest of those addresses. It was coded for demonstrational purposes.

![image](/assets/example.png)

The App supports both Android & iOS and was developed using **Expo managed workflow**.

Features:
- Automatic validation of addresses
- Support for dark and light colorschemes
- Calculating the closest address and displaying the calculated distance
- Saving addresses locally

# how it works

1. Addresses are geocoded to GPS coordinates via expo-location SDK
2. Distances are then calculated via *Haversine´s formula*

This means that all distances are "air" distances.

You can preview the App on your own *Android* device using *expo go*
by installing it from [*Google Playstore*](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=de&gl=US)
and following the [instructions here](https://expo.dev/%40mari0g/distance-calculator?serviceType=classic&distribution=expo-go&releaseChannel=default).
