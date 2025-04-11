import axios from "axios";

type HTTPRequestType = {
  method?: "get" | "post" | "put" | "delete";
  endpoint?: string;
  data: any;
  header?: any;
};

type Headers = {
  "Content-Type": string;
  Authorization?: string;
};

export default async function httpRequest<HTTPRequestType>(
  method = "get",
  endpoint = "/",
  data = null as any,
  header = {}
) {
  // set up full endpoint
  const url = process.env.API_BASE + endpoint;
  // set up header
  const initialHeaders: Headers = { "Content-Type": "application/json" };
  let headers = { ...initialHeaders };

  // check exist user token
  const key = process.env.ADMIN_ACCESS_TOKEN_KEY;
  const token = localStorage.getItem(key!);

  // set authorization if token exist
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  // add more header argument
  headers = { ...headers, ...header };

  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });

    return response.data;
  } catch (error) {
    // throw new Error(error);

    return {
      status: "error",
      message: "http request response error",
      error: error,
      data: null,
    };
  }
}
