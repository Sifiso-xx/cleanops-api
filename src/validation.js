const jobStatuses = ["requested", "scheduled", "in_progress", "completed", "cancelled"];
const paymentStatuses = ["unpaid", "pending", "paid"];

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function requireFields(body, fields) {
  const missing = fields.filter((field) => !hasText(body[field]));
  if (missing.length > 0) {
    return `Missing required field(s): ${missing.join(", ")}`;
  }
  return null;
}

function validateClient(body) {
  return requireFields(body, ["name", "phone", "address"]);
}

function validateWorker(body) {
  return requireFields(body, ["name", "phone", "skill"]);
}

function validateJob(body) {
  return requireFields(body, ["clientId", "serviceType", "scheduledDate"]);
}

function isValidJobStatus(status) {
  return jobStatuses.includes(status);
}

function isValidPaymentStatus(status) {
  return paymentStatuses.includes(status);
}

module.exports = {
  jobStatuses,
  paymentStatuses,
  validateClient,
  validateWorker,
  validateJob,
  isValidJobStatus,
  isValidPaymentStatus
};
