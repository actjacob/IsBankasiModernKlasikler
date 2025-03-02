// const express = require("express");
// const axios = require("axios");
// const cheerio = require("cheerio");

// // Express uygulamasını başlat
// const app = express();
// const port = 3000; // API'nin çalışacağı port

// // Web scraping işlemi için route
// app.get("/scrape", async (req, res) => {
//   try {
//     // Verilen URL'yi axios ile çekiyoruz
//     const { data } = await axios.get(
//       "https://www.xn--muratyklmaz-4zbb.com.tr/modern-klasikler-dizisi-listesi/"
//     );

//     // Cheerio ile HTML içeriğini parse ediyoruz
//     const $ = cheerio.load(data);

//     // Kitap bilgilerini tutacak bir dizi oluşturuyoruz
//     const books = [];

//     // Listeyi seçiyoruz ve her bir satırdaki bilgiyi çekiyoruz
//     $("table tr").each((index, element) => {
//       // İlk satır başlık olduğu için onu atlıyoruz
//       if (index === 0) return;

//       // Kitap bilgilerini çekiyoruz
//       const bookNumber = $(element).find("td:nth-child(1)").text().trim();
//       const isbn = $(element).find("td:nth-child(2)").text().trim();
//       const bookName = $(element).find("td:nth-child(3)").text().trim();
//       const author = $(element).find("td:nth-child(4)").text().trim();

//       // Kitap bilgisini diziye ekliyoruz
//       if (bookNumber && bookName && author) {
//         books.push({
//           bookNumber,
//           isbn,
//           bookName,
//           author,
//         });
//       }
//     });

//     // Sonuçları JSON olarak döndürüyoruz
//     res.json(books);
//   } catch (error) {
//     console.error("Error during scraping:", error);
//     res.status(500).json({ error: "Web scraping failed" });
//   }
// });

// // Uygulama dinlemeye başlasın
// app.listen(port, () => {
//   console.log(`Web scraping API listening at http://localhost:${port}`);
// });

import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();
const port = 3000;

app.get("/scrape", async (req, res) => {
  try {
    // Web sayfasını çekiyoruz
    const { data } = await axios.get(
      "https://www.xn--muratyklmaz-4zbb.com.tr/modern-klasikler-dizisi-listesi/"
    );

    // Sayfa içeriğini parse ediyoruz
    const $ = cheerio.load(data);

    // Kitapları çekiyoruz
    const books = [];
    $("table tbody tr").each((index, element) => {
      const bookNumber = $(element).find("td:nth-child(1)").text().trim();
      const bookISBN = $(element).find("td:nth-child(2)").text().trim();
      const bookTitle = $(element).find("td:nth-child(3)").text().trim();
      const bookAuthor = $(element).find("td:nth-child(4)").text().trim();

      books.push({
        number: bookNumber,
        isbn: bookISBN,
        title: bookTitle,
        author: bookAuthor,
      });
    });

    // JSON formatında sonucu döndürüyoruz
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data.");
  }
});

// API'nin çalışmaya başlaması
app.listen(port, () => {
  console.log(`Scraping API is running at http://localhost:${port}`);
});
