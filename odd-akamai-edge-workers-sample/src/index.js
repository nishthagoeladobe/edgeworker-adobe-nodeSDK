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
      client: "safewayinc",
      organizationId: "A7BF3BC75245ADF20A490D4D@AdobeOrg",
      propertyToken: "4f1a0288-f0d0-5f83-62d3-ae6a26b3bd6c",
      decisioningMethod: "on-device",
      pollingInterval: 300000,
      artifactLocation: "https://assets.adobetarget.com/safewayinc/production/v1/rules.json",
      targetLocationHint: "34", // prevent cluster discovery
      logger: logger,
      fetchApi: httpRequest,
      events: {
        clientReady: () => resolve(targetClient)
      }
    });
  });
};

const CONFIG = {

  events: {
    clientReady: startExpressApp
  },
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
    request.respondWith(createResponse(500, { headers: { "Content-Type": "text/plain" } }, "Internal Server Error"));
  }
}
