const api = require('./api');

async function main ({ email }) {
  if (!process.env.TRIGGERZ_CLIENT_ID || !process.env.TRIGGERZ_CLIENT_SECRET) {
    console.error('ERROR: Both environment variables TRIGGERZ_CLIENT_ID and TRIGGERZ_CLIENT_SECRET must be set before running this demo.');
    return;
  }
  const host = process.env.TRIGGERZ_API_HOST || 'https://api.triggerz.com';

  const accessToken = await api.authenticating(process.env.TRIGGERZ_CLIENT_ID, process.env.TRIGGERZ_CLIENT_SECRET);

  const activityListStringResponse = await api.getting(host, `activity/plan/byEmail/${email}`, accessToken);
  const activityListResponse = JSON.parse(activityListStringResponse);
  console.log(JSON.stringify(activityListResponse, null, 2));
  console.log('Note: this API is not yet officially supported!');
}

const isCli = require.main === module;
if (isCli) {
  main({email: process.argv[2]}).catch(err => console.error(err.message));
} else {
  module.exports = main;
}
