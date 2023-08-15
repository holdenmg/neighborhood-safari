const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Animal = require('./Animal');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.belongsTo(Animal, {
  foreignKey: 'animal_id'
})

module.exports = { User, Post, Comment, Animal };
