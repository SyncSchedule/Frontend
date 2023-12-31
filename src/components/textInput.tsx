//
//공통적으로 쓰이는 textInput
//
import React, { Dispatch, SetStateAction, useState } from "react";

import { TextInput, StyleSheet, View, Text, TextStyle, ViewStyle } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";
import { rh, rw, rf} from "~/styles/globalSizes";


interface BasicTextInputProps {
    value: string;
    onChangeText: Dispatch<SetStateAction<string>>;
    width?: number;
    inputStyle?: TextStyle;
    password?: boolean;
    dark?: boolean;
    placeholder?:string;
}

interface LabelTextInputProps {
    value: string;
    onChangeText: (text: string) => void;//Dispatch<SetStateAction<string>>;
    label: string;
    width?: number;
    inputViewStyle?: ViewStyle;
    inputStyle?: TextStyle;
    dark?: boolean;
    placeholder?: string;
}


//기본 TextInput
export const BasicTextInput = (props: BasicTextInputProps) => {
    const { width, inputStyle, password, dark, ...restProps } = props

    const [secureMode, setSecureMode] = useState(true)
    return (
        <View style={[styles.input, dark ? styles.dark : styles.light, { width, flexDirection: 'row' }]}>
            <TextInput
                style={[{ flex: 1 }, inputStyle]}
                secureTextEntry={password && secureMode ? true : false}
                editable={dark ? false : true}
                {...restProps}
            />
            {password &&
                (secureMode
                    ? <Ionicons name="eye-off" size={22} color={colors.borderGrey} onPress={() => setSecureMode(!secureMode)} />
                    : <Ionicons name="eye" size={22} color={colors.borderGrey} onPress={() => setSecureMode(!secureMode)} />
                )
            }
        </View>
    )
}

//label있는 TextInput
export const LabelTextInput = (props: LabelTextInputProps) => {
    const { label, width, inputViewStyle, inputStyle, dark, ...restProps } = props
    return (
        <View style={inputViewStyle}>
            <Text style={styles.labelText}>{label}</Text>
            <View style={[styles.input, dark ? styles.dark : styles.light, { width: width, flexDirection: 'row' }]}>
                <TextInput
                    style={[{ flex: 1 }, inputStyle]}
                    editable={dark ? false : true}
                    {...restProps}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: rf(50),
        padding: rw(12),

        borderRadius: 10,
        marginVertical: rh(6),
    },

    light: {
        backgroundColor: colors.white,
        borderWidth: rw(1),
        borderColor: colors.textGrey,
    },

    dark: {
        backgroundColor: colors.placeHolderGrey,
    },

    labelText: {
        fontFamily: fonts.bold,
        fontSize: rf(20),
        color: colors.black,
    },
});