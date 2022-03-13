const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const Post = require('../models/PostModel');
const path = require('path');
const Resize = require('../root/Resize');
const CommentModel = require('../models/CommentModel');

exports.getAllPost = asyncErrorHandler(async (req, res, next) => {
  const listPost = await Post.find()
    .populate({
      model: 'Comment',
      path: 'list_comment',
    })
    .populate({
      model: 'Post',
      path: 'share_id',
    })
    .populate({
      model: 'User',
      path: 'account_id',
    });
  res.status(200).json({
    success: true,
    listPost,
  });
});

exports.createPost = asyncErrorHandler(async (req, res, next) => {
  let images = [''];
  if (req.files) {
    const imagePath = 'public/images/post';
    images = await Promise.all(
      req.files.list_image.map(async (e) => {
        const fileUpload = new Resize(imagePath, e.name);
        const fileUrl = await fileUpload.save(e.data);
        return fileUrl;
      })
    );
  }
  req.body.list_image = images;
  const post = await Post.create(req.body);

  res.status(200).json({
    success: true,
    post,
  });
});
exports.updateLikePost = asyncErrorHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  post.like = post.like + 1;
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
});

exports.updateSharePost = asyncErrorHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  post.share = post.share + 1;
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
});
exports.commentPost = asyncErrorHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const comment = await CommentModel.create(req.body);
  post.list_comment.push(comment.id);
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
});

exports.replyCommentPost = asyncErrorHandler(async (req, res, next) => {
  const comment = await CommentModel.create(req.body);
  const oldComment = await CommentModel.findById(req.body.reply_id);
  oldComment.list_reply.push(comment.id);
  await oldComment.save();
  res.status(200).json({
    success: true,
    oldComment,
  });
});

exports.getReplyCommentPost = asyncErrorHandler(async (req, res, next) => {
  const comment = await CommentModel.findById(req.params.id).populate({
    model: 'Comment',
    path: 'list_reply',
  });
  res.status(200).json({
    success: true,
    comment,
  });
});
