
const State = require("../models/Cart");
const createCart = async (req, res) => {
    try {
      const { email, price, address,quantity,status,createdAt} = req.body;
  
      // Check if the state already exists
    //   const existingState = await State.findOne({ email, name, description, file,quantity,price,color,stock,size });
      
  
      const state = new State({email, price, address,quantity,status,createdAt });
      await state.save();
      res.status(201).send(
        {
          "state": state,
          "message": "Cart Successfully"
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  module.exports = { createCart  };