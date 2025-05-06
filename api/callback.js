// api/callback.js
const crypto = require("crypto");
const axios = require("axios");

module.exports = async (req, res) => {
  const { code, shop_id } = req.query;

  const partner_id = 1279559;
  const partner_key = "654a6f4b49514a6d534470596d5254657555634d784d704363734b58686f4c69";
  const timestamp = Math.floor(Date.now() / 1000);
  const redirect_uri = "https://shopee-oauth-redirect.vercel.app/api/callback";

  const baseString = `${partner_id}/api/v2/auth/token/get${timestamp}${code}`;
  const sign = crypto.createHmac("sha256", partner_key).update(baseString).digest("hex");

  try {
    const response = await axios.post(
      `https://partner.shopeemobile.com/api/v2/auth/token/get?sign=${sign}`,
      {
        code,
        partner_id,
        shop_id,
        timestamp,
        redirect_uri,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const tokenData = response.data;

    res.status(200).json({
      message: "Berhasil ambil access token",
      tokenData,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Gagal ambil access token" });
  }
};
