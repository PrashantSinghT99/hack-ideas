const Idea=require("../models/IdeaModal")

const addIdea=async(req,res)=>
{
const {id}=req.user;
const {title,description,tags}=req.body;

if(!title || !description || !tags)
{
    res.send(400).json({error:"Please enter all the fields"});
}
try {

    const newIdea=await Idea.create({
        title:title,
        description:description,
        tags:tags,
        createdBy:id
    })

    const populatedIdea=await Idea.findById(newIdea._id).populate("createdBy");
    res.status(201).json(populatedIdea);
    
} catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
}

}


module.exports={addIdea};