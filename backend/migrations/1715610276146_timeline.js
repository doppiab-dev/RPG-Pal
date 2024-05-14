/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('timeline', {
    id: { type: 'serial', primaryKey: true },
    user_id: { type: 'text', notNull: true, references: 'users(google_id)', onDelete: 'cascade' },
    campaign_id: { type: 'integer', references: 'campaigns(id)', notNull: true, onDelete: 'cascade' },
    name: { type: 'text', notNull: true },
    description: { type: 'text', notNull: false },
    position: { type: 'integer', notNull: true },
    date: { type: 'text', notNull: true }
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('timeline')
}
