import { useState } from 'react'
import Onboarding, { type OnboardingResult } from './components/Onboarding'
import LoginPage from './components/LoginPage'
import HomeScreen from './components/HomeScreen'
import AnalyticsScreen from './components/AnalyticsScreen'
import ProfileScreen from './components/ProfileScreen'
import BottomNav from './components/BottomNav'
import AIButton from './components/AIButton'

export type Screen = 'home' | 'analytics' | 'profile'

type Stage = 'onboarding' | 'login' | 'app'

export default function App() {
  const [stage, setStage] = useState<Stage>('onboarding')
  const [activeScreen, setActiveScreen] = useState<Screen>('home')
  const [onboarding, setOnboarding] = useState<OnboardingResult | null>(null)

  if (stage === 'onboarding') {
    return (
      <Onboarding
        onComplete={(result) => {
          setOnboarding(result)
          setStage('login')
        }}
      />
    )
  }

  if (stage === 'login') {
    return <LoginPage onLogin={() => setStage('app')} />
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        background: '#F7F5FF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        {activeScreen === 'home' && <HomeScreen onboarding={onboarding} />}
        {activeScreen === 'analytics' && <AnalyticsScreen onboarding={onboarding} />}
        {activeScreen === 'profile' && <ProfileScreen onLogout={() => setStage('login')} />}
      </div>
      <BottomNav active={activeScreen} onChange={setActiveScreen} />
      <AIButton />
    </div>
  )
}
