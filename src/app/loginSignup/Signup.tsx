//
//Signup 화면
//

import React from "react";

import { Button } from "react-native";
import { router } from "expo-router";

import { RootView } from "~/components/container";

const SignupScreen = () => {
    return (
        <RootView>
            <Button title="메인화면" onPress={() => router.push('/main')} />
        </RootView>
    );
}

export default SignupScreen;