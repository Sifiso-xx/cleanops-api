const http = require("http");
const {
  createRecord,
  listRecords,
  findRecord
} = require("./store");
const {
  validateClient,
  validateWorker,
  validateJob,
  isValidJobStatus,
  isValidPaymentStatus
} = require("./validation");

const PORT = process.env.PORT || 3001;

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });
  });
}

function routeParts(url) {
  return new URL(url, `http://localhost:${PORT}`).pathname.split("/").filter(Boolean);
}

async function handleRequest(request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  const parts = routeParts(request.url);

  try {
    if (request.method === "GET" && parts[0] === "health") {
      sendJson(response, 200, { status: "ok", service: "cleanops-api" });
      return;
    }

    if (request.method === "GET" && parts[0] === "clients") {
      sendJson(response, 200, listRecords("clients"));
      return;
    }

    if (request.method === "POST" && parts[0] === "clients") {
      const body = await readBody(request);
      const error = validateClient(body);
      if (error) {
        sendJson(response, 400, { error });
        return;
      }
      sendJson(response, 201, createRecord("clients", body));
      return;
    }

    if (request.method === "GET" && parts[0] === "workers") {
      sendJson(response, 200, listRecords("workers"));
      return;
    }

    if (request.method === "POST" && parts[0] === "workers") {
      const body = await readBody(request);
      const error = validateWorker(body);
      if (error) {
        sendJson(response, 400, { error });
        return;
      }
      sendJson(response, 201, createRecord("workers", body));
      return;
    }

    if (request.method === "GET" && parts[0] === "jobs") {
      sendJson(response, 200, listRecords("jobs"));
      return;
    }

    if (request.method === "POST" && parts[0] === "jobs") {
      const body = await readBody(request);
      const error = validateJob(body);
      const client = findRecord("clients", body.clientId);
      if (error) {
        sendJson(response, 400, { error });
        return;
      }
      if (!client) {
        sendJson(response, 404, { error: "Client not found" });
        return;
      }
      const job = createRecord("jobs", {
        ...body,
        workerId: null,
        status: "requested",
        paymentStatus: "unpaid"
      });
      sendJson(response, 201, job);
      return;
    }

    if (request.method === "PATCH" && parts[0] === "jobs" && parts[2] === "assign") {
      const body = await readBody(request);
      const job = findRecord("jobs", parts[1]);
      const worker = findRecord("workers", body.workerId);
      if (!job) {
        sendJson(response, 404, { error: "Job not found" });
        return;
      }
      if (!worker) {
        sendJson(response, 404, { error: "Worker not found" });
        return;
      }
      job.workerId = worker.id;
      job.status = "scheduled";
      sendJson(response, 200, job);
      return;
    }

    if (request.method === "PATCH" && parts[0] === "jobs" && parts[2] === "status") {
      const body = await readBody(request);
      const job = findRecord("jobs", parts[1]);
      if (!job) {
        sendJson(response, 404, { error: "Job not found" });
        return;
      }
      if (!isValidJobStatus(body.status)) {
        sendJson(response, 400, { error: "Invalid job status" });
        return;
      }
      job.status = body.status;
      sendJson(response, 200, job);
      return;
    }

    if (request.method === "PATCH" && parts[0] === "jobs" && parts[2] === "payment") {
      const body = await readBody(request);
      const job = findRecord("jobs", parts[1]);
      if (!job) {
        sendJson(response, 404, { error: "Job not found" });
        return;
      }
      if (!isValidPaymentStatus(body.paymentStatus)) {
        sendJson(response, 400, { error: "Invalid payment status" });
        return;
      }
      job.paymentStatus = body.paymentStatus;
      sendJson(response, 200, job);
      return;
    }

    sendJson(response, 404, { error: "Route not found" });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
}

if (require.main === module) {
  http.createServer(handleRequest).listen(PORT, () => {
    console.log(`CleanOps API running on http://localhost:${PORT}`);
  });
}

module.exports = {
  handleRequest
};
