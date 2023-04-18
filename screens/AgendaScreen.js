import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";

function AgendaScreen({ selectedDate, items, onDayChange }) {
  const onDayPress = (date) => {
    onDayChange(date.dateString);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        selected={selectedDate}
        showOnlySelectedDayItems={true}
        items={items}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        onDayPress={onDayPress}
        minDate={"2012-05-10"}
        maxDate={"2023-05-30"}
        pastScrollRange={50}
        futureScrollRange={50}
      />
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

export default AgendaScreen;
