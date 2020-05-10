import React from 'react';
import { NavLink } from 'react-router-dom';

const SiteLinks = ({toAddress, description}) => {

  return (
    <NavLink className="bg-green-600 rounded-xl text-white py-1 px-4 m-2" 
      to={toAddress} 
      activeClassName="underline" 
      exact >
      {description}
    </NavLink>
  )
}

export default SiteLinks;