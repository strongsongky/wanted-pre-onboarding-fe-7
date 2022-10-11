const api = `https://pre-onboarding-selection-task.shop/`;

export const httpMethod = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
};

export const request = async (path, method, headers = {}, body) => {
  try {
    const url = `${api}${path}`;
    const options = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        ...headers,
      },
    };

    const res = await fetch(url, options);
    return res;
  } catch (error) {
    console.log(error);
  }
};
