import express, { Request, Response } from 'express';
import { prisma } from '../prisma/prisma-instance';

const app = express();

app.use(express.json());

// DELETE /dogs/:id endpoint
app.delete('/dogs/:id', async (req: Request, res: Response) => {
    const dogId = parseInt(req.params.id, 10);

    // Check if the ID is a number
    if (isNaN(dogId)) {
        return res.status(400).json({ message: 'id should be a number' });
    }

    try {
        // Check if the dog exists
        const existingDog = await prisma.dog.findUnique({
            where: {
                id: dogId,
            },
        });

        if (!existingDog) {
            // Dog does not exist
            return res.status(204).send();
        }

        // Delete the dog
        const deletedDog = await prisma.dog.delete({
            where: {
                id: dogId,
            },
        });

        return res.status(200).json(deletedDog);
    } catch (error) {
        // Handle potential errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
