import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

const Cali = (props) => {
  const onDateSelected = (data) => {
    console.log(data);
    // 2022-12-01
    props.onDateSelect(data.dateString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Calendar onDayPress={onDateSelected} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
    backgroundColor: "rgba(100, 100, 100, 0.6)",
  },
});

export default Cali;
