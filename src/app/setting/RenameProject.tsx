//설정 > 프로젝트명 변경
import React, { useState, useEffect } from 'react'

import { View, Text, StyleSheet, Alert } from 'react-native'
import { useLocalSearchParams, Stack, router } from 'expo-router'
import { useRecoilState } from 'recoil';

import { projectListState } from '~/atoms/projectAtom';

import { Project } from '~/types/globalTypes';

import { RootView } from '~/components/container';
import { BasicHeader } from "~/components/header";
import { Button } from '~/components/Button';
import { LabelTextInput } from '~/components/textInput';

import { rh, rw, rf } from "~/styles/globalSizes";
import { colors } from "~/styles/globalColors";
import { fonts } from "~/styles/globalFonts";


const RenameProject = () => {
  const params = useLocalSearchParams();
  const { projectName } = params

  const [projectList, setProjectList] = useRecoilState(projectListState);

  const [input, setInput] = useState('')

  useEffect(() => {
    if (params) {
      setInput(params.projectName)
    }
  }, [params])


  const onPressComplete = () => {
    const project = projectList.find(p => p.name === projectName)

    if (project) {
      const updateProject = { ...project, name: input }

      const updateProjectList = projectList.map(p => p.name === projectName ? updateProject : p)

      setProjectList([...updateProjectList])

      Alert.alert('프로젝트명이 변경되었습니다.')
      router.push('/main/project')
    }
  }

  return (
    <RootView viewStyle={styles.container}>
      <Stack.Screen options={{ header: () => <BasicHeader left='back' leftPress={() => router.back()} title="프로젝트명 변경" /> }} />

      <View style={styles.view}>
        <LabelTextInput value={input} onChangeText={setInput} label="프로젝트명" width={rw(298)} placeholder={input} />
      </View>

      <Button title="완료" color='dark' onPress={onPressComplete} width={rw(320)} />
    </RootView>
  )
}

export default RenameProject

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  view: {
    flex: 1,
    paddingHorizontal: rw(45),
    marginTop: rh(40)
  }
})