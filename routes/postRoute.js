const express = require('express');
const { socketIOMiddleware } = require('../app');
const {
  createPost,
  updateLikePost,
  commentPost,
  getAllPost,
  replyCommentPost,
  getReplyCommentPost,
  deletePost,
  updatePost,
} = require('../controllers/PostController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
router.get('/post', getAllPost);
router.post('/post', isAuthenticatedUser, socketIOMiddleware, createPost);
// router.put('/post', isAuthenticatedUser, socketIOMiddleware, createPost);
router.post(
  '/updateLike/:id',
  isAuthenticatedUser,
  socketIOMiddleware,
  updateLikePost
);
router.put('/post/:id', isAuthenticatedUser, socketIOMiddleware, updatePost);
router.delete('/post/:id', isAuthenticatedUser, socketIOMiddleware, deletePost);
router.post('/post/:id/comment', commentPost);
router.post('/post/replycomment', replyCommentPost);
router.get('/post/getreplycomment/:id', getReplyCommentPost);
module.exports = router;
