// const server = require('./server.js');
const express = require('express');
const Posts = require('./data/db.js');

const server = express();
const port = 8000;

server.use(express.json());

// Returns all posts
server.get('/api/posts', (req, res) => {
	Posts.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error retrieving posts' });
		});
});

// Returns the post with the given ID
server.get('/api/posts/:id', (req, res) => {
	const postId = req.params.id
	console.log('Post ID', postId)
	Posts.findById(postId)
		.then(post => {
			if (post) {
				res.status(200).json(post)
			} else {
				res.status(404).json({ message: "The post with this ID does not exist" })
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Error retrieving info' })
		})
})

// Return comments on the post with the given ID
server.get('/api/posts/:id/comments', (req, res) => {
	const postId = req.params.id
	console.log('Post ID', postId)
	Posts.findPostComments(postId)
		.then(comments => {
			res.status(200).json(post)
		})
		.catch(err => {
			res.status(500).json({ message: 'Comments for post not found' })
		})
})

// POST a new post
server.post('/api/posts', (req, res) => {
	const { title, contents } = req.body
	
	if (title && contents) {
		Posts.insert({ title, contents })
		.then(({ id }) => {
			Posts.findById(id)
				.then(post => {
					res.status(201).json(post[0]);
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ error: 'There was a server error retrieving the post'})
				})
		})
		.catch(err => {
			res.status(500).json({ message: 'error adding posts' });
		});
	}	else {
		res.status(400).json({ message:'Please provide title and contents for post.' })
}});

// POST a comment
server.post('/api/posts/:id/comments', (req, res) => {
	const postInfo = req.body
	const postId = req.params.id

	Posts.insertComment(postInfo)
		.then(comment => {
			if (postInfo.text) {
				res.status(201).json(comment[0])
			} else {
				res.status(400).json({ error: "Please provde text for the comment" })
			}
		})
		.catch(err => {
			res.status(500).json({ error: "There was an error while saving the comment" })
		})
})

// Update the post with the given ID
server.put('/api/posts/:id', (req, res) => {
	const postInfo = req.body;
	const postId = req.params.id;
	Posts.update(postId, postInfo)
		.then(dat => {
			if (dat !== 1) {
				res.status(404).json({ message: 'The post with that ID does not exist' })
			} else if (postInfo.title && postInfo.contents) {
				res.status(200).json(dat)
			} else {
				res.status(400).json({ error: 'Please provide title and contents for the post' })
			}
		} )
		.catch(err => {
			res.status(500).json({ error: 'There was an error while saving the post to the database' })
		})
})

// Delete the post with the given ID
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

// Listen ;)
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