import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Agen from "./components/Agen";
import Cal from "./components/Cal";

function App() {
  const [isCal, setIsCal] = useState(true);
  const [date, setDate] = useState("2022-12-01");
  const [items, setItems] = useState({
    "2023-04-14": [
      { name: "Cycling" },
      { name: "Walking" },
      { name: "Writing" },
    ],
    "2023-04-15": [{ name: "Writing" }],
  });

  const onDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setItems((items) => {
      let list = { ...items };
      list[selectedDate] = [{ name: "Cycling" }, { name: "Walking" }];
      return { ...list };
    });
    setIsCal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isCal && <Cal onDateSelect={onDateSelect} />}
      {!isCal && (
        <Agen selectedDate={date} items={items} onDayChange={onDateSelect} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: "#888",
    fontSize: 16,
  },
});

export default App;

/*
import React, {useState} from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function App() {
  const [selected, setSelected] = useState("");
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

*/
