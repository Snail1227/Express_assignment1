import express from "express";
import { prisma } from "../prisma/prisma-instance";
import { errorHandleMiddleware } from "./error-handler";
import "express-async-errors";

const app = express();
app.use(express.json());

// index

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

//index all dogs

app.get("/dogs", async (req, res) => {
  res.send(await prisma.dog.findMany()).status(200); 
});

// create a new
app.post('/dogs', async (req, res) => {
  const { name, description, breed, age } = req.body;
  const errors: string[] = [];


  if (typeof name !== 'string') errors.push('name should be a string');
  if (typeof description !== 'string') errors.push('description should be a string');
  if (typeof breed !== 'string') errors.push('breed should be a string');
  if (typeof age !== 'number') errors.push('age should be a number');


  const validKeys = ['name', 'description', 'breed', 'age'];
  Object.keys(req.body).forEach(key => {
    if (!validKeys.includes(key)) {
      errors.push(`'${key}' is not a valid key`);
    }
  });


  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const newDog = await prisma.dog.create({
      data: { name, description, breed, age }
    });
    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// show by id
app.get('/dogs/:id', async (req, res) => {
  const dogId = req.params.id;

  if (isNaN(Number(dogId))) {
      return res.status(400).json({ message: 'id should be a number' });
  }

  try {
      const dog = await prisma.dog.findUnique({
          where: {
              id: Number(dogId),
          },
      });

      if (!dog) {
          return res.status(204).send();
      }

      return res.status(200).json(dog);
  } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
  }
});

// update a dog
app.patch('/dogs/:id', async (req, res) => {
  const dogId = parseInt(req.params.id, 10);
  const updateData = req.body;


  const validKeys = ['name', 'description', 'breed', 'age'];
  const invalidKeys = Object.keys(updateData).filter(key => !validKeys.includes(key));

 
  if (invalidKeys.length > 0) {
      return res.status(400).json({ errors: invalidKeys.map(key => `'${key}' is not a valid key`) });
  }

  try {

      const updatedDog = await prisma.dog.update({
          where: { 
            id: dogId 
          },
          data: updateData,
      });
      
      return res.status(201).json(updatedDog);
  } catch (error) {

      return res.status(500).json({ message: 'Internal server error' });
  }
});

//delete a dog

app.delete('/dogs/:id', async (req, res) => {
  const idParam = req.params.id;

  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'id should be a number' });
  }

  const dog = await prisma.dog.findUnique({
    where: { 
      id: id 
    },
  });

  if (!dog) {
    return res.status(204).send();
  }


  await prisma.dog.delete({
    where: { 
      id: id 
    },
  });

  return res.status(200).json(dog);
});

// all your code should go above this line
app.use(errorHandleMiddleware);

const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}
`)
);
