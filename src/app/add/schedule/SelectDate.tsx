//
//추가 - 일정 추가 - 날짜 선택
//
import React, { useEffect, useState } from 'react'

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import CalendarPicker, { DateChangedCallback } from 'react-native-calendar-picker';
import moment, { Moment, locale } from 'moment';
import { AntDesign } from '@expo/vector-icons';
import { RootView } from '~/components/container'
import { BasicHeader } from '~/components/header'
import { rf, rh, rw } from '~/styles/globalSizes'
import { Button } from '~/components/Button'
import { colors } from '~/styles/globalColors';

const SelectDateScreen = () => {
  const { project_name, event_name } = useLocalSearchParams<{
    project_name: string;
    event_name: string;
  }>();
  
  const [isFixed, setIsFixed] = useState(false);
  const [startDate, setStartDate] = useState<Moment>();
  const [endDate, setEndDate] = useState<Moment>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const onDateChange: DateChangedCallback  = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(date);//한 번이라도 선택하면 startDate는 항상 있음
    } else {
      setEndDate(date);//null 가능
    }
  }

  const getSelectedDateRange = () => {    
    var dates = [];
    dates.push(startDate?.format("YYYY-MM-DD"));
    if (isFixed) {
      return dates;
    }

    var date = startDate;
    while (true) {
      date?.add(1, 'days');
      if (date?.isAfter(endDate)) 
        break;
      else
        dates.push(date!.format("YYYY-MM-DD"));
    }
    return dates;
  }

  const onPressButton = () => {
    if (isButtonEnabled){
      const dateRange = getSelectedDateRange();
      router.push({ 
        pathname: '/add/schedule/SelectTime', 
        params: {
          project_name: project_name,
          event_name: event_name,
          dateRange: dateRange,
          isFixed: isFixed
        }
      });
    }
  }

  const isPast = (date: Moment) => {
    if (date.isAfter(moment())) return false;
    else return true;
  }

  useEffect(() => {
    if (isFixed){
      if (startDate) setIsButtonEnabled(true);
    } else {
      if (startDate && endDate) setIsButtonEnabled(true);
      else setIsButtonEnabled(false);
    }
  }, [isFixed, startDate, endDate]);

  return (
    <RootView>
      <BasicHeader 
        title='날짜 선택'
        left='back'
        leftPress={() => router.back()}
      />
      
      <View style={styles.container}>
        <CalendarPicker 
          allowRangeSelection={!isFixed}
          onDateChange={onDateChange}
          width={rw(350)}
          disabledDates={isPast}
        />

        <TouchableOpacity style={styles.checkContainer} onPress={() => setIsFixed(!isFixed)}>
        {isFixed ? (
          <AntDesign name="checkcircle" size={rw(25)} color={colors.blue} />
        ) : (
          <AntDesign name="checkcircleo" size={rw(25)} color={colors.gray} />
        )}
          <Text style={styles.checkContainerText}>이미 확정된 일정</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.button}>
        <Button 
          title='다음'
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
    paddingHorizontal: rw(46),
    paddingTop: rh(34),
    alignItems: 'center'
  },
  button: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  },
  checkContainer: {
    flexDirection: 'row',
    marginTop: rh(80)
  },
  checkContainerText: {
    fontSize: rf(18),
    marginLeft: rw(5)
  }
})

export default SelectDateScreen