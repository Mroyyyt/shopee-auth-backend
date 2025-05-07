export default function handler(req, res) {
  const { code, shop_id } = req.query;

  if (code && shop_id) {
    res.status(200).json({ message: "Callback diterima", code, shop_id });
  } else {
    res.status(200).send("Shopee Auth Redirect: Tidak ada kode dikirim.");
  }
}
