import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Theme from './Theme';

interface ThemeContextType {
    theme: any;
    onChangeTheme: () => void;
}


const themeContext: ThemeContextType = {
    theme: Theme.light,
    onChangeTheme: () => {
    },
};

export const ThemeContext = React.createContext(themeContext);
