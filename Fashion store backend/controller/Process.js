const proceed= require("../models/Process");
const one = async (req, res) => {
  
    
      try {
        const { email, complainumber, category, complainttype,nature,details,finalstatus,regdate,subcategory,state,notprocess,process,closed,updated,file,fullName } = req.body;
    
        // Check if the state already exists
      //   const existingState = await State.findOne({ name });
      //   if (existingState) {
      //     return res.status(400).send({ error: 'State already exists' });
      //   }
    
        const kuch = new proceed({email, complainumber, category, complainttype,nature,details,finalstatus,regdate,subcategory,state,file,notprocess,process,closed,updated,fullName });
        await kuch.save();
        res.status(201).send(
          {
            "state": state,
            "message": "Document Successfully Added to the Process"
          }
        );
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    const getProcess = async(req,res) =>{
      try {
        // Retrieve all complaints from the database
        const complaints = await proceed.find();
        res.json(complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  
    }
    const deleteCprocess = async (req, res) => {
      try {
    
    
        // Check if the state exists
        const deletedResource = await proceed.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
          return res.status(404).json({ error: 'Resource not found' });
        }
    
    
    
        res.status(200).send({ message: 'Subcategory deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    module.exports = {one,getProcess,deleteCprocess};