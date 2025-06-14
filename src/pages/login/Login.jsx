import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import photo from '../../assets/login.png'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    useEffect(()=>{
    if (localStorage.getItem("token")) {
        return navigate("/dashboard");
        }
    },[])
      const onSubmit = async (e) => {
        e.preventDefault();
        let user = {
          username: e.target[0].value,
          password: e.target[1].value,
        };
        let res = await axios.post(
          "https://nt-shopping-list.onrender.com/api/auth",
          user
        );
        localStorage.setItem("token", res.data.token);
        console.log(res);
        if (res.status===200) {
            navigate("/dashboard")
            
        }
      };
  return (
    <div className='w-screen h-screen bg-gray-500'>
        <div className='container flex justify-center items-center h-screen mx-auto'>
        <div className='bg-black text-white w-[500px] h-[350px] rounded-l-2xl text-center flex flex-col gap-8 justify-center items-center'>
        <img className='w-20 h-20' src={photo} alt=""  />
        <p>Welcome back to</p>
        <h1 className='text-[40px] leading-100% font-bold'>Shopping List</h1>
        </div>
        <form onSubmit={onSubmit} action="">
        <div className='bg-[#FFFFFF]  w-[500px] h-[350px] pt-4 px-6 rounded-r-2xl'>
            <h1 className='text-2xl leading-100% font-medium text-blue-600 text-center'>Sign In</h1>
            <div className='flex flex-col gap-2  mt-3 mb-3'>
                <p>Username</p>
                <input   className='w-full border border-gray-300 rounded px-2 py-1' placeholder='eshmatjon123' type="text" />
            </div>
            <div className='flex flex-col gap-2'>
                <p>Password</p>
                <input className='w-full border border-gray-300 rounded px-2 py-1' placeholder='*****' type="password" />
            </div>
            <button className='w-full py-2 text-center bg-blue-600 text-white mt-2 rounded-3xl' type="submit">Sign In</button>
            <p className='mt-2'>No account yet? <Link className='text-blue-500 underline' to={"/register"}>Create One.</Link></p>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Login