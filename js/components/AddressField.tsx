import React, { Component } from "react";

import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { LocationHandler } from '../handlers/LocationHandler';
import defaultStyles, { GetDisplayWidthPercentage } from "../defaultStyles";

interface AddressFieldProps {
    index: number,
    initialValue?: string,
    saveAddress: (data: address, index: number) => void,
}

export default class AddressField extends Component<AddressFieldProps> {
    state = {
        addressValue: this.props.initialValue,
        isValid: (this.props.initialValue) ? true : undefined,
    }

    _validateAddress = async () => {
        let { saveAddress, index } = this.props;
        let { addressValue } = this.state;
        var isValid = false;

        await LocationHandler.RequestLocationPermission();

        const result = await LocationHandler.FindAddress(addressValue as string);

        if (result) {
            isValid = true;

            let address: address = { value: addressValue as string, geoLocation: result, distance: undefined };
            saveAddress(address, index);
        } else {
            let address: address = { value: undefined, geoLocation: undefined, distance: undefined };
            saveAddress(address, index);
        }

        this.setState({ isValid });
    }

    _renderIcon() {
        if (this.state.isValid === undefined)
            return null;

        if (this.state.isValid)
            return <MaterialCommunityIcons name="check-bold" size={GetDisplayWidthPercentage(8)} color="green" />
        else
            return <Entypo name="squared-cross" size={GetDisplayWidthPercentage(8)} color="red" />
    }

    render() {
        const { addressValue } = this.state;

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={addressValue}
                    onChangeText={(text) => this.setState({ addressValue: text })}
                    onEndEditing={this._validateAddress}
                    placeholder='Street, 12345, City, Country'
                    placeholderTextColor={defaultStyles.colors.placerHolderText} />


                <View style={styles.iconContainer}>
                    {this._renderIcon()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: GetDisplayWidthPercentage(80),
        marginBottom: '5%',
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
    },
    iconContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: GetDisplayWidthPercentage(10),
        aspectRatio: 1,
    },
    input: {
        color: defaultStyles.colors.text,
        height: '100%',
        width: '100%',
        flexShrink: 1,
        paddingHorizontal: '2.5%',
    }
});