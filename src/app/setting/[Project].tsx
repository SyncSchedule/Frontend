// 프로젝트 설정
import React, { useState, useEffect } from 'react'

import { View, Text, StyleSheet, Pressable, Alert, Switch } from 'react-native'
import { useGlobalSearchParams, Stack, router } from "expo-router";
import { useRecoilState } from 'recoil';
import { MaterialIcons } from '@expo/vector-icons';

import { projectListState } from '~/atoms/projectAtom';

import { Project } from '~/types/globalTypes';

import { RootView } from '~/components/container';
import { BasicHeader } from "~/components/header";

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";

const ProjectSettingScreen = () => {
    const params = useGlobalSearchParams();
    const { Project: projectName } = params

    const [projectList, setProjectList] = useRecoilState(projectListState);

    const [project, setProject] = useState<Project>();
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (params) {
            const project = projectList.find(p => p.name === projectName)

            if (project) {
                setProject({ ...project })
            }
        }
    }, [params])

    const onPressDelete = () => {
        Alert.alert('삭제', '정말 프로젝트를 삭제하시겠습니까?', [
            { text: '취소', onPress: () => { }, },
            {
                text: '확인', onPress: () => {
                    const newProjectList = projectList.filter(p => p.name !== projectName)

                    setProjectList([...newProjectList])

                    Alert.alert('프로젝트가 삭제되었습니다.')
                    router.replace('/main/project')
                }
            },
        ])
    }

    const onPressFinish = () => {
        Alert.alert('삭제', '정말 프로젝트를 종료하시겠습니까?', [
            { text: '취소', onPress: () => { }, },
            {
                text: '확인', onPress: () => {
                    const project = projectList.find(p => p.name === projectName)

                    if (project) {
                        const newProject = { ...project, isOngoing: false }
                        const newProjectList = projectList.map(p => p.name == projectName ? newProject : p)

                        setProjectList([...newProjectList])

                        Alert.alert('프로젝트가 종료되었습니다.')
                        router.replace('/main/project')
                    }
                }
            },
        ])

    }

    return project && (
        <RootView>
            <Stack.Screen options={{ header: () => <BasicHeader left="quit" leftPress={() => router.back()} title="프로젝트 관리" /> }} />

            <View style={styles.container}>
                {project.isOngoing ?
                    <View>
                        <Pressable onPress={() => router.push({ pathname: `/setting/RenameProject`, params: { projectName } })} style={[styles.box, styles.flexRow]}>
                            <Text style={styles.text}>프로젝트명 변경</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={rh(30)} color="black" />
                        </Pressable>
                        <View style={[styles.box, styles.flexRow]}>
                            <Text style={styles.text}>알림 설정</Text>
                            <Switch
                                onValueChange={() => setIsEnabled(!isEnabled)}
                                value={isEnabled}
                            />
                        </View>
                        <Pressable onPress={onPressFinish} style={styles.box}>
                            <Text style={styles.text}>프로젝트 종료</Text>
                        </Pressable>
                        <Pressable onPress={onPressDelete} style={styles.box}>
                            <Text style={styles.text}>프로젝트 삭제</Text>
                        </Pressable>

                    </View>
                    :
                    <Pressable onPress={onPressDelete} style={styles.box}>
                        <Text style={styles.text}>프로젝트 삭제</Text>
                    </Pressable>
                }
            </View>
        </RootView>
    )
}

export default ProjectSettingScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: rw(27)
    },

    box: {
        marginVertical: rh(20),
    },

    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text: {
        fontFamily: fonts.medium,
        fontSize: rf(20),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },
})