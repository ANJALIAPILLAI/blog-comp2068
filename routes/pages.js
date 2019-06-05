const router = require ('express').Router();


// Our controller
const PagesController = require('../controllers/pagesController');

// Our routes
router.get(`/`, PagesController.show);
router.get(`/about`, PagesController.show);
router.get(`/contact`, PagesController.show);
module.exports= router;