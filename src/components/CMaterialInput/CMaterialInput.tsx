import React, {useState, useRef, useContext, forwardRef, useImperativeHandle, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ReturnKeyTypeOptions,
    Platform,
    UIManager,
    LayoutAnimation,
    ViewProps
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
    TextField,
} from 'rn-material-ui-textfield';
import {scale} from "device";
import {colors, fonts, textStyles} from "assets";

type Props = {
    label?: string;
    onChangeText?: (text: string) => void;
    rightComponent?: any;
    secureTextEntry?: boolean;
    editable?: boolean;
    onPress?: () => void;
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only' | undefined;
    style?: any;
    multiline?: boolean,
    maxLength?: number,
    keyboard?: boolean,
    keyboardType?: any,
    onSubmitEditing?: () => void,
    returnKeyType?: ReturnKeyTypeOptions,
    styleInput?: any,
    isRequired?: boolean,
};

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
const CMaterialInput = forwardRef((props: Props, ref): any => {

    const insets = useSafeAreaInsets();
    const {
        label,
        onChangeText,
        rightComponent,
        secureTextEntry,
        editable,
        onPress,
        pointerEvents,
        style,
        multiline,
        maxLength,
        keyboard,
        keyboardType,
        onSubmitEditing,
        returnKeyType,
        styleInput,
        isRequired = false,
    } = props;
    const [isFocus, setFocus] = useState(false);
    const [isText, setIsText] = useState(false);
    const [isShowError, setShowError] = useState<boolean>(false);
    const [errorTextString, setErrorText] = useState<any>('');

    useImperativeHandle(ref, () => ({
        focus: () => onFocus(true),
        blur: () => onBlur(true),
        clear: clear,
        setText: setText,
        value: value,
        setError: setError
    }));

    const setError = (text: string) => {
        setErrorText(text);
        setShowError(true);
    }

    const inputRef = useRef<any>();

    useEffect(() => {
        if(isFocus){
            setShowError(false);
            setErrorText(null)
        }
    }, [isFocus]);

    const setText = (text: string) => {
        inputRef.current.setValue(text);
        if (!!text && !isText) {
            setIsText(true);
        } else if (!text && isText) {
            setIsText(false);
        }
    }

    const value = () => {
        return inputRef.current.value();
    }

    const onFocus = (ref: any) => {
        setFocus(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (ref) {
            inputRef.current.focus();
        }
    };
    const onBlur = (ref: any) => {
        setFocus(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (ref) {
            inputRef.current.blur();
        }
    };

    const clear = () => {
        inputRef.current.clear();
    }

    const onChangeTextInput = (text: string) => {
        onChangeText && onChangeText(text);
        if (!!text && !isText) {
            setIsText(true);
        } else if (!text && isText) {
            setIsText(false);
        }
    }

    return (
        <>
        <View style={[styles.container, {borderColor: isShowError ? '#E3121D' : isFocus ? colors.primary : '#C4CDD5'}, style]}>
            <TextField
                allowFontScaling={false}
                fontSize={scale(16)}
                labelFontSize={scale(12)}
                ref={inputRef}
                pointerEvents={pointerEvents}
                editable={editable}
                // @ts-ignore
                label={isRequired ? <Text>{label}<Text style={{color: '#e3111e'}}>*</Text></Text> : label}
                labelTextStyle={[styles.labelTextStyle, {fontWeight: (isFocus || isText) ? '400' : '600', fontFamily: (isFocus || isText) ? fonts.TTCommons.regular : fonts.TTCommons.demiBold}]}
                multiline={multiline}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={maxLength}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                onChangeText={onChangeTextInput}
                style={[styles.input, multiline && styles.multiline, styleInput]}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboard == true ? 'numeric' : keyboardType ? keyboardType : 'default'}
                tintColor={colors.inkLighter}
                baseColor={colors.inkLighter}
                activeLineWidth={0}
                disabledLineWidth={0}
                lineWidth={0}
                inputContainerStyle={[styles.inputContainerStyle, multiline && {
                    height: 'auto',
                    paddingBottom: scale(24)
                }]}
                containerStyle={[styles.containerStyle, multiline && {height: 'auto'}]}
                labelOffset={{
                    y0: Platform.OS === 'ios' ? scale(-14) : scale(-12),
                    x0: scale(16),
                    x1: scale(22),
                    y1: scale(-10)
                }}
                renderRightAccessory={() => rightComponent}
            />
        </View>
            {
                !!errorTextString && isShowError && <Text style={styles.errorText}>{errorTextString}</Text>
            }
        </>
    );
});

export default CMaterialInput;

const styles = StyleSheet.create({
    container: {
        borderWidth: scale(1),
        borderTopLeftRadius: scale(8),
        borderTopRightRadius: scale(8),
        borderBottomRightRadius: scale(8),
        justifyContent: 'center',
    },
    input: {
        fontFamily: fonts.TTCommons.regular,
        color: colors.inkBasic,
        paddingVertical: 0,
        fontSize: scale(16),
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        paddingHorizontal: scale(16),

    },
    inputContainerStyle: {
        backgroundColor: 'transparent',
        height: scale(56),
        paddingVertical: 0
    },
    containerStyle: {
        height: scale(56),
        paddingVertical: 0,
    },
    labelTextStyle: {
        fontFamily: fonts.TTCommons.demiBold,
    },
    multiline: {
        textAlignVertical: 'top',
        marginTop: scale(-15),
        height: scale(90),
        lineHeight: scale(22)
    },
    errorText: {
        color: '#E3121D',
        marginTop: scale(8)
    }
})
