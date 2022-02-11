import React, { Component } from "react";

import {View, Text,  StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AddressField from "../components/AddressField";
import defaultStyles from "../defaultStyles";

const AddressCount = 4;

export default class DistanceCalculator extends Component {
    state = {
        addressList: new Array<address>()
    }

    _saveAddress = (newAddress: address, index: number) => {
        var updatedAddressList = [...this.state.addressList];

        updatedAddressList[index] = newAddress;
        this.setState({addressList: updatedAddressList});
     }

    componentDidMount() {
        //load addressList from local storage
        
        
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> {`Enter up ${AddressCount} to addresses`} </Text>
                    <Text style={styles.headerText}> {`to find the closest Location !`} </Text>
                    
                </View>

                <AddressField  />
                <AddressField initialValue="Kegelbahnstraße, 54516, Wittlich" saveAddress={this._saveAddress} index={1} />
                <AddressField  />
                <AddressField  />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    header: {
        marginVertical: '10%',
    },
    headerText: {
        alignSelf: 'center',
        color: defaultStyles.colors.text,
        fontWeight: 'bold',
    }

});