const Complain= require("../models/Complain");
const createComplain = async (req, res) => {
  let file = req.file.filename
    try {
      const { name, category,description, price,color,size,rating,stock,createdAt,updatedAt } = req.body;
  
      // Check if the state already exists
    //   const existingState = await State.findOne({ name });
    //   if (existingState) {
    //     return res.status(400).send({ error: 'State already exists' });
    //   }
  
      const kuch = new Complain({name, category,description, price,color,file,size,rating,stock,createdAt,updatedAt });
      await kuch.save();
      res.status(201).send(
        {
          "state": state,
          "message": "Successfully Add Product"
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const complaintswithEmail = async(req,res) =>{
    const { email } = req.query;
  
    try {
      const user = await Complain.find({ email: { $regex: email, $options: 'i' } });
      ;
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error); // Log the error for debugging
      res.status(500).json({
        status: "Failed",
        message: "Unable to fetch user data",
      });
    }
  
  }

  const allComplains = async(req,res) =>{
    try {
      // Retrieve all complaints from the database
      const complaints = await Complain.find();
      res.json(complaints);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  }

  const counting  = async(req,res) =>{
    try {
      const { email, notprocess } = req.body;
  
      // Find the user by email
      const user = await Complain.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      }
  
      // Update the user's data based on the received form data
      user.notprocess = notprocess;
      
      
      // Add more fields as needed
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      });
    }

  }

  const countingProcess  = async(req,res) =>{
    try {
      const { email, process, notprocess} = req.body;
  
      // Find the user by email
      const user = await Complain.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      }
  
      // Update the user's data based on the received form data
      user.notprocess = notprocess;
      user.process = process;
      
      
      
      // Add more fields as needed
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      });
    }

  }


  const countingClose  = async(req,res) =>{
    try {
      const { email, process, closed} = req.body;
  
      // Find the user by email
      const user = await Complain.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      }
  
      // Update the user's data based on the received form data
      user.closed = closed;
      user.process = process;
      
      
      
      // Add more fields as needed
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      });
    }

  }

  const deleteProduct = async(req,res) =>{
    try {


      // Check if the state exists
      const deletedResource = await Complain.findByIdAndDelete(req.params.id);
      if (!deletedResource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
  
  
  
      res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }


  }
  const updatewithnumber  = async(req,res) =>{
    try {
      const { complainumber,updated,finalstatus } = req.body;
  
      // Find the user by email
      const user = await Complain.findOne({ complainumber });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      }
  
      // Update the user's data based on the received form data
      user.updated = updated;
      user.finalstatus = finalstatus
      
      
      // Add more fields as needed
  
      // Save the updated user
      await user.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Data updated successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      });
    }
    

  }

  const updatedProduct = async (req, res) => {
    try {
      const complaintId = req.body.complaintId; // Assuming the frontend sends the complaintId in the request body
  
      // Check if the complaintId is valid
      if (!complaintId) {
        return res.status(400).json({ message: 'Invalid complaint ID' });
      }
  
      // Find the complaint by ID in the database
      const complaint = await Complain.findById(complaintId);
  
      // Check if the complaint exists
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      // Update the complaint properties
      complaint.name = req.body.name;
      complaint.category = req.body.category;
      complaint.description = req.body.description;
      complaint.price = req.body.price;
      complaint.color = req.body.color;
      complaint.file = req.body.file;
      complaint.size = req.body.size;
      
      complaint.stock = req.body.stock;
      complaint.updatedAt = req.body.updatedAt; // Update the updatedAt field to the current date and time
  
      // Save the updated complaint to the database
      await complaint.save();
  
      // Return success message
      return res.status(200).json({ message: 'Complaint updated successfully' });
    } catch (error) {
      console.error('Error updating complaint:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  module.exports = {createComplain,complaintswithEmail,counting,allComplains,updatedProduct,deleteProduct,countingProcess,updatewithnumber,countingClose};