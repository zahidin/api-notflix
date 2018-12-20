'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoviesSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title',200)
      table.string('genre',200)
      table.string('stars',200)
      table.string('director',200)
      table.text('sinopsis')
      table.string('rating',200)
      table.string('views',200)
      table.text('image')
      table.text('video')
      table.timestamps()
    })
  }

  down () {
    this.drop('movies')
  }
}

module.exports = MoviesSchema
