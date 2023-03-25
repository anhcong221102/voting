import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, LayoutAnimation, StatusBar } from 'react-native';
import { Button, CButton, CInput, Col, Row, Text } from 'components';
import { scale, device } from 'device';
import { colors, fonts, IconSearch, images } from 'assets';
import { navigate } from 'navigation/RootNavigation';
import { RootState } from 'redux_manager/base/allReducers';
import { useSelector } from 'react-redux';
import { Config } from 'utils';
import { ThemeContext } from 'assets/theme/ThemeContext';
import Theme from 'assets/theme/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = {
    title?: string;
    color?: string;
    themeChange?: any
}
const CHeader = ({ title, color, themeChange }: Props) => {
    const { theme, onChangeTheme } = useContext(ThemeContext);
    const onToggleTheme = async () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onChangeTheme();
    };
    const styles = style(theme);

    return (
        <View style={styles.container}>
           
            <Text bold style={styles.title}>{title}</Text>
           <View style={styles.rightHeader}>
           <Button onPress={() => onToggleTheme()} style={styles.btnRightIcon}>
                <Image source={theme.type == 'light' ? images.sun : images.moon}
                    style={styles.iconChangetheme} />
            </Button>
            <Button onPress={() => onToggleTheme()} style={styles.btnProfile}>
                <Image source={images.user}
                    style={styles.iconUser} />
            </Button>
        
           </View>
        </View>
    );
};

export default CHeader;
const style = (theme: any) => StyleSheet.create({
    container:{
        paddingHorizontal: scale(15),
        marginTop: scale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: colors.line,
        borderBottomWidth: scale(1),
        paddingBottom: scale(15),
    },
    btnRightIcon: {
        width: scale(30),
        height: scale(30),
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    iconChangetheme: {
        width: scale(30),
        height: scale(30),
        resizeMode: 'contain',

    },
    title:{
        fontSize: scale(22),
        color:theme.title,


    },
    rightHeader:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    btnProfile:{
        width:scale(30),
        height:scale(30),
        borderRadius:scale(30),
        borderWidth:scale(1),
        borderColor:colors.mainColor,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:scale(15),
        marginRight:scale(6)
    },
    iconUser:{
        width:scale(18),
        height:scale(18),
        resizeMode:'contain',
 
    }
    

});