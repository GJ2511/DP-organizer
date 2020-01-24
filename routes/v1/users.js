import express from 'express';
import writeJSONFile from '../../helpers';

const filename = '../../data/users.json'
let users = require(filename)

const router = express.Router();

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *            properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                score:
 *                  type: integer
 */
router.get('/', function(req, res, next) {
  res.json({ users });
});


/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     tags:
 *       - User
 *     description: Creates a new users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Name
 *         in: body
 *         type: string
 *         required: true
 *         schema: 
 *              properties:
 *                name:
 *                  type: string
 *              example:
 *                name: 'test'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           type: object
 *           properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                score:
 *                  type: integer
 */
router.post('/', function(req, res, next) {
  const {name} = req.body;
  const id = name.trim().toUpperCase().replace(/ /g,"_");
  const user = users.find(u => u.id == id)

  if(user) {
    return res.json(user);
  }

  const newUser = { id, name: name.trim(), score: 0};
  users.push(newUser);

  writeJSONFile("../data/users.json", users)

  res.json(newUser);
});

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     tags: 
 *        - User
 *     description: Updates a single user
 *     produces: application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Numeric ID of the user to update
 *         required: true
 *         scheme:
 *             id:
 *               type: integer
 *       - name: score
 *         in: body
 *         description: Score for the User resource
 *         required: true
 *         schema: 
 *              properties:
 *                score:
 *                  type: integer
 *              example:
 *                score: 12
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           type: object
 *           properties:
 *                id:
 *                  type: string
 *                name:
 *                  type: string
 *                score:
 *                  type: integer
 */
router.put('/:id', function(req, res, next) {
  const {score} = req.body;
  const {id} = req.params;

  const index = users.findIndex(u => u.id == id);
  users[index].score = score;

  writeJSONFile("../data/users.json", users);
  res.json(users[index]);
});

module.exports = router;
