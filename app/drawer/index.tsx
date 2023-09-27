//
//드로어
//expo-router로 tab과 같이 구현 불가능 -> modal로 대체
//
import React from 'react'

import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

const DrawerScreen = () => {
  return (
    <View>
      <Button title="설정" onPress={()=>router.push('/drawer/Setting')} />
    </View>
  )
}

export default DrawerScreen