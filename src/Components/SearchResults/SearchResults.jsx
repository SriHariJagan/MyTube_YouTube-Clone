import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './searchResults.module.css';
import { API_Key } from '../../data'; // Your API key
import moment from 'moment';

const SearchResults = () => {
  const { query } = useParams();  // Retrieve search query from the route params
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch search results from YouTube API
  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const searchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${query}&key=${API_Key}`;
      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const videoIds = data.items.map(item => item.id.videoId).join(','); // Get video IDs for the next API call

      // Fetch video details including categoryId
      if (videoIds) {
        fetchVideoDetails(videoIds);
      }

    } catch (error) {
      console.error('Failed to fetch search results:', error);
      setError('Failed to load search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch video details
  const fetchVideoDetails = async (videoIds) => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${API_Key}`;
      const response = await fetch(videoDetailsUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.items); // Store fetched video details
    } catch (error) {
      console.error('Failed to fetch video details:', error);
      setError('Failed to load video details. Please try again later.');
    }
  };

  useEffect(() => {
    fetchSearchResults();  // Fetch results when query changes
  }, [query]);

  return (
    <>
      <p className={styles.title}>Search results for: <h2>"{query}"</h2></p>

      <div className={styles.resultsContainer}>
        {loading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && results.length === 0 && <p>No results found.</p>}

        {results.map((item) => (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={item.id} className={styles.resultCard}>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <div className={styles.info}>
              <h3>{item.snippet.title}</h3>
              <p>{item.snippet.channelTitle}</p>
              <p>{moment(item.snippet.publishedAt).fromNow()}</p>
              {/* Add view count or other details as necessary */}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
