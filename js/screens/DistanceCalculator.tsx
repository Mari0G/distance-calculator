import React, { Component } from "react";

import { Alert, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { StorageHandler } from "../handlers/StorageHandler";
import AddressField from "../components/AddressField";
import defaultStyles, { GetDisplayWidthPercentage } from "../defaultStyles";
import { LocationHandler } from "../handlers/LocationHandler";

const AddressCount = 4;

export default class DistanceCalculator extends Component {
    state = {
        addressList: new Array<address>(),
        closestAddressIndex: undefined,
        isCalculating: false,
    }

    _saveAddress = async (newAddress: address, index: number) => {
        var updatedAddressList = [...this.state.addressList];

        updatedAddressList[index] = newAddress;

        this.setState({ addressList: updatedAddressList, closestAddressIndex: undefined });
        await StorageHandler.SaveAddressList(updatedAddressList);
    }

    _loadAddressList = async () => {
        var newList = new Array<address>();
        const savedList = await StorageHandler.LoadAddressList();

        if (savedList)
            newList = [...savedList]; //apply saved addresses

        const diff = AddressCount - newList.length; //amount of missing addresses

        if (diff > 0) {

            for (var i = 0; i < diff; i++) {
                let emptyAddress: address = { value: undefined, geoLocation: { latitude: 0, longitude: 0 }, distance: undefined };

                newList.push(emptyAddress);
            }
        }

        this.setState({ addressList: newList });
    }

    componentDidMount() {

        this._loadAddressList(); //load addressList from local storage
    }

    _findClosestAddress = async () => {
        try {
            var closestAddressIndex;
            var validAddresses = this.state.addressList.filter((address) => address.value !== undefined);

            if (validAddresses.length < 1)
                throw { message: 'You must enter atleast one valid address!' };

            const currentLocation = await LocationHandler.GetCurrentLocation();
            if (!currentLocation)
                throw { message: 'Unable to get current location, retry later!' };

            validAddresses.map((address) => {
                const distance = LocationHandler.GetDistanceInKM(
                    currentLocation.latitude, currentLocation.longitude,
                    address.geoLocation!.latitude, address.geoLocation!.longitude
                );

                address.distance = distance;

                console.log(`distance to: ${address.value}   = ${distance}`);
            });

            const closestAddress = validAddresses.find(addr => {
                return validAddresses.every(validAddr => {  //find address with smallest distance so we don´t have to sort
                    return (addr.distance as number) <= (validAddr.distance as number)
                })
            })

            closestAddressIndex = this.state.addressList.findIndex(addr => addr == closestAddress);

        } catch (e: any) {
            Alert.alert(e.message);
        }
        finally {
            this.setState({ isCalculating: false, closestAddressIndex });
        }
    }

    _renderResult() {
        if (this.state.isCalculating)
            return <View>
                <ActivityIndicator size={'large'} color={defaultStyles.colors.text} />
                <Text style={styles.text}> Calculating closest location... </Text>
            </View>

        if (this.state.closestAddressIndex === undefined || !this.state.addressList)
            return null;

        const closest = this.state.addressList[this.state.closestAddressIndex];

        const displayedValue = (closest.distance! < 1) ? (closest.distance! * 1000).toPrecision(3) : closest.distance?.toPrecision(4);
        const displayedUnit = (closest.distance! < 1) ? 'm' : 'km';

        return (
            <View>
                <Text style={styles.text}>{`The closest address to your location is: \n`}</Text>
                <Text style={styles.text}> {`${closest.value} => ${displayedValue} ${displayedUnit}`} </Text>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ width: '100%' }} >
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}> {`Enter up to ${AddressCount} addresses`} </Text>
                            <Text style={styles.headerText}> {`to find the closest Location !`} </Text>
                        </View>

                        {this.state.addressList.map((address: address, i: number) => {

                            return <AddressField index={i} initialValue={address.value} saveAddress={this._saveAddress} key={i} />
                        })}
                    </View>

                    <TouchableOpacity style={styles.button}
                        onPress={this.state.isCalculating ? undefined : () => { this.setState({ isCalculating: true }, this._findClosestAddress) }}>
                        <Text style={styles.buttonText}> Start </Text>
                    </TouchableOpacity>

                    <View style={styles.resultContainer}>
                        {this._renderResult()}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        marginVertical: '10%',
    },
    headerText: {
        alignSelf: 'center',
        color: defaultStyles.colors.text,
        fontWeight: 'bold',
    },
    upperContainer: {

    },
    resultContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        height: '25%',
    },
    button: {
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        backgroundColor: defaultStyles.colors.backgroundComp,
        borderRadius: 50,
        aspectRatio: 1,
        width: '25%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: defaultStyles.colors.text,
    },
    text: {
        textAlign: 'center',
        color: defaultStyles.colors.text,
    }
});