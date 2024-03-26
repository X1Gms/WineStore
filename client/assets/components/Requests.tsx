import axios from "axios";

const Requests = async (
  page: string,
  method: string,
  data?: any,
  headers?: any
) => {
  try {
    let response;
    const LOCALHOST = process.env.LOCALHOST;
    console.log(LOCALHOST);

    switch (method.toLocaleLowerCase()) {
      case "get":
        response = await axios.get(LOCALHOST + page, { headers: headers });
        break;
      case "post":
        response = await axios.post(LOCALHOST + page, data, {
          headers: headers,
        });
        break;
      case "put":
        response = await axios.put(LOCALHOST + page, data, {
          headers: headers,
        });
        break;
      case "patch":
        response = await axios.patch(LOCALHOST + page, data, {
          headers: headers,
        });
        break;
      case "delete":
        response = await axios.delete(LOCALHOST + page, {
          headers: headers,
          data: data,
        });
        break;
      default:
        throw new Error("Invalid HTTP method");
    }

    if (
      response &&
      response.data &&
      response.data.errors &&
      response.data.errors.length > 0 &&
      response.data.errors[0].message
    ) {
      throw new Error(response.data.errors[0].message);
    } else {
      return response.data;
    }
  } catch (e) {
    throw e;
  }
};
export default Requests;
