import { colors, fonts } from 'assets';
import { scale } from 'device';
import React, { useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import DropDownPicker, {
  ItemType,
  SchemaInterface,
  ValueType,
} from 'react-native-dropdown-picker';

interface Props {
  schema?: Partial<SchemaInterface>;
  label?: string;
  style?: StyleProp<ViewStyle> | undefined;
  multiple?: boolean;
  // openValidate?: boolean;
  value: ValueType | any;
  items: ItemType[] | any;
  setValue?: any;
  setItems?: (data: any) => void;
  onChangeItem: (data: any) => void;
  min?: number;
  max?: number;
  placeholder: string;
  dropDownDirection?: 'DEFAULT' | 'TOP' | 'BOTTOM' | 'AUTO';
  searchable?: boolean;
  error?: string;
  zIndex?: number;
}

const FieldSelectDown = ({
  label,
  placeholder,
  items,
  value,
  schema,
  setValue,
  onChangeItem,
  setItems,
  style,
  multiple,
  min,
  max,
  dropDownDirection,
  searchable,
  error,
  zIndex,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        mode="SIMPLE"
        categorySelectable={true}
        searchable={searchable}
        zIndex={zIndex}
        placeholder={placeholder}
        placeholderStyle={{
          color: 'gray',
        }}
        schema={schema}
        onSelectItem={(value: any) => onChangeItem(value)}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={multiple}
        min={min}
        max={max}
        dropDownDirection={dropDownDirection ? dropDownDirection : 'TOP'}
        containerStyle={{
          height: scale(48),
        }}
        style={styles.selectDown}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default React.memo(FieldSelectDown);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: scale(8),
  },

  label: {
    fontFamily: fonts.TTCommons.regular,
    color: colors.cB2B2B2,
    fontSize: scale(14),
    marginBottom: scale(4),
  },
  selectDown: {
    width: '100%',
    borderRadius: scale(5),
    borderWidth: 1,
    borderColor: colors.cDFBC79,
    paddingHorizontal: scale(16),
    height: scale(48),
  },
  dropDownContainerStyle: {
    backgroundColor: 'white',
    borderColor: '#DFDFDF',
  },
  error: {
    marginTop: 16,
    color: colors.red,
  },
});
