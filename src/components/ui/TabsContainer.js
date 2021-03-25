import React from 'react'
import Tab from './Tab'

const TabsContainer = ({ selectedTab, setSelectedTab, tabsInfo, roles }) => {
  return (
    <div className='d-flex text-center'>
      {tabsInfo.map(({ name, icon, index }) => (
        <Tab
          icon={icon}
          name={name}
          roles={roles}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          index={index}
          key={index}
        />
      ))}
    </div>
  )
}

export default TabsContainer
