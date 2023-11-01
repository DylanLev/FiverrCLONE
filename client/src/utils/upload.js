import axios from "axios";

//Cloudinary.com>Programmable Media>Media Library>Settings>Upload>Add upload preset & Folders>Create a folder
const upload = async (file) =>{
    const data = new FormData();
    data.append("file", file);
    //Nom du "upload preset" qu'on a ajouté sur Cloudinary.com
    data.append("upload_preset", "fiverr");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dyrujnxpd/image/upload",data);
      const { url } = res.data;
      return url;

    } catch (err) {
      console.log(err);
    }
  };

  export default upload;