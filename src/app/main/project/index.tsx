//
//메인화면 - 프로젝트 화면
//
import React, { useEffect, useState } from "react";

import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { useRecoilState, useRecoilValue } from 'recoil';
import { AntDesign } from '@expo/vector-icons';
import { rw, rh, rf } from "~/styles/globalSizes";
import { RootView } from "~/components/container";
import { ProjectContainer } from "~/components/ContentContainer";
import { projectListState } from "~/atoms/projectAtom";

const ProjectScreen = () => {
    const [projectList, setProjectList] = useRecoilState(projectListState);

    // useEffect(() => {
    //     //종료한 프로젝트가 제일 아래에 오게
    //     var cloneList = [...projectList];
    //     const sortedProjectList = cloneList.sort((a,b) => a.isOngoing === b.isOngoing ? 0 : a.isOngoing ? -1 : 1) 
    //     setProjectList(sortedProjectList);
    // }, []);


    function addProject() {
        router.push('/add/project');
    }

    function moveToProjectDetail(projectName: string) {
        router.push(`/main/project/${projectName}`);
    }

    return (
        <RootView>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.container}>
                <View style={[styles.header]}>
                    <Text style={[styles.headerTitle]}>프로젝트 목록</Text>
                    <Text style={[styles.headerFilter]}>생성일 순 ∨</Text>
                </View>
                <View>
                    <FlatList
                        data={projectList}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => moveToProjectDetail(item.name)}>
                                <ProjectContainer
                                    project_name={item.name}
                                    members={item.members.map(val => val.name)}
                                    isOngoing={item.isOngoing}
                                />
                                <View style={styles.space}></View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <TouchableOpacity style={styles.floatingButton} onPress={addProject}>
                    <AntDesign name="pluscircle" size={rw(55)} color="black" />
                </TouchableOpacity>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(18),
        paddingTop: rh(19),
        flex: 1
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: rh(25),
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: rf(20),
        fontWeight: 'bold'
    },
    headerFilter: {
        fontSize: rf(15),
        position: 'absolute',
        right: 0
    },
    floatingButton: {
        position: 'absolute',
        right: rw(10),
        bottom: rh(10),
        alignSelf: 'flex-end'
    },
    space: {
        height: rh(17)
    }
});

export default ProjectScreen;