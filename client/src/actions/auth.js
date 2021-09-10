//Here we will write all the functions, that will help us interact with our backend API
//Wether to post data, get data or anything
import axios from "axios";

export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);
