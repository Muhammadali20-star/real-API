import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsChevronLeft, BsPerson } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { SlBubbles } from 'react-icons/sl';
import { Link, Outlet } from 'react-router-dom'


const Dashboard = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [password, setPassword] = useState('');
  const [groups, setGroups] = useState([])


  const handleCreate = async () => {
    const newGroup = {
      name: groupName,
      password: password,
    };

    const res = await axios.post(
      "https://nt-shopping-list.onrender.com/api/groups",
      newGroup,
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`
        },
      }
    );
    console.log(res);
  }
  useEffect(()=>{
    (async () => {
      const res = await axios.get(
        "https://nt-shopping-list.onrender.com/api/groups",
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`
          },
        }
      );
      setGroups(res.data)
      console.log(res);
    })()
  },[])
  return (
    <div className='flex'>
      <div className='w-[250px] h-screen bg-whitsetGroupse p-4'>
        <div>
          <Link className={"flex gap-2 mb-1 p-2 rounded bg-gray-200 w-full h-8 py-1 px-2 hover:bg-gray-400 items-center"} to={""}><BsPerson className='text-2xl text-blue-500' />Profile</Link>
          <button className="flex gap-2 mb-1 p-2 rounded  bg-gray-200 w-full h-8 py-1 px-2 items-center hover:bg-gray-400" onClick={() => setShowButtons(!showButtons)}><SlBubbles className='text-2xl text-blue-500' /> Groups <BsChevronLeft className='text-2xl text-blue-500' /></button>
          {showButtons && (
            <div>
              <button className="flex gap-2 p-2 rounded bg-gray-100 w-full hover:bg-gray-400" onClick={() => setShowModal(true)}> <GoPlus className='text-2xl text-blue-500' /> Create Group </button>
              {
                groups.map((group) => (
                  <Link className={"flex gap-2 mb-1 p-2 rounded bg-gray-200 w-full h-8 py-1 px-2 hover:bg-gray-400 items-center"} to={`/dashboard/group/${group._id}`} key={group._id}>{group.name}</Link>
                ))
              }
              {showModal && (
                <div className="fixed top-2 left-2 w-full h-full flex  items-center z-50">
                  <div className="bg-white rounded-lg p-6 w-[400px] space-y-4 shadow-lg">
                    <button onClick={() => setShowModal(false)}><CloseOutlined /></button>
                    <h2 className="text-lg font-semibold">Create New Group</h2>
                    <input type="text" placeholder="Group Name" className="w-full border px-3 py-2 rounded" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    <input type="password" placeholder="*****" className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleCreate}>Create</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='flex-1'>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard