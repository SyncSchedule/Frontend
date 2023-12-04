//
//추가 - 프로젝트 추가 - 역할 선택 - 팀장의 경우 프로젝트 생성
//
import React, { useState } from 'react'

import { View, Text, StyleSheet, Alert } from 'react-native'
import { router, Stack } from 'expo-router'
import { useRecoilState, useRecoilValue } from 'recoil';
import uuid from 'react-native-uuid';

import { projectListState } from "~/atoms/projectAtom";
import { UserState } from '~/atoms/UserAtom';

import { RootView } from '~/components/container'
import { BasicHeader } from '~/components/header'
import { Button } from '~/components/Button'
import { LabelTextInput } from '~/components/textInput'

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";

const AddProjectScreen = () => {

  const [projectList, setProjectList] = useRecoilState(projectListState);
  const User = useRecoilValue(UserState)

  const [name, setName] = useState<string>('')
  const [intro, setIntro] = useState<string>('')

  const onPressComplete = () => {
    if(!name || !intro){
      Alert.alert('내용을 작성해주세요.')
      return;
    }

    const project = {
      name,
      introduction: intro,
      members:[{ name: User.name, isLeader: true },],
      isOngoing: true,
      isShowCalendar:true,
      code:uuid.v4().toString(),
      events:[]
    }

    setProjectList([...projectList, project])

    Alert.alert('프로젝트 생성이 완료되었습니다.')
    router.replace('/main/project')
  }

  return (
    <RootView viewStyle={styles.container}>
      <Stack.Screen options={{ header: () => <BasicHeader left="back" leftPress={() => router.back()} title="프로젝트 생성" /> }} />

      <View style={{ flex: 1 }}>
        <LabelTextInput value={name} onChangeText={setName} label='프로젝트명' width={rw(298)} placeholder='프로젝트명' inputViewStyle={{ marginTop: rh(43) }} />
        <LabelTextInput value={intro} onChangeText={setIntro} label='프로젝트 설명' width={rw(298)} placeholder='프로젝트에 대해 간단하게 설명해주세요.' inputViewStyle={{ marginTop: rh(36) }} />
      </View>

      <Button title='완료' color="dark" onPress={onPressComplete} width={rw(320)} />
    </RootView>
  )
}

export default AddProjectScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
})