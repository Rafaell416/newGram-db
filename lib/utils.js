'use strict'

const utils = {
  extractTags
}

function extractTags (text) {
  if (text == null) return []

  let matches = text.match(/#(\w+)/g)

  if (matches === null) return []

  matches = matches.map(normalizar)

  return matches
}

function normalizar (text) {
  text = text.toLowerCase()
  text = text.replace(/#/g, '')
  return text
}

module.exports = utils
