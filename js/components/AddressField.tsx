import React, { Component } from "react";

import { View ,StyleSheet, TextInput} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import {LocationHandler} from '../handlers/LocationHandler';
import defaultStyles from "../defaultStyles";

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
        let {saveAddress, index} = this.props;
        let {addressValue} = this.state; 
        var isValid = false;

        const result = await LocationHandler.FindAddress(addressValue as string);

        if (result) {
            isValid = true;

            let address: address = { value: addressValue as string, geoLocation: result, distance: undefined };
            saveAddress(address, index);
        }
        
        this.setState({isValid});
    }

    _renderIcon() {
        if (this.state.isValid === undefined)
            return null;

        if (this.state.isValid)
            return <MaterialCommunityIcons name="check-bold" size={32} color="green" />
        else
            return <Entypo name="squared-cross" size={32} color="red" />
    }

    render() {
        const {addressValue} = this.state;

        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={addressValue}
                    onChangeText={(text) => this.setState({addressValue: text})}
                    onEndEditing={this._validateAddress}
                    placeholder='Street A, 00000, City, Country'/>

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
        //justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginBottom: '5%',
        marginLeft: '15%',
    },
    iconContainer: {
        marginLeft: '2.5%',
        width: 36,
        height: 36,
    },
    input: {
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        color: defaultStyles.colors.text,
        width: '75%',
        padding: '2.%',
        //flexShrink: 1,
    }
});