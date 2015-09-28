Settings = require 'settings'
RAF      = require 'utils/raf'
Scene    = require 'helpers/scene'

module.exports = class Index

  constructor: ->

    RAF.on 'tick', @update

  update: ( time ) =>