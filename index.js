const app = require("express")();

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

async function getPlayerName(playerId) {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
    // const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] ,browserType: 'firefox'});
    // const page = await browser.newPage();
  
    try {
      let browser = await puppeteer.launch(options);

    let page = await browser.newPage();
      await page.goto('https://grabinstantuc.com');
  
      await page.type('#player_id', playerId);
      await page.click('.btn_verify');
  
      await page.waitForFunction('document.querySelector(".show_name").textContent.trim() !== "Loading Please Wait..."');
  
      const playerName = await page.evaluate(() => {
        const element = document.querySelector('.show_name');
        return element.textContent.trim().replace('Player Name: ', '');
      });
  
      return playerName;
    } catch (error) {
      console.error('Error retrieving player name:', error);
      return null;
    } finally {
      await browser.close();
    }
  }
app.get('/api/:playerId', async (req, res) => {
  const playerId = req.params.playerId;
  const playerName = await getPlayerName(playerId);

  if (playerName) {
    res.json({ playerName });
  } else {
    res.status(500).json({ error: 'Failed to retrieve player name' });
  }
});

app.get("/apii", async (req, res) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    let browser = await puppeteer.launch(options);

    let page = await browser.newPage();
    await page.goto("https://www.google.com");
    res.send(await page.title());
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;