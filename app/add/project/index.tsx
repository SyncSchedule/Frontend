//
//추가 - 프로젝트 추가 - 역할 선택
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

import { RootView } from '~/components/container'

const SelectRoleScreen = () => {
  return (
    <RootView>
      <Button title="프로젝트 생성(팀장)" onPress={()=>router.push('/add/project/AddProject')} />
      <Button title="프로젝트 입장(팀원)" onPress={()=>router.push('/add/project/EnterProject')} />
    </RootView>
  )
}

export default SelectRoleScreen