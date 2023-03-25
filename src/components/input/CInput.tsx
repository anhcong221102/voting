import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  ReturnKeyTypeOptions,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import{Text} from 'components';
import { colors, fonts } from 'assets';
import { ThemeContext } from "assets/theme/ThemeContext";
import { scale } from 'device';

type Props = {
  placeholder?: string;
  valueText?: string;
  onChangeText?: (text: string) => void;
  rightComponent?: any;
  secureTextEntry?: boolean;
  editable?: boolean;
  onPress?: () => void;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only' | undefined;
  multiline?: boolean;
  maxLength?: number;
  keyboard?: boolean;
  keyboardType?: any;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  inputStyle?: StyleProp<ViewStyle> | TextStyle | undefined;
  label?: string;
  labelStyle?: StyleProp<ViewStyle> | TextStyle | undefined;
  placeholderTextColor?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  style?: StyleProp<ViewStyle> | TextStyle | undefined;
  defaultValue?: string;
};

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CInput = forwardRef((props: Props, ref): any => {
  const { theme } = useContext(ThemeContext);
  const styles = styletheme(theme);
  const {
    onChangeText,
    rightComponent,
    secureTextEntry,
    editable = true,
    containerStyle,
    inputStyle,
    pointerEvents,
    multiline,
    maxLength,
    keyboardType = 'default',
    onSubmitEditing,
    returnKeyType,
    label,
    labelStyle,
    placeholder,
    placeholderTextColor = colors.gray,
    onFocus,
    onBlur,
    style,
    defaultValue,
    valueText,
    ...rest
  } = props;

  const inputRef = useRef<any>();
  const inputValue = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => focus(true),
    blur: () => blur(true),
    clear: clear,
    setText: setText,
    value: value,
  }));

  const focus = (ref: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onFocus && onFocus();
    if (ref) {
      inputRef.current.focus();
    }
  };
  const blur = (ref: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onBlur && onBlur();
    if (ref) {
      inputRef.current.blur();
    }
  };

  const clear = () => {
    inputValue.current = null;
    inputRef.current.clear();
  };

  const setText = (text: string) => {
    inputValue.current = text;
    inputRef.current?.setNativeProps({ text: text });
  };

  const value = () => {
    return inputValue.current;
  };

  const onChangeInputText = (text: any) => {
    onChangeText && onChangeText(text);
    inputValue.current = text;
  };

  return (
    <View style={[styles.container, style]}>
      {!!label && (
        <Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={[styles.row, containerStyle]}>
        <TextInput
          {...rest}
          allowFontScaling={false}
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          defaultValue={defaultValue}
          style={[
            styles.input,
            multiline == true ? styles.inputMultiple : { height: scale(48) },
            inputStyle,
          ]}
          onFocus={focus}
          onBlur={blur}
          onChangeText={onChangeInputText}
          secureTextEntry={secureTextEntry}
          editable={editable}
          pointerEvents={!editable ? 'none' : pointerEvents}
          multiline={multiline}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          value={valueText}
        />
        {rightComponent}
      </View>
    </View>
  );
});

export default CInput;

const styletheme =(theme:any)=> StyleSheet.create({
  container: {
    justifyContent: 'center',
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.gray,
    borderRadius: scale(5),
    borderWidth: scale(1),
    backgroundColor:colors.white
  },
  title: {
    fontSize: scale(12),
    fontFamily: fonts.TTCommons.regular,
    color: colors.gray,
  },
  input: {
    height: scale(40),
    flex: 1,
    fontFamily: fonts.TTCommons.regular,
    color: colors.textColor,
    paddingVertical: 0,
    fontSize: scale(16),
    textAlignVertical: 'center',
    paddingHorizontal: scale(16),
   
  },
  label: {
    fontFamily: fonts.TTCommons.regular,
    color: theme.title,
    fontSize: scale(18),
    marginBottom: scale(4),
  },
  inputMultiple: {
    height: scale(94),
    justifyContent: 'flex-start',
    paddingTop: scale(8),
    paddingBottom: scale(8),
    textAlignVertical: 'top',
  },
});
