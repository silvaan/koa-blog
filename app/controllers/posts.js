const mongoose = require('mongoose');
const Post = require('../models/post');

exports.index = async (ctx) => {
  try {
    const posts = await Post.find({}).select('_id title content');
    ctx.status = 200;
    ctx.body = posts;
  } catch(err) {
    ctx.throw(err);
  }
}

exports.show = async (ctx) => {
  try {
    const post = await Post.findOne({ _id: ctx.params.postId }).select('_id title content');
    ctx.status = 200;
    ctx.body = post;
  } catch(err) {
    ctx.throw(err);
  }
}

exports.store = async (ctx) => {
  try {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title: ctx.request.body.title,
      content: ctx.request.body.content
    });

    const savedPost = await post.save();
    ctx.body = savedPost;
  } catch (err) {
    ctx.throw(err);
  }
}

exports.update = async (ctx) => {
  const fields = {};

  for (const field in ctx.request.body) {
    fields[field] = ctx.request.body[field];
  }

  try {
    const post = await Post.update({ _id: ctx.params.postId }, { $set: fields });
    const postUpdated = await Post.find({ _id: ctx.params.postId });
    ctx.status = 200;
    ctx.body = {
      message: 'Post updated',
      post: postUpdated
    };
  } catch(err) {
    ctx.throw(err);
  }
}

exports.delete = async (ctx) => {
  try {
    const post = await Post.remove({ _id: ctx.params.postId });
    ctx.status = 200;
    ctx.body = {
      message: 'Post deleted'
    };
  } catch (err) {
    ctx.throw(err);
  }
}
