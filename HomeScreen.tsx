import type { OnboardingResult } from './Onboarding'

interface Props {
  onboarding?: OnboardingResult | null
}

const baseTransactions = [
  { id: 1, name: 'Korzinka', category: 'Oziq-ovqat', amount: -85000, time: 'Bugun, 14:32', emoji: '🛒', color: '#FEF2F2', dot: '#DC2626' },
  { id: 2, name: 'Maosh', category: 'Daromad', amount: 4500000, time: 'Dushanba', emoji: '💼', color: '#F0FDF4', dot: '#16A34A' },
  { id: 3, name: 'Netflix', category: "Ko'ngil ochar", amount: -49000, time: 'Yakshanba', emoji: '🎬', color: '#FEF2F2', dot: '#DC2626' },
  { id: 4, name: 'Uber', category: 'Transport', amount: -23000, time: 'Shanba', emoji: '🚗', color: '#FEF2F2', dot: '#DC2626' },
  { id: 5, name: 'Apelsin', category: 'Kommunal', amount: -120000, time: 'Juma', emoji: '💡', color: '#FEF2F2', dot: '#DC2626' },
]

const categoryEmoji: Record<string, string> = {
  Ovqat: '🍽️',
  Transport: '🚗',
  Kiyim: '👔',
  Uy: '🏠',
}

function fmt(n: number) {
  const abs = Math.abs(n)
  const s = n < 0 ? '-' : '+'
  return abs >= 1_000_000 ? `${s}${(abs / 1_000_000).toFixed(1)}M` : `${s}${(abs / 1000).toFixed(0)}K`
}

function fmtFull(n: number) {
  return n.toLocaleString('en-US').replace(/,/g, ' ')
}

export default function HomeScreen({ onboarding }: Props) {
  const firstExpense = onboarding?.firstExpense

  const transactions = firstExpense
    ? [
        {
          id: 0,
          name: `Birinchi xarajat: ${firstExpense.category}`,
          category: firstExpense.category,
          amount: -firstExpense.amount,
          time: 'Hozir',
          emoji: categoryEmoji[firstExpense.category] ?? '✨',
          color: '#FEF2F2',
          dot: '#DC2626',
        },
        ...baseTransactions,
      ]
    : baseTransactions

  const totalExpense = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const baseBalance = 12450000 - (firstExpense ? firstExpense.amount : 0)

  return (
    <div>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ padding: '4px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 13, color: '#8B82C4', marginBottom: 2 }}>Assalomu alaykum 👋</p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E1A3C', letterSpacing: -0.3 }}>Jasur Toshmatov</h2>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: '#EDE9FE', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 15, fontWeight: 700, color: '#7C3AED',
        }}>
          JT
        </div>
      </div>

      {/* Balance card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div
          style={{
            background: '#7C3AED',
            borderRadius: 22,
            padding: '24px 22px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle pattern */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 140, height: 140,
            borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, left: 40, width: 90, height: 90,
            borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
          }} />

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 6, fontWeight: 500 }}>
            UMUMIY BALANS
          </p>
          <h1 style={{ fontSize: 34, fontWeight: 700, color: '#fff', letterSpacing: -1, marginBottom: 22 }}>
            {fmtFull(baseBalance)} <span style={{ fontSize: 17, fontWeight: 500 }}>so'm</span>
          </h1>

          <div style={{ display: 'flex', gap: 20 }}>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>DAROMAD</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{fmt(totalIncome)}</p>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>XARAJAT</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#FCA5A5' }}>{fmt(-totalExpense)}</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>KARTA</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>**** 4821</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goal card (from onboarding) */}
      {onboarding && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{
            background: '#F5F3FF', borderRadius: 18, padding: '16px 18px',
            border: '1px solid #DDD6FE',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: '#EDE9FE',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
            }}>
              🎯
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, color: '#8B82C4', marginBottom: 2 }}>Oylik tejash maqsadi</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#5B21B6' }}>{fmtFull(onboarding.monthlyGoal)} so'm</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { icon: '↑', label: "Jo'natish", bg: '#F5F3FF', color: '#7C3AED' },
            { icon: '↓', label: 'Olish', bg: '#F0FDF4', color: '#16A34A' },
            { icon: '+', label: "To'ldirish", bg: '#FFFBEB', color: '#D97706' },
            { icon: '···', label: 'Boshqa', bg: '#F7F5FF', color: '#8B82C4' },
          ].map((a) => (
            <div key={a.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <div style={{
                width: 54, height: 54, borderRadius: 16, background: a.bg,
                border: '1px solid rgba(0,0,0,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: a.color, fontWeight: 700, cursor: 'pointer',
              }}>
                {a.icon}
              </div>
              <span style={{ fontSize: 11, color: '#8B82C4' }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ padding: '0 20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Bu oy tejash', value: '2.7M', color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Qarzlar', value: '500K', color: '#D97706', bg: '#FFFBEB' },
          { label: 'Berilgan', value: '200K', color: '#7C3AED', bg: '#F5F3FF' },
        ].map((s) => (
          <div key={s.label} style={{
            background: s.bg, borderRadius: 16, padding: '14px 12px',
            border: '1px solid rgba(0,0,0,0.04)',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: '#8B82C4', lineHeight: 1.3 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E1A3C' }}>So'nggi operatsiyalar</h3>
          <span style={{ fontSize: 13, color: '#7C3AED', fontWeight: 500 }}>Barchasi</span>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #E8E3F8',
            overflow: 'hidden',
          }}
        >
          {transactions.map((tx, i) => (
            <div
              key={tx.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px',
                borderBottom: i < transactions.length - 1 ? '1px solid #F3F0FF' : 'none',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 13, background: tx.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>
                {tx.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1E1A3C', marginBottom: 2 }}>{tx.name}</p>
                <p style={{ fontSize: 12, color: '#8B82C4' }}>{tx.time}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: tx.amount > 0 ? '#16A34A' : '#1E1A3C' }}>
                  {fmt(tx.amount)}
                </p>
                <p style={{ fontSize: 11, color: '#B8B0DC' }}>{tx.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
