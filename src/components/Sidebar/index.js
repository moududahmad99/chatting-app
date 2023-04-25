import React from 'react'
import './style.css'
import SidebarIcons from './SidebarIcons'
import { RiLogoutBoxFill } from 'react-icons/ri'

const Sidebar = () => {

    return (
        <>
            <div className='sidebar'>
                <div className='sidebar-profile'>
                    <picture>
                        <img src="./images/sidebar-profile.avif" alt="" />
                    </picture>
                </div>
                <div className='sidebar-pagesIcons'>
                    <SidebarIcons />
                </div>
                <div className='sidebar-logout'>
                    <RiLogoutBoxFill />
                </div>
            </div>
        </>
    )
}

export default Sidebar