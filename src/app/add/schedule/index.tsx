//
//추가 - 일정 추가
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

import { RootView } from '~/components/container'

const AddScheduleScreen = () => {
  return (
    <RootView>
      <Button title="날짜 선택" onPress={()=>router.push('/add/schedule/SelectDate')} />
    </RootView>
  )
}

export default AddScheduleScreen