// import express from "express";
// import axios from "axios";
// // const cheerio = require("cheerio");
// import * as cheerio from "cheerio"; // `import * as cheerio` ile tüm modülü içe aktar,
// import { faker } from "@faker-js/faker";

// const app = express();
// const port = 3000;

// app.get("/scrape", async (req, res) => {
//   try {
//     // Dinamik bir User-Agent oluşturuyoruz
//     const userAgent = faker.internet.userAgent();
//     // Web sayfasını çekiyoruz
//     const { data } = await axios.get(
//       "https://www.xn--muratyklmaz-4zbb.com.tr/modern-klasikler-dizisi-listesi/",
//       {
//         // headers: {
//         //   "User-Agent":
//         //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
//         //   Accept: "application/json, text/plain, */*",
//         //   "Accept-Encoding": "gzip, compress, deflate, br",
//         //   Connection: "keep-alive",
//         // },
//         headers: {
//           "User-Agent": userAgent,
//           Accept: "application/json, text/plain, */*",
//           "Accept-Encoding": "gzip, compress, deflate, br",
//           Connection: "keep-alive",
//         },
//       }
//     );

//     // Sayfa içeriğini parse ediyoruz
//     const $ = cheerio.load(data);

//     // Kitapları çekiyoruz
//     const books = [];
//     $("table tbody tr").each(async (index, element) => {
//       const bookNumber = $(element).find("td:nth-child(1)").text().trim();
//       const bookISBN = $(element).find("td:nth-child(2)").text().trim();
//       const bookTitle = $(element).find("td:nth-child(3)").text().trim();
//       const bookAuthor = $(element).find("td:nth-child(4)").text().trim();

//       // const bookCover = await getBookCoverByISBN(bookISBN);

//       books.push({
//         // number: bookNumber,
//         isbn: bookISBN,
//         // title: bookTitle,
//         // author: bookAuthor,
//       });
//     });

//     // JSON formatında sonucu döndürüyoruz
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error occurred while scraping data.");
//   }
// });

// // API'nin çalışmaya başlaması
// app.listen(port, "172.20.10.3", () => {
//   // 0.0.0.0 kullanarak her yerel ağdan bağlantı kabul edilebilir.
//   console.log(`Scraping API is running at http://172.20.10.3:${port}`);
// });

import express from "express";
import axios from "axios";
import * as cheerio from "cheerio"; // `import * as cheerio` ile tüm modülü içe aktar
import { faker } from "@faker-js/faker";

const app = express();
const port = 3000;

app.get("/scrape", async (req, res) => {
  try {
    // Dinamik bir User-Agent oluşturuyoruz
    const userAgent = faker.internet.userAgent();

    // Web sayfasını çekiyoruz
    const { data } = await axios.get(
      "https://www.iskultur.com.tr/kitap/modern-klasikler?srsltid=AfmBOoqT5TvM_lYaloWTiGj50L2D36HGlgt-PzpGY9Q_8VjGDn_ehOw5#group=group1&page=0-24",
      {
        headers: {
          "User-Agent": userAgent,
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, compress, deflate, br",
          Connection: "keep-alive",
        },
      }
    );

    // Sayfa içeriğini parse ediyoruz
    const $ = cheerio.load(data);

    // Kitapları çekiyoruz
    const books = [];

    // Sayfada kitap bilgilerini çekiyoruz
    const bookPromises = $("ul#products-list li")
      .map(async (index, element) => {
        const bookTitle = $(element).find(".product-title").text().trim();
        const bookAuthor = $(element).find(".product-author").text().trim();
        const bookISBN = $(element).find(".product-isbn").text().trim();
        const bookPrice = $(element).find(".product-price").text().trim();

        // Kitap bilgilerini diziye ekliyoruz
        return {
          title: bookTitle,
          author: bookAuthor,
          isbn: bookISBN,
          price: bookPrice,
        };
      })
      .get(); // `map` metodunun dönüşünü array'e çeviriyoruz

    // Asenkron işlemleri bekliyoruz
    const booksData = await Promise.all(bookPromises);

    // JSON formatında sonucu döndürüyoruz
    res.json(booksData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping data.");
  }
});

// API'nin çalışmaya başlaması
app.listen(port, "172.20.10.3", () => {
  console.log(`Scraping API is running at http://172.20.10.3:${port}`);
});

// import express from "express";
// import axios from "axios";
// import * as cheerio from "cheerio"; // `import * as cheerio` ile tüm modülü içe aktar
// import fs from "fs";
// import path from "path";
// import https from "https";
// import { faker } from "@faker-js/faker";

// const app = express();
// const port = 3000;

// // Google Books API'yi kullanarak kitap kapağını alacak fonksiyon
// async function getBookCoverByISBN(isbn) {
//   try {
//     const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
//     const bookData = response.data.items[0]; // İlk kitap verisini alıyoruz

//     if (bookData && bookData.volumeInfo && bookData.volumeInfo.imageLinks) {
//       const imageUrl = bookData.volumeInfo.imageLinks.thumbnail;
//       return imageUrl;
//     } else {
//       return null; // Kapağa ulaşılamazsa null döner
//     }
//   } catch (error) {
//     console.error(`Error fetching book cover for ISBN ${isbn}:`, error);
//     return null;
//   }
// }

// // Resmi cihazınıza kaydedecek fonksiyon
// function downloadImage(url, savePath) {
//   https
//     .get(url, (response) => {
//       const fileStream = fs.createWriteStream(savePath);
//       response.pipe(fileStream);

//       fileStream.on("finish", () => {
//         console.log(`Image saved to ${savePath}`);
//       });
//     })
//     .on("error", (err) => {
//       console.error("Error downloading image:", err);
//     });
// }

// app.get("/scrape", async (req, res) => {
//   try {
//     // Dinamik bir User-Agent oluşturuyoruz
//     const userAgent = faker.internet.userAgent();
//     // Web sayfasını çekiyoruz
//     const { data } = await axios.get(
//       "https://www.xn--muratyklmaz-4zbb.com.tr/modern-klasikler-dizisi-listesi/",
//       {
//         headers: {
//           "User-Agent": userAgent,
//           Accept: "application/json, text/plain, */*",
//           "Accept-Encoding": "gzip, compress, deflate, br",
//           Connection: "keep-alive",
//         },
//       }
//     );

//     // Sayfa içeriğini parse ediyoruz
//     const $ = cheerio.load(data);

//     // Kitapları çekiyoruz
//     const books = [];
//     $("table tbody tr").each(async (index, element) => {
//       const bookNumber = $(element).find("td:nth-child(1)").text().trim();
//       const bookISBN = $(element).find("td:nth-child(2)").text().trim();
//       const bookTitle = $(element).find("td:nth-child(3)").text().trim();
//       const bookAuthor = $(element).find("td:nth-child(4)").text().trim();

//       const bookCoverUrl = await getBookCoverByISBN(bookISBN);
//       if (bookCoverUrl) {
//         const fileName = `${bookISBN}.jpg`; // Resim için dosya adı (ISBN numarasını kullanarak)
//         const savePath = path.join(__dirname, "assets", "covers", fileName); // Resmi kaydedeceğimiz yol

//         // Eğer cover url varsa resmi indir
//         downloadImage(bookCoverUrl, savePath);
//       }

//       books.push({
//         number: bookNumber,
//         isbn: bookISBN,
//         title: bookTitle,
//         author: bookAuthor,
//       });
//     });

//     // JSON formatında sonucu döndürüyoruz
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error occurred while scraping data.");
//   }
// });

// // API'nin çalışmaya başlaması
// app.listen(port, "172.20.10.3", () => {
//   console.log(`Scraping API is running at http://172.20.10.3:${port}`);
// });
