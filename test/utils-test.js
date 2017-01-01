'use strict'

const test = require('ava')

const utils = require('../lib/utils')

test('extracting hastags from text', t => {
  let tags = utils.extractTags('a #picture with tags #AwEsOmE #Newgram #AVA and #100 ##yes')
  t.deepEqual(tags, ['picture', 'awesome', 'newgram', 'ava', '100', 'yes'])

  tags = utils.extractTags('a picture with no tags')
  t.deepEqual(tags, [])

  tags = utils.extractTags()
  t.deepEqual(tags, [])

  tags = utils.extractTags(null)
  t.deepEqual(tags, [])
})

test('encrypt password', t => {
  let password = 'sha256'
  let encrypted = '5d5b09f6dcb2d53a5fffc60c4ac0d55fabdf556069d6631545f42aa6e3500f2e'

  let result = utils.encrypt(password)
  t.is(result, encrypted)
})
