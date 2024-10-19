import React from 'react'
import styles from './video.module.css'
import Playvideo from '../../Components/Playvideo/Playvideo'
import RecomendedVideos from '../../Components/RemomendedVideos/RecomendedVideos'
import { useParams } from 'react-router-dom'

const Video = () => {
  
  const {videoId, categoryId} = useParams();

  return (
    <div className={styles.playContainer}>
      <Playvideo videoId={videoId}/>
      <RecomendedVideos categoryId={categoryId}/>
    </div>
  )
}

export default Video