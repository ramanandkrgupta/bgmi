const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

async function getPlayerName(playerId) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] ,browserType: 'firefox'});
    const page = await browser.newPage();
  
    try {
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
app.listen(3000, () => {
  console.log('Server running on port 3000');
});