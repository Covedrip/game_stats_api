WHAT THE API DOES The API saves the stats for games played 

INSTALL DEPENDENCIES npm install

Protected information for the database, admin and jwt token are in the .env

Set up database -> npx sequelize db:migrate 


API Routes
1️⃣ Auth Routes (/api/auth)
POST /register → Register new user
POST /login → User login
2️⃣ Game Routes (/api/games)
GET / → Get all games
POST /add → Add a new game
DELETE /:id → Delete a game
3️⃣ Player Stats Routes (/api/stats)
GET /user/:userId → Get stats for a user
POST /update → Update stats
GET /leaderboard → Fetch leaderboard
4️⃣ Match History Routes (/api/matches)
POST /add → Add match result
GET /user/:userId → Fetch match history
