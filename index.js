const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const qs = require('qs');
const cors = require('cors'); // Add this line

const app = express();
const port = 3000;

app.use(cors()); // Add this line to allow CORS for all origins
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getGameId/', async (req, res) => {
  const { gameid } = req.body;

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
    data: `gameid=${encodeURIComponent(gameid)}&forGame=Bgmi&device_id=Mozilla%2F5.0+(iPhone%3B+CPU+iPhone+OS+16_6+like+Mac+OS+X)+AppleWebKit%2F605.1.15+(KHTML%2C+like+Gecko)+Version%2F16.6+Mobile[...[...]
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the game ID');
  }
});

// GET request to handle dynamic gameid
app.get('/getGameId', async (req, res) => {
  const { gameid } = req.query;

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
    data: `gameid=${encodeURIComponent(gameid)}&forGame=Bgmi&device_id=Mozilla%2F5.0+(iPhone%3B+CPU+iPhone+OS+16_6+like+Mac+OS+X)+AppleWebKit%2F605.1.15+(KHTML%2C+like+Gecko)+Version%2F16.6+Mobile[...[...]
  };

  try {
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the game ID');
  }
});

// New POST request to create an order
app.post('/create-order', async (req, res) => {
  const { customer_mobile, user_token, amount, order_id, redirect_url, remark1, remark2, route } = req.body;

  if (!customer_mobile || !user_token || !amount || !order_id || !redirect_url || !remark1 || !remark2 || !route) {
    return res.status(400).send('Missing required parameters.');
  }

  const data = qs.stringify({
    customer_mobile,
    user_token,
    amount,
    order_id,
    redirect_url,
    remark1,
    remark2,
    route
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://instantdum.com/api/create-order',
    headers: { 
      'host': 'instantdum.com', 
      'Origin': 'https://instantdum.com', 
      'Access-Control-Allow-Origin': '*/*', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while creating the order');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});