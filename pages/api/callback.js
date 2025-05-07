export default function handler(req, res) {
  const { code, shop_id } = req.query;

  if (!code || !shop_id) {
    return res.status(400).json({ error: 'Missing code or shop_id' });
  }

  // Anda bisa menyimpan code/shop_id di database atau lanjut ke langkah berikut
  res.status(200).json({ message: 'Success', code, shop_id });
}
