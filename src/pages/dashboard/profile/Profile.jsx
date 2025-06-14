import React, { useEffect, useState } from 'react'
import photo from '../../../assets/gilos.png'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const handleDelete = ()=> {
    localStorage.removeItem('token')
    navigate("/login")
  }

  useEffect(() => {
    (
      async () => {
        const res = await axios.get('https://nt-shopping-list.onrender.com/api/groups', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setGroup(res.data[0])
    })()
  }, [id]);
  return (
    <div className='bg-cover bg-center h-screen w-full p-5' style={{ backgroundImage: `url(${photo})` }}>
  <div className='bg-white text-black shadow-lg rounded-3xl w-full h-[250px] px-4 py-4 flex flex-col'>
    <div className='flex justify-between items-start'>
      <h1 className='text-4xl font-medium'>Your Profile</h1>
      <div className='flex gap-3'>
        <button className='text-white text-[20px] px-3 py-1 font-normal bg-blue-500 rounded-[8px]'><CopyOutlined /> Copy Username</button>
        <button className='text-white text-[20px] px-3 py-1 font-normal bg-red-500 rounded-[8px]' onClick={handleDelete}><DeleteOutlined /> Delete Account</button>
      </div>
    </div>
    <div className='flex items-center gap-8 mt-2'>
      <div className='w-32 h-32 rounded-full bg-red-600 opacity-70'>
        <h2 className='flex justify-center items-center text-6xl text-white mt-8'>{group?.owner?.name[0]?.toUpperCase()}</h2>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <h2 className='text-2xl font-semibold'>{group?.owner?.name}</h2>
          <button className='bg-green-700 border-green-400 rounded w-20 text-white'>Active</button>
        </div>
        <h2 className='text-[16px] opacity-40'>{group?.owner?.username}</h2>
      </div>
    </div>

  </div>
</div>

  )
}

export default Profile