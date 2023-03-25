import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {scale} from "device";
import {colors} from "assets";

interface Props {
    onToggleSwitch?: (state: boolean) => void,
    initialState: boolean,
    activeTitle?: string,
    inActiveTitle?: string,
    disabled?: boolean
}

const CSwitch = (
    {
        onToggleSwitch,
        initialState = true,
        activeTitle = 'Yes',
        inActiveTitle = 'No',
        disabled = false
    }: Props) => {
    const [isActive, setIsActive] = useState<boolean>(initialState);
    const translateX = useRef(new Animated.Value(initialState ? 1 : 0)).current;

    const onPress = () => {
        Animated.timing(
            translateX,
            {
                toValue: isActive ? 0 : 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            onToggleSwitch && onToggleSwitch(!isActive);
            setIsActive(active => !active);
        }, 200);
    }

    useEffect(() => {

    }, [isActive])

    return (
        <View style={[styles.container, {backgroundColor: isActive ? colors.mainColor : colors.white}]}>
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.5}
                onPress={onPress}
                style={styles.row}>
               {/*  <View style={styles.textContainer}>
                    <Animated.Text
                        style={[
                            styles.text, {
                                marginLeft: scale(5),
                                color: colors.inkBasic,
                                opacity: translateX
                            }]}>{activeTitle}</Animated.Text>
                </View> */}
                <Animated.View style={[styles.circle, {
                    transform: [
                        {
                            translateX: translateX.interpolate({
                                inputRange: [0, 1],
                                outputRange: [scale(-2), scale(22)]
                            })
                        }
                    ]
                }]}/>
                {/* <View style={styles.textContainer}>
                    <Animated.Text
                        style={[styles.text, {
                            marginRight: scale(5),
                            opacity: translateX.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            })
                        }]}>{inActiveTitle}</Animated.Text>
                </View> */}
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(CSwitch, () => true);

const styles = StyleSheet.create({
    container: {
        width: scale(51),
        height: scale(26),
        borderRadius: scale(24),
        padding: scale(3),
    },
    circle: {
        width: scale(24),
        height: scale(24),
        backgroundColor: colors.white,
        borderRadius: scale(24),
        shadowColor: 'rgba(0, 35, 11, 0.2)',
        shadowOffset: {
            width: 0,
            height: scale(2)
        },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 3,
        position: 'absolute',
        top: scale(-2)
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.white
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    }
})
