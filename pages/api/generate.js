const crypto = require("crypto");

export default function handler(req, res) {
  const partner_id = process.env.PARTNER_ID;
  const partner_key = process.env.PARTNER_KEY;
  const redirect = process.env.REDIRECT_URL; // Harus sama dengan yang di Shopee

  const path = '/api/v2/shop/auth_partner';
  const timestamp = Math.floor(Date.now() / 1000);
  const baseString = `${partner_id}${path}${timestamp}`;
  const sign = crypto.createHmac('sha256', partner_key).update(baseString).digest('hex');

  const url = `https://partner.shopeemobile.com${path}?partner_id=${partner_id}&timestamp=${timestamp}&sign=${sign}&redirect=${redirect}`;
  
  res.redirect(url);
}
