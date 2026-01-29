import axios from "axios";

export async function handler(event) {
  const { longUrl, userId } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      "https://api.short.io/links",
      {
        originalURL: longUrl,
        domain: "yourdomain.short.gy",
        path: userId
      },
      {
        headers: {
          Authorization: process.env.SHORT_IO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        shortURL: response.data.shortLink
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create link" })
    };
  }
}
