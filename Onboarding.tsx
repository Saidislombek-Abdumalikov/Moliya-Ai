import { useState } from 'react'

export interface OnboardingResult {
  language: 'uz' | 'ru' | 'en'
  monthlyGoal: number
  firstExpense: { amount: number; category: string } | null
}

interface Props {
  onComplete: (result: OnboardingResult) => void
}

type Step = 'language' | 'goal' | 'expense' | 'ai'

const languages: { code: 'uz' | 'ru' | 'en'; label: string; tag: string }[] = [
  { code: 'uz', label: "O'zbek (lotin)", tag: 'UZ' },
  { code: 'ru', label: 'Русский', tag: 'RU' },
  { code: 'en', label: 'English', tag: 'EN' },
]

const goalOptions = [
  { tag: "Boshlang'ich", value: 500000 },
  { tag: 'Tavsiya etiladi', value: 1000000, recommended: true },
  { tag: 'Intensiv', value: 2000000 },
]

const expenseCategories = [
  { key: 'Ovqat', label: 'Ovqat', icon: '🍽️' },
  { key: 'Transport', label: 'Transport', icon: '🚗' },
  { key: 'Kiyim', label: 'Kiyim', icon: '👔' },
  { key: 'Uy', label: 'Uy', icon: '🏠' },
]

const aiQuestions = [
  { icon: '💰', label: 'Pulim qayerga ketyapti?' },
  { icon: '📊', label: 'Oyiga qancha tejay olaman?' },
  { icon: '🏷️', label: "Eng ko'p sarflagan kategoriyam?" },
]

function fmtMoney(n: number) {
  return n.toLocaleString('en-US').replace(/,/g, ' ')
}

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<Step>('language')
  const [language, setLanguage] = useState<'uz' | 'ru' | 'en'>('uz')
  const [goal, setGoal] = useState<number>(1000000)
  const [customGoal, setCustomGoal] = useState('')
  const [useCustomGoal, setUseCustomGoal] = useState(false)
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('Ovqat')

  const steps: Step[] = ['language', 'goal', 'expense', 'ai']
  const stepIndex = steps.indexOf(step)
  const progressPct = Math.round(((stepIndex + 1) / steps.length) * 100)

  const finalGoal = useCustomGoal ? Number(customGoal.replace(/\D/g, '')) || 0 : goal

  const goNext = () => {
    if (step === 'language') setStep('goal')
    else if (step === 'goal') setStep('expense')
    else if (step === 'expense') setStep('ai')
  }

  const goBack = () => {
    if (step === 'goal') setStep('language')
    else if (step === 'expense') setStep('goal')
    else if (step === 'ai') setStep('expense')
  }

  const finish = (skipExpense: boolean) => {
    const amt = Number(expenseAmount.replace(/\D/g, ''))
    onComplete({
      language,
      monthlyGoal: finalGoal,
      firstExpense: !skipExpense && amt > 0 ? { amount: amt, category: expenseCategory } : null,
    })
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        maxWidth: 430,
        margin: '0 auto',
        background: 'linear-gradient(180deg, #F7F5FF 0%, #EFEBFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px',
      }}
    >
      {/* Top bar */}
      <div style={{ padding: '20px 0 8px', display: 'flex', alignItems: 'center', gap: 14 }}>
        {step !== 'language' && (
          <button
            onClick={goBack}
            style={{
              width: 32, height: 32, borderRadius: 12, border: 'none',
              background: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="#5B21B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {step !== 'language' && (
          <>
            <div style={{ flex: 1 }}>
              <div style={{ height: 6, background: 'rgba(124,58,237,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPct}%`, height: '100%', background: '#7C3AED',
                  borderRadius: 3, transition: 'width 0.3s ease',
                }} />
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', flexShrink: 0 }}>{progressPct}%</span>
          </>
        )}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: step === 'language' ? 40 : 20 }}>
        {/* STEP 1: Language */}
        {step === 'language' && (
          <>
            <h1 style={{ fontSize: 30, fontWeight: 700, color: '#1E1A3C', textAlign: 'center', letterSpacing: -0.5, marginBottom: 8 }}>
              Tilni tanlang
            </h1>
            <p style={{ fontSize: 14, color: '#8B82C4', textAlign: 'center', marginBottom: 32 }}>
              Iltimos, dastur tilini tanlang
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {languages.map((l) => {
                const active = language === l.code
                return (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '16px 18px', borderRadius: 18,
                      border: active ? '1.5px solid #7C3AED' : '1.5px solid #E8E3F8',
                      background: active ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                      boxShadow: active ? '0 4px 20px rgba(124,58,237,0.15)' : 'none',
                      cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                    }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%', background: '#EDE9FE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: '#7C3AED', flexShrink: 0,
                    }}>
                      {l.tag}
                    </div>
                    <span style={{ flex: 1, fontSize: 17, fontWeight: 500, color: '#1E1A3C' }}>{l.label}</span>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      border: active ? 'none' : '1.5px solid #DDD6FE',
                      background: active ? '#7C3AED' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {active && (
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2.5 6.5L5 9L10.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* STEP 2: Goal */}
        {step === 'goal' && (
          <>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1E1A3C', letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.2 }}>
              Moliyaviy maqsadingizni belgilang
            </h1>
            <p style={{ fontSize: 14, color: '#8B82C4', marginBottom: 24, lineHeight: 1.5 }}>
              Har oy qancha mablag' tejashni rejalashtiryapsiz?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 12 }}>
              {goalOptions.map((g) => {
                const active = !useCustomGoal && goal === g.value
                return (
                  <button
                    key={g.tag}
                    onClick={() => { setGoal(g.value); setUseCustomGoal(false) }}
                    style={{
                      textAlign: 'left', padding: '18px 20px', borderRadius: 20,
                      border: active ? '1.5px solid #7C3AED' : '1px solid #E8E3F8',
                      background: '#FFFFFF',
                      boxShadow: active ? '0 6px 24px rgba(124,58,237,0.18)' : 'none',
                      cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
                        background: g.recommended ? '#EDE9FE' : '#F3F0FF',
                        color: g.recommended ? '#7C3AED' : '#8B82C4',
                      }}>
                        {g.tag}
                      </span>
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%',
                        border: active ? 'none' : '1.5px solid #DDD6FE',
                        background: active ? '#7C3AED' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {active && (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2.5 6.5L5 9L10.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p style={{ fontSize: 26, fontWeight: 700, color: active ? '#7C3AED' : '#1E1A3C', marginTop: 10, letterSpacing: -0.5 }}>
                      {fmtMoney(g.value)}
                    </p>
                    <p style={{ fontSize: 13, color: '#8B82C4', marginTop: 2 }}>so'm / oyiga</p>
                  </button>
                )
              })}

              <button
                onClick={() => setUseCustomGoal(true)}
                style={{
                  textAlign: 'left', padding: '18px 20px', borderRadius: 20,
                  border: useCustomGoal ? '1.5px solid #7C3AED' : '1.5px dashed #C4BDE8',
                  background: useCustomGoal ? '#FFFFFF' : 'transparent',
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 17, fontWeight: 700, color: '#1E1A3C', marginBottom: 4 }}>O'zim kiritaman</p>
                  {useCustomGoal ? (
                    <input
                      autoFocus
                      type="tel"
                      placeholder="Summani kiriting"
                      value={customGoal}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setCustomGoal(e.target.value.replace(/\D/g, ''))}
                      style={{
                        fontSize: 15, color: '#7C3AED', fontFamily: 'inherit',
                        border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: 0,
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: 13, color: '#8B82C4' }}>Boshqa summa</p>
                  )}
                </div>
                <div style={{
                  width: 34, height: 34, borderRadius: 11, background: '#F7F5FF',
                  border: '1px solid #E8E3F8', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M11 2L14 5L5.5 13.5L2 14L2.5 10.5L11 2Z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </>
        )}

        {/* STEP 3: First expense */}
        {step === 'expense' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#7C3AED', letterSpacing: -0.3 }}>Moliya AI</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1E1A3C', textAlign: 'center', letterSpacing: -0.3, marginTop: 20, marginBottom: 8, lineHeight: 1.25 }}>
              Birinchi xarajatingizni kiriting
            </h1>
            <p style={{ fontSize: 14, color: '#8B82C4', textAlign: 'center', marginBottom: 24 }}>
              Biz bu orqali odatlaringizni tahlil qilamiz.
            </p>

            <div style={{
              background: '#FFFFFF', borderRadius: 22, padding: '20px',
              border: '1px solid #E8E3F8', marginBottom: 24,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#8B82C4', letterSpacing: 0.5, marginBottom: 6 }}>
                  XARAJAT SUMMASI
                </p>
                <input
                  type="tel"
                  placeholder="0"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value.replace(/\D/g, ''))}
                  style={{
                    fontSize: 32, fontWeight: 700, color: '#1E1A3C', fontFamily: 'inherit',
                    border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: 0,
                  }}
                />
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>
                ✨
              </div>
            </div>

            <p style={{ fontSize: 13, fontWeight: 600, color: '#8B82C4', marginBottom: 12 }}>Kategoriyani tanlang</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {expenseCategories.map((c) => {
                const active = expenseCategory === c.key
                return (
                  <button
                    key={c.key}
                    onClick={() => setExpenseCategory(c.key)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                      padding: '18px 12px', borderRadius: 18,
                      border: active ? '1.5px solid #7C3AED' : '1px solid #E8E3F8',
                      background: '#FFFFFF', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%', background: '#F3F0FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    }}>
                      {c.icon}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1E1A3C' }}>{c.label}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* STEP 4: AI teaser */}
        {step === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
            <div style={{
              width: 68, height: 68, borderRadius: 20,
              background: 'linear-gradient(135deg, #FFFFFF, #EDE9FE)',
              border: '1px solid #E8E3F8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20, position: 'relative',
              boxShadow: '0 8px 24px rgba(124,58,237,0.12)',
            }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#7C3AED' }}>AI</span>
              <span style={{ position: 'absolute', top: -6, right: -6, fontSize: 18 }}>✨</span>
            </div>

            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1E1A3C', textAlign: 'center', letterSpacing: -0.3, marginBottom: 10, lineHeight: 1.25 }}>
              <span style={{ color: '#7C3AED' }}>Pulingiz</span> haqida savol bering
            </h1>
            <p style={{ fontSize: 14, color: '#8B82C4', textAlign: 'center', lineHeight: 1.55, marginBottom: 28, maxWidth: 320 }}>
              Sun'iy intellekt xarajatlaringizni tahlil qilib, aqlli maslahatlar beradi.
            </p>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {aiQuestions.map((q) => (
                <div key={q.label} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', borderRadius: 18,
                  border: '1px solid #E8E3F8', background: '#FFFFFF',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                  }}>
                    {q.icon}
                  </div>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 500, color: '#1E1A3C' }}>{q.label}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3L9 7L5 11" stroke="#C4BDE8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, color: '#B8B0DC', textAlign: 'center', marginBottom: 16 }}>
              Demo shunchalik, ilovachi
            </p>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div style={{ padding: '12px 0 28px' }}>
        {step === 'language' && (
          <button
            onClick={goNext}
            style={{
              width: '100%', padding: '16px', borderRadius: 18, border: 'none',
              background: '#7C3AED', color: '#fff', fontSize: 16, fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
            }}
          >
            Davom etish →
          </button>
        )}

        {step === 'goal' && (
          <button
            onClick={goNext}
            disabled={finalGoal <= 0}
            style={{
              width: '100%', padding: '16px', borderRadius: 18, border: 'none',
              background: finalGoal > 0 ? '#7C3AED' : '#EDE9FE',
              color: finalGoal > 0 ? '#fff' : '#8B82C4',
              fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
              cursor: finalGoal > 0 ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: finalGoal > 0 ? '0 8px 24px rgba(124,58,237,0.3)' : 'none',
            }}
          >
            Maqsadni saqlash →
          </button>
        )}

        {step === 'expense' && (
          <button
            onClick={goNext}
            style={{
              width: '100%', padding: '15px', borderRadius: 18, border: 'none',
              background: expenseAmount ? '#7C3AED' : '#DDD6FE',
              color: expenseAmount ? '#fff' : '#6D5B9E',
              fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            Davom etish
          </button>
        )}

        {step === 'ai' && (
          <>
            <button
              onClick={() => finish(false)}
              style={{
                width: '100%', padding: '16px', borderRadius: 18, border: 'none',
                background: '#7C3AED', color: '#fff', fontSize: 15, fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 8px 24px rgba(124,58,237,0.3)', marginBottom: 12,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 4L2.5 11L9.5 14M21 4L14 21.5L9.5 14M21 4L9.5 14" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Telegram orqali boshladik
            </button>
            <button
              onClick={() => finish(false)}
              style={{
                width: '100%', padding: '8px', border: 'none', background: 'transparent',
                color: '#DC2626', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              Pulim qayerga ketayotganini bilishni xohlamayman
            </button>
          </>
        )}
      </div>
    </div>
  )
}
