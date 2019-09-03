// const server = require('./server.js');
const express = require('express');
const Posts = require('./data/db.js');

const server = express();
const port = 8000;

server.use(express.json());

server.get('/api/posts', (req, res) => {
	Posts.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error retrieving posts' });
		});
});

server.post('/api/posts', (req, res) => {
	const postInfo = req.body
	Posts.insert(postInfo)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(err => {
			res.status(500).json({ message: 'error adding posts' });
		});
});

server.delete('/api/posts/:id', (req, res) => {
	const postId = req.params.id;

	Posts.remove(postId)
		.then(post => {
			res.status(200).json({ message: 'post deleted!' });
		})
		.catch(err => {
			res.status(500).json({ message: 'error deleting the post' });
		});
});

server.listen(port, () => {
	console.log(`API on port ${ port }`);
});

//   find,
//   findById,
//   insert,
//   update,
//   remove,
//   findPostComments,
//   findCommentById,
//   insertComment,