//
//LoginSignup 부분의 메인 - Login, Sigunup 화면으로 이동 가능
//
import React from "react";

import { Button } from "react-native";
import { router } from "expo-router";

import { RootView } from "~/components/container";

const LoginSignup = () => {
    return (
        <RootView>
            <Button title="로그인" onPress={() => router.push('/loginSignup/Login')} />
            <Button title="회원가입" onPress={() => router.push('/loginSignup/Signup')} />
        </RootView>
    );
}

export default LoginSignup;