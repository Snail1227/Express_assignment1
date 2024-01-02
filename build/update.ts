import express, { Request, Response } from 'express';
import { prisma } from '../prisma/prisma-instance';
import { Dog } from '@prisma/client';

const app = express();
app.use(express.json());

app.patch('/dogs/:id', async (req: Request, res: Response) => {
    const dogId = parseInt(req.params.id, 10);
    const updateData: Partial<Dog> = req.body;

    // Valid keys for Dog model
    const validKeys = ['name', 'description', 'breed', 'age'];
    const invalidKeys = Object.keys(updateData).filter(key => !validKeys.includes(key));

    // Reject invalid keys
    if (invalidKeys.length > 0) {
        return res.status(400).json({ errors: invalidKeys.map(key => `'${key}' is not a valid key`) });
    }

    try {
        // Update the dog in the database
        const updatedDog = await prisma.dog.update({
            where: { id: dogId },
            data: updateData,
        });
        
        return res.status(201).json(updatedDog);
    } catch (error) {
        // Handle errors such as dog not found
        return res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
