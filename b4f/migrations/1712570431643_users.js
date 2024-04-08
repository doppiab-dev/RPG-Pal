exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    google_id: { type: 'text', notNull: true, primaryKey: true },
    username: { type: 'text', notNull: true }
  })
}

exports.down = pgm => {
  pgm.dropTable('users')
}
