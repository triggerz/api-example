const request = require('request-promise');

async function requestToken (clientId, clientSecret) {
  const options = {
    url: 'https://triggerz.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
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

async function apiGet (host, endpoint, accessToken) {
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

async function main () {
  if (!process.env.TRIGGERZ_CLIENT_ID || !process.env.TRIGGERZ_CLIENT_SECRET) {
    console.error('ERROR: Both environment variables TRIGGERZ_CLIENT_ID and TRIGGERZ_CLIENT_SECRET must be set before running this demo.');
    return;
  }
  const host = process.env.TRIGGERZ_API_HOST || 'https://api.triggerz.com';

  console.log('Requesting access token..');
  const accessToken = await requestToken(process.env.TRIGGERZ_CLIENT_ID, process.env.TRIGGERZ_CLIENT_SECRET);

  console.log('Pinging Triggerz API..');
  const pingResponse = await apiGet(host, 'ping', accessToken);

  console.log('Response from triggerz API:', pingResponse);
}

const isCli = require.main === module;
if (isCli) {
  main().catch(err => console.error(err.message));
} else {
  module.exports = main;
}

