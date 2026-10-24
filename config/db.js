<<<<<<< HEAD
const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'campus_eats_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

module.exports = db;
=======
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dataDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.DB_PATH || path.join(dataDir, 'campus_eats.sqlite');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

const normalizeParams = (params = []) => {
  if (params === undefined || params === null) return [];
  return Array.isArray(params) ? params : [params];
};

const normalizeSql = (sql) => sql.replace(/\$\d+/g, '?');

const buildTxAdapter = () => ({
  any: (sql, params = []) => db.prepare(normalizeSql(sql)).all(...normalizeParams(params)),
  oneOrNone: (sql, params = []) => db.prepare(normalizeSql(sql)).get(...normalizeParams(params)) ?? null,
  one: (sql, params = []) => {
    const row = db.prepare(normalizeSql(sql)).get(...normalizeParams(params));
    if (!row) {
      throw new Error('No data found');
    }
    return row;
  },
  none: (sql, params = []) => {
    db.prepare(normalizeSql(sql)).run(...normalizeParams(params));
    return undefined;
  },
});

const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cuisine TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 4.5
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      times_ordered INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_item_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      price_at_order REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
    );
  `);

  const restaurantCount = db.prepare('SELECT COUNT(*) AS count FROM restaurants').get().count;
  if (restaurantCount === 0) {
    const insertRestaurant = db.prepare(
      'INSERT INTO restaurants (name, cuisine, rating) VALUES (?, ?, ?)'
    );
    const insertMenuItem = db.prepare(
      'INSERT INTO menu_items (restaurant_id, name, price, times_ordered) VALUES (?, ?, ?, ?)'
    );

    const restaurants = [
      ['Sushi Haven', 'Japanese', 4.8],
      ['Green Bowl', 'Healthy', 4.6],
      ['Noodle Corner', 'Asian', 4.7],
    ];

    const menuByRestaurant = {
      1: [
        ['Salmon Rice Bowl', 15.5, 0],
        ['Spicy Tuna Roll', 12.0, 1],
        ['Veggie Tempura Set', 14.0, 3],
      ],
      2: [
        ['Avocado Chickpea Wrap', 11.5, 2],
        ['Quinoa Power Salad', 13.0, 4],
        ['Berry Yogurt Bowl', 9.5, 1],
      ],
      3: [
        ['Chicken Noodle Bowl', 16.0, 5],
        ['Shrimp Dumpling Soup', 12.5, 2],
        ['Tofu Stir-Fry', 14.5, 3],
      ],
    };

    restaurants.forEach(([name, cuisine, rating]) => {
      const restaurant = insertRestaurant.run(name, cuisine, rating);
      (menuByRestaurant[restaurant.lastInsertRowid] || []).forEach(([menuName, price, timesOrdered]) => {
        insertMenuItem.run(restaurant.lastInsertRowid, menuName, price, timesOrdered);
      });
    });
  }
};

initializeDatabase();

module.exports = {
  any: (sql, params = []) => db.prepare(normalizeSql(sql)).all(...normalizeParams(params)),
  oneOrNone: (sql, params = []) => db.prepare(normalizeSql(sql)).get(...normalizeParams(params)) ?? null,
  one: (sql, params = []) => {
    const row = db.prepare(normalizeSql(sql)).get(...normalizeParams(params));
    if (!row) {
      throw new Error('No data found');
    }
    return row;
  },
  none: (sql, params = []) => {
    db.prepare(normalizeSql(sql)).run(...normalizeParams(params));
    return undefined;
  },
  tx: async (callback) => {
    db.exec('BEGIN IMMEDIATE');
    try {
      const result = await callback(buildTxAdapter());
      db.exec('COMMIT');
      return result;
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
  },
};
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
