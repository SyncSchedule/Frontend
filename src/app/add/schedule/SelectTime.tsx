import { router, useLocalSearchParams } from "expo-router";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRecoilState, useSetRecoilState } from "recoil";

import { projectListState } from "~/atoms/projectAtom";
import { statusListState } from "~/atoms/statusAtom";
import { Button } from "~/components/Button";
import { PressableTimeTable } from "~/components/PressableTimeTable";
import { RootView } from "~/components/container";
import { BasicHeader } from "~/components/header";
import { rh, rw } from "~/styles/globalSizes";
import { Event, Project, Status } from "~/types/globalTypes";

const SelectTimeScreen = () => {
  const { project_name, event_name, dateRange, isFixed } = useLocalSearchParams();

  const [selectedDate, setSelectedDate] = useState<Moment[]>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedTimeState, setSelectedTimeState] = useState<boolean[][]>();

  const [statusList, setStatusList] = useRecoilState(statusListState);
  const [projectList, setProjectList] = useRecoilState(projectListState);

  const onPressButton = () => {

    if (project_name && event_name && selectedTimeState && selectedDate) {
      //projectList에 추가

      const project = projectList.find((val) => val.name === project_name.toString());
      if (project) {
        var newProject: Project = project;
        if (isFixed?.toString() === "true") {//확정된 일정
          const { date, start, end } = changeStateToMoments(selectedDate[0], selectedTimeState[0]);
          const newEvent: Event = {
            name: event_name.toString(),
            isScheduled: true,
            date: date,
            start: start,
            end: end,
          }
          newProject = {
            ...newProject,
            events: [...newProject.events, newEvent]
          }
        } 
        else {//isFixed=false
          const newEvent: Event = {
            name: event_name.toString(),
            isScheduled: false,//확정X
          }
          newProject = {
            ...newProject,
            events: [...newProject.events, newEvent]
          };
        }
        
        const rest = projectList.filter((val) => val.name !== project_name);
        var newProjectList = [...rest, newProject];
        newProjectList = newProjectList.sort((a,b) => a.isOngoing === b.isOngoing ? 0 : a.isOngoing ? -1 : 1);
        setProjectList(newProjectList);
      }
      
      //statusList에 추가
      if (isFixed?.toString() === "false") {
        const newStatus: Status = {
          project_name: project_name.toString(),
          event_name: event_name.toString(),
          date_range: selectedDate,
          status_by_member: [
            {
              name: "김건국",
              selectedState: selectedTimeState
            }
          ],
          isFinished: false
        };
        
        var newStatusList = [...statusList, newStatus];
        newStatusList = newStatusList.sort((a,b) => a.isFinished === b.isFinished ? 0 : a.isFinished ? 1 : -1);
        setStatusList(newStatusList);
      }
      router.push('/main/home');//홈스크린으로 이동
    }    
  }

  const onTimeChange = (tableState: boolean[][]) => {
    setSelectedTimeState(tableState);
  }

  useEffect(() => {
    //하나라도 선택하면 버튼 활성화
    if (selectedTimeState?.some(val => val.some(iv => iv))) {
      setIsButtonEnabled(true);
    }
  }, [selectedTimeState]);

  useEffect(() => {
    if (dateRange) {
      const dates = dateRange.split(',').map(val => moment(val));
      setSelectedDate(dates);

      setSelectedTimeState(
        Array.from({ length: dates.length })
          .map(_ => Array.from({ length: 48 }, _ => false))
      );
    }
  }, [dateRange]);

  const changeStateToMoments = (date: Moment, tableState: boolean[]) => {
    const startIdx = tableState.findIndex(val => val);
    var endIdx = startIdx;
    for (var i=startIdx+1; i<48; i++) {
      if (tableState[i]) {
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

      const start = moment(date).set({ 'hour': startHour, 'minute': startMinute });
      const end = moment(date).set({ 'hour': endHour, 'minute': endMinute });
      
      return {
        date, 
        start: start, 
        end: end
      };
    }

  return (
    <RootView>

      <BasicHeader 
        title='시간 선택'
        left='back'
        leftPress={() => router.back()}
      />

      <ScrollView style={styles.container}>
      {selectedDate && 
        <PressableTimeTable 
          dateRange={selectedDate}
          onTimeChange={onTimeChange}
          onlyConsecutive={isFixed?.toString() === "true"}
        />}
      </ScrollView>

      <View style={styles.buttonContainer}>
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
  buttonContainer: {
    position: "absolute",
    bottom: rh(40),
    left: rw(35)
  }
})

export default SelectTimeScreen;