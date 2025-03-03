import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TextInputFiledProps {
    label:string
    onChangeText:(text:string)=>void
    value?:string
}

const TextInputFiled = ({label, onChangeText}:TextInputFiledProps) => {
    return (
        <View>
            <Text>
                {label}
            </Text>

            <TextInput placeholder={label}  />
        </View>
    );
}

const styles = StyleSheet.create({})

export default TextInputFiled;
