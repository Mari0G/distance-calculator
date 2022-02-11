import { Appearance, Dimensions } from 'react-native';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

const darkColors = {
    background: 'black',
    backgroundComp: '#212929',
    border: 'darkgray',
    text: 'gray',
    placerHolderText: '#37393b',
}

const lightColors = {
    background: 'white',
    backgroundComp: 'lightsteelblue',
    border: 'dimgray',
    text: 'black',
    placerHolderText: '#4c4f52',
}

const defaultStyles = {
    colors: (Appearance.getColorScheme() === 'light') ? lightColors : darkColors,
}

export default defaultStyles;

export function GetDisplayWidthPercentage(percentage: number) {
    return (displayWidth / 100) * percentage;
}

export function GetDisplayHeigthPercentage(percentage: number) {
    return (displayHeight / 100) * percentage;
}