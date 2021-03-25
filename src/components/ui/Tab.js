import React from 'react'
import './tab.css'

const Tab = ({ icon, name, index, selectedTab, setSelectedTab, roles }) => {
  return (
    <div
      className={`tab ${index === selectedTab && 'selected-tab mr-2'}`}
      onClick={() => setSelectedTab(index)}
      style={{
        opacity: index === 1 && !roles.includes('USER') ? '0' : '100%',
        pointerEvents: index === 1 && !roles.includes('USER') ? 'none' : 'all',
      }}
    >
      <i className={`${icon}`} /> <span>{name}</span>
    </div>
  )
}

export default Tab
