//
//Signup 화면
//

import React, { useState } from "react";

import { StyleSheet, View } from "react-native";
import { router, Stack } from "expo-router";

import { RootView } from "~/components/container";
import { BasicHeader } from "~/components/header";
import { Button } from "~/components/Button";
import { BasicTextInput } from "~/components/textInput";

import { rh, rw } from "~/styles/globalSizes";

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    return (
        <RootView viewStyle={styles.container}>
            <Stack.Screen options={{ header: () => <BasicHeader left="back" leftPress={() => router.back()} title=" " /> }} />

            <View style={styles.inputView}>
                <BasicTextInput value={email} onChangeText={setEmail} width={rw(298)} placeholder="이메일" />
                <BasicTextInput value={password} onChangeText={setPassword} width={rw(298)} placeholder="비밀번호" />
                <BasicTextInput value={name} onChangeText={setName} width={rw(298)} placeholder="이름" />
            </View>
            <Button title="회원가입" color="dark" onPress={() => router.push('/main')} width={rw(298)} />
        </RootView>
    );
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        height: rh(216),
        justifyContent: 'space-between',
        marginBottom: rh(30)
    }
})