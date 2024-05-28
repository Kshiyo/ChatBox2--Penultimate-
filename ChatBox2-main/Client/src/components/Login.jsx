import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useAuth } from '../context/UserContextProvider.jsx'


function Login() {

  const {setUser } = useAuth()
  

  const navigate = useNavigate()
  const noInput = () => toast.error('Please enter password'); 
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
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
  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/')
  
  }

  const handleLogin = async(e) => {
    e.preventDefault()

    // const formData = new FormData()
    // formData.append('username' , username)
    // formData.append('password' , password)
    // formData.append('email' , email)
    

    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('email', email);

      
      const response = await toast.promise(axios.post('http://localhost:5000/api/v1/users/login' , params ,
      { headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ),
    {
      loading : "Logging In...",
      error: "User does not exist"
    }
  );
    //   const response = await axios.post('http://localhost:5000/api/v1/users/login' , formData ,
    //   { headers: 
    //     {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // );

      // console.log(response.data.statusCode)
      setUsername('')
      setEmail('')
      setPassword('')  



    if(response.data.statusCode == 200){
      navigate('/message')
    }

    setUser({
      userId: response.data.data.user._id,
      token: response.data.data.accessToken,
      userName: response.data.data.user.username,
    })

    localStorage.setItem('userToken' , response.data.data.accessToken)


    } catch (error) {
        console.error('Error logging in: ', error)
        setUsername('')
        setEmail('')
        setPassword('')
    }
    
  }

  return (
    <>
      <div className="flex w-screen h-screen">
      <div className=" w-screen flex items-center justify-center"> 
      <Toaster 
          position='top-center
          '/>
      <div className='h-screen w-screen bg-[url("/Images/loginANDregBG5.jpeg")] overflow-hidden bg-cover absolute animate-zoom-in-out'>
            <button onClick={handleHomeClick} className='ml-[1050px] mb-4 text-black text-xl mt-[60px] hover:cursor-pointer rounded-full w-[100px] h-[40px] bg-white active:scale-[.98] active:duration-75  transition-all hover:scale-[1.10] ease-in-out cursor-pointer animate-appear'>Home</button>
      </div>
      <div className='backdrop-blur w-[35%] h-[68%] relative bg-none top-[20px] px-20 py-5 rounded-3xl border-4 border-grey animate-appear'>
          
          <div className='text-3xl mt-2 px-32 text-center text-white relative animate-appear'>
           <h1>Login</h1>
          </div>
          <p className='font-medium text-lg text-black-500 mt-10 text-center animate-appear'></p>
          <form onSubmit={handleLogin}>
          <div>
              <div className='mt-4 mb-4 relative animate-appear'>
                  <input type="text"
                    onChange = {handleUsername}
                    value={username}
                    className='w-full border-4 placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey p-4 text-white mt-1 bg-transparent relative animate-appear'
                    placeholder='Username' 
                    id='username'
                    autoComplete='off'
                  />
              </div>
              <div className='mt-4 mb-4 relative animate-appear'>
                  <input type="text"
                    onChange = {handleEmail}
                    value={email}
                    className='w-full border-4  placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey text-white p-4  mt-1 bg-transparent relative animate-appear'
                    placeholder='Email' 
                    id='email'
                    autoComplete='off'
                  />
              </div>
              <div className='mt-4 mb-4 relative animate-appear'>
                  <input type="password"
                    onChange = {handlePassword}
                    value={password}
                    className='w-full border-4  placeholder:text-white placeholder:opacity-80 focus:outline-none focus:border-white rounded-full border-grey text-white p-4  mt-1 bg-transparent relative animate-appear'
                    placeholder='Password'
                    id='pass' 
  
                  />
                  <div className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.02] ease-in-out hover:text-black absolute top-[23px] text-white opacity-80 right-4 cursor-pointer animate-appear' onClick={handleClick}>
                    {show ? "Hide": "Show"}
                    </div>
              </div>
              <div className='mt-10 flex flex-col w-full relative animate-appear'>
                  <button 
                  type='submit'
                  className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.03] ease-in-out py-3 rounded-full bg-white text-black-500 text-lg relative animate-appear'>
                      Login
                  </button>
                  <div className='mt-10 flex justify-center items-center relative animate-appear'>
                     <p className='font-small text-base text-white relative animate-appear'>Don't have an account ?</p>
                     <Link to = "/register">
                     <button className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.08] ease-in-out hover:text-black py-3 text-white text-base font-medium ml-2 relative animate-appear'>Register</button>
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
  
  export default Login