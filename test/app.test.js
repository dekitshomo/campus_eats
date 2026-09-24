const test = require('node:test');
const assert = require('node:assert/strict');

const db = require('../config/db');

test('database initializes with sample restaurant data', async () => {
  const restaurants = await db.any('SELECT * FROM restaurants ORDER BY id');
  assert.ok(restaurants.length > 0, 'Expected seeded restaurant data to exist');
});
