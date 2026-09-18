import React from 'react';
import { Link, useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header_container">

      <div className="logo" onClick={()=>navigate('/')}>
        <span className="logo_icon">🍴</span>
        <h2>Recipe<span>Book</span></h2>
      </div>

      <div className="search_recipe">
        <span className="search_icon">🔍</span>

        <input
          type="text"
          placeholder="Search your favorite recipe..."
        />
      </div>

     <div className="header_actions">
  <Link to="/favories" className="favorite_btn">
    ❤️
    <span>Favorites</span>
  </Link>
</div>
    </header>
  );
};

export default Header;
