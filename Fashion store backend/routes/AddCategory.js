const express= require ("express")
const router = express.Router();
const {getAllCategories, createCategory,deleteCategory,updateCategory} = require("../controller/AddCategory");









router.get('/getCategories',getAllCategories)
router.post('/addCategory',createCategory)
router.delete('/deleteCategory/:id',deleteCategory)
router.put('/updateCategory/:id',updateCategory)



module.exports = router;