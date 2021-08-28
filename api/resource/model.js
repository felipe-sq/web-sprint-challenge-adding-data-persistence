// build your `Resource` model here
const db = require('../../data/dbConfig.js');

async function getResources() {
  return await db('resources');
}

async function getResourceById(resource_id) {
  return await db('resources').where('resource_id', resource_id).first();
}

async function createResource(resource) {
  return await db('resources').insert(resource);
}

module.exports = {
  getResources,
  getResourceById,
  createResource
};