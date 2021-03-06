exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments()
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.string('email', 320).notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
