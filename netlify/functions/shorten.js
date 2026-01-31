const axios = require("axios");

exports.handler = async (event) => {
  // 1. Handle Preflight/Method Check
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    // 2. Parse input
    const { longUrl } = JSON.parse(event.body);

    // 3. Call Short.io
    const response = await axios.post(
      "https://api.short.io/links",
      {
        originalURL: longUrl,
        domain: "mybio.short.gy"
      },
      {
        headers: {
          Authorization: process.env.SHORT_IO_API_KEY, // Set this in Netlify UI!
          "Content-Type": "application/json"
        }
      }
    );

    // 4. Return Success
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Helps avoid CORS issues
      },
      body: JSON.stringify({
        shortURL: response.data.shortLink
      })
    };

  } catch (err) {
    console.error("Short.io API Error:", err.response?.data || err.message);

    return {
      statusCode: err.response?.status || 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: "Failed to create link", 
        message: err.message 
      })
    };
  }
};