//
//메인화면 - 현황 - 현황 상세 - 일정 확정
//
import { router, useLocalSearchParams } from 'expo-router';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react'

import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useRecoilState } from 'recoil';
import { projectListState } from '~/atoms/projectAtom';
import { statusListState } from '~/atoms/statusAtom';
import { Button } from '~/components/Button';
import { PressableTimeTable } from '~/components/PressableTimeTable';

import { RootView } from '~/components/container';
import { BasicHeader } from '~/components/header';
import { rh, rw } from '~/styles/globalSizes';
import { Event, Project, Status } from '~/types/globalTypes';

const FixStatus = () => {
  const { project_name, event_name } = useLocalSearchParams();

  const [status, setStatus] = useState<Status>();
  const [statusList, setStatusList] = useRecoilState(statusListState);
  const [projectList, setProjectList] = useRecoilState(projectListState);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedTimeState, setSelectedTimeState] = useState<boolean[][]>();

  useEffect(() => {
    setStatus(statusList.find(val => val.project_name === project_name?.toString() && val.event_name === event_name?.toString()));
  }, []);

  useEffect(() => {
    if (selectedTimeState?.some(val => val.some(iv => iv))) {
      setIsButtonEnabled(true);
    } else setIsButtonEnabled(false);
  }, [selectedTimeState]);

  const onPressButton = () => {
    if (isButtonEnabled) {
      if (status && event_name && project_name && selectedTimeState) {
        //statusList 변경
        const newStatus: Status = {
          ...status,
          isFinished: true
        };
        const rest = statusList.filter(val => val.project_name !== project_name.toString() || val.event_name !== event_name.toString());
        setStatusList([...rest, newStatus]);

        //projectList 변경
        const project = projectList.find(val => val.name === project_name.toString());
        if (project) {
          const cur_event = project.events.find(val => val.name === event_name);
          if (cur_event) {
            const { date, start, end } = changeStateToMoments(status.date_range, selectedTimeState);

            const newEvent: Event = {
              ...cur_event,
              isScheduled: true,
              date: date,
              start: start,
              end: end
            }
  
            const newProject: Project = {
              ...project,
              events: [
                ...project.events.filter(val => val.name !== event_name.toString()),
                newEvent
              ]
            }

            const rest = projectList.filter(val => val.name !== project_name.toString());
            var newList = [...rest, newProject];
            newList = newList.sort((a,b) => a.isOngoing === b.isOngoing ? 0 : a.isOngoing ? -1 : 1);
            setProjectList(newList);
          } 
        }
        router.push('/main/status');
      }
    }
  }

  const changeStateToMoments = (dateRange: Moment[], tableState: boolean[][]) => {
    const dateIdx = tableState.findIndex(val => val.some(v => v));
    const date = dateRange[dateIdx];

    const startIdx = tableState[dateIdx].findIndex(val => val);
    var endIdx = startIdx;
    for (var i=startIdx+1; i<48; i++) {
      if (tableState[dateIdx][i]) {
        endIdx = i;
      } else break;
    }

    //ex) start: 15, end: 15 -> 7시 30분 ~ 8시
    const startHour = Math.floor(startIdx/2);//7
    const startMinute = Number.isInteger(startIdx/2) ? 0 : 30;//30
    
    var endHour = Math.floor(endIdx/2);//7
    var endMinute = Number.isInteger(endIdx/2) ? 0 : 30;//30
    if (endMinute === 0) {
      //7:00 -> 7:30
      endMinute = 30;
    } else { //endMinute === 30
      //7:30 -> 8:00 
      endHour = endHour + 1;
      endMinute = 0;
    }
    
    return {
      date, 
      start: date.set({'hour': startHour, 'minute': startMinute}), 
      end: date.set({'hour': endHour, 'minute': endMinute})
    };
  }

  const onTimeChange = (tableState: boolean[][]) => {
    setSelectedTimeState(tableState);
  }

  const getCommonTime = (states: boolean[][][]) => {
    const dateLength = states[0].length;
    var cntTable = Array.from({ length: dateLength }, () => Array.from({ length: 48 }, () => 0));

    states.forEach((state) => {
      for (var i=0; i<dateLength; i++) {
        for (var j=0; j<48; j++) {
          if (state[i][j]) {
            cntTable[i][j] = cntTable[i][j] + 1;
          }
        }
      }
    });

    const num_member = states.length;

    return cntTable.map((val) => val.map((cnt) => cnt === num_member ? true : false));
  }

  return (
    <RootView>
      <BasicHeader 
        title='일정 확정'
        left='back'
        leftPress={() => router.back()}
      />

      <ScrollView style={styles.container}>
      {status && (
        <PressableTimeTable 
          dateRange={status.date_range}
          onTimeChange={onTimeChange}
          onlyConsecutive
          backgroundValue={getCommonTime(status.status_by_member.map(val => val.selectedState))}
        />
      )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="확정"
          onPress={onPressButton} 
          color={isButtonEnabled ? "dark" : "gray"}
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
  buttonContainer: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  }
});

export default FixStatus;