const router = require('express').Router();
const {Post, User}= require('../../models')
const withAuth = require('../../utils/auth');
const cloudinary = require('cloudinary').v2;
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY, 
    api_secret: process.env.CLOUDINARYSECRET
  });
router.post('/',withAuth, upload.single('postImg'),  async(req, res)=>{
    console.log(req.file);
    try {
        const imgURL =await uploadImage(req.file.path)
        console.log(imgURL);
        const newPost = Post.create({
            ...req.body,
            image: imgURL,
            user_id:req.session.user_id
        })
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.delete('/:id', withAuth , async (req, res)=>{
    try {
        const postData = Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
          } else{
            res.status(200).json(postData)
          }
    } catch (err) {
        res.status(500).json(err)
    }
})
/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
};
module.exports = router;
