const BaseUrl = process.env.NEXT_PUBLIC_API_URL;
const ApiKey_Public = process.env.NEXT_PUBLIC_API_SECRET_KEY;

export const fetcher = async (url) => {
  const res = await fetch(`${BaseUrl}/api/${url}`, {
    headers: {
      "api-key":  ApiKey_Public ,
    },
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};
