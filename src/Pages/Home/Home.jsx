import React from 'react'
import styles from './home.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feeds/Feed'
import { useSelector } from 'react-redux'
import { sidebarValues } from '../../Store/Slices/sidebarSlice'

const Home = () => {

  const {showSidebar} = useSelector(sidebarValues);

  return (
    <>
      <Sidebar />
      <div className={`${styles.container} ${showSidebar ? "" : styles.largeContainer}`}>
        <Feed />
      </div>
    </>
  )
}

export default Home