exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('users', {
    google_id: { type: 'text', notNull: true, primaryKey: true },
    username: { type: 'text', notNull: true, unique: true }
  })
  pgm.sql(` 
  INSERT INTO users (google_id, username)
  VALUES
  ('0', 'pippo')
  `)
}

exports.down = pgm => {
  pgm.dropTable('users')
}
