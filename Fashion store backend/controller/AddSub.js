const State = require("../models/AddSub");


// GET /states - Get all states
const getAllSub = async (req, res) => {
  try {
    const states = await State.find();
    res.send({
      "states": states,
      "message": "Subcategory Fetch Successfully"

    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /states - Create a new state
const createSub = async (req, res) => {
  try {
    const { name, description, dating, updated,category } = req.body;

    // Check if the state already exists
    const existingState = await State.findOne({ name });
    if (existingState) {
      return res.status(400).send({ error: 'Subcategory already exists' });
    }

    const state = new State({ name, description, dating, updated,category });
    await state.save();
    res.status(201).send(
      {
        "state": state,
        "message": "Subcategory Added Successfully"
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteSub = async (req, res) => {
  try {


    // Check if the state exists
    const deletedResource = await State.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }



    res.status(200).send({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateSub = async (req, res) => {
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
      message: 'Subcategory updated successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const showing = async(req,res) =>{
  const { category } = req.query;
  try {
    const subcategories = await State.find({ category: category });
    res.send({ 

     message: subcategories
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }

}









module.exports = { getAllSub, createSub, deleteSub, updateSub,showing };
