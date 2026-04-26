export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').unique().nullable();
    table.string('password_hash').notNullable();
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('middle_name').nullable();
    table.string('role').defaultTo('player');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}