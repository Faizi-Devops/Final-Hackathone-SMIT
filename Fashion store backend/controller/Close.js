const Close= require("../models/Close");
const addClose = async (req, res) => {
  
    
      try {
        const { email, complainumber, category, complainttype,nature,details,finalstatus,regdate,subcategory,state,notprocess,process,closed,updated,file,fullName } = req.body;
    
        // Check if the state already exists
      //   const existingState = await State.findOne({ name });
      //   if (existingState) {
      //     return res.status(400).send({ error: 'State already exists' });
      //   }
    
        const kuch = new Close({email, complainumber, category, complainttype,nature,details,finalstatus,regdate,subcategory,state,file,notprocess,process,closed,updated,fullName });
        await kuch.save();
        res.status(201).send(
          {
            "state": state,
            "message": "Document Successfully Added to the Closed"
          }
        );
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    const getClose = async(req,res) =>{
      try {
        // Retrieve all complaints from the database
        const complaints = await Close.find();
        res.json(complaints);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  
    }
    
    module.exports = {addClose,getClose};