import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Input = ({
  onChange,
  value,
  onBlur,
  returnKeyType,
  returnKeyLabel,
  error,
  placeholder,
  secureText,
  inputStyle,
  keyboardType,
}) => {
  return (
    <View>
      <TextInput
        autoCapitalize={'none'}
        keyboardType={keyboardType}
        style={[styles.textInputStyle, inputStyle]}
        placeholder={placeholder}
        onChangeText={text => {
          onChange(text);
        }}
        placeholderTextColor={'grey'}
        value={value}
        onBlur={onBlur}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        secureTextEntry={secureText}
      />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInputStyle: {
    height: 60,
    marginVertical: 5,
    borderRadius: 6,
    paddingHorizontal: 10,
    // backgroundColor: "transparent",
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
  },
  errorContainer: {
    // flex: 0.1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'right',
  },
});
