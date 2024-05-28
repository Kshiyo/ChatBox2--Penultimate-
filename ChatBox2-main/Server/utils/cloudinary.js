import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
//fs from node , have many methods to deal with files
//we'll use unlink
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        // console.log("inside cloudinary: " ,localFilePath)
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //if file is uploaded on cloudinary successfully
        console.log("file is uploaded on cloudinary" , response.url)
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        fs.unlinkSync(localFilePath)
        //remove the locally saved file as the upload got failed
        return null;
        
    }
}

export { uploadOnCloudinary }
