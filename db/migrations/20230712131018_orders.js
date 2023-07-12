/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id');
    table.integer('client_id').references('id').inTable('clients').onDelete("SET NULL");
    table.decimal('total_price', 12, 2).notNullable();
    table.boolean('is_paid').defaultTo(false);
    table.enum('status', ['preparing', 'prepared', 'completed']).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('orders');
};