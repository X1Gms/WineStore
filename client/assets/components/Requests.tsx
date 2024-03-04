import axios from "axios";

const Requests = async (page: string, method: string, data: any) => {
  try {
    let response;
    const LOCALHOST = process.env.LOCALHOST;

    switch (method.toLocaleLowerCase()) {
      case "get":
        response = await axios.get(LOCALHOST + page);
        break;
      case "post":
        response = await axios.post(LOCALHOST + page, data);
        break;
      case "put":
        response = await axios.put(LOCALHOST + page, data);
        break;
      case "delete":
        response = await axios.delete(LOCALHOST + page);
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
