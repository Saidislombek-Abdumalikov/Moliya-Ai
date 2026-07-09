import { useState, useRef } from 'react'

type EntryType = 'expense' | 'income' | 'debt' | 'lending'

interface Entry {
  type: EntryType
  amount: string
  note: string
  category: string
}

const typeConfig: Record<EntryType, { label: string; color: string; bg: string; icon: string }> = {
  expense: { label: 'Xarajat', color: '#DC2626', bg: '#FEF2F2', icon: '↑' },
  income: { label: 'Daromad', color: '#16A34A', bg: '#F0FDF4', icon: '↓' },
  debt: { label: 'Qarz', color: '#D97706', bg: '#FFFBEB', icon: '⟳' },
  lending: { label: 'Berdi', color: '#7C3AED', bg: '#F5F3FF', icon: '⟲' },
}

const categories: Record<EntryType, string[]> = {
  expense: ['Oziq-ovqat', 'Transport', "Ko'ngil ochar", 'Kiyim', 'Kommunal', 'Sog\'liq', 'Ta\'lim', 'Boshqa'],
  income: ['Maosh', 'Freelance', 'Biznes', 'Investitsiya', 'Sovg\'a', 'Boshqa'],
  debt: ['Do\'st', 'Bank', 'Oila', 'Boshqa'],
  lending: ['Do\'st', 'Hamkasb', 'Oila', 'Boshqa'],
}

const voicePrompts: Record<EntryType, string> = {
  expense: "Qancha xarajat qildingiz va nima uchun?",
  income: "Qancha daromad oldingiz?",
  debt: "Kimdan qancha qarz oldingiz?",
  lending: "Kimga qancha pul berdingiz?",
}

export default function AIButton() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'type' | 'form' | 'voice' | 'done'>('type')
  const [selectedType, setSelectedType] = useState<EntryType>('expense')
  const [recording, setRecording] = useState(false)
  const [entry, setEntry] = useState<Entry>({ type: 'expense', amount: '', note: '', category: '' })
  const [saved, setSaved] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openModal = () => {
    setStep('type')
    setEntry({ type: 'expense', amount: '', note: '', category: '' })
    setSaved(false)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setRecording(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const selectType = (t: EntryType) => {
    setSelectedType(t)
    setEntry((e) => ({ ...e, type: t, category: categories[t][0] }))
    setStep('form')
  }

  const startVoice = () => {
    setStep('voice')
    setRecording(true)
    timerRef.current = setTimeout(() => {
      setRecording(false)
      // Simulate voice-to-text result
      const demos: Record<EntryType, Partial<Entry>> = {
        expense: { amount: '85 000', note: 'Korzinka supermarket', category: 'Oziq-ovqat' },
        income: { amount: '4 500 000', note: 'Oylik maosh', category: 'Maosh' },
        debt: { amount: '500 000', note: "Sherzoddan olindi", category: "Do'st" },
        lending: { amount: '200 000', note: "Bobur'ga berildi", category: "Do'st" },
      }
      setEntry((e) => ({ ...e, ...demos[selectedType] }))
      setStep('form')
    }, 2500)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      closeModal()
    }, 1200)
  }

  const cfg = typeConfig[selectedType]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={openModal}
        style={{
          position: 'fixed',
          bottom: 100,
          right: 'calc(50% - 215px + 16px)',
          width: 56,
          height: 56,
          borderRadius: 18,
          background: '#7C3AED',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          boxShadow: '0 4px 16px rgba(124,58,237,0.25)',
          transition: 'transform 0.15s ease',
        }}
        onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.93)')}
        onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="5" fill="white" fillOpacity="0.95" />
          <path d="M13 4V7M13 19V22M4 13H7M19 13H22M6.5 6.5L8.6 8.6M17.4 17.4L19.5 19.5M6.5 19.5L8.6 17.4M17.4 8.6L19.5 6.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(30,26,60,0.3)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 430,
              background: '#FFFFFF',
              borderRadius: '24px 24px 0 0',
              padding: '20px 20px 40px',
              transition: 'transform 0.3s ease',
            }}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, background: '#E8E3F8', borderRadius: 2, margin: '0 auto 20px' }} />

            {/* Saved state */}
            {saved && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 20, background: '#F0FDF4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px', fontSize: 28,
                }}>✓</div>
                <p style={{ fontSize: 17, fontWeight: 600, color: '#16A34A' }}>Saqlandi!</p>
              </div>
            )}

            {/* Step: type selection */}
            {!saved && step === 'type' && (
              <>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#1E1A3C', marginBottom: 6 }}>Nima qo'shmoqchisiz?</p>
                <p style={{ fontSize: 13, color: '#8B82C4', marginBottom: 20 }}>Turini tanlang yoki ovoz bilan ayting</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                  {(Object.keys(typeConfig) as EntryType[]).map((t) => {
                    const c = typeConfig[t]
                    return (
                      <button
                        key={t}
                        onClick={() => selectType(t)}
                        style={{
                          padding: '18px 16px',
                          borderRadius: 16,
                          border: `1.5px solid ${c.color}22`,
                          background: c.bg,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          gap: 8,
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: 22, color: c.color, fontWeight: 700 }}>{c.icon}</span>
                        <span style={{ fontSize: 15, fontWeight: 600, color: '#1E1A3C' }}>{c.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Voice shortcut */}
                <button
                  onClick={() => { setSelectedType('expense'); setStep('voice'); startVoice() }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 14,
                    border: '1.5px solid #E8E3F8',
                    background: '#F7F5FF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    color: '#7C3AED',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="6" y="1" width="6" height="10" rx="3" fill="#7C3AED" fillOpacity="0.8" />
                    <path d="M3 9C3 12.3 5.7 15 9 15C12.3 15 15 12.3 15 9" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="9" y1="15" x2="9" y2="17" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Ovoz bilan kiriting
                </button>
              </>
            )}

            {/* Step: voice recording */}
            {!saved && step === 'voice' && (
              <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#1E1A3C', marginBottom: 6 }}>
                  {voicePrompts[selectedType]}
                </p>
                <p style={{ fontSize: 13, color: '#8B82C4', marginBottom: 32 }}>Gapiring, eshityapman...</p>

                {/* Mic animation */}
                <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 24px' }}>
                  {recording && (
                    <>
                      <div style={{
                        position: 'absolute', inset: -12, borderRadius: '50%',
                        border: '2px solid rgba(124,58,237,0.15)',
                        animation: 'ripple 1.5s ease infinite',
                      }} />
                      <div style={{
                        position: 'absolute', inset: -6, borderRadius: '50%',
                        border: '2px solid rgba(124,58,237,0.2)',
                        animation: 'ripple 1.5s ease infinite 0.3s',
                      }} />
                    </>
                  )}
                  <div style={{
                    width: 96, height: 96, borderRadius: '50%',
                    background: recording ? '#7C3AED' : '#EDE9FE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s',
                  }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <rect x="12" y="2" width="12" height="20" rx="6" fill={recording ? 'white' : '#7C3AED'} fillOpacity="0.9" />
                      <path d="M6 18C6 24.6 11.4 30 18 30C24.6 30 30 24.6 30 18" stroke={recording ? 'white' : '#7C3AED'} strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="18" y1="30" x2="18" y2="34" stroke={recording ? 'white' : '#7C3AED'} strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} style={{
                      width: 4,
                      borderRadius: 2,
                      background: '#7C3AED',
                      opacity: recording ? 1 : 0.3,
                      animation: recording ? `wave 0.8s ease infinite ${i * 0.12}s` : 'none',
                      height: recording ? undefined : 12,
                    }} />
                  ))}
                </div>

                <button onClick={() => { setRecording(false); setStep('type') }} style={{
                  marginTop: 28, padding: '10px 24px', borderRadius: 12,
                  border: '1px solid #E8E3F8', background: 'transparent',
                  color: '#8B82C4', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
                }}>
                  Bekor qilish
                </button>
              </div>
            )}

            {/* Step: form */}
            {!saved && step === 'form' && (
              <>
                {/* Type switcher */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto' }}>
                  {(Object.keys(typeConfig) as EntryType[]).map((t) => {
                    const c = typeConfig[t]
                    const active = selectedType === t
                    return (
                      <button
                        key={t}
                        onClick={() => { setSelectedType(t); setEntry((e) => ({ ...e, type: t, category: categories[t][0] })) }}
                        style={{
                          flexShrink: 0,
                          padding: '7px 14px',
                          borderRadius: 20,
                          border: `1.5px solid ${active ? c.color : '#E8E3F8'}`,
                          background: active ? c.bg : 'transparent',
                          color: active ? c.color : '#8B82C4',
                          fontSize: 13,
                          fontWeight: active ? 600 : 400,
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        {c.label}
                      </button>
                    )
                  })}
                </div>

                {/* Amount */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, color: '#8B82C4', fontWeight: 500, display: 'block', marginBottom: 6 }}>SUMMA (SO'M)</label>
                  <input
                    type="tel"
                    placeholder="0"
                    value={entry.amount}
                    onChange={(e) => setEntry((prev) => ({ ...prev, amount: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 14,
                      border: '1.5px solid #E8E3F8',
                      background: '#F7F5FF',
                      fontSize: 22,
                      fontWeight: 700,
                      color: cfg.color,
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Category */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, color: '#8B82C4', fontWeight: 500, display: 'block', marginBottom: 6 }}>KATEGORIYA</label>
                  <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
                    {categories[selectedType].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setEntry((e) => ({ ...e, category: cat }))}
                        style={{
                          flexShrink: 0,
                          padding: '7px 12px',
                          borderRadius: 10,
                          border: `1.5px solid ${entry.category === cat ? cfg.color : '#E8E3F8'}`,
                          background: entry.category === cat ? cfg.bg : 'transparent',
                          color: entry.category === cat ? cfg.color : '#8B82C4',
                          fontSize: 13,
                          fontFamily: 'inherit',
                          cursor: 'pointer',
                          fontWeight: entry.category === cat ? 600 : 400,
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, color: '#8B82C4', fontWeight: 500, display: 'block', marginBottom: 6 }}>IZOH</label>
                  <input
                    type="text"
                    placeholder="Ixtiyoriy..."
                    value={entry.note}
                    onChange={(e) => setEntry((prev) => ({ ...prev, note: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 14,
                      border: '1.5px solid #E8E3F8',
                      background: '#F7F5FF',
                      fontSize: 15,
                      color: '#1E1A3C',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={startVoice}
                    style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      border: '1.5px solid #E8E3F8', background: '#F7F5FF',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="6" y="1" width="6" height="10" rx="3" fill="#7C3AED" fillOpacity="0.8" />
                      <path d="M3 9C3 12.3 5.7 15 9 15C12.3 15 15 12.3 15 9" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="9" y1="15" x2="9" y2="17" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!entry.amount}
                    style={{
                      flex: 1, padding: '14px',
                      borderRadius: 14, border: 'none',
                      background: entry.amount ? '#7C3AED' : '#EDE9FE',
                      color: entry.amount ? '#fff' : '#8B82C4',
                      fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
                      cursor: entry.amount ? 'pointer' : 'default',
                    }}
                  >
                    Saqlash
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes wave {
          0%, 100% { height: 12px; }
          50% { height: 28px; }
        }
      `}</style>
    </>
  )
}
