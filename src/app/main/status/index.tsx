//
//메인화면 - 현황 화면
//
import React from "react";

import { Button } from "react-native";
import { router } from "expo-router";

import { RootView } from "~/components/container";

const statusName = 'testStatus'

const StatusScreen = () => {
    return (
        <RootView>
            <Button title="현황 상세" onPress={() => router.push(`/main/status/${statusName}`)} />
            <Button title="일정 확정" onPress={() => router.push(`/main/status/FixStatus`)} />
        </RootView>
    );
}

export default StatusScreen;