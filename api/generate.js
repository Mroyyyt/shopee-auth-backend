const crypto = require('crypto');

module.exports = async (req, res) => {
  const partner_id = 1279559; // Ganti dengan Partner ID kamu
  const partner_key = '654a6f4b49514a6d534470596d5254657555634d784d704363734b58686f4c69'; // Ganti dengan partner key asli dari Shopee
  const redirect = 'https://shopee-oauth-redirect.vercel.app/api/callback';
  const timestamp = Math.floor(Date.now() / 1000);

  const baseString = `${partner_id}${redirect}${timestamp}`;
  const sign = crypto.createHmac('sha256', partner_key)
                     .update(baseString)
                     .digest('hex');

  const authUrl = `https://partner.shopeemobile.com/api/v2/shop/auth_partner?partner_id=${partner_id}&redirect=${encodeURIComponent(redirect)}&timestamp=${timestamp}&sign=${sign}`;

  res.redirect(authUrl);
};
