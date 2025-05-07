const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const app = express();

const partner_id = process.env.PARTNER_ID;
const partner_key = process.env.PARTNER_KEY;
const redirect_url = process.env.REDIRECT_URL;

app.get('/', async (req, res) => {
  const { code, shop_id, partner_id: pid } = req.query;

  if (!code || !shop_id || !pid) {
    return res.send('Shopee Auth Backend is running. No auth data yet.');
  }

  // Timestamp and signature
  const timestamp = Math.floor(Date.now() / 1000);
  const path = '/api/v2/auth/token/get';

  const baseString = `${partner_id}${path}${timestamp}${shop_id}`;
  const signature = crypto
    .createHmac('sha256', partner_key)
    .update(baseString)
    .digest('hex');

  try {
    const response = await axios.post(
      `https://partner.test-stable.shopeemobile.com${path}`,
      {
        code,
        shop_id,
        partner_id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: signature,
          Timestamp: timestamp,
        },
      }
    );

    res.json({
      message: 'Token retrieved successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('Token error:', error.response?.data || error.message);
    res.status(500).json({
      message: 'Failed to get token',
      error: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shopee Auth backend running on port ${PORT}`);
});
