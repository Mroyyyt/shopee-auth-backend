const express = require('express');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

const partner_id = process.env.PARTNER_ID;
const partner_key = process.env.PARTNER_KEY;
const redirect_url = process.env.REDIRECT_URL;

app.get('/', (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const baseString = `${partner_id}${redirect_url}${timestamp}`;
  const sign = crypto
    .createHmac('sha256', partner_key)
    .update(baseString)
    .digest('hex');

  const authUrl = `https://partner.test-stable.shopeemobile.com/api/v2/shop/auth_partner?partner_id=${partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${encodeURIComponent(redirect_url)}`;

  res.redirect(authUrl); // langsung arahkan ke login Shopee
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shopee auth backend running at http://localhost:${PORT}`);
});
