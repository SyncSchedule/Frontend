//
//Login 화면
//

import React, { useState } from "react";

import { StyleSheet, View } from "react-native";
import { router, Stack } from "expo-router";

import { RootView } from "~/components/container";
import { BasicHeader } from "~/components/header";
import { Button } from "~/components/Button";
import { BasicTextInput } from "~/components/textInput";

import { rh, rw } from "~/styles/globalSizes";


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <RootView viewStyle={styles.container}>
            <Stack.Screen options={{ header: () => <BasicHeader left="back" leftPress={() => router.back()} title=" " /> }} />

            <View style={styles.inputView}>
                <BasicTextInput value={email} onChangeText={setEmail} width={rw(298)} placeholder="이메일" />
                <BasicTextInput value={password} onChangeText={setPassword} width={rw(298)} placeholder="비밀번호" />
            </View>
            <Button title="로그인" color="dark" onPress={() => router.push('/main')} width={rw(298)} />
        </RootView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView:{
        height:rh(133),
        justifyContent:'space-between',
        marginBottom:rh(30)
    }
})