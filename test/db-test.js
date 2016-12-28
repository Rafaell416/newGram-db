 'use strict'

 const test = require('ava')
 const uuid = require('uuid-base62')
 const r = require('rethinkdb')
 const Db = require('../')
 const dbName = `newgram_${uuid.v4()}`
 const db = new Db({db: dbName})
 const fixtures = require('./fixtures')

 test.before('setup database', async t => {
   await db.connect()
   t.true(db.connected, 'should be connected')
 })

 test.after('disconnect database', async t => {
   await db.disconnect()
   t.false(db.connected, 'should be disconnected')
 })

 test.after.always('clean up database', async t => {
   let conn = await r.connect({})
   await r.dbDrop(dbName).run(conn)
 })

 test('save image', async t => {
   t.is(typeof db.saveImage, 'function', 'saveImage is a function')

   let image = fixtures.getImage()

   let created = await db.saveImage(image)
   t.is(created.description, image.description)
   t.is(created.url, image.url)
   t.is(created.likes, image.likes)
   t.is(created.liked, image.liked)
   t.deepEqual(created.tags, ['awesome', 'tags', 'newgram'])
   t.is(created.user_id, image.user_id)
   t.is(created.public_id, uuid.encode(created.id))
   t.is(typeof created.id, 'string')
   t.truthy(created.createdAt)
 })

 test('Like image', async t => {
   t.is(typeof db.likeImage, 'function', 'LikeImage is a function')

   let image = fixtures.getImage()
   let create = await db.saveImage(image)
   let result = await db.likeImage(create.public_id)

   t.true(result.liked)
   t.is(result.likes, image.likes + 1)
 })
