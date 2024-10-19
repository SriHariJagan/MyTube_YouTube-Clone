import React, { useEffect, useState } from 'react';
import styles from './recomendedvideos.module.css';

import thumbnail1 from '../../assets/thumbnail1.png';
import thumbnail2 from '../../assets/thumbnail2.png';
import thumbnail3 from '../../assets/thumbnail3.png';
import thumbnail4 from '../../assets/thumbnail4.png';
import thumbnail5 from '../../assets/thumbnail5.png';
import thumbnail6 from '../../assets/thumbnail6.png';
import thumbnail7 from '../../assets/thumbnail7.png';
import thumbnail8 from '../../assets/thumbnail8.png';
import { API_Key, formatViews } from '../../data';
import { Link } from 'react-router-dom';

// Static fallback data
const feedData = [
  {
    id: 1,
    thumbnail: thumbnail1,
    title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In minima assumenda quaerat!',
    channel: 'MunnaBhai Gamming',
    likes: '256k likes',
    time: '2 days ago',
  },
  {
    id: 2,
    thumbnail: thumbnail2,
    title: 'Adipisicing elit minima assumenda!',
    channel: 'ProGamer Live',
    likes: '512k likes',
    time: '1 day ago',
  },
  // More static fallback videos...
];

const RecomendedVideos = ({ categoryId }) => {
  const [videoData, setVideoData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrollCount, setScrollCount] = useState(0); // Scroll count state
  const [error, setError] = useState(null);

  // Fetch video data with error handling
  const fetchVideoData = async (pageToken = '') => {
    try {
      setLoading(true);
      const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=US&videoCategoryId=${categoryId}&pageToken=${pageToken}&key=${API_Key}`;
      const response = await fetch(videoUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.items.length === 0) {
        throw new Error('No videos found.');
      }

      console.log('Fetched data:', data.items);

      setVideoData((prevData) => [...prevData, ...data.items]); // Append new data
      setNextPageToken(data.nextPageToken || null); // Save next page token
    } catch (error) {
      console.error('Failed to fetch video data:', error);
      setError('Failed to load more videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial video data
    fetchVideoData();
  }, [categoryId]);

  // Scroll handler with debouncing
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        nextPageToken &&
        scrollCount < 3 // Allow only up to 3 scrolls
      ) {
        setScrollCount((prevCount) => prevCount + 1); // Increment scroll count
        fetchVideoData(nextPageToken); // Fetch more data when near bottom of page
      }
    };

    const debouncedScroll = debounce(handleScroll, 300);

    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [nextPageToken, loading, scrollCount]);

  // Debounce function to limit scroll calls
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Check if video data is available
  if (!videoData || videoData.length === 0) {
    return <p>No videos available at the moment.</p>;
  }

  return (
    <div className={styles.recomended}>
      {videoData.length > 0
        ? videoData.map((video) => {
            const { thumbnails, title, channelTitle, categoryId } = video.snippet;
            const { likeCount } = video.statistics;
            return (
              <Link to={`/video/${categoryId}/${video.id}`} key={video.id} className={styles.sideVideoList}>
                <img src={thumbnails?.default?.url || thumbnail1} alt="Video Thumbnail" />
                <div className={styles.videoInfo}>
                  <h4>{title}</h4>
                  <p>{channelTitle}</p>
                  <p>{formatViews(likeCount)} likes</p>
                </div>
              </Link>
            );
          })
        : feedData.map((item) => (
            <div key={item.id} className={styles.sideVideoList}>
              <img src={item.thumbnail} alt={`thumbnail${item.id}`} />
              <div className={styles.videoInfo}>
                <h4>{item.title}</h4>
                <p>{item.channel}</p>
                <p>{item.likes}</p>
              </div>
            </div>
          ))}

      {loading && <p>Loading more videos...</p>}
      {!nextPageToken && scrollCount >= 3 && <p>No more videos to load.</p>} {/* Message after 3 scrolls */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default RecomendedVideos;
