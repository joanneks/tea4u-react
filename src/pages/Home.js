import React from 'react';
import '../css/home.css';
import home from '../css/images/Tea-bg20.jpg';

function Home() {

  return (
    <React.Fragment>
      <div id="homepage" style={{backgroundImage:`url(`+home+`)`}}>
            Home
      </div>

    </React.Fragment>
    );
  }
  
  export default Home;