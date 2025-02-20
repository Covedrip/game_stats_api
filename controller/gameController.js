const game = require('../db/models/game')
const user = require('../db/models/user')



const createGame = async (req, res, next) => {
    const body = req.body;

    const newGame = await game.create({
        name:body.name,
        genre:body.genre,
    });

    const result = newGame.toJSON()

    delete result.deletedAt

    return res.status(201).json({
        status: 'success',
        data: result,
    });
};

const getAllGames = async (req, res, next) => {
    console.log("req.user:", req.user);
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    const userId = req.user.id;
    try {
        const result = await game.findAll({
            include: user,
            where: { createdBy: userId },
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

    return res.json({
        status: 'success',
        data: result,
    });
};

module.exports = {createGame, getAllGames}