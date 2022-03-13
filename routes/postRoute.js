const express = require('express');
const {
  createPost,
  updateLikePost,
  commentPost,
  getAllPost,
  replyCommentPost,
  getReplyCommentPost,
} = require('../controllers/PostController');
const router = express.Router();
router.get('/post', getAllPost);
router.post('/post', createPost);
router.post('/updateLike/:id', updateLikePost);
router.post('/post/:id/comment', commentPost);
router.post('/post/replycomment', replyCommentPost);
router.get('/post/getreplycomment/:id', getReplyCommentPost);
module.exports = router;
