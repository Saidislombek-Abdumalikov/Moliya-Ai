import { useState } from 'react'

interface Props {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: Props) {
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)

  const handlePhoneSubmit = () => {
    if (phone.length < 9) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('otp') }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus()
  }

  const handleOtpSubmit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1000)
  }

  const valid = phone.length >= 9

  return (
    <div
      style={{
        minHeight: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        background: '#F7F5FF',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 24px',
      }}
    >
      <div style={{ height: 64 }} />

      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 48 }}>
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 24,
            background: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 18,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 30L17 14L23 23L28 16L34 30H8Z" fill="white" fillOpacity="0.9" />
            <circle cx="30" cy="11" r="4" fill="white" fillOpacity="0.6" />
          </svg>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1E1A3C', letterSpacing: -0.5, marginBottom: 4 }}>
          Moliya AI
        </h1>
        <p style={{ fontSize: 15, color: '#8B82C4', textAlign: 'center' }}>
          {step === 'phone' ? 'Shaxsiy moliyaviy yordamchingiz' : 'SMS kodni kiriting'}
        </p>
      </div>

      {/* Form card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '28px 24px',
          border: '1px solid #E8E3F8',
        }}
      >
        {step === 'phone' ? (
          <>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#8B82C4', marginBottom: 8, letterSpacing: 0.5 }}>
              TELEFON RAQAM
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: '#F7F5FF',
                border: '1.5px solid #E8E3F8',
                borderRadius: 14,
                padding: '13px 16px',
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 15, color: '#5B21B6', fontWeight: 600 }}>🇺🇿 +998</span>
              <div style={{ width: 1, height: 20, background: '#E8E3F8' }} />
              <input
                type="tel"
                placeholder="90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  fontSize: 16, color: '#1E1A3C', fontFamily: 'inherit', letterSpacing: 0.3,
                }}
              />
            </div>

            <button
              onClick={handlePhoneSubmit}
              disabled={!valid || loading}
              style={{
                width: '100%', padding: '15px', borderRadius: 14, border: 'none',
                background: valid ? '#7C3AED' : '#EDE9FE',
                color: valid ? '#fff' : '#8B82C4',
                fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                cursor: valid ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Yuborilmoqda...' : 'Davom etish'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#E8E3F8' }} />
              <span style={{ fontSize: 13, color: '#C4BDE8' }}>yoki</span>
              <div style={{ flex: 1, height: 1, background: '#E8E3F8' }} />
            </div>

            <button
              onClick={onLogin}
              style={{
                width: '100%', padding: '14px', borderRadius: 14,
                border: '1.5px solid #E8E3F8', background: '#F7F5FF',
                color: '#5B21B6', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 2.5C3.8 2.5 2 4.3 2 6.5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14 2.5C16.2 2.5 18 4.3 18 6.5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M6 17.5C3.8 17.5 2 15.7 2 13.5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14 17.5C16.2 17.5 18 15.7 18 13.5" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="9" r="2.2" fill="#7C3AED" />
                <path d="M6.5 13.5C6.5 11.6 8.1 10 10 10C11.9 10 13.5 11.6 13.5 13.5" stroke="#7C3AED" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Face ID bilan kirish
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: '#8B82C4', textAlign: 'center', marginBottom: 24 }}>
              +998 {phone.slice(0, 2)} {phone.slice(2, 5)} {phone.slice(5)} ga yuborildi
            </p>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  style={{
                    width: 44, height: 52, textAlign: 'center',
                    fontSize: 20, fontWeight: 700,
                    background: digit ? '#F5F3FF' : '#F7F5FF',
                    border: `1.5px solid ${digit ? '#7C3AED' : '#E8E3F8'}`,
                    borderRadius: 12, color: '#1E1A3C', outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.15s',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleOtpSubmit}
              style={{
                width: '100%', padding: '15px', borderRadius: 14, border: 'none',
                background: '#7C3AED', color: '#fff',
                fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              {loading ? 'Tekshirilmoqda...' : 'Kirish'}
            </button>

            <button
              onClick={() => setStep('phone')}
              style={{
                width: '100%', marginTop: 10, padding: '13px', borderRadius: 14,
                border: 'none', background: 'transparent',
                color: '#8B82C4', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              ← Orqaga
            </button>
          </>
        )}
      </div>

      <p style={{ fontSize: 12, color: '#C4BDE8', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>
        Davom etish orqali{' '}
        <span style={{ color: '#7C3AED' }}>Foydalanish shartlari</span>
        {' '}va{' '}
        <span style={{ color: '#7C3AED' }}>Maxfiylik siyosati</span>
        {' '}ga rozilik bildirasiz
      </p>
    </div>
  )
}
