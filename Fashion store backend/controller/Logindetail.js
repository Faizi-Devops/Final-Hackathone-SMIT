const State = require("../models/Logindetail");
const createLogindetail = async (req, res) => {
    try {
      const { email, logintime, logouttime, status,uniqueId,uniqueness } = req.body;
  
      // Check if the state already exists
    //   const existingState = await State.findOne({ name });
    //   if (existingState) {
    //     return res.status(400).send({ error: 'State already exists' });
    //   }
  
      const state = new State({ email, logintime, logouttime, status,uniqueId,uniqueness });
      await state.save();
      res.status(201).send(
        {
          "state": state,
          "message": "Login Detail Added Successfully"
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const getAllLoginDetails = async (req, res) => {
    try {
      const states = await State.find();
      console.log(states)
      res.send({
        "login": states,
        "message": "Login Detail Fetch Successfully"
  
      })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };




  const updateStateByEmail = async (req, res) => {
    try {
      const { email,uniqueness, logouttime } = req.body;
      console.log(uniqueness, logouttime);
  
      // Find the state by uniqueId
      const state = await State.findOne({ uniqueness });
      console.log(state);
  
      if (!state) {
        return res.status(404).send({ error: 'State not found' });
      }
  
      // Update the fields
      state.logouttime = logouttime;
  
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
  
  

  module.exports = { createLogindetail,getAllLoginDetails,updateStateByEmail};