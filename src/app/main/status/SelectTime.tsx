//
//메인화면 - 현황 - 현황 상세 - 시간 선택
//
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Button } from '~/components/Button';

import { RootView } from '~/components/container';
import { BasicHeader } from '~/components/header';
import { rh, rw } from '~/styles/globalSizes';
import { PressableTimeTable } from '~/components/PressableTimeTable';
import { colors } from '~/styles/globalColors';
import { Project, Status } from '~/types/globalTypes';
import { projectListState } from '~/atoms/projectAtom';
import { statusListState } from '~/atoms/statusAtom';
import { useRecoilState, useRecoilValue } from 'recoil';


const SelectTimeScreen = () => {
  const { project_name, event_name, state } = useLocalSearchParams<{
    project_name: string;
    event_name: string;
    state: "not" | "done"
  }>();

  const [status, setStatus] = useState<Status>();
  const [statusList, setStatusList] = useRecoilState(statusListState);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [dateRange, setDateRange] = useState<Moment[]>();
  const [selectedTimeState, setSelectedTimeState] = useState<boolean[][]>();

  const onPressButton = () => {
    //statusList 추가(변경)
    if (isButtonEnabled && 
        project_name && event_name && dateRange && status && selectedTimeState) {

      const newStatus: Status = {
        ...status,
        status_by_member: [
          ...status.status_by_member.filter(val => val.name !== "김건국"), 
          {
            name: "김건국",
            selectedState: selectedTimeState
          }
        ]
      };
      const rest = statusList.filter(val => val.project_name !== project_name.toString() || val.event_name !== event_name.toString());
      var newStatusList = [...rest, newStatus];
      newStatusList = newStatusList.sort((a,b) => a.isFinished === b.isFinished ? 0 : a.isFinished ? 1 : -1);
      setStatusList(newStatusList);

      router.push('/main/status');
    }
  }

  const onTimeChange = (tableState: boolean[][]) => {
    setSelectedTimeState(tableState);
  }

  useEffect(() => {
    setStatus(statusList.find((val) => val.project_name === project_name?.toString() && val.event_name === event_name?.toString()));

    setDateRange(status?.date_range);
  }, []);

  useEffect(() => {
    if (status) {
      setDateRange(status.date_range);
    }
  }, [status]);

  useEffect(() => {
    //하나라도 선택하면 버튼 활성화
    if (selectedTimeState?.some(val => val.some(iv => iv))) {
      setIsButtonEnabled(selectedTimeState?.some(val => val.some(iv => iv)));
    } else setIsButtonEnabled(false);
  }, [selectedTimeState]);

  return (
    <RootView>
      <BasicHeader 
        title={state === "not" ? '시간 선택' : '시간 수정'}
        left='back'
        leftPress={() => router.back()}
      />

      <ScrollView style={styles.container}>
      {(dateRange && status) && 
        <PressableTimeTable 
          dateRange={dateRange}
          onTimeChange={onTimeChange}
          onlyConsecutive={false}
          initialValue={status.status_by_member.find(val => val.name === "김건국")?.selectedState}
        />}
      </ScrollView>

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
    paddingLeft: rw(20),
    paddingBottom: rh(89),
  },
  button: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  }
})

export default SelectTimeScreen;