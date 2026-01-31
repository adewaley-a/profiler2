// Note: If you are using Node 18+ on Netlify (default), you don't actually need node-fetch.
// But keeping it here since you have it installed.
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { longUrl } = JSON.parse(event.body);
    const API_KEY = process.env.TINYURL_API_KEY;

    // 1. Double-check the URL format (API will 400 if https:// is missing)
    const validatedUrl = longUrl.startsWith('http') ? longUrl : `https://${longUrl}`;

    // 2. Generate a unique alias
    const uniqueId = Math.random().toString(36).substring(2, 6);
    const customAlias = `mybio-${uniqueId}`;

    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        // Ensure there is only ONE 'Bearer ' prefix
        "Authorization": `Bearer ${API_KEY.trim()}`,
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        url: validatedUrl,
        domain: "tinyurl.com",
        alias: customAlias
      })
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ shortURL: data.data.tiny_url })
      };
    } else {
      // 3. Return the EXACT error from TinyURL so we can see it in the console
      console.error("TinyURL API rejected request:", data.errors);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: data.errors ? data.errors[0] : "Check API Key or Alias",
          raw: data 
        })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server Error", details: err.message })
    };
  }
};