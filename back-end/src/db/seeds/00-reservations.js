const reservations = require("./00-reservations.json")

/** inserts all reservations into the reservations table */

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(reservations));
};