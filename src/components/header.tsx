//
//공통적으로 쓰이는 header모아놓은 컴포넌트
//
import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { Router } from "expo-router/build/types";
import { Href } from "expo-router/build/link/href";

import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";
import { dWidth, rw, rh, rf } from "~/styles/globalSizes";


interface BasicHeaderProps {
    left: string; //back, quit
    leftPress: () => void;
    title: string;
    right?: string; //setting
    rightPress?: (href: Href) => void;
}

//기본적인 헤더 - 뒤로가기, 화면 이름, 설정 버튼 존재
export const BasicHeader = (props: BasicHeaderProps) => {
    const { left, leftPress, title, right, rightPress } = props

    return (
        <View style={[styles.container, styles.paddingBack]}>
            <TouchableOpacity onPress={leftPress}>
                <MaterialIcons name={left == "quit" ? "close" : "arrow-back-ios"} size={26} color={colors.textGrey}/>
            </TouchableOpacity>
            {title &&
                <View style={styles.titleView}>
                    <Text style={styles.title}>{title}</Text>
                </View>}
            {right == 'setting' ?
                <TouchableOpacity onPress={rightPress}>
                    <Ionicons name="settings-outline" size={30} color={colors.textGrey} />
                </TouchableOpacity>
                : <View style={{ width: 26.3 }} />
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: dWidth,
        height: rh(60),
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    paddingBack: {
        paddingHorizontal: rw(26),
    },

    titleView: {
    },

    title: {
        color: colors.black,
        fontSize: rf(25),
        fontFamily: fonts.bold,
    },
});

