const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url) => {
  const res = await fetch(`${BaseUrl}/api/${url}`);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};
