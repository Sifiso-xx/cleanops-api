const state = {
  clients: [],
  workers: [],
  jobs: []
};

const counters = {
  clients: 1,
  workers: 1,
  jobs: 1
};

function createRecord(collection, data) {
  const record = {
    id: `${collection.slice(0, -1)}-${counters[collection]++}`,
    createdAt: new Date().toISOString(),
    ...data
  };
  state[collection].push(record);
  return record;
}

function listRecords(collection) {
  return state[collection];
}

function findRecord(collection, id) {
  return state[collection].find((record) => record.id === id);
}

function resetStore() {
  state.clients = [];
  state.workers = [];
  state.jobs = [];
  counters.clients = 1;
  counters.workers = 1;
  counters.jobs = 1;
}

module.exports = {
  createRecord,
  listRecords,
  findRecord,
  resetStore
};
