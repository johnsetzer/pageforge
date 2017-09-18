import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <div className="header-flex-row">
        <div className="header-shift-left">
          <img src="favicon.ico" className="header-img" alt="header logo"/>
          <div className="header-title">
            PageForge
          </div>
          <div className="header-slogan">
            Drag and draw your <span className="header-strike-anchor">ideas.<div className="header-slogan-redact-strike" /></span>
          </div>
          <div className="header-slogan-redact">
            Applications
          </div>
        </div>
        <div className="header-shift-right">
          <div className="header-help">
            Press '?' for Help
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header