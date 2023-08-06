const State = require("../models/AddCategory");


// GET /states - Get all states
const getAllCategories = async (req, res) => {
  try {
    const states = await State.find();
    res.send({
      "states": states,
      "message": "State Fetch Successfully"

    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /states - Create a new state
const createCategory = async (req, res) => {
  try {
    const { name, description, dating, updated,category } = req.body;

    // Check if the state already exists
    const existingState = await State.findOne({ name });
    if (existingState) {
      return res.status(400).send({ error: 'State already exists' });
    }

    const state = new State({ name, description, dating, updated });
    await state.save();
    res.status(201).send(
      {
        "state": state,
        "message": "Category Added Successfully"
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  try {


    // Check if the state exists
    const deletedResource = await State.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }



    res.status(200).send({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const stateId = req.params.id;
    const { name, description, updated } = req.body;

    // Find the state by its ID
    const state = await State.findById(stateId);
    // if (!state) {
    //   return res.status(404).send({ error: 'State not found' });
    // }

    // Update the fields
    state.name = name;
    state.description = description;
    state.updated = updated


    // Save the updated state
    await state.save();

    res.status(200).send({
      state,
      message: 'Category updated successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};












module.exports = { getAllCategories, createCategory, deleteCategory, updateCategory };
