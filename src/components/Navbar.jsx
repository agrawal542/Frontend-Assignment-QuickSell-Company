import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Navbar({grouping,setGrouping,ordering,setOrdering}) {
  const [displayMenuOpen, setDisplayMenuOpen] = useState(false);

  const toggleDisplayMenu = () => {
    setDisplayMenuOpen(!displayMenuOpen);
  };

  return (
   <div className='navbar'>
       <div className="display-options">
       <div className={`display-toggle ${displayMenuOpen ? 'open' : ''}`} onClick={toggleDisplayMenu}>
  <FontAwesomeIcon icon={faBars} className="toggle-icon1" />Display <FontAwesomeIcon icon={faChevronDown} className="toggle-icon2" />
</div>

      {displayMenuOpen && (
        <div className="display-menu">
          <div className="dropdown">
                <div className='inner-option'>
                    <div htmlFor="grouping" className="dropdown-label">Grouping</div>
                    <select id="grouping" value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                        <option value="status">Status</option>
                        <option value="user">User</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
                <div className='inner-option'>
                    <div htmlFor="ordering" className="dropdown-label">Ordering</div>
                    <select id="ordering" value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                      <option value="priority">Priority</option>
                      <option value="title">Title</option>
                    </select>
                </div>
          </div>
        </div>
      )}
    </div>
   </div>
    
  );
}

export default Navbar;