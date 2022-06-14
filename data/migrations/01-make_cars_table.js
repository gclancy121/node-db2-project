exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id').notNullable().unique();
    tbl.string('vin').notNullable();
    tbl.string('make').notNullable();
    tbl.string('model').notNullable();
    tbl.integer('mileage').notNullable();
    tbl.string('title');
    tbl.string('transmission');
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};
