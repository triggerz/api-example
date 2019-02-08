const api = require('./api');

async function main () {
  if (!process.env.TRIGGERZ_CLIENT_ID || !process.env.TRIGGERZ_CLIENT_SECRET) {
    console.error('ERROR: Both environment variables TRIGGERZ_CLIENT_ID and TRIGGERZ_CLIENT_SECRET must be set before running this demo.');
    return;
  }
  const host = process.env.TRIGGERZ_API_HOST || 'https://api.triggerz.com';

  const accessToken = await api.authenticating(process.env.TRIGGERZ_CLIENT_ID, process.env.TRIGGERZ_CLIENT_SECRET);

  const memberListStringResponse = await api.getting(host, 'member/list', accessToken);
  const memberListResponse = JSON.parse(memberListStringResponse);
  const emailList = Object.keys(memberListResponse.memberByEmail);

  const memberDetailByEmail = {};
  for (const email of emailList) {
    const memberStringResponse = await api.getting(host, `member/byEmail/${email}`, accessToken);
    memberDetailByEmail[email] = JSON.parse(memberStringResponse);
  }
  console.log(JSON.stringify(memberDetailByEmail, null, 2));
}

const isCli = require.main === module;
if (isCli) {
  main().catch(err => console.error(err.message));
} else {
  module.exports = main;
}
