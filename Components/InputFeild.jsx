import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputField = ({
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  value,
  onBlur,
  onChangeText,
  placeholdercolor,
  error,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputField}>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          autoCapitalize="none"
          
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: -5,
    marginLeft: 5,
    marginBottom: 6,
  },
  inputField: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: -20,
    marginBottom: 10,
    marginLeft: 3,
  },
});

export default InputField;
