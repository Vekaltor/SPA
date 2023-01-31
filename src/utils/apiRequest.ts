import axios from "axios";
import { pathToApi } from "../constants/pathToApi";

const apiRequest = axios.create({
  baseURL: pathToApi,
});

export default apiRequest;
