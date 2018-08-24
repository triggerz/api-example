# Triggerz API example

This example demonstrates in the most basic way how to communicate with the Triggerz API.

It will start by requesting an access token given the client id and secret that you will have received from Triggerz. Given this, it makes a request to the `ping` endpoint and log the response.

The code is found in the [index.js](index.js) file. It runs on [nodejs](https://nodejs.org/). Before you can run the sample, you need to set environment variables `TRIGGERZ_CLIENT_ID` and `TRIGGERZ_CLIENT_SECRET` to the values that we have given you.

Then you should be able to run it by typing `npm start`. If everything is set up correctly, you should see something like this:
```
> node index.js

Requesting access token..
Pinging Triggerz API..
Response from triggerz API: "pong"
```
