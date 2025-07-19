export const apiAddress =
  process.env.NODE_ENV === "development"
    ? "https://developers.monodat.com/api"
    : // ? "http://192.168.1.97:4000/api"
      // ? "http://localhost:4000/api"
      "https://developers.monodat.com/api";
