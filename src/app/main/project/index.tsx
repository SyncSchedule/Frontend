//
//메인화면 - 프로젝트 화면
//
import React, { useEffect, useState } from "react";

import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { useRecoilState, useRecoilValue } from 'recoil';

import { projectListState } from "~/atoms/projectAtom";
import { UserState } from "~/atoms/UserAtom";

import { RootView } from "~/components/container";
import { ProjectContainer } from "~/components/ContentContainer";

import { rw, rh, rf } from "~/styles/globalSizes";

import { Project } from "~/types/globalTypes";


const ProjectScreen = () => {
    const [projectList, setProjectList] = useRecoilState(projectListState);
    const User = useRecoilValue(UserState)

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

    const renderItem = ({ item }: { item: Project }) => {
        if (!item) return;

        const isMember = item.members.find(m => m.id === User.id)
        if (isMember) {
            return (
                <TouchableOpacity onPress={() => moveToProjectDetail(item.name)}>
                    <ProjectContainer
                        project_name={item.name}
                        members={item.members.map(val => val.name)}
                        isOngoing={item.isOngoing}
                    />
                    <View style={styles.space}></View>
                </TouchableOpacity>
            )
        } else {
            return;
        }
    }

    return (
        <RootView>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.container}>
                <View style={[styles.header]}>
                    <Text style={[styles.headerTitle]}>프로젝트 목록</Text>
                    <Text style={[styles.headerFilter]}>생성일 순 ∨</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={projectList}
                        renderItem={renderItem}
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