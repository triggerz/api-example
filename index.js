const api = require('./api');

async function main () {
  if (!process.env.TRIGGERZ_CLIENT_ID || !process.env.TRIGGERZ_CLIENT_SECRET) {
    console.error('ERROR: Both environment variables TRIGGERZ_CLIENT_ID and TRIGGERZ_CLIENT_SECRET must be set before running this demo.');
    return;
  }
  const host = process.env.TRIGGERZ_API_HOST || 'https://api.triggerz.com';

  console.log('Requesting access token..');
  const accessToken = await api.authenticating(process.env.TRIGGERZ_CLIENT_ID, process.env.TRIGGERZ_CLIENT_SECRET);

  console.log('Pinging Triggerz API..');
  const pingResponse = await api.getting(host, 'ping', accessToken);

  console.log('Response from triggerz API:', pingResponse);

  console.log('Requesting "GET memberRelationType/list"');
  const memberRelationTypeListStringResponse = await api.getting(host, 'memberRelationType/list', accessToken);
  const memberRelationTypeListResponse = JSON.parse(memberRelationTypeListStringResponse);
  console.log(JSON.stringify(memberRelationTypeListResponse, null, 2));

  console.log('Requesting "GET segmentGroup/list"');
  const segmentGroupListStringResponse = await api.getting(host, 'segmentGroup/list', accessToken);
  const segmentGroupListResponse = JSON.parse(segmentGroupListStringResponse);
  console.log(JSON.stringify(segmentGroupListResponse, null, 2));

  console.log('Requesting "GET segment/list"');
  const segmentListStringResponse = await api.getting(host, 'segment/list', accessToken);
  const segmentListResponse = JSON.parse(segmentListStringResponse);
  console.log(JSON.stringify(segmentListResponse, null, 2));

  console.log('Requesting "GET terms/list"');
  const termsListStringResponse = await api.getting(host, 'terms/list', accessToken);
  const termsListResponse = JSON.parse(termsListStringResponse);
  console.log(JSON.stringify(termsListResponse, null, 2));

  console.log('Requesting "GET member/list"');
  const memberListStringResponse = await api.getting(host, 'member/list', accessToken);
  const memberListResponse = JSON.parse(memberListStringResponse);
  console.log(JSON.stringify(memberListResponse, null, 2));
  const memberByEmail = memberListResponse.memberByEmail;

  const email = 'ronja.demo@triggerz.com';
  if (memberByEmail[email]) {
    console.log('Requesting "GET member/byEmail/:email"');
    const memberStringResponse = await api.getting(host, `member/byEmail/${email}`, accessToken);
    const memberResponse = JSON.parse(memberStringResponse);
    console.log(JSON.stringify(memberResponse, null, 2));

    console.log('Request "POST member/byEmail/:email"');
    const memberPatch = {
      entity: {
        account: {
          displayName: 'Ronja Totally'
        },
        memberSegment: [
          {import: 'delete', segmentRef: 'engineering'},
          {import: 'insert', segmentRef: 'sales'}
        ]
      }
    };
    console.log(JSON.stringify(memberPatch, null, 2));
    const memberRef = await api.posting(host, `member/byEmail/${email}`, memberPatch, accessToken);
    console.log(memberRef);
  }
}

const isCli = require.main === module;
if (isCli) {
  main().catch(err => console.error(err.message));
} else {
  module.exports = main;
}
