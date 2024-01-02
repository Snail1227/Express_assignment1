import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.post('/dogs', async (req: Request, res: Response) => {
  const { name, description, breed, age } = req.body;
  const errors: string[] = [];

  // Validate input data
  if (typeof name !== 'string') errors.push('name should be a string');
  if (typeof description !== 'string') errors.push('description should be a string');
  if (typeof breed !== 'string') errors.push('breed should be a string');
  if (typeof age !== 'number') errors.push('age should be a number');

  // Check for invalid keys
  const validKeys = ['name', 'description', 'breed', 'age'];
  Object.keys(req.body).forEach(key => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });

  // If there are errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Create and save the new dog
  try {
    const newDog = await prisma.dog.create({
      data: { name, description, breed, age }
    });
    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});