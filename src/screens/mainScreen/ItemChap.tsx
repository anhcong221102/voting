import { useRoute } from '@react-navigation/core';
import { colors } from 'assets';
import { ThemeContext } from 'assets/theme/ThemeContext';
import { Button, Text } from 'components';
import { scale, device } from 'device';
import React, { useContext, useState } from 'react';
import { ScrollView, View, Animated, StyleSheet } from 'react-native'


interface Props {

    index: number;
    data: any;
    theme: any;
    sizeFonts: number

}

function ItemChap({ index, data, theme, sizeFonts
}: Props) {
    const style = styles(theme);
    return (
        <View style={{ width: device.w }}>
            <View >
                 <Text semiBold style={style.title}>{data?.title}</Text> 
                <View style={{}}>
                    <Text style={[style.textContent,
                    {
                        fontSize: scale(sizeFonts),
                        lineHeight: scale(sizeFonts + 8)
                    }]}>{data?.contentChap}</Text>
                </View>
            </View>

        </View>
    );
}

export default React.memo(ItemChap);
const styles = (theme: any) => StyleSheet.create({
    textContent: {
        fontSize: scale(22),
        lineHeight: scale(30),
        textAlign: 'justify',
        paddingHorizontal: scale(20),
        color: theme.title
    },
    title: {
        fontSize: scale(25),
        textAlign: 'center',
        marginBottom: scale(15),
        color: theme.title
    }

});