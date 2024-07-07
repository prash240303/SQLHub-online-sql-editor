// lib/fetchData.js
export async function fetchInitialData() {
  // Your server-side logic here, e.g., fetching from an API
  return {
    initialQuery: "select * from CUSTOMERS",
  };
}
