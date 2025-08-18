const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// const articles = [];

// const newspapers = [
//   {
//     name: "thetimes",
//     address: "https://www.thetimes.co.uk/environment/climate-change",
//     base: "",
//   },
//   {
//     name: "guardian",
//     address: "https://www.theguardian.com/environment/climate-crisis",
//     base: "",
//   },
//   {
//     name: "telegraph",
//     address: "https://www.telegraph.co.uk/environment/climate-change",
//     base: "",
//   },
// ];

// newspapers.forEach((newspaper) => {
//   axios.get(newspaper.address).then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);

//     // const articles = [];

//     $("a:contains('climate')").each(function () {
//       const title = $(this).text();
//       const url = $(this).attr("href");

//       articles.push({
//         title,
//         url,
//         source: newspaper.name,
//       });
//     });
//   });
// });

// app.get("/news", (req, res) => {
//   res.json(articles);
// });

app.get("/news", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://www.theguardian.com/environment/climate-crisis"
    );
    const $ = cheerio.load(data);

    const articles = [];

    $("a")
      .filter((index, element) =>
        $(element).text().toLowerCase().includes("climate")
      )
      .each((index, element) => {
        articles.push({
          title: $(element).text().trim(),
          url: $(element).attr("href"),
        });
      });
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to get data.");
  }
});

// app.get("/scrape", async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.theguardian.com/environment/climate-crisis", { waitUntil: "networkidle2" });

//   const articles = await page.$$eval('a', links =>
//     links
//       .filter(link => link.textContent.toLowerCase().includes('climate'))
//       .map(link => ({
//         title: link.textContent.trim(),
//         url: link.href
//       }))
//   );

//   await browser.close();
//   res.json(articles);
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
