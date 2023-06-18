const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET route for rendering homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});
router.get("/post", withAuth, async (req, res) => {
  try {
    res.render("newPost",{      logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/posts", withAuth, async (req, res) => {
  try {
    res.render("newPost", {      logged_in: req.session.logged_in});
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/posts/:id',withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'post not found' });
      return;
    }

    const post = postData.get({ plain: true });
    console.log(post)

    res.render('postid', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }

});
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
