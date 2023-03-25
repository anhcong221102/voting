import React, {useState, useRef, useEffect, forwardRef, useMemo, useImperativeHandle} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {CTabRoute} from "components/CTab/CTabRoute";
import {device, scale} from "device";
import {colors, fonts, textStyles} from "assets";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {MaterialTopTabBarProps} from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import {StackParamList} from "navigation/ScreenProps";
import {useNavigation} from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator<StackParamList>();

interface CTabProps {
    data: any,
    onChangeIndex?: (index: number) => void,
    swipeEnabled?: boolean,
    tabBarPosition?: any,
    renderTabBar?: any,
    lazyPreloadDistance?: any,
    lazy?: boolean,
    screenOptions?: any,
    initialRouteName?: string,
    style?: any
}

const CTab2 = forwardRef((props: CTabProps, ref) => {

    const {
        data,
        swipeEnabled = true,
        lazyPreloadDistance,
        lazy = true,
        screenOptions,
        initialRouteName,
        tabBarPosition = 'top',
        style,
    } = props;

    const navigation = useNavigation();

    useImperativeHandle(ref, () => ({
        jumpTo: jumpTo,
    }));

    const jumpTo = (index: number) => {
        if (data && data.length > 0 && data[index] && data[index].title) {
            navigation.jumpTo(data[index].title);
        }
    };


    const MyTabBar = ({state, descriptors, navigation, position}: MaterialTopTabBarProps) => {
        return (
            <View style={styles.tabBarContainer}>
                {state.routes.map((route, index) => {
                    const label = route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({name: route.name, merge: true});
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            onLongPress={onLongPress}
                            onPress={onPress}>
                            <View
                                style={[styles.tab, {width: scale(375 - 16 * 2) / data.length}, isFocused && styles.tabBarActive]}>
                                <Text style={[styles.tabBarTitle, isFocused && styles.tabBarActive, {borderBottomWidth: 0}]}>{label}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <Tab.Navigator
            initialRouteName={initialRouteName}
            initialLayout={{width: device.w}}
            tabBarPosition={tabBarPosition}
            style={style}
            screenOptions={{
                lazy: lazy,
                swipeEnabled: swipeEnabled,
                lazyPreloadDistance: lazyPreloadDistance,
                ...screenOptions
            }}
            tabBar={(props: MaterialTopTabBarProps) => <MyTabBar {...props} />}>
            {
                data.map((tab: CTabRoute, index: number) => {
                    return <Tab.Screen key={index} name={tab.title} component={tab.screen} options={tab.options}/>;
                })
            }
        </Tab.Navigator>
    )
});

export default CTab2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(45),
    },
    tabBarTitle: {
        fontFamily: fonts.TTCommons.demiBold,
        fontSize: scale(18),
        color: colors.cB1B1B1,
        lineHeight: Platform.select({
            ios: scale(18),
            android: scale(18)
        }),
    },
    tabBarActive: {
        backgroundColor: 'transparent',
        color: colors.c262421,
        borderBottomWidth: scale(2),
        borderBottomColor: colors.c262421,
        marginTop: scale(2)
    },
    tabBarContainer: {
        width: scale(375),
        height: scale(47),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: scale(1),
        borderBottomColor: colors.cB1B1B1,
    }
});
