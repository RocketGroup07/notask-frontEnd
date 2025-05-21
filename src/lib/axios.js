import axios from "axios";

export const api = axios.create({
    baseURL: "https://notask-dgb5egh2bndhdygj.eastus2-01.azurewebsites.net/"
}) 

  const requestInterceptor = (config) => {
    const token = localStorage.getItem("token")
      console.log(token)
    if(token){
         console.log("aa")
        config.headers.authorization = `Bearer ${token}`
    }console.log(config)
    return config
  }

  api.interceptors.request.use(requestInterceptor);