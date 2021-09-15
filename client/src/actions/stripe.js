import axios from "axios";

// the empty brackets {} here represent the thing we send in the body of request, which in this case is nothing

export const createConnectAccount = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
