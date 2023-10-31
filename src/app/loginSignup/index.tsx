//
//LoginSignup 부분의 메인 - Login, Sigunup 화면으로 이동 가능
//
import React from "react";

import { Image, StyleSheet, View } from "react-native";
import { Stack, router } from "expo-router";

import { RootView } from "~/components/container";
import { Button } from "~/components/Button";

import { rh, rw } from "~/styles/globalSizes";

const LOGO = require('~/assets/Logo.png');

const LoginSignup = () => {
    return (
        <RootView viewStyle={styles.container}>
            <Stack.Screen options={{ headerShown:false }}/>

            <Image source={LOGO} />
            
            <View style={styles.btnView}>
                <Button title="로그인" color="dark" onPress={() => router.push('/loginSignup/Login')} width={rw(320)} />
                <Button title="회원가입" color="dark" onPress={() => router.push('/loginSignup/Signup')} width={rw(320)} />
            </View>
        </RootView>
    );
}

export default LoginSignup;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: rh(339),
    },
    btnView:{
        height:rh(123),
        justifyContent:'space-between',
        marginTop: rh(157),
    }
})