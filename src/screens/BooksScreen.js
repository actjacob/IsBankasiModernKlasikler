import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image } from "react-native";
import axios from "axios";
import colors from "../components/constants/colors";

// const books = [
//   {
//     id: 1,
//     title: "Sefiller",
//     author: "Victor Hugo",
//     year: 1862,
//     image: "https://example.com/sefiller.jpg",
//   },
//   {
//     id: 2,
//     title: "Suç ve Ceza",
//     author: "Fyodor Dostoyevski",
//     year: 1866,
//     image: "https://example.com/sucveceza.jpg",
//   },
//   {
//     id: 3,
//     title: "Anna Karenina",
//     author: "Lev Tolstoy",
//     year: 1878,
//     image: "https://example.com/annakarenina.jpg",
//   },
//   {
//     id: 4,
//     title: "Sefiller",
//     author: "Victor Hugo",
//     year: 1862,
//     image: "https://example.com/sefiller.jpg",
//   },
//   {
//     id: 5,
//     title: "Suç ve Ceza",
//     author: "Fyodor Dostoyevski",
//     year: 1866,
//     image: "https://example.com/sucveceza.jpg",
//   },
//   {
//     id: 6,
//     title: "Anna Karenina",
//     author: "Lev Tolstoy",
//     year: 1878,
//     image: "https://example.com/annakarenina.jpg",
//   },
//   // { id: 4, name: "Genç Bir Doktorun Anıları", price: 20 },
//   // { id: 5, name: "Martin Eden", price: 82 },
//   // { id: 6, name: "Altıncı Koğuş", price: 6 },
//   // { id: 7, name: "Genç Bir Doktorun Anıları", price: 20 },
//   // { id: 8, name: "Martin Eden", price: 82 },
//   // { id: 9, name: "Altıncı Koğuş", price: 6 },
//   // { id: 10, name: "Genç Bir Doktorun Anıları", price: 20 },
//   // { id: 11, name: "Martin Eden", price: 82 },
//   // { id: 12, name: "Altıncı Koğuş", price: 6 },
// ];

const numColumns = 2;

const BooksScreen = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://172.20.10.3:3000/scrape", {
          params: {
            url: "https://www.xn--muratyklmaz-4zbb.com.tr/modern-klasikler-dizisi-listesi/",
          },
        });
        console.log(response.data);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Modern Klasikler</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.arrayContainer}>
              <View style={styles.booksBox}>
                <Text> {item.number} </Text>
                <Image />
                <Text style={styles.bookName}> {item.title} </Text>
                <Text style={styles.bookAuthor}> {item.author} </Text>
                {/* <Text> {item.isbn} </Text> */}
              </View>
            </View>
          )}
          numColumns={numColumns}
        />
      )}
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    color: colors.white,
  },
  arrayContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "space-between",
    // height: "250",
    margin: 5,
  },
  booksBox: {
    width: 150,
    height: 250,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookName: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  bookAuthor: {
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 5,
  },
});
