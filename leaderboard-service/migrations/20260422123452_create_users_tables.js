export async function up(knex) {
  await knex.schema.createTable('leaderboard', (table) => {
    table.increments('id').primary();

    table.integer('user_id').nullable();
    table.string('username').notNullable();

    table.integer('score').notNullable().defaultTo(0);
    table.integer('time_seconds').nullable();
    table.string('level').nullable();

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('leaderboard');
}