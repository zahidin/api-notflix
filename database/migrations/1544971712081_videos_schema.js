'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideosSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('episode', 200).notNullable()
      table.integer('series_id', 10).notNullable()
      table.string('title').notNullable()
      table.string('image_url').notNullable()
      table.string('starring').notNullable()
      table.integer('category_id',10).notNullable()
      table.string('imdb_score').notNullable()
      table.string('video_embed').notNullable()
      table.string('video_url').notNullable()
      table.string('is_trending',100).notNullable()
      table.string('is_popular',100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideosSchema
