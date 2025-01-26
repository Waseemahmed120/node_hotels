const express = require('express');
const Person = require('../models/Person');
const router = express.Router();

// POST route to add a person
router.post('/', async (req, res) =>{
    try{
        const data = req.body;
        // Create a new person document using the mongoose model
        const newPerson = new Person(data);
    
        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved', response);
        res.status(200).json(response);
        }

    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
    }
 });


// GET method to add person
router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log("Getting the data");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})


router.get('/:workType', async(req, res)=>{
    try {
        const workType = req.params.workType;
        if (['sour', 'manager', 'waiter'].includes(workType)) {

        const response = await Person.find({work: workType });
        console.log("Work type data fetched:", response);
        res.status(200).json(response);
    } else {
        res.status(404).json({error: 'Inavlid workType.'});
    }
} catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server Error' });
}
})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Returns updated document
            runValidators: true // Ensures schema validations
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Person updated:', response);
        res.status(200).json(response);
    } catch (err) {
        console.log('Error during update:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('Data Deleted');
        res.status(200).json({message: "Person deleted successfully."});
    }
    catch (err) {
        console.log('Error during update:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;