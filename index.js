const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

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
