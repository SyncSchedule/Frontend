//
//추가 - 프로젝트 추가 - 역할 선택 - 팀원의 경우 프로젝트 입장
//
import React, { useState } from 'react'

import { View, Text, StyleSheet, Alert } from 'react-native'
import { router, Stack } from 'expo-router'
import { useRecoilState, useRecoilValue } from 'recoil';

import { projectListState } from "~/atoms/projectAtom";
import { UserState } from '~/atoms/UserAtom';

import { RootView } from '~/components/container'
import { BasicHeader } from '~/components/header'
import { Button } from '~/components/Button'
import { LabelTextInput } from '~/components/textInput'

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";

const EnterProjectScreen = () => {

  const [projectList, setProjectList] = useRecoilState(projectListState);
  const User = useRecoilValue(UserState)

  const [code, setCode] = useState<string>('')

  const onPressComplete = () => {
    if (!code) {
      Alert.alert('코드를 작성해주세요.')
      return;
    }

    const project = projectList.find(p => p.code === code)

    if (project) {
      const newProject = {
         ...project,
        members: [
          ...project.members, 
          { name: User.name, isLeader: false }
        ] 
      }

      const newProjectList = projectList.map(p => p.name ===project.name ? newProject : p)
      setProjectList([...newProjectList])

      Alert.alert('프로젝트 입장이 완료되었습니다.')
      router.replace('/main/project')

    } else {
      Alert.alert('해당 코드로 입장할 수 있는\n프로젝트가 없습니다.')
    }
  }

  return (
    <RootView viewStyle={styles.container}>
      <Stack.Screen options={{ header: () => <BasicHeader left="back" leftPress={() => router.back()} title="프로젝트 입장" /> }} />

      <View style={{ flex: 1 }}>
        <LabelTextInput value={code} onChangeText={setCode} label='입장 코드' width={rw(298)} placeholder='코드입력' inputViewStyle={{ marginTop: rh(43) }} />
      </View>

      <Button title='완료' color="dark" onPress={onPressComplete} width={rw(320)} />
    </RootView>
  )
}

export default EnterProjectScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
})