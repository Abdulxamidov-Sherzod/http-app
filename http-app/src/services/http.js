import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expecdetError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expecdetError) {
    toast.error("Internet down !");
  } 
  else {
    toast.error("Malumotlar topilmadi !");
  }
  return Promise.reject(error);
});

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const http = {
  get: axios.get,
  delete: axios.delete,
  put: axios.put,
  post: axios.post,
};

export default http;
