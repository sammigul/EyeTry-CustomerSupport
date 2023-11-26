import React, { useState,useEffect } from "react";
import { useNavigate,  } from 'react-router-dom';
import defaultProfilePic from '../../../assets/images/CustomerSupport/profilepic.png'
import API_URL from '../../../config/config';
import { updateAgentPhoto } from "../../../services/Agent/agent";
import { viewAgentPhoto } from '../../../services/Agent/agent';


export default function UploadUserImageScreen() {

    // image upload
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image

    const [profileImage, setProfileImage] = useState(null)

    
    const navigate = useNavigate();

    const navigateToProfile = () =>{
        navigate('/edit_personal_info')
    }


    const getImage = async () => {
        try {
          const res = await viewAgentPhoto();
          if (res.status === 200) {
            setProfileImage(API_URL + res.data.location)
          }
        }
        catch (e) {
          if (e?.response?.status == 400) {
            setProfileImage(null)
            console.log(e)
          }
        }
      }

    useEffect(() => {
        getImage();
    }, [])

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);
        setUploadedImage(URL.createObjectURL(image)); // Use the "image" variable directly
    };

    const handleDefaultImageClick = () => {
        document.getElementById('image-input').click();
    };

    const handleImageUpload =async () => {
        if(!selectedImage) {
            alert("Please select an image first")
            return
        }
        try{
            const res = await updateAgentPhoto(selectedImage)
            if(res.status == 200){
                navigateToProfile()
            }
        }catch(e){
            console.log("Some Error Occured While Uploading image")
        }

    }


    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-2 ">
                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-5">
                    <div class=" text-center md:mb-0 mb-4">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Upload Profile Picture</h3>
                    </div>
                        <div className="p-5">
                            <div onClick={handleDefaultImageClick} className='w-full h-52 mt-5 flex justify-center cursor-pointer'>
                                {selectedImage ? 
                                    <img className='max-w-full max-h-full '
                                    src={uploadedImage} // Use the uploaded image if available, otherwise use the default image
                                    alt="Preview" />
                                    : (profileImage ?(<img className='max-w-full max-h-full '  src={profileImage} alt="preview" />)
                                     : (<img className='max-w-full max-h-full '  src={defaultProfilePic} alt="preview" />))
                                    
                                }
                            </div>
                        </div>
                        <input className="invisible" id="image-input"
                            type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex items-center justify-center">
                            <button onClick={handleDefaultImageClick} type="button" className="w-40 text-black border  border-gray-900 
 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 ">Select Image </button>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <button onClick={handleImageUpload} type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                            focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700
                            dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                        </div>
                    </div>
            </div>
        </div>


    );
}

