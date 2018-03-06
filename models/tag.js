module.exports = function (sequelize, DataTypes) {
  const tags = sequelize.define('tags', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })

  // Get all tags
  tags.getTags = function(callback) {
    tags.findAll().then()
  }

  // Add a tag to the tags table
  tags.createTag = function (tag, callback) {
    tags.create(tag).then(function (createdTag) {
      return callback(null, createdTag)
    }).catch(function (err) {
      return callback(err, null)
    })
  }

  // Searches for the given tag from the tags table
  // and returns it if found else returns null
  tags.getTagByName = function(tagName, callback) {
    tags.find({
      where: {
        name: tagName
      }
    }).then(function(tag) {
      return callback(null, tag)
    }).catch(function (err) {
      return callback(err, null)
    })
  }
  return tags
}