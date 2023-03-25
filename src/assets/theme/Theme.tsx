import {colors} from 'assets';

const LightTheme = {
    type: 'light',
    primary: colors.mainColor,
    backgroundColor: colors.white,
    title: colors.textColor,
    header: {
        backgroundColor: colors.white
    },
    barStyle: 'dark-content', 
    indicator: colors.black,
}

const DarkTheme = {
    type: 'dark',
    primary: colors.mainColor,
    backgroundColor: colors.textColor,
    title: colors.white,
    header: {
        backgroundColor: colors.textColor
    },
    barStyle: 'light-content', 
    indicator: colors.bgContent,
};

const Theme = {
    light: LightTheme,
    dark: DarkTheme,
};

export default Theme;
