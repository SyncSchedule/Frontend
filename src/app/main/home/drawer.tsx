import React, { useState } from "react";

import { StyleSheet, View, Pressable, Text, FlatList } from "react-native";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState, useRecoilValue } from 'recoil';

import { projectListState } from "~/atoms/projectAtom";
import { UserState } from "~/atoms/UserAtom";

import Modal from 'react-native-modal';
import Checkbox from 'expo-checkbox';

import { Project } from "~/types/globalTypes";


import { dWidth, rf, rh, rw } from "~/styles/globalSizes";
import { fonts } from "~/styles/globalFonts";
import { colors } from "~/styles/globalColors";


type DrawerType = {
    isVisible: boolean,
    onClose: () => void,
}


export const Drawer = ({ isVisible, onClose }: DrawerType) => {
    const [projectList, setProjectList] = useRecoilState(projectListState);
    const User = useRecoilValue(UserState)

    const onPressSetting = () => {
        onClose()
        router.push('/setting/SettingUser')
    }

    const RenderProject = ({ project }: { project: Project }) => {
        //TODO: checkBox에 맞춰 캘린더 프로젝트 보여주도록
        const [isChecked, setChecked] = useState(true);

        const isMember = project.members.find(m => m.id === User.id)

        if (isMember) {
            return (
                <View style={[styles.flexRow, { marginVertical: rh(3) }]}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? colors.dark : undefined}
                    />
                    <Text style={styles.text}>{project.name}</Text>
                </View>
            )
        } else {
            return;
        }

    }


    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            onBackdropPress={onClose}
            style={{ margin: 0 }}
            onSwipeComplete={onClose}
            useNativeDriverForBackdrop
            swipeDirection='left'
        >
            <View style={styles.container}>
                <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                    <Text style={styles.textBold}>{User.name}</Text>
                    <Pressable onPress={onPressSetting}>
                        <Ionicons name="settings-outline" size={rw(30)} color={colors.iconGrey} />
                    </Pressable>
                </View>
                <Text style={styles.textGrey}>{User.email}</Text>

                <Text style={[styles.text, { marginTop: rh(30), fontFamily: fonts.bold, marginBottom: rh(10) }]}>프로젝트</Text>
                <FlatList
                    data={projectList}
                    renderItem={({ item }) => <RenderProject project={item} />}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: rw(290),
        backgroundColor: colors.white,
        paddingVertical: rh(80),
        paddingHorizontal: rw(23)
    },

    textBold: {
        fontFamily: fonts.bold,
        fontSize: rf(20),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    textGrey: {
        fontFamily: fonts.regular,
        fontSize: rf(16),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    text: {
        fontFamily: fonts.regular,
        fontSize: rf(16),
        color: colors.black,

        includeFontPadding: false,
        textAlignVertical: 'center'
    },

    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    checkbox: {
        marginRight: rw(8)
    }
})
