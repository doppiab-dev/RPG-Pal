exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('groups', {
    id: { type: 'serial', primaryKey: true },
    user_id: { type: 'text', notNull: true, references: 'users(google_id)', onDelete: 'cascade' },
    campaign_id: { type: 'integer', references: 'campaigns(id)', notNull: true, onDelete: 'cascade' }
  })
}

exports.down = pgm => {
  pgm.dropTable('groups')
}
