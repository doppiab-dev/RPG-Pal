exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createType('campaign_status', ['active', 'on_hold', 'ended'])
  pgm.addColumn('campaigns', {
    name: { type: 'text', notNull: true },
    status: {
      type: 'campaign_status',
      notNull: true,
      default: 'active',
      check: "status IN ('active', 'on_hold', 'ended')"
    }
  })
}

exports.down = (pgm) => {
  pgm.dropColumn('campaigns', 'name')
  pgm.dropColumn('campaigns', 'status')
  pgm.dropType('campaign_status')
}
