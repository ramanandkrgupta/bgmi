const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle the API request
app.post('/getGameId', async (req, res) => {
    const { gameid } = req.body; // Only gameid is dynamic

    if (!gameid) {
        return res.status(400).send('Missing required parameter: gameid');
    }

    const config = {
        method: 'post',
        url: 'https://getquickservice.app/WebServiceModule/getGameId',
        headers: { 
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://grabinstantuc.com',
            'Referer': 'https://grabinstantuc.com/',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        },
        data: `gameid=${encodeURIComponent(gameid)}&forGame=Bgmi&device_id=Mozilla%2F5.0+(iPhone%3B+CPU+iPhone+OS+16_6+like+Mac+OS+X)+AppleWebKit%2F605.1.15+(KHTML%2C+like+Gecko)+Version%2F16.6+Mobile%2F15E148+Safari%2F604.1430932`
    };

    try {
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the game ID');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});