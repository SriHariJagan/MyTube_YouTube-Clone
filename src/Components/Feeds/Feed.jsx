import React, { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sidebarValues } from '../../Store/Slices/sidebarSlice';

import { API_Key } from '../../data';
import { formatViews } from '../../data';
import moment from 'moment/moment';

const Feed = () => {
  const { categorie } = useSelector(sidebarValues);
  const [data, setData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null); // To manage pagination
  const [scrollCount, setScrollCount] = useState(0); // Track the number of scrolls
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track any errors

  // Function to fetch videos from the YouTube API
  const fetchData = async (pageToken = '') => {
    try {
      setLoading(true);
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categorie}&pageToken=${pageToken}&key=${API_Key}`;
      const response = await fetch(videoList_url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setData((prevData) => [...prevData, ...data.items]); // Append new data
      setNextPageToken(data.nextPageToken || null); // Save next page token for pagination
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load more videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load of video data
  useEffect(() => {
    setScrollCount(0); // Reset scroll count when category changes
    fetchData();
  }, [categorie]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loading &&
        nextPageToken &&
        scrollCount < 3 // Limit to 3 scrolls
      ) {
        setScrollCount((prevCount) => prevCount + 1); // Increment scroll count
        fetchData(nextPageToken); // Fetch more data when scrolled near bottom
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextPageToken, loading, scrollCount]);

  // Display a loading indicator or error if needed
  return (
    <div className={styles.feed}>
      {data.map((item, index) => (
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className={styles.card}>
          <img src={item.snippet.thumbnails.medium.url} alt={`thumbnail${item.id}`} />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{formatViews(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}

      {loading && <p>Loading more videos...</p>}
      {!nextPageToken && scrollCount >= 3 && <p>No more videos to load.</p>} {/* Message after 3 scrolls */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Feed;
