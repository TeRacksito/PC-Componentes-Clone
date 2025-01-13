import { Sequelize } from "sequelize";

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

if (!database || !username || !password || !host) {
  console.error("Missing environment variables for database connection");
  process.exit(1);
}

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  retry: {
    match: [/ECONNREFUSED/],
    max: 20,
    backoffBase: 1000,
    backoffExponent: 1.5,
  }
});
