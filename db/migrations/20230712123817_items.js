/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id');
    table.enum('type', ['pitsalar', 'salatlar', 'desertlar', 'zakuskalar', 'ichimliklar']).notNullable();
    table.boolean('is_deleted').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('items');
};
