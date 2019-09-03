const express = require('express');
const data = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
	res.status(200).json(posts);
})

// server.get('/api/posts/:id', (req, res) => {
// 	const id = req.params.id;

// })