const api = `https://pre-onboarding-selection-task.shop/`;

const useFetch = (url, method) => {
  const options = {
    method: method,
    body: JSON.stringify(body),
    headers: {
      ...headers,
    },
  };
  fetch(url, options);
};
