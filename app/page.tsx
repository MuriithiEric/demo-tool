'use client'
import { useState } from 'react'
import Header from './components/Header'
import NavTabs from './components/NavTabs'
import StudyCompanion from './components/StudyCompanion'
import LecturerDashboard from './components/LecturerDashboard'
import GovernanceDashboard from './components/GovernanceDashboard'

export type Tab = 'companion' | 'lecturer' | 'governance'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('companion')

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        {activeTab === 'companion'  && <StudyCompanion />}
        {activeTab === 'lecturer'   && <LecturerDashboard />}
        {activeTab === 'governance' && <GovernanceDashboard />}
      </main>
    </div>
  )
}
