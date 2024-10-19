import React from 'react';
import styles from './sidebar.module.css';

import homeIcon from '../../assets/home.png';
import gameIcon from '../../assets/game_icon.png';
import automobileIcon from '../../assets/automobiles.png';
import sportsIcon from '../../assets/sports.png';
import entertainmentIcon from '../../assets/entertainment.png';
import techIcon from '../../assets/tech.png';
import musicIcon from '../../assets/music.png';
import blogIcon from '../../assets/blogs.png';
import newsIcon from '../../assets/news.png';

// Persons
import jackIcon from '../../assets/jack.png';
import simonIcon from '../../assets/simon.png';
import tomIcon from '../../assets/tom.png';
import meganIcon from '../../assets/megan.png';
import cameronIcon from '../../assets/cameron.png';
import { useDispatch, useSelector } from 'react-redux';
import { setCategorie, sidebarValues } from '../../Store/Slices/sidebarSlice';

const subscribedUsers = [
    { id: 1, name: 'PewDiePie', icon: jackIcon },
    { id: 2, name: 'Simon', icon: simonIcon },
    { id: 3, name: 'Tom', icon: tomIcon },
    { id: 4, name: 'Megan', icon: meganIcon },
    { id: 5, name: 'Cameron', icon: cameronIcon }
];

const Sidebar = () => {
    
    const dispatch = useDispatch();
    const { showSidebar, categorie } = useSelector(sidebarValues);

  return (
    <div className={`${styles.sidebar} ${showSidebar ? "" : styles.smallSidebar}`}>
        <div className={styles.shortcutLinks}>
            <div className={`${styles.sideLink} ${categorie === 0 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(0))}>
                <img src={homeIcon} alt="homeIcon" /> <p>Home</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 20 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(20))}>
                <img src={gameIcon} alt="gameIcon" /> <p>Game</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 2 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(2))}>
                <img src={automobileIcon} alt="automobileIcon" /> <p>Automobiles</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 17 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(17))}>
                <img src={sportsIcon} alt="sportsIcon" /> <p>Sports</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 24 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(24))}>
                <img src={entertainmentIcon} alt="entertainmentIcon" /> <p>Entertainment</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 28 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(28))}>
                <img src={techIcon} alt="techIcon" /> <p>Technology</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 10 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(10))}>
                <img src={musicIcon} alt="musicIcon" /> <p>Music</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 22 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(22))}>
                <img src={blogIcon} alt="blogIcon" /> <p>Blogs</p>
            </div>
            <div className={`${styles.sideLink} ${categorie === 25 ? styles.active : ''}`} onClick={() => dispatch(setCategorie(25))}>
                <img src={newsIcon} alt="newsIcon" /> <p>News</p>
            </div>
            <hr />
        </div>

        <div className={styles.subscribeList}>
            <h3>Subscribe</h3>
            {subscribedUsers.map(user => (
                <div key={user.id} className={styles.sideLink}>
                    <img src={user.icon} alt={`${user.name}Icon`} /> <p>{user.name}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Sidebar;
