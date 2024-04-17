exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('players', {
    id: { type: 'serial', primaryKey: true },
    user_id: { type: 'text', notNull: true, references: 'users(google_id)', onDelete: 'cascade' }
  })
}

exports.down = pgm => {
  pgm.dropTable('players')
}
