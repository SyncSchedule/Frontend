import { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView } from "react-native";
import moment, { Moment } from 'moment';
import { colors } from '~/styles/globalColors';
import { rf, rh, rw } from '~/styles/globalSizes';

interface TableItemProps {
  isSelectable: boolean[]; // select, unselect
  onSelectedChange: (selected: boolean) => void;
  initialValue?: boolean;
  isBackground?: boolean;
} 

function TableItem({ isSelectable, onSelectedChange, initialValue, isBackground } : TableItemProps) {
  const [selected, setSelected] = useState(initialValue ? initialValue : false);

  useEffect(() => {
    onSelectedChange(selected);
  }, [selected]);

  const onPress = () => {
    if ((isSelectable[0] && !selected) || (isSelectable[1] && selected)) {
      setSelected(!selected);
    }
  }

  return (
    <TouchableOpacity 
      style={[styles.tableItem, { backgroundColor: selected ? colors.blue : isBackground ? 'rgba(100, 158, 255, 0.2)' :colors.white }]} 
      onPress={onPress}
    >
    </TouchableOpacity>
  )
}

interface PressableTimeTableProps {
  dateRange: Moment[]; 
  onTimeChange: (tableState: boolean[][]) => void;
  onlyConsecutive?: boolean; //확정된 일정 - 연속된 시간만 선택 가능
  initialValue?: boolean[][];
  backgroundValue?: boolean[][];//일정 확정할 때 공통된 시간 보여주는 용도로 사용
}

export function PressableTimeTable({ dateRange, onTimeChange, onlyConsecutive, initialValue, backgroundValue }: PressableTimeTableProps) {
  const [tableState, setTableState] = useState(
    initialValue 
    ? initialValue 
    : Array.from({ length: dateRange.length }).map(_ => Array.from({ length: 48 }, _ => false))
  );
  //onlyConsecutive일때만 사용 - 연속된 시간만 선택하도록
  const [selectedDateIdx, setSelectedDateIdx] = useState<number>();
  const [selectedTimeMinIdx, setSelectedTimeMinIdx] = useState<number>();
  const [selectedTimeMaxIdx, setSelectedTimeMaxIdx] = useState<number>();
  
  useEffect(() => {
    if (initialValue) setTableState(initialValue);
  }, []);

  useEffect(() => {
    if (backgroundValue) {
      
    }
  }, [])

  const onSelectTime = (
    date_index: number, 
    time_index: number, 
    selected: boolean
  ) => {
    //isSelectable=true인 경우에만 실행되는 함수 

    var newTableState = tableState.map(v => [...v]);
    newTableState[date_index][time_index] = selected;
    setTableState(newTableState);

    onTimeChange(newTableState);

    //selected가 true(선택)일수도, false(선택 취소)일 수도 있음
    if (onlyConsecutive) {
      if (selectedDateIdx === undefined) {//선택한 시간이 아직 하나도 없으면
        if (selected){
          setSelectedDateIdx(date_index);
          setSelectedTimeMinIdx(time_index);
          setSelectedTimeMaxIdx(time_index);
        }
      } 
      else {  //선택한 칸이 있는 상태 -> minIdx, maxIdx 교체 필요
        if (selected){//selected=true
          //time_index가 minIdx-1 또는 maxIdx+1
          if (time_index < selectedTimeMinIdx!) setSelectedTimeMinIdx(time_index);
          else setSelectedTimeMaxIdx(time_index);
        } 
        else { //selected=false
          //time_index가 minIdx 또는 maxIdx
          if (time_index === selectedTimeMinIdx && time_index === selectedTimeMaxIdx) {
            //한 칸만 선택되어 있는 상태인 경우
            setSelectedDateIdx(undefined);
            setSelectedTimeMinIdx(undefined);
            setSelectedTimeMaxIdx(undefined);
          } else {
            if (time_index === selectedTimeMinIdx) setSelectedTimeMinIdx(time_index+1);
            else setSelectedTimeMaxIdx(time_index-1);
          }
        }
      }
    }
  }

  const isTableItemSelectable = useCallback(
    (date_index: number, time_index: number) => {//onlyConsecutive일 때만 사용되는 함수

    if (selectedDateIdx === undefined) //아직 아무것도 선택 안 한 상태
      return [true, false];

    if (date_index !== selectedDateIdx) //기존에 선택한 칸과 다른 날짜 선택
      return [false, false];

    if (selectedTimeMinIdx !== undefined && selectedTimeMaxIdx !== undefined) {
      if (time_index === selectedTimeMinIdx-1 || time_index === selectedTimeMaxIdx+1) {
        return [true, false];
      } 
      if (time_index === selectedTimeMinIdx || time_index === selectedTimeMaxIdx) {
        return [false, true];
      }
    }
    
    return [false, false];
  }, [selectedDateIdx, selectedTimeMinIdx, selectedTimeMaxIdx]);

  return (
    <ScrollView horizontal>

      <View>
        {/*상단 날짜 - 좌우 스크롤O, 상하 스크롤X*/}
        <View style={styles.datesContainer}>
        {dateRange.map((date, idx) => 
          <Text style={styles.dateItem} key={`text_date_${idx}`}>{formatDate(date)}</Text>
        )}
        </View>

        
        <View style={{flexDirection: "row", paddingBottom: rh(90) }}>

          {/*좌측 시간 - 상하 스크롤O, 좌우 스크롤X*/}
          <View>
            {Array.from({ length: 24 }, (_,i) => i).map((val, idx) => (
              <Text style={styles.timeItem} key={`text_time_${idx}`}>{val}</Text>
            ))}
          </View>

          <View style={styles.tableContainer}>
          {tableState.map((row,di) => 
            <View style={{ flexDirection: "column" }} key={`table_${di}`}>
              {row.map((val, ti) => {//0-47
                return (
                  <TableItem
                    isSelectable={onlyConsecutive ? isTableItemSelectable(di, ti) : [true, true]}
                    onSelectedChange={(selected) => onSelectTime(di,ti,selected)}
                    initialValue={val}
                    isBackground={backgroundValue ? backgroundValue[di][ti] : false}
                    key={`table_item_${ti}`}
                  />
                )
              })}
            </View>
          )}
          </View>

        </View>
        
      </View>
      
    </ScrollView> 
  )
}

const formatDate = (date: Moment) => {
  const day = date.day()
  const kor_days = ["일", "월", "화", "수", "목", "금", "토"];

  return `${date.format("MM.DD")}(${kor_days[day]})`; // 11.13(월)
}

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    marginRight: rw(10)
  },
  timeItem: {
    height: rh(60),
    width: rw(20),
    color: '#7A7C81'
  },
  datesContainer: {
    flexDirection: "row",
    marginLeft: rw(20),
  },
  dateItem: {
    width: rw(87),
    height: rh(30),
    textAlign: 'center'
  },
  tableItem: {
    borderWidth: rh(0.5),
    width: rw(87),
    height: rh(30)
  }
});