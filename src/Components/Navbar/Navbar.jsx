import React, { useState } from 'react';
import styles from './navbar.module.css';

// left icons
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/logo.png';

// middle icons
import searchIcon from '../../assets/search.png';

// right icons
import uploadIcon from '../../assets/upload.png';
import moreIconIcon from '../../assets/more.png';
import notificationIcon from '../../assets/notification.png';
import profileIcon from '../../assets/jack.png';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../Store/Slices/sidebarSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Store search query
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`); // Navigate to search results page
    }
    setSearchQuery("")
  };

  return (
    <nav className={`flexDiv`}>
      <div className={styles.left}>
        <img className={styles.menuIcon} src={menuIcon} alt="menuIcon" onClick={() => dispatch(toggleSidebar())} />
        <img className={styles.logo} src={logo} alt="logo" onClick={() => navigate('/')} />
      </div>

      <div className={styles.middle}>
        <form className={styles.searchBox} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">
            <img src={searchIcon} alt="searchIcon" />
          </button>
        </form>
      </div>

      <div className={styles.right}>
        <img src={uploadIcon} alt="uploadIcon" />
        <img src={moreIconIcon} alt="moreIcon" />
        <img src={notificationIcon} alt="notificationIcon" />
        <img src={profileIcon} alt="profileIcon" className={styles.profileIcon} />
      </div>
    </nav>
  );
};

export default Navbar;
