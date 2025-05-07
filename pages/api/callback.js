export default function handler(req, res) {
  const { code, shop_id } = req.query;
  res.status(200).json({ message: "Callback diterima", code, shop_id });
}
