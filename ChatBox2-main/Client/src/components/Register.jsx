import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState , useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'


function Register() {

  // const notifyRegister = () => toast('Registration Successful !!'); 
  const navigate = useNavigate();
  const noInput = () => toast('Does not contain any password !!'); 

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [file, setFile] = useState(null)
  const [isClicked , setClicked] = useState(false)
  const [show , setShow] = useState(false)
  
  const valueInput = document.getElementById("pass")?.value

  const handleClick = (e) => {
    if(valueInput){
      setShow(!show)
    }else{
      noInput()
    }
    
  }

  
  useEffect(() => {
      if(show){
        document.getElementById("pass").type = "text"
      }else {
        document.getElementById("pass").type = "password"
      }
  }, [show])
  
  

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleDob = (e) => {
    setDob(e.target.value)
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/')

  }


  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setClicked(true)

    if(!file){
      console.log("Please select a file")
      return
    }

    const formData = new FormData()
    formData.append('avatar' , file)
    formData.append('username' , username)
    formData.append('password' , password)
    formData.append('email' , email)
    formData.append('dob' , dob)

    // console.log(process.env.REGISTER_DOMAIN)
    // you're trying to use the dotenv package in a browser environment, 
    // which is not its intended use case. dotenv is primarily used in Node.js applications
    // to load environment variables from a .env file into the process.env object.

    try {
      const response = await toast.promise(axios.post('http://localhost:5000/api/v1/users/register' , formData , {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }
    ),
    {
      loading: "Registering...",
      success: "Registration Successful",
      error: "Registration failed."
    }
  );

    //   console.log(response.data.statusCode) == 200
    if(response.data.statusCode == 200){
        setClicked(false)
        // notifyRegister()
    }

      setUsername('')
      setDob('')
      setEmail('')
      setPassword('')
      setFile(null)
      document.getElementById('avatar').value = '';
    } catch (error) {
        console.error('Error uploading file: ', error)
        setUsername('')
        setDob('')
        setEmail('')
        setPassword('')
        setFile(null)
        document.getElementById('avatar').value = '';
    }

    // try {
    //   console.log(formData)
    //   const response = await axios.post('http://localhost:5000/api/v1/users/register', formData);
      
    //   // Handle response if needed
    //   console.log('Server response:', response.data);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }

  }

  return (
    <>
      <div className="flex w-screen h-screen">
      <div className=" w-screen flex items-center justify-center"> 
      <Toaster
            position='top-center'
            /> 
      <div className='h-screen w-screen bg-[url("/Images/loginANDregBG5.jpeg")] bg-cover absolute animate-zoom-in-out'>
        <button onClick={handleHomeClick} className='ml-[1050px] mb-4 text-black text-xl mt-[60px] hover:cursor-pointer rounded-full w-[100px] h-[40px] bg-white active:scale-[.98] active:duration-75  transition-all hover:scale-[1.10] ease-in-out cursor-pointer animate-appear'>Home</button>
      </div>
          <div className='backdrop-blur top-[20px] bg-none px-10 py-5 rounded-3xl border-4 border-grey relative h-max animate-appear'>
          
              <h1 className='text-3xl mt-2 text-center text-white relative px-32 animate-appear'>Register</h1>
              <p className='font-medium text-lg text-gray-500 mt-6 animate-appear'></p>
              <form onSubmit={handleSubmit} >
              <div>
                  <div className='mt-3 mb-3 relative animate-appear'>
                      {!isClicked ? (
                        <input type="text"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                        placeholder='Enter your username' 
                        id='username'
                        autoComplete='off'
                        value={username}
                        onChange={handleUsername}
                        />
                      ) : (
                        <input type="text"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                      placeholder='Enter your username' 
                      id='username'
                      autocomplete='off'
                      value={username}
                      onChange={handleUsername}
                      readOnly
                      />
                      ) }
                      
                  </div>
                  <div className='mt-3 mb-3 relative animate-appear'>
                      {!isClicked ? (
                        <input type="text"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                        placeholder='Enter your email' 
                        id='email'
                        autoComplete='off'
                        value={email}
                        onChange={handleEmail}
                        />
                      ) : (
                        <input type="text"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                      placeholder='Enter your email' 
                      id='email'
                      autoComplete='off'
                      value={email}
                      onChange={handleEmail}
                      readOnly
                      />
                      ) }
                      
                  </div>
                  <div className='mt-3 mb-3 relative animate-appear'>
                      {!isClicked ? (
                      <input
                      type='password'
                      className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                      placeholder='Enter your password'
                      id='pass' 
                      value={password}
                      onChange={handlePassword}
                      />
                      ) : (
                        <input type="password"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                      placeholder='Enter your password'
                      id='pass' 
                      value={password}
                      onChange={handlePassword}
                      readOnly
                      />
                      ) }
                    <div className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.02] ease-in-out hover:text-black absolute top-[23px] text-white opacity-80 right-4 cursor-pointer animate-appear' onClick={handleClick}>
                    {show ? "Hide": "Show"}
                    </div>
                  </div>
                  <div className='mt-3 mb-3 relative animate-appear'>
                      {!isClicked ? (
                        <input type="text"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                      placeholder='Enter your birth date' 
                      id='dob'
                      autoComplete='off'
                      value={dob}
                      onChange={handleDob}
                      />
                      ) : (
                        <input type="text"
                        className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                      placeholder='Enter your birth date' 
                      id='dob'
                      autoComplete='off'
                      value={dob}
                      onChange={handleDob}
                      readOnly
                      />
                      ) }
                      
                  </div>
                  <div className='mt-4 mb-4 animate-appear'>
                        <label className='text-small text-white animate-appear' htmlFor="avatar">Choose your photo: </label>
                        {!isClicked ? (
                          <input id="avatar" type="file" onChange={handleFileChange} className="animate-appear block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:hover:cursor-pointer active:scale-[.98] active:duration-75  transition-all hover:scale-[1.010] ease-in-out cursor-pointer
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-button
                          hover:file:bg-violet-100
                          "/>
                        ) : 
                        (
                          <input id="avatar" type="file" className="animate-appear block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-50 file:text-button
                          hover:file:bg-violet-100"
                          readOnly
                          />
                        )
                        }     
                  </div>
                  <div className='mt-8 flex flex-col w-full animate-appear'>
                      {!isClicked ? (
                          <button
                          type='submit'
                          className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.03] ease-in-out py-3 rounded-full bg-white text-black text-lg relative animate-appear'>
                              Register
                          </button>
                      ) : (
                          <button
                          disabled
                          className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.03] ease-in-out py-3 rounded-full bg-white text-black-500 text-lg relative animate-appear'>
                              Register
                          </button>
                      )}
                      <div className='mt-8 flex justify-center items-center animate-appear'>
                      <p className='font-medium text-white text-base animate-appear'>Already have an account ?</p>
                      <Link to="/login">
                      <button className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.08] ease-in-out hover:text-black py-3 text-white text-base font-medium ml-2 relative animate-appear'>Login</button>
                      </Link>
                      </div>
                  </div>
              </div>
              </form>
          </div>   
          </div>
          </div>
    </>  
    )
  }
  
  export default Register