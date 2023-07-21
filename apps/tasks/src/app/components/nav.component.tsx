import { Text, Tabs } from 'dracula-ui'
import { Dispatch, SetStateAction, useState } from 'react'

export const Nav = ({
  setFilter,
  getCount,
  tabs
}: {
  setFilter: Dispatch<SetStateAction<string>>
  getCount: (state: string) => number
  tabs: string[]
}) => {
  const [activeTab, setActiveTab] = useState(1)
  const handleClick = (i: number) => {
    setFilter(tabs[i])
    setActiveTab(i)
  }

  return (
    <Tabs color="pink" style={{ marginBottom: 10 }}>
      {tabs.map((tab, i) => (
        <li
          key={`tab_${i}`}
          className={`drac-tab ${i === activeTab && 'drac-tab-active'}`}
          onClick={() => handleClick(i)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Text px="sm" className="drac-tab-link drac-text">
            {tab}
            <Text as="span" pl="xs" color="blackSecondary">
              ({getCount(tab)})
            </Text>
          </Text>
        </li>
      ))}
    </Tabs>
  )
}
