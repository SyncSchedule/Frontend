//
//메인화면 - 프로젝트 - 프로젝트 상세 - 프로젝트 설정
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router';

import { RootView } from '~/components/container';

const SettingScreen = () => {
  return (
    <RootView>
      <Button title="프로젝트명 변경" onPress={()=>router.push('/main/project/SettingName')}/>
    </RootView>
  )
}

export default SettingScreen;