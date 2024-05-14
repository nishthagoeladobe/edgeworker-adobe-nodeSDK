import { httpRequest } from "http-request";
import { createResponse } from "create-response";
import { logger } from "log";
import _ from 'lodash';
import TargetClient from "@adobe/target-nodejs-sdk";

const STATUS = 200;
const HEADERS = {
  "Content-Type": "application/json"
};

// Function to create and return the Target client
const createTargetClient = () => {
  return new Promise(resolve => {
    const targetClient = TargetClient.create({
      client: "safewayinc",
      organizationId: "A7BF3BC75245ADF20A490D4D@AdobeOrg",
      propertyToken: "4f1a0288-f0d0-5f83-62d3-ae6a26b3bd6c",
      decisioningMethod: "server-side",
      pollingInterval: 300000,
      targetLocationHint: "34", // prevent cluster discovery
      logger: logger,
      fetchApi: httpRequest,
      events: {
        clientReady: () => resolve(targetClient)
      }
    });
  });
};

logger.log("in server.js");

// Main EdgeWorker event handler
export async function onClientRequest(request) {
  try {
    console.log("nishtha logs 1 start");
    const response = await fetch(request);
    console.log("nishtha logs",JSON.stringify(request));
    logger.log("Received request", JSON.stringify(request));

    const deliveryRequest = {
      execute: {
        mboxes: [{
          index: 0,
          name: "server-side-mike-ab",
          parameters: {
            foo: "bar"
          }
        }]
      }
    };

    const targetClient = await createTargetClient();
    const targetResponse = await targetClient.getOffers({ request: deliveryRequest });
    logger.log("targetResponse",JSON.stringify(targetResponse));
    const visitorState = _.get(
      targetResponse,
      "visitorState"
    );
    if (response.headers.get('Content-Type')?.includes('text/html')) {
      const body = await response.text();
      // Modify the body to include the script code
      const modifiedBody = body.replace('</head>', `
      <script>
        const visitorState = ${visitorState};
      </script>
    </head>`);

      //request.respondWith(createResponse(STATUS, { "Content-Type": "text/html" }, JSON.stringify(modifiedBody)));

//request.respondWith(createResponse(STATUS, { headers: HEADERS }, "hello1"));
//return createResponse(STATUS, HEADERS, "hello1");

request.respondWith(
  200, {},
  '<html><body><h1>Target response activity</h1></body></html>')

    }
    else {

      //request.respondWith(createResponse(STATUS, { headers: HEADERS }, JSON.stringify(targetResponse)));
      //request.respondWith(createResponse(STATUS, { headers: HEADERS }, "hello2"));
      //return createResponse(STATUS, HEADERS, "hello2");
      request.respondWith(
        200, {},
        '<html><body><h1>Target response activity 2</h1></body></html>')

    }

    logger.log("Sending response", JSON.stringify(targetResponse));

    // Sending the response directly back to the client
    //request.respondWith(createResponse(STATUS, { headers: HEADERS }, JSON.stringify(targetResponse)));
    //request.respondWith(createResponse(STATUS, { headers: HEADERS }, "hello3"));
    request.respondWith(
      200, {},
      '<html><body><h1>Target response activity 3</h1></body></html>')
  } catch (error) {
    logger.error("Error processing the request: " + error.message);


    //request.respondWith(createResponse(500, { headers: { "Content-Type": "text/plain" } }, "Internal Server Error"));

    request.respondWith(
      200, {},
      error.message)
  }
}

// export async function responseProvider(request) {
//   const deliveryRequest = {      
//     execute: {
//       mboxes: [{
//         index: 0,
//         name: "server-side-mike-ab",
//         parameters: {
//           foo: "bar"
//         }
//       }]
//     }
//   };

//   logger.log("Received request", JSON.stringify(request));

//   const client = await createTargetClient();
//   const { response } = await client.getOffers({ request: deliveryRequest });

//   const reader = response.body.getReader();
//   let chunks = []; // Array to hold the chunks of data
//   let read;
//   while (!(read = await reader.read()).done) {
//       chunks.push(read.value);
//   }
  
//   // Convert chunks to a string, assuming the stream was of text data
//   const text = new TextDecoder().decode(Uint8Array.concat(...chunks));
  
//   // Now, you can stringify this text
//   logger.log("Sending response", text);
  
//   return createResponse(STATUS, HEADERS, text);

// }
