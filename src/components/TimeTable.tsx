import { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView } from "react-native";
import moment, { Moment } from 'moment';
import { colors } from '~/styles/globalColors';
import { rh, rw } from '~/styles/globalSizes';

interface TableItemProps {
  startDateTime: Moment;
} 

function TableItem({ startDateTime } : TableItemProps) {

  useEffect(() => {
    console.log(startDateTime)
  }, []);

  return (
    <TouchableOpacity style={styles.tableItem}>
      <Text>{startDateTime.format("H:m")}</Text>
    </TouchableOpacity>
  )
}

interface TimeTableProps {
  dateRange: string[]; // 11 10 Mon 형태
}

export function TimeTable({ dateRange }: TimeTableProps) {
  const [dates, setDates] = useState<Moment[]>();
  const [dateTimes, setDateTimes] = useState<Moment[]>();

  useEffect(() => {
    // console.log(dateRange);
    
    const newDateRange = dateRange.map((val) => moment(val));
    setDates(newDateRange);

    if (dates) console.log("dates.length: ", dates.length)
  }, []);



  // useEffect(() => {
  //   var list: Moment[] = [];

  //   dates.forEach((date) => {
  //     var dateTime = date;
  //     for (var i=0; i<48; i++) {
  //       dateTime.hours(Math.floor(i/2));
  //       if (!Number.isInteger(i/2)) dateTime.minutes(30);
  //       list.push(dateTime);
  //     }
  //   });

  //   setDateTimes(list);
  // }, [dates]);

  

  const formatDate = (date: Moment) => {
    const day = date.day()
    const kor_days = ["일", "월", "화", "수", "목", "금", "토"];

    return `${date.format("MM/DD")}(${kor_days[day]})` // 11/13(월)
  }

  return (
    <ScrollView style={styles.tableContainer}>
      {dates &&
        dates.map((date) => (
          Array.from( { length: 48 }, (_,i) => i).map((val) => {
            const hour = Math.floor(val/2);
            const minute = Number.isInteger(val/2) ? 0 : 30;
            const newDate = date.set({
              'hour': hour, 
              'minute': minute
            });

            return (
              <TableItem 
              startDateTime={newDate}
            />
            )
          })
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column'
  },
  tableItem: {
    borderWidth: rh(0.5),
    backgroundColor: colors.blue,
    width: rw(87),
    height: rh(30)
  }
});