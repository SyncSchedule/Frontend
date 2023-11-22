//
//메인화면 - 현황 - 현황 상세 - 시간 선택
//
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Button } from '~/components/Button';

import { RootView } from '~/components/container';
import { BasicHeader } from '~/components/header';
import { rh, rw } from '~/styles/globalSizes';
import { TimeTable } from '~/components/TimeTable';
import { colors } from '~/styles/globalColors';


const SelectTimeScreen = () => {
  const params = useLocalSearchParams();
  const { project, event, dateRange } = params;

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [dateRangeList, setDateRangeList] = useState<string[]>([]);

  const onPressButton = () => {

  }

  useEffect(() => {
    if (dateRange) {
      setDateRangeList(dateRange.toString().split(","));
    }
  }, []);

  return (
    <RootView>
      <BasicHeader 
        title='시간 선택'
        left='back'
        leftPress={() => router.back()}
      />

      <View style={styles.container}>
        <View>
          <TimeTable dateRange={dateRangeList}/>
        </View>
      </View>

      <View style={styles.button}>
        <Button 
          title='완료'
          color={isButtonEnabled ? "dark" : "gray"}
          onPress={onPressButton}
          width={rw(320)}
        />
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  button: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  }
})

export default SelectTimeScreen;