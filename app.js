require('dotenv').config({path: `${process.cwd()}/.env`})
const express = require('express')

const authRouter = require('./route/authRoute');
const gameRouter = require('./route/gameRoute');
// const matchHistoryRouter = require('./route/matchHistoryRoute');
// const playerStatsRouter = require('./route/playerStatsRoute');

const app = express()
app.use(express.json()); 



app.get('/',(req, res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Rest API s working YAAAAAY'
    })
})

// all routes are here
app.use('/api/auth', authRouter)
app.use('/api/game', gameRouter)
// app.use('/api/history', matchHistoryRouter)
// app.use('/api/stats', playerStatsRouter)

app.use('*', (req, res, next)=>{
    res.status(404).json({
        status: 'Fail',
        message: 'Route not found'
        
    })
})

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, ()=>{
    console.log("Server has started on port 3000");
})