const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = req.body
    newComment.user_id= req.session.user_id
    const commentData = await Comment.create(newComment);

 
      res.status(200).json(commentData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res)=>{
  try {
      const commentData = await Comment.destroy({
          where:{
              id:req.params.id,
              user_id: req.session.user_id
          }
      })
      if (!commentData){
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
      } else{
          res.status(200).json(commentData)
      }
  } catch (err) {
      res.status(500).json(err)
  }
})

module.exports = router;
