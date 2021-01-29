const pgp = require('pg-promise')();

const e = process.env;
const config = {
  host: e.PGHOST,
  port: e.PGPORT,
  database: e.PGDATABASE,
  user: e.PGUSER,
  password: e.PGPASSWORD,
  max: 30, // up to 30 connections
};

const db = pgp(config)

module.exports = db;