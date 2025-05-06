export default function handler(req, res) {
  const { code, shop_id } = req.query;

  // Simpan code dan shop_id, atau lakukan proses lain
  res.status(200).json({ message: "Callback diterima", code, shop_id });
}
