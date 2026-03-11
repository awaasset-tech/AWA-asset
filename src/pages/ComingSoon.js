import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. Define your list of dogs here
// Make sure the 'src' perfectly matches the filenames in public/images/comingsoon/
const DOG_LIST = [
  { name: 'Cannoli', src: '/images/comingsoon/cannoli.png' },
  { name: 'Barkley', src: '/images/comingsoon/barkley.png' },
  { name: 'Rufus',   src: '/images/comingsoon/theo.png' },
  // Add as many dogs as you want here!
];

export default function ComingSoon() {
  // State to hold the currently selected dog
  const [currentDog, setCurrentDog] = useState(DOG_LIST[0]);

  // 2. Randomize the dog when the page loads
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DOG_LIST.length);
    setCurrentDog(DOG_LIST[randomIndex]);
  }, []); // The empty array [] means this runs exactly once when the page opens

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#ffffff',
      fontFamily: '"Amazon Ember", Arial, sans-serif',
      padding: '50px 20px',
      textAlign: 'center'
    }}>

      {/* --- TOP TEXT SECTION --- */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '90px',
          fontWeight: 300, 
          color: '#767676', 
          margin: '0',
          lineHeight: '1',
          letterSpacing: '-2px'
        }}>
          SORRY
        </h1>
        <h2 style={{
          fontSize: '40px',
          fontWeight: 300,
          color: '#767676',
          margin: '5px 0 15px 0',
          letterSpacing: '-1px'
        }}>
          we couldn't find that page
        </h2>
        <p style={{ fontSize: '20px', color: '#555', margin: 0, fontWeight: 400 }}>
          Try searching or go to <Link to="/" style={{ color: '#0066c0', textDecoration: 'none' }}>AWA Asset's home page</Link>.
        </p>
      </div>

      {/* --- IMAGE & CAPTION SECTION --- */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end', 
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        
        {/* Render the randomly selected dog image */}
        <img 
          src={currentDog.src} 
          alt={`${currentDog.name} the dog`} 
          style={{ 
            height: '400px', 
            width: 'auto',
            objectFit: 'contain'
          }} 
        />

        {/* Caption Text (Bottom Right) */}
        <div style={{ textAlign: 'left', paddingBottom: '30px', marginLeft: '20px' }}>
          <div style={{ 
            fontSize: '38px', 
            color: '#767676', 
            fontWeight: 300,
            marginBottom: '4px' 
          }}>
            {currentDog.name}
          </div>
          <Link to="/about" style={{ color: '#0066c0', textDecoration: 'none', fontSize: '18px' }}>
            Meet the dogs of AWA Asset
          </Link>
        </div>
        
      </div>
    </div>
  );
}