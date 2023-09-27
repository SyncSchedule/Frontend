//
//메인화면 - 프로젝트 화면
//
import React from "react";

import { Button } from "react-native";
import { router } from "expo-router";

import { RootView } from "~/components/container";

const projectName = 'testProject'

const ProjectScreen = () => {
    return (
        <RootView>
            <Button title="프로젝트 상세" onPress={() => router.push(`/main/project/${projectName}`)} />
            <Button title="프로젝트 추가" onPress={() => router.push('/add/project')} />
        </RootView>
    );
}

export default ProjectScreen;