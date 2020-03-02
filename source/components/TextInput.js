import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const CustomTextInput = ({
  placeholder,
  onNext,
  maxLength = 200,
  keyboardType = 'default',
}) => {
  const [get, set] = useState();
  const checkNumber = number => {
    const pattern = /^\d{10}$/;
    return pattern.test(number);
  };
  const checkEmail = email => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
  };
  const next = (placeholder, get) => {
    if (placeholder === 'Enter email') {
      checkEmail(get)
        ? onNext(placeholder, get)
        : alert(`${placeholder} field data is not valid`);
    } else if (placeholder === 'Enter phone') {
      checkNumber(get)
        ? onNext(placeholder, get)
        : alert(`${placeholder} field data is not valid`);
    } else {
      onNext(placeholder, get);
    }
  };
  return (
    <View style={{flex: 1, top: '30%'}}>
      <View style={{paddingHorizontal: 30}}>
        <TextInput
          placeholder={placeholder}
          onChangeText={text => set(text)}
          keyboardType={keyboardType}
          maxLength={maxLength}
          underlineColorAndroid={'red'}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          height: 50,
          width: 150,
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          onPress={() =>
            get
              ? next(placeholder, get)
              : alert(`${placeholder} field Must not be empty.`)
          }>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTextInput;
