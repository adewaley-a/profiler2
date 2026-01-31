exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { longUrl } = JSON.parse(event.body);
    const API_KEY = process.env.TINYURL_API_KEY;

    // Use built-in fetch (no require needed)
    const response = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY.trim()}`,
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com"
      })
    });

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ shortURL: data.data.tiny_url })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: data.errors ? data.errors[0] : "TinyURL rejected the request" 
        })
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Function Crash", details: err.message })
    };
  }
};