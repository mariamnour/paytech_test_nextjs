import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { itemName, itemPrice, refCommand } = req.body;

    const paymentRequestUrl = "https://paytech.sn/api/payment/request-payment";
    const headers = {
      Accept: "application/json",
      'Content-Type': "application/json",
      API_KEY: process.env.PAYTECH_API_KEY,
      API_SECRET: process.env.PAYTECH_API_SECRET,
    };

    const params = {
      item_name: itemName,
      item_price: itemPrice,
      currency: "XOF",
      ref_command: refCommand,
      command_name: `Paiement pour ${itemName}`,
      env: "test", // Mode test pour Paytech
      ipn_url: "https://votre-domaine.com/api/ipn",
      success_url: "https://votre-domaine.com/success",
      cancel_url: "https://votre-domaine.com/cancel",
      custom_field: JSON.stringify({ custom_info: "info supplémentaire" }),
    };

    try {
      const response = await axios.post(paymentRequestUrl, params, { headers });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Erreur de connexion à Paytech', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}