//
//메인화면 - 홈화면
//
import React from "react";

import { Button } from "react-native";
import { router } from "expo-router";

import { RootView } from "~/components/container";

const testSchedule= 'testSchedule'

const HomeScreen = () => {
    return (
        <RootView>
            <Button title="일정 정보" onPress={()=>router.push(`/main/home/${testSchedule}`)}/>
            <Button title="일정 추가" onPress={()=>router.push('/add/schedule')}/>
            <Button title="드로어" onPress={()=>router.push('/drawer')}/>
        </RootView>
    );
}

export default HomeScreen;