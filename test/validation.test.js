const test = require("node:test");
const assert = require("node:assert/strict");
const {
  validateClient,
  validateWorker,
  validateJob,
  isValidJobStatus,
  isValidPaymentStatus
} = require("../src/validation");

test("validates required client fields", () => {
  assert.equal(validateClient({ name: "Avela", phone: "0710000000", address: "Soweto" }), null);
  assert.match(validateClient({ name: "Avela" }), /phone, address/);
});

test("validates required worker fields", () => {
  assert.equal(validateWorker({ name: "Lebo", phone: "0720000000", skill: "deep cleaning" }), null);
  assert.match(validateWorker({ phone: "0720000000" }), /name, skill/);
});

test("validates required job fields", () => {
  assert.equal(validateJob({ clientId: "client-1", serviceType: "office", scheduledDate: "2026-07-01" }), null);
  assert.match(validateJob({ clientId: "client-1" }), /serviceType, scheduledDate/);
});

test("limits job and payment status values", () => {
  assert.equal(isValidJobStatus("scheduled"), true);
  assert.equal(isValidJobStatus("lost"), false);
  assert.equal(isValidPaymentStatus("paid"), true);
  assert.equal(isValidPaymentStatus("overdue-ish"), false);
});
