import { useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import CalendarScreen from "./CalendarScreen";
import AgendaScreen from "./AgendaScreen";

function HomeScreen() {
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
      {isCal && <CalendarScreen onDateSelect={onDateSelect} />}
      {!isCal && (
        <AgendaScreen
          selectedDate={date}
          items={items}
          onDayChange={onDateSelect}
        />
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;

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
