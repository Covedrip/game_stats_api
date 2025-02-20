const {createGame, getAllGames} = require('../controller/gameController');
const authMiddleware = require("../middleware/authMiddleware");

const router = require("express").Router();


router.route('/add').post(createGame)

router.route('/').get(getAllGames)

module.exports = router;