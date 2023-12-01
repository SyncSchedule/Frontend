import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { rh, rw } from '~/styles/globalSizes';
import { colors } from '~/styles/globalColors';

interface TableItemProps {
  count: number;
}

function TableItem({ count }: TableItemProps) {

  return (
    <View style={[
      styles.tableItem, { backgroundColor: `rgba(100, 158, 255, ${0.2 * count})` }]} 
    />
  )
}

interface StatusTimeTableProps {
  dateRange: Moment[];
  arr_status: boolean[][][];
}

export function StatusTimeTable({ dateRange, arr_status }: StatusTimeTableProps) {
  const [cntTable, setCntTable] = useState<number[][]>(
    Array.from({ length: dateRange.length }, 
      () => Array.from({ length: 48 }, () => 0))
  );

  useEffect(() => {
    var cnt = [...cntTable];

    arr_status.forEach((status) => {
      for (var i=0; i<dateRange.length; i++) {
        for (var j=0; j<48; j++) {
          if (status[i][j]) {
            cnt[i][j] = cnt[i][j] + 1;
          }
        }
      }

    });

    setCntTable(cnt);
  }, []);

  return (
    <ScrollView horizontal>

      <View>

        <View style={styles.datesContainer}>
        {dateRange.map((date,idx) => 
          <Text style={styles.dateItem} key={`text_date_${idx}`}>{formatDate(date)}</Text>
        )}
        </View>

        <View style={{flexDirection: "row", paddingBottom: rh(90)}}>

          <View>
            {Array.from({ length: 24 }, (_,i) => i).map((val, idx) => (
              <Text style={styles.timeItem} key={`text_time_${idx}`}>{val}</Text>
            ))}
          </View>

          <View style={styles.tableContainer}>
          {cntTable.map((val, idx) => 
            <View style={{ flexDirection: "column" }} key={`table_${idx}`}>
            {val.map((cnt, iidx) => 
              <TableItem count={cnt} key={`table_item_${iidx}`}/>
            )}
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
    width: rw(87),
    height: rh(30),
    borderWidth: rh(0.5)
  }
});