import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image } from "react-native";

const books = [
  {
    id: 1,
    title: "Sefiller",
    author: "Victor Hugo",
    year: 1862,
    image: "https://example.com/sefiller.jpg",
  },
  {
    id: 2,
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    year: 1866,
    image: "https://example.com/sucveceza.jpg",
  },
  {
    id: 3,
    title: "Anna Karenina",
    author: "Lev Tolstoy",
    year: 1878,
    image: "https://example.com/annakarenina.jpg",
  },
  {
    id: 4,
    title: "Sefiller",
    author: "Victor Hugo",
    year: 1862,
    image: "https://example.com/sefiller.jpg",
  },
  {
    id: 5,
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    year: 1866,
    image: "https://example.com/sucveceza.jpg",
  },
  {
    id: 6,
    title: "Anna Karenina",
    author: "Lev Tolstoy",
    year: 1878,
    image: "https://example.com/annakarenina.jpg",
  },
  // { id: 4, name: "Genç Bir Doktorun Anıları", price: 20 },
  // { id: 5, name: "Martin Eden", price: 82 },
  // { id: 6, name: "Altıncı Koğuş", price: 6 },
  // { id: 7, name: "Genç Bir Doktorun Anıları", price: 20 },
  // { id: 8, name: "Martin Eden", price: 82 },
  // { id: 9, name: "Altıncı Koğuş", price: 6 },
  // { id: 10, name: "Genç Bir Doktorun Anıları", price: 20 },
  // { id: 11, name: "Martin Eden", price: 82 },
  // { id: 12, name: "Altıncı Koğuş", price: 6 },
];

const numColumns = 2;

const BooksScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Modern Klasikler</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.arrayContainer}>
            <View style={styles.booksBox}>
              <Text style={styles.bookName}> {item.title} </Text>
              <Image />
              <Text> {item.author} </Text>
              <Text> {item.year} </Text>
            </View>
          </View>
        )}
        numColumns={numColumns}
      />
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "blue",
  },
  headerText: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 24,
    color: "white",
  },
  arrayContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    height: "250",
    marginRight: 10,
    margin: 2,
  },
  booksBox: {
    borderRadius: 20,
  },
  bookName: {},
});
