import express, { Router } from 'express';
import 'dotenv/config';
import { router } from './router.js';
import { dbConnection } from './database/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/healthy', (req, res) => {
	res.json({
		success: true,
		message: 'Server is healthy!',
	});
});

app.use('/api', router);

dbConnection()
	.then(() => {
		console.log('Database connection established!');
		app.listen(PORT, () => {
			console.log(`Server running on ${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Error establishing connection with the database:', error);
	});
