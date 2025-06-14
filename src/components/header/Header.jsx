import { BellOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import photo from '../../assets/login.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem("token")) {
            return navigate("/login");
        }
    },[])
    const LogOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };


  return (
    <div className='w-full h-14 shadow-lg bg-white'>
        <div className='flex justify-between items-center px-5'>
        <div className='flex gap-4 items-center'>
        <img className='w-14' src={photo} alt="" />
        <button className='w-24 h-8 bg-blue-500 rounded-2xl text-white'>+ New</button>
        </div>
        <input className='w-[600px] h-10 border py-4 px-3 rounded border-gray-300' placeholder="Search group and join..." type="text" />
        <div className='flex gap-4'>
        <SyncOutlined />
        <BellOutlined />
        <SettingOutlined onClick={LogOut} />
        </div>
        </div>
    </div>
  )
}

export default Header