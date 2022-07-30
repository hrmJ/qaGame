/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns("cards", {
    content_type: { type: "varchar(10)", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("cards", "content_type", { ifExists: true });
};
