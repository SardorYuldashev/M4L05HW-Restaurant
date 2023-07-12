/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id');
    table.integer('item_id').references('id').inTable('items').onDelete('SET NULL');
    table.integer('size_id').references('id').inTable('item_sizes').onDelete('SET NULL');
    table.integer('quantity');
    table.decimal('sub_total_price', 12, 2).notNullable();    
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('order_items');
};