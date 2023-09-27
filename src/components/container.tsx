//
//공통적으로 쓰이는 Container
// 

import React, { CSSProperties, ReactNode } from "react";

import { View, StyleSheet, ViewStyle } from "react-native";

import { colors } from "~/styles/globalColors";

interface RootViewProps {
    children: ReactNode;
    viewStyle?: ViewStyle ;
}


export function RootView({ children, viewStyle }: RootViewProps) {
    return (
        <View style={[styles.rootView, viewStyle]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: colors.white,
    },
});