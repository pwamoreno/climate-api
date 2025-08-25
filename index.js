const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/news", async (req, res) => {
  try {
    const urls = [
      {
        name: "thetimes",
        address: "https://www.thetimes.co.uk/environment/climate-change",
        base: "",
      },
      {
        name: "guardian",
        address: "https://www.theguardian.com/environment/climate-crisis",
        base: "",
      },
      {
        name: "telegraph",
        address: "https://www.telegraph.co.uk/environment",
        base: "",
      },
    ];

    const articles = [];

    for (const url of urls) {
      const { data } = await axios.get(url.address);
      const $ = cheerio.load(data);

      $("a")
        .filter((index, element) =>
          $(element).text().toLowerCase().includes("climate")
        )
        .each((index, element) => {
          articles.push({
            title: $(element).text().trim(),
            url: $(element).attr("href"),
            source: url.name
          });
        });
    }
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
