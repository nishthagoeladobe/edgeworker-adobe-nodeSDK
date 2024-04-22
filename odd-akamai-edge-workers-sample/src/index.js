import { httpRequest } from "http-request";
import { createResponse } from "create-response";
import { logger } from "log";
import TargetClient from "@adobe/target-nodejs-sdk";
import RULES from "./rules";

const STATUS = 200;
const HEADERS = {
  "Content-Type": "application/json"
};

// Function to create and return the Target client
const createTargetClient = () => {
  return new Promise(resolve => {
    const targetClient = TargetClient.create({
      client: "targettesting",
      organizationId: "74F652E95F1B16FE0A495C92@AdobeOrg",
      decisioningMethod: "on-device",
      artifactPayload: RULES,
      pollingInterval: 0, // "0" prevents polling, if artifactPayload is provided
      targetLocationHint: "34", // prevent cluster discovery
      logger: logger,
      fetchApi: httpRequest,
      events: {
        clientReady: () => resolve(targetClient)
      }
    });
  });
};

// Main EdgeWorker event handler
export async function onClientRequest(request) {
  try {
    logger.log("Received request", JSON.stringify(request));

    const deliveryRequest = {
      execute: {
        mboxes: [{
          index: 0,
          name: "mbox-params",
          parameters: {
            foo: "bar"
          }
        }]
      }
    };

    const targetClient = await createTargetClient();
    const targetResponse = await targetClient.getOffers({ request: deliveryRequest });

    logger.log("Sending response", JSON.stringify(targetResponse));

    // Sending the response directly back to the client
    request.respondWith(createResponse(STATUS, { headers: HEADERS }, JSON.stringify(targetResponse)));
  } catch (error) {
    logger.error("Error processing the request: " + error.message);
    request.respondWith(createResponse(500, { headers: {"Content-Type": "text/plain"}}, "Internal Server Error"));
  }
}
