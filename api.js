const request = require('request-promise');

async function authenticating(clientId, clientSecret) {
  const options = {
    url: 'https://triggerz.eu.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    body: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: 'triggerz.com/api'
    },
    json: true
  };
  const response = await request.post(options);
  return response.access_token;
}

async function getting(host, endpoint, accessToken) {
  const options = {
    url: `${host}/api/${endpoint}`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };
  const response = await request.get(options);
  return response;
}

async function posting(host, endpoint, body, accessToken) {
  const options = {
    url: `${host}/api/${endpoint}`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body,
    json: true
  };
  const response = await request.post(options);
  return response;
}

module.exports = {
  authenticating,
  getting,
  posting
};
