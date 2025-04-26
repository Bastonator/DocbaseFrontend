import { getAccessToken } from "@/app/lib/actions";

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log("get", url);

    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  postWithToken: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    const token = localStorage.getItem("token");

    const accessT = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessT}`,
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  putWithToken: async function (url: string, data: any): Promise<any> {
    console.log("put", url, data);

    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;
