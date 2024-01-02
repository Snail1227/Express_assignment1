import express, { Request, Response } from 'express';
import { prisma } from '../prisma/prisma-instance';

const app = express();

app.get('/dogs/:id', async (req: Request, res: Response) => {
    const dogId = req.params.id;

    // Check if the ID is a valid number
    if (isNaN(Number(dogId))) {
        return res.status(400).json({ message: 'id should be a number' });
    }

    try {
        const dog = await prisma.dog.findUnique({
            where: {
                id: Number(dogId),
            },
        });

        // If the dog doesn't exist, return a 204 status
        if (!dog) {
            return res.status(204).send();
        }

        // Return the dog with a 200 status
        return res.status(200).json(dog);
    } catch (error) {
        // Handle potential errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
