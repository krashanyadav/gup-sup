const ImageKit = require("imagekit");
const fs = require("fs")
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const uploadMediaa = async (file) => {
    try {
        const response = await imagekit.upload({
            file: fs.readFileSync(file.path),
            fileName: file.originalname,
            folder: "uploads/",
        });

        //for empty upload folder
         fs.unlinkSync(file.path);
        return response.url
      
    } catch (error) {
        throw new Error(error.message);
    }
    
};

const deleteMedia = async (fileId) => {
    try {
        await imagekit.deleteFile(fileId);

        return {
            success: true,
            message: "Media deleted successfully",
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {uploadMediaa,deleteMedia};