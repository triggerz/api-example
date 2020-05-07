# Triggerz API example

Documentation for the API can be found here: https://triggerz.gitlab.io/triggerz/api/.

This example demonstrates in the most basic way how to communicate with the Triggerz API.

It will start by requesting an access token given the client id and secret that you will have received from Triggerz. Given this, it makes a request to the `ping` endpoint and log the response.

The code is found in the [index.js](index.js) file. It runs on [nodejs](https://nodejs.org/). Before you can run the sample, you need to set environment variables `TRIGGERZ_CLIENT_ID` and `TRIGGERZ_CLIENT_SECRET` to the values you have received from Triggerz.

Then you should be able to run it with `npm start`.
```
$ npm install
$ set TRIGGERZ_CLIENT_ID=...
$ set TRIGGERZ_CLIENT_SECRET=...
$ npm start
```

on osx you need to use 'export' insted of 'set'.
To run agains local environment use
```
$ set TRIGGERZ_API_HOST=http://localhost:1802
```

If everything is set up correctly, you should see something like this:

```
Requesting access token..
Pinging Triggerz API..
Response from triggerz API: "pong"
```

Full sample output from a test organization is included in [sample-output.log](sample-output.log).

You can edit index.js and specify the email of a user in your organization instead of `ronja.demo@triggerz.com` to verify some of the other end-points.
