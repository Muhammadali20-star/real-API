import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import photo from '../../../assets/gilos.png';
import { CaretDownOutlined, DashOutlined } from '@ant-design/icons';

const Groups = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    (async () => {
        const res = await axios.get('https://nt-shopping-list.onrender.com/api/groups', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        const foundGroup = res.data.find((group) => group._id === id);
        if (foundGroup) {
          setGroup(foundGroup);
        }
    })()
  }, [id]);

  return (
    <div className="bg-cover bg-center h-screen w-full" style={{ backgroundImage: `url(${photo})` }}>
      <div className='flex justify-between px-6 mb-2'>
      <h2 className="text-4xl leading-20 font-normal text-white">{group?.name}</h2>
      <div>
        {group?.owner && (
          <div className="flex gap-3 items-center mt-10">
           <div className='bg-white px-3 py-1 rounded-md items-center shadow flex gap-2'>
           <span className="text-gray-600 font-medium">Owner:</span>
            <div className="flex items-center gap-2 px-2 py-1 rounded-full">
              <div className="bg-blue-600 text-white rounded-[8px] w-6 h-6 flex items-center justify-center ">
                <h2 className='text-sm font-bold'>{group?.owner?.name[0]?.toUpperCase()}</h2>
              </div>
              <h2 className="text-blue-700 font-semibold">{group?.owner?.name}<span className="text-gray-500 ml-1">({group?.owner?.username})</span></h2>
            </div>
           </div>
            <div className='bg-white px-3 py-3 rounded-md shadow flex gap-2'>
            <DashOutlined />
            <CaretDownOutlined />
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="flex justify-between px-5 h-screen">
        <div className="bg-white text-black shadow-lg rounded-t-[12px] w-[580px] px-4 py-3">
          <h2 className="text-2xl font-semibold">items <span className="bg-blue-600 w-36 h-20 px-3 text-white rounded-[8px]">0</span></h2>
        </div>
        
        <div className="bg-white text-black shadow-lg rounded-t-[12px] w-[580px] px-4 py-3">
          <h2 className="text-2xl font-semibold">Members <span className="bg-blue-600 w-36 h-20 px-3 text-white rounded-[8px]">1</span></h2>
        </div>
      </div>
    </div>
  );
};

export default Groups;
