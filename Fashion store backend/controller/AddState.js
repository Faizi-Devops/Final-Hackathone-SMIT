const State = require("../models/AddState");


// GET /states - Get all states
const getAllStates = async (req, res) => {
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
const createState = async (req, res) => {
  try {
    const { name, description, dating, updated } = req.body;

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
        "message": "State Added Successfully"
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteState = async (req, res) => {
  try {


    // Check if the state exists
    const deletedResource = await State.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }



    res.status(200).send({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateState = async (req, res) => {
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
      message: 'State updated successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};












module.exports = { getAllStates, createState, deleteState, updateState };
