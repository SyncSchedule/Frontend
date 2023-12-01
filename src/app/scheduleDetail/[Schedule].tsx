//
//메인화면 - 홈화면 - 일정 상세 기록
//
import React, { useEffect, useState } from "react";

import { Alert, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { FontAwesome, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRecoilState } from 'recoil';

import { projectListState } from "~/atoms/projectAtom";

import { RootView } from "~/components/container";
import { BasicHeader } from "~/components/header";
import { Button } from "~/components/Button";
import { getDayText, getKorTimeText } from "~/utils/date";

import { Event } from "~/types/globalTypes";

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";


const ScheduleDetailScreen = () => {
    const params = useLocalSearchParams();
    const { projectName, eventName } = params;

    const [projectList, setProjectList] = useRecoilState(projectListState);
    //console.log('projectList', projectList)

    const [event, setEvent] = useState<Event>()
    const [input, setInput] = useState<string>()

    useEffect(() => {
        if (params?.eventName) {
            const project = projectList.find(p => p.name === projectName)
            const e = project?.events.find(e => e.name === eventName)

            if (e) {
                setEvent({ ...e })
                setInput(e.contents)
            }

        }

    }, [params])

    const onPressDelete = () => {
        Alert.alert('삭제', '정말 일정을 삭제하시겠습니까?', [
            { text: '취소', onPress: () => { }, },
            {
                text: '확인', onPress: () => {
                    const project = projectList.find(p => p.name == projectName)

                    if (project) {
                        const newEvents = project.events.filter(e => e.name !== eventName)
                        const updateProjectList = projectList.map(p => p.name == projectName ? { ...project, events: newEvents } : p)

                        setProjectList([...updateProjectList])

                        Alert.alert('일정 내용이 작성되었습니다.')

                        router.back()
                    }

                    Alert.alert('일정이 삭제되었습니다.')

                    router.back()
                }
            },
        ])
    }

    const onPressComplete = () => {
        if (!event) return

        if (!input) {
            Alert.alert('내용을 작성해주세요.')
            return;
        }

        const project = projectList.find(p => p.name == projectName)

        if (project) {
            const newEvent = {
                ...event,
                contents: input
            }

            const updateEvents = project.events.map(e => e.name == event.name ? newEvent : e)
            const updateProject = {
                ...project,
                events: [...updateEvents]
            }

            const updateProjectList = projectList.map(p => p.name == projectName ? updateProject : p)
            setProjectList([...updateProjectList])

            Alert.alert('일정 내용이 작성되었습니다.')

            router.back()
        }
    }

    return (event && event.date && event.start && event.end) && (
        <RootView>
            <Stack.Screen options={{ header: () => <BasicHeader left="quit" leftPress={() => router.back()} title="일정" /> }} />

            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={[styles.flexRow, { justifyContent: 'space-between', paddingBottom: rh(10) }]}>
                        <Text style={styles.boldText}>{event.name}</Text>
                        <Pressable onPress={onPressDelete}>
                            <FontAwesome name="trash" size={rh(26)} color={colors.iconGrey} />
                        </Pressable>
                    </View>
                    <Text style={styles.rText}>{projectName}</Text>
                </View>
                <View style={styles.devider} />
                <View style={styles.box}>
                    <View style={[styles.flexRow, { paddingBottom: rh(10) }]}>
                        <AntDesign name="calendar" size={rh(24)} color={colors.iconGrey} style={{ marginRight: rw(10) }} />
                        <Text style={styles.rText}>{event.date.format("YYYY. MM. DD")}({getDayText(event.date.day())})</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Feather name="clock" size={rh(24)} color={colors.iconGrey} style={{ marginRight: rw(10) }} />
                        <Text style={styles.rText}>{`${getKorTimeText(event.start)} - ${getKorTimeText(event.end)}`}</Text>
                    </View>
                </View>
                <View style={styles.devider} />
                <View style={styles.box}>
                    <View style={styles.flexRow}>
                        <Ionicons name="document-text-outline" size={rh(24)} color={colors.iconGrey} style={{ marginRight: rw(10) }} />
                        <Text style={styles.rText}>내용</Text>
                    </View>
                    <TextInput
                        style={[styles.content, styles.text]}
                        onChangeText={setInput}
                        value={input}
                        placeholder='일정 내용을 작성해주세요.'
                        multiline
                        maxLength={1000}
                    />
                </View>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Button title="파일 첨부" color="gray" onPress={() => DocumentPicker.getDocumentAsync()} width={rw(320)} />
                <View style={{ height: rh(15) }} />
                <Button title="완료" color="dark" onPress={() => onPressComplete()} width={rw(320)} />
            </View>
        </RootView>
    );
}

export default ScheduleDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: rw(10),
    },

    box: {
        paddingHorizontal: rw(20),
        paddingVertical: rh(15),
    },

    devider: {
        height: rh(1),
        width: rw(370),
        backgroundColor: colors.devideLineGrey,
        alignSelf: 'center'
    },

    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    boldText: {
        fontFamily: fonts.bold,
        fontSize: rf(20),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    rText: {
        fontFamily: fonts.regular,
        fontSize: rf(19),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    text: {
        fontFamily: fonts.regular,
        fontSize: rf(15),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    content: {
        height: rh(250),
        marginTop: rh(10),
        paddingVertical: rh(15),
        paddingHorizontal: rw(10),
        backgroundColor: colors.placeHolderGrey,
    },
})