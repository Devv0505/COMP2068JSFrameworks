const axios = require("axios");

const base = process.env.PAYPAL_BASE_URL;
const client = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_CLIENT_SECRET;

async function getAccessToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const response = await axios.post(`${base}/v1/oauth2/token`, params, {
    auth: { username: client, password: secret }
  });

  return response.data.access_token;
}

exports.createOrder = async (event) => {
  const token = await getAccessToken();

  const response = await axios.post(
    `${base}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: event._id.toString(),
          amount: {
            currency_code: event.currency,
            value: event.price
          }
        }
      ],
      application_context: {
        return_url: "http://localhost:4200/success",
        cancel_url: "http://localhost:4200/events"
      }
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
};

exports.captureOrder = async (orderId) => {
  const token = await getAccessToken();

  const response = await axios.post(
    `${base}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
};
