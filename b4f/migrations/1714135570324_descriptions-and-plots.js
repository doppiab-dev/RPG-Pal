exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createType('places_of_interest_types', ['world', 'continent', 'region', 'area', 'city', 'camp', 'neighborhood', 'point']),
  pgm.addColumn('campaigns', {
    description: { type: 'text' },
    plot: { type: 'text' }
  })
  pgm.addColumn('groups', {
    name: { type: 'text', notNull: true, default: 'to be renamed' }
  })
  pgm.createTable('places_of_interest', {
    id: { type: 'serial', primaryKey: true },
    user_id: { type: 'text', notNull: true, references: 'users(google_id)', onDelete: 'cascade' },
    campaign_id: { type: 'integer', references: 'campaigns(id)', notNull: true, onDelete: 'cascade' },
    parent: { type: 'integer', notNull: false, references: 'places_of_interest(id)' },
    children: { type: 'integer[]', notNull: false },
    description: { type: 'text', notNull: false },
    name: { type: 'text', notNull: true },
    place: {
      type: 'places_of_interest_types',
      notNull: true,
      check: "place IN ('world', 'continent', 'region', 'area', 'city', 'camp', 'neighborhood', 'point')"
    }
  })
}

exports.down = pgm => {
  pgm.dropColumn('campaigns', 'description')
  pgm.dropColumn('campaigns', 'plot')
  pgm.dropColumn('groups', 'name')
  pgm.dropTable('places_of_interest')
  pgm.dropType('places_of_interest_types')
}
