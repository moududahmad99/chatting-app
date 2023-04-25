import React from 'react'
import { AiFillMessage, AiFillSetting, AiFillHome } from 'react-icons/ai'
import { IoMdNotifications } from 'react-icons/io'

const SidebarIcons = () => {
  return (
    <>
        <div className='icons'>
            <div className='sidebar-icons'>
                <AiFillHome />
            </div>
            <div className='sidebar-icons'>
                <AiFillMessage />
            </div>
            <div className='sidebar-icons'>
                <IoMdNotifications />
            </div>
            <div className='sidebar-icons'>
                <AiFillSetting />
            </div>
        </div>   
    </>
  )
}

export default SidebarIcons