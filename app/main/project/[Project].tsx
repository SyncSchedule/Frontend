//
//메인화면 - 프로젝트 - 프로젝트 상세
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

import { RootView } from '~/components/container'

const ProjectDetailScreen = () => {
  return (
    <RootView>
      <Button title="설정" onPress={() => router.push(`/main/project/Setting`)} />
      <Button title="일정 추가" onPress={() => router.push(`/add/schedule`)} />
    </RootView>
  )
}

export default ProjectDetailScreen