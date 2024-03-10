import axios from "axios";

const API_KEY = "Your_Api_Key";

export const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
};

export const createUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const loginUser = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
