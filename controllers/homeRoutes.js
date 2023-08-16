const router = require('express').Router();
const { Post, User, Comment, Animal } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');


router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user and animal data
    const postData = await Post.findAll({
      include: [
        {model: Animal,
          attributes: ['id', 'common_name', 'scientific_name', 'endangered', 'link']
        
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/missing', async (req, res) => {
  try {
    // Get all posts and JOIN with user and animal data
    const postData = await Post.findAll({
      include: [
        {model: Animal,
          attributes: ['id', 'common_name', 'scientific_name', 'endangered', 'link']
        
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('missing', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/danger', async (req, res) => {
  try {
    // Get all posts and JOIN with user and animal data
    const postData = await Post.findAll({
      include: [
        {model: Animal,
          attributes: ['id', 'common_name', 'scientific_name', 'endangered', 'link']
        
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('danger', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/newPost/:id', async (req, res) => {
  try {
    // Get all posts and JOIN with user and animal data
    const postData = await Post.findAll({
      include: [
        {model: Animal,
          attributes: ['id', 'common_name', 'scientific_name', 'endangered', 'link']
        
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('newPost', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/chooseAnimal', async (req, res) => {
  try {
    
    res.render('chooseAnimal', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/profile/showAnimals', async (req, res) => {
  try {
     // Get the search term from the user
     //const searchTerm = req.query.searchTerm;
     
     const Op = Sequelize.Op;
     // Filter the animals by the search term
     const animalData = await Animal.findAll({
      where: {
        common_name: {
          [Op.like]: `%${req.query.searchTerm}%`
        }
      }
    });
       
    // Serialize data so the template can read it
    const animals = animalData.map((post) => post.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('showAnimals', { 
     animals, 
     logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {model: Animal,
          attributes: ['id', 'common_name', 'scientific_name', 'endangered', 'link']
        
        },
        {  model: Comment,
          attributes: ['id', 'text', 'post_id', 'user_id', 'date_created'],
          include: 
            {
              model: User,
              attributes: ['name'],
            }
        },
        {
          model: User,
          attributes: ['name'],
        }
      
      ]
    });
    
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/edit/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Animal,
          attributes: ['common_name'],
        }
      
      ]
    });
    
    const post = postData.get({ plain: true });
    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, include:
      {
        model: Animal,
        attributes: ['id','common_name'],

      } }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;

