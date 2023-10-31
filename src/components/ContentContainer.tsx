import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import { colors } from "~/styles/globalColors";

interface EventContainerHomeProps {
  project_name: string;
  event_name: string;
  start: number;
  end: number;
}

export function EventContainerHome({
  project_name, 
  event_name, 
  start, 
  end}: EventContainerHomeProps) {

  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.subTitle]}>{project_name}</Text>
        <Text style={[styles.title]}>{event_name}</Text>
        <Text style={[styles.detail]}>{`${getKorTimeText(start)} - ${getKorTimeText(end)}`}</Text>
      </View>
    </View>
  )
}

type eventStatus = "not" | "done" | "ready" | "finish";

interface EventContainerStatusProps {
  project_name: string;
  event_name: string;
  state: eventStatus;
}

export function EventContainerStatus({
  project_name,
  event_name,
  state
}: EventContainerStatusProps) {

  const state_kor = {
    "not": "미참여",
    "done" : "참여 완료",
    "ready": "확정 가능",
    "finish": "확정 완료"
  }

  return (
    <View style={[styles.container, {backgroundColor: `${state==="finish" ? "#E7E7E7" : colors.white}`}]}>
      <View>
        <Text style={[styles.subTitle]}>{project_name}</Text>
        <Text style={[styles.title, {color: `${state==="finish" ? "#7A7C81" : colors.black}`}]}>{event_name}</Text>
      </View>
      <View style={[styles.right]}>  
        <Text style={[{color: `${state==="not" ? colors.blue : state==="ready" ? "#FF0000" : "#7A7C81"}`}]}>{state_kor[state]}</Text>
      </View>
    </View>
  )
}

interface EventContainerProjectProps {
  event_name: string;
  isScheduled?: boolean;
  date?: Date;
  start?: number;
  end?: number;
}

export function EventContainerProject({event_name, isScheduled, date, start, end}: EventContainerProjectProps) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.title]}>{event_name}</Text>
        <Text style={[styles.detail, {color: `${isScheduled ? "#7A7C81" : colors.blue}`}]}>
          {isScheduled 
            ? `${date!.getMonth()+1}월 ${date!.getDate()}일 · ${getKorTimeText(start!)} - ${getKorTimeText(end!)}` 
            : "조율 중"
          }
        </Text>
      </View>
    </View>
  )
}

interface ProjectContainerProps {
  project_name: string;
  members: string[];
}

export function ProjectContainer({project_name, members}: ProjectContainerProps) {
  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.title]}>{project_name}</Text>
        <Text style={[styles.detail]}>{members.join(", ")}</Text>/*1줄 넘어가면 ...표시*/
      </View>
    </View>
  )
}

function getKorTimeText(time: number) {
  return `${time < 12 ? "오전" : "오후"} ${time > 12 ? time-12 : time}시`;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 13,
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    alignItems: 'center' 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  subTitle: {
    fontWeight: 'bold',
    color: "#7A7C81",
    marginBottom: 5,
  },
  detail: {
    color: "#7A7C81",
    marginTop: 5
  },
  bold: {
    fontWeight: 'bold'
  },
  grayColor: {
    color: "#7A7C81",
  },
  right: {
    position: 'absolute',
    right: 10,
  },
  mg_bt_5: {
    marginBottom: 5,
  },
  mg_tp_5: {
    marginTop: 5
  }
});