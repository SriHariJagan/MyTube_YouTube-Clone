import React, { useState, useEffect } from 'react';
import styles from './playvideo.module.css';

import like from '../../assets/like.png';
import dislike from'../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_Key, formatViews } from '../../data';
import moment from 'moment';

const Playvideo = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_Key}`;
      const response = await fetch(videoUrl);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setVideoData(data.items[0]); // Set the video data

    } catch (error) {
      console.error('Failed to fetch video data:', error);
    }
  };

  const fetchChannelData = async () => {
    if (!videoData) return; // Ensure videoData is available
    try {

        // channelData
        const channelDetails_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${videoData.snippet.channelId}&key=${API_Key}`;
        const response = await fetch(channelDetails_URL);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setChannelData(data.items[0]); // Set the channel data

    } catch (error) {
        console.error("Error in fetching channel data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_Key}`;
      const response = await fetch(commentsUrl);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setComments(data.items); // Set the comments data

    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
    fetchComments(); // Fetch comments when the component mounts
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [videoData]);

  if (!videoData || !channelData) {
    return <p>Loading video data...</p>;
  }

  const { title, description, publishedAt } = videoData.snippet;
  const { viewCount, likeCount, commentCount } = videoData.statistics;
  const { title: channelTitle, statistics, snippet } = channelData; // Get channel details
  const { subscriberCount } = statistics; // Subscriber count

  return (
    <div className={styles.playVideo}>
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      ></iframe>
      <h3>{title}</h3>
      <div className={styles.videoInfo}>
        <p>{formatViews(viewCount)} views &bull; {moment(publishedAt).fromNow()}</p>
        <div>
          <span><img src={like} alt="Like" />{formatViews(likeCount)}</span>
          <span><img src={dislike} alt="Dislike" />Dislike</span>
          <span><img src={share} alt="Share" />Share</span>
          <span><img src={save} alt="Save" />Save</span>
        </div>
      </div>
      <hr /> 
      <div className={styles.publisher}>
        <img src={snippet.thumbnails.medium.url} alt="Channel Avatar" />
        <div>
          <p>{channelTitle}</p>
          <span>{formatViews(subscriberCount)} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className={styles.videoDescription}>
        <p>{description.slice(0, 250)}...</p>
        <hr />
        <h4>{formatViews(commentCount)} comments</h4>

        {comments.map((comment) => {
          const { authorDisplayName, authorProfileImageUrl, textDisplay, publishedAt, likeCount } = comment.snippet.topLevelComment.snippet;

          return (
            <div className={styles.comments} key={comment.id}>
              <img src={authorProfileImageUrl || user_profile} alt="User Profile" />
              <div>
                <h3>{authorDisplayName} <span>{new Date(publishedAt).toDateString()}</span></h3>
                <p>{textDisplay}</p>
                <div className={styles.commentActions}>
                  <img src={like} alt="Like" />
                  <span>{formatViews(likeCount)}</span>
                  <img src={dislike} alt="Dislike" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playvideo;
