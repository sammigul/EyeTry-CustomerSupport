import React from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaUser, } from "react-icons/fa";
import defaultProfilePic from '../../../assets/images/CustomerSupport/profilepic.png'
import API_URL from '../../../config/config';
import { viewAgentProfile } from '../../../services/Agent/agent';
import { viewAgentPhoto } from '../../../services/Agent/agent';
import { deleteAgentPhoto } from "../../../services/Agent/agent";
import { updateAgentProfile } from "../../../services/Agent/agent";

export default function MyDetailsScreen() {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    
    const [profileImage, setProfileImage] = React.useState(null)


    // error messages
    const [errorVisible, setErrorVisible] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [successMessage, setSuccessMessage] = React.useState(null)

    
    const getProfile = async () => {
        try {
            const res = await viewAgentProfile();
            if (res.status === 200) {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
                console.log(firstName,lastName,email)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const getImage = async () => {
        try {
          const res = await viewAgentPhoto();
          console.log(res)
          if (res.status === 200) {
            setProfileImage(API_URL + res.data.location)
          }
        }
        catch (e) {
          if (e.response.status == 400) {
            setProfileImage(null)
            console.log(e)
          }
        }
      }

    React.useEffect(() => {
        getProfile();
        getImage();
    }, [])
    const handleImageDelete = async () =>{
        try{
            const res = await deleteAgentPhoto();
            if (res.status == 200){
                alert("Profile Image Deleted Successfully")
                setProfileImage(null)
            }
        }
        catch(e){
            console.log(e)
        }

    }

    // form validation 
    const validateForm = () => {
        if (!firstName || !lastName || !email) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }
    const handlePersonalInfo = async () => {
        if (!validateForm()) {
            return
        }
        const personalData = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        try {
            const response = await updateAgentProfile(personalData)
            if (response.status == 200) {
                setSuccessMessage("Personal Info Updated Successfully!")
                setSuccessVisible(true)
                setErrorVisible(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow  w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-8">
                    <div className="mb-10 flex flex-col md:flex-row md:items-center">
                        <div className="md:text-left text-center md:mb-0 mb-4">
                            <h3 className="text-2xl sm:text-3xl  font-bold font-sans">Personal Information</h3>
                            <p className=" font-sans text-base ">Edit your profile quickly</p>
                        </div>
                        {errorVisible &&
                            <p style={{ color: 'red', fontSize: 16, alignSelf: 'flex-start', paddingBottom: '2%' }}>
                                {errorMsg}
                            </p>
                        }
                        {successVisible &&
                            <p style={{ color: 'green', fontSize: 16, alignSelf: 'flex-start', textAlign: 'center', paddingBottom: '2%' }}>
                                {successMessage}
                            </p>
                        }
                        <div className="md:ml-auto md:text-right text-center">
                            <Link ><button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Delete Account</button></Link>
                            <Link to={'/change_password'}><button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Change Password</button></Link>
                        </div>
                    </div>


                    <label htmlFor="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out"  type="text" />
                    </div>

                    <label htmlFor="lastname" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Last Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out"  type="text" />
                    </div>

                    <label htmlFor="email" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope color='grey' />
                        </div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out"  type="email" />
                    </div>

                    <div className=" bg-white border border-gray-200 rounded-lg shadow  mt-5  mx-auto mb-10">
                        <div className="flex flex-row mt-5">
                            <h4 className=" ml-5  text-lg font-bold tracking-tight text-gray-900  font-sans">Your Photo</h4>
                        </div>
                        <hr className="border-3 border-gray-300 my-4" />
                        <div className="p-5">
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
                                   {
                                    profileImage ? (<img src={profileImage} style={{width:90,height:90,borderRadius:45}} alt="logo" className='w-full h-full ' />
                                    ) : (<img style={{width:90,height:90,borderRadius:45}} src={defaultProfilePic} alt="logo" className='w-full h-full ' />
                                    )
                                   } 
                                </div>
                                 <h2 style={{ fontWeight: 700, fontSize: 18, marginTop: 10, marginBottom: 20, marginLeft: 15 }}>{firstName+" "+lastName} <span className="flex flex-row space-x-5" ><p className=" text-red-700 font-sans font-medium cursor-pointer" onClick={handleImageDelete} >Delete</p> <Link to='/upload_image'><p className="text-blue-700 font-sans font-medium" >Update</p></Link></span>   </h2>
                           </div>

                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button onClick={handlePersonalInfo} type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 
                        ">Save</button>
                    </div>
                </div>
            </div>
        </div>


    );
}

