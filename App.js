import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BooksScreen from "./src/screens/BooksScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <BooksScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
