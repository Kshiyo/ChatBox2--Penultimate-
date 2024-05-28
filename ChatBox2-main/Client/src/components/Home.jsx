import React from 'react'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect';

function Home() {

  const navigate = useNavigate()

  const handleLoginClick = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    navigate('/')

  }

  const handleRegisterClick = (e) => {
    e.preventDefault()
    navigate('/register')

  }

  return (
    <div className='bg-[url("../../public/Images/loginANDregBG4.jpeg")] h-screen w-screen py-4 relative overflow-hidden bg-cover'>
      <navbar className='absolute w-screen top-[5px] left-0 h-[70px] flex items-center p-12 place-content-between animate-appear'>
      <button onClick={handleHomeClick} className='text-5xl md:text-5xl font-poppins lg:text-6xl ml-[35px] text-white font-bold shadow-md rounded-xl w-[295px] px-4 animate-appear'><span>Chat</span><span className='text-[#48cae4] animate-appear'>Box</span></button>
        <div className='md:mr-[65px] lg:mr-[100px] flex place-content-around mb-3  w-[350px] animate-appear'>
          <button onClick={handleLoginClick} className='mr-10 mb-4 text-white md:mr-6 text-2xl mt-4 md:text-xl lg:text-2xl hover:text-black hover:cursor-pointer rounded-full w-[90px] h-[45px] bg-[#48cae4] active:scale-[.98] active:duration-75  transition-all hover:scale-[1.05] ease-in-out cursor-pointer animate-appear'>Login</button>
          <button onClick={handleRegisterClick} className='ml-6 mb-4 text-white md:ml-2 text-2xl mt-4 md:text-xl lg:text-2xl hover:text-black hover:cursor-pointer rounded-full w-[120px] h-[45px] bg-[#48cae4] active:scale-[.98] active:duration-75  transition-all hover:scale-[1.05] ease-in-out cursor-pointer animate-appear'>Register</button>
        </div>
      </navbar>
      <div className='top-[205px] left-20 absolute font-extrabold text-3xl mb-2 text-balance w-full text-[#48cae4] animate-appear'>
        <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('Welcome to ChatBox -<br/> Where Every Conversation is Unique!')
            .pauseFor(2500)
            .deleteAll()
            .start()
        }}
        options={{
          loop: true,
        }}
      /></div>
      <hero className='hidden md:block absolute top-[210px] left-20 bottom-[0] w-[40%] h-[70%] rounded-3xl animate-appear'>
        <p className='text-[#ffffff] font-semibold font-poppins tracking-wider leading-8 animate-appear'>
        <p className='absolute top-14 h-[470px] text-balance font-medium text-lg mt-[20px] text-justify animate-appear'>
          ChatBox isn't just about chatting; it's about creating unforgettable moments in real-time. With our innovative room code system powered by sockets, every conversation becomes an exclusive event. Simply generate a room code, share it with friends, and dive into the discussion.
          But here's the twist: once you leave the room, the chatter vanishes into the digital ether. No archives, no traces, just pure, ephemeral communication. It's like a whisper in the wind, meant only for those present in the moment.
          Built on the robust MERN stack and enhanced with cutting-edge technologies like Multer, Cloudinary, React Toaster, Axios, and Tailwind CSS, ChatBox offers a seamless and secure chatting experience unlike any other.
          Join the Conversation, Create Memories, and Embrace the Ephemeral Magic of ChatBox!
        </p>
        </p>
      </hero>
      <hero className='md:hidden absolute top-[170px] left-20 bottom-[0] w-[40%] h-[70%] rounded-3xl animate-appear'>
        <p className='text-[#ffffff] font-semibold font-poppins tracking-wider leading-8 animate-appear'>
        <p className='font-extrabold text-3xl mb-2 text-balance animate-appear'>Welcome to ChatBox - Where Every Conversation is Unique!</p>
        <p className='text-balance font-medium text-lg mt-[20px] animate-appear'> Experience unique, real-time conversations with our innovative room code system. Simply generate a code, share it, and dive in. 
        Once you leave, conversations vanish - pure, ephemeral communication. Built on the MERN stack with Multer, Cloudinary, React Toaster, Axios, and Tailwind CSS.
         Join ChatBox for a seamless, secure chatting experience! 
        </p>
        </p>
      </hero>
      <div className='absolute w-1/3 h-[500px] bg-slate-300 opacity-30 right-20 top-[215px] rounded-3xl'>
        {/* <div className='absolute w-[2.5%] h-[5%] bottom-[135px] left-[220px] bg-[#be95c4] rounded-full animate-ping'></div> */}
      </div>
      <div className='absolute w-[20%] h-[10%] bottom-[145px]  right-[0px] bg-white rounded-3xl opacity-0 animate-message1 animation-delay-2000'>
        <div className='absolute bottom-[6px] bg-[#48cae4] right-4 w-[20%] h-[85%] rounded-full animate-appear'></div>
        <div className='absolute bottom-[10px] bg-[#48cae4] left-4 h-[30%] w-[40%] rounded-xl pl-2 text-white animate-appear'></div>
        <div className='absolute bottom-[40px] bg-[#48cae4] left-4 h-[30%] w-[60%] rounded-xl pl-2 text-white animate-appear'></div>
      </div>
      <div className='absolute w-[20%] h-[10%] bottom-[290px]  right-[500px] bg-white rounded-3xl opacity-0 animate-message2 animation-delay-4000'>
        <div className='absolute bottom-[6px] bg-[#48cae4] left-4 w-[20%] h-[85%] rounded-full animate-appear'></div>
        <div className='absolute bottom-[10px] bg-[#48cae4] left-[170px] h-[30%] w-[40%] rounded-xl animate-appear'></div>
        <div className='absolute bottom-[40px] bg-[#48cae4] left-[110px] h-[30%] w-[60%] rounded-xl animate-appear'></div>
      </div>
      <div className='absolute w-[20%] h-[10%] bottom-[440px]  right-[0px] bg-white rounded-3xl opacity-0 animate-message1 animation-delay-7000'>
        <div className='absolute bottom-[6px] bg-[#48cae4] right-4 w-[20%] h-[85%] rounded-full animate-appear'></div>
        <div className='absolute bottom-[10px] bg-[#48cae4] left-4 h-[30%] w-[40%] rounded-xl animate-appear'></div>
        <div className='absolute bottom-[40px] bg-[#48cae4] left-4 h-[30%] w-[60%] rounded-xl animate-appear'></div>
      </div>
      {/* <div className='absolute w-[20%] h-[10%] bottom-[460px]  right-[280px] bg-red-200 rounded-3xl opacity-0 animate-message2'>
        <div className='absolute bottom-[6px] bg-[#be95c4] left-4 w-[20%] h-[85%] rounded-full'></div>
        <div className='absolute bottom-[10px] bg-[#be95c4] left-[170px] h-[30%] w-[40%] rounded-xl'></div>
        <div className='absolute bottom-[40px] bg-[#be95c4] left-[110px] h-[30%] w-[60%] rounded-xl'></div>
      </div> */}
      {/* <div className='absolute w-[20%] h-[10%] bottom-[350px]  right-[95px] bg-red-200 rounded-3xl opacity-0 animate-message animation-delay-10000'>
        <div className='absolute bottom-[20px] bg-[#be95c4] right-4 w-[10%] h-[45%] rounded-full'></div>
        <div className='absolute bottom-[10px] bg-[#be95c4] left-4 h-[30%] w-[40%] rounded-xl'></div>
        <div className='absolute bottom-[40px] bg-[#be95c4] left-4 h-[30%] w-[50%] rounded-xl'></div>
      </div> */}
    </div>
  )
}

export default Home