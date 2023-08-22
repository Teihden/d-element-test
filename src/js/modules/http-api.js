const url = {
  httpbin: () => 'https://httpbin.org/post',
  webhook: () => 'https://webhook.site/c26d9ccf-9437-410a-91c2-a3738e4c9398',
};

const sendData = (onSuccessRequestSend, onFailureRequestSend, body) => fetch(url.webhook(), { method: 'POST', body })
  .then((response) => {
    const { ok } = response;

    if (!ok) {
      throw new Error('Response status is out of range of 2xx');
    }

    return response;
  })
  .then(onSuccessRequestSend)
  .catch(onFailureRequestSend);

export { sendData };
