import express from 'express';
import 'dotenv/config';
import { router } from './router.js';
import { dbConnection } from './database/db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
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
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Error establishing connection with the database:', error);
	});
