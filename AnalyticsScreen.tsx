import type { OnboardingResult } from './Onboarding'

interface Props {
  onboarding?: OnboardingResult | null
}

const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl']
const spend = [1200, 980, 1450, 1100, 1600, 1350, 1800]
const income = [4200, 4200, 4500, 4200, 4500, 4500, 4500]
const maxV = Math.max(...spend, ...income)

const baseCats = [
  { name: 'Oziq-ovqat', amt: 630000, color: '#7C3AED' },
  { name: 'Transport', amt: 396000, color: '#A78BFA' },
  { name: "Ko'ngil ochar", amt: 270000, color: '#C4B5FD' },
  { name: 'Kommunal', amt: 216000, color: '#DDD6FE' },
  { name: 'Boshqa', amt: 288000, color: '#EDE9FE' },
]

const categoryNameMap: Record<string, string> = {
  Ovqat: 'Oziq-ovqat',
  Transport: 'Transport',
  Kiyim: 'Boshqa',
  Uy: 'Kommunal',
}

function fmtFull(n: number) {
  return n.toLocaleString('en-US').replace(/,/g, ' ')
}

export default function AnalyticsScreen({ onboarding }: Props) {
  const firstExpense = onboarding?.firstExpense
  const mappedCategory = firstExpense ? categoryNameMap[firstExpense.category] ?? 'Boshqa' : null

  const cats = baseCats.map((c) =>
    mappedCategory && c.name === mappedCategory
      ? { ...c, amt: c.amt + firstExpense!.amount }
      : c,
  )
  const totalCatAmt = cats.reduce((sum, c) => sum + c.amt, 0)
  const catsWithPct = cats.map((c) => ({ ...c, pct: Math.round((c.amt / totalCatAmt) * 100) }))

  const monthlySpend = 1800000 + (firstExpense?.amount ?? 0)
  const monthlyIncome = 4500000
  const monthlySavings = monthlyIncome - monthlySpend
  const goal = onboarding?.monthlyGoal ?? null
  const goalPct = goal ? Math.min(100, Math.round((monthlySavings / goal) * 100)) : null

  return (
    <div>
      <div style={{ height: 54 }} />

      <div style={{ padding: '4px 20px 24px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1E1A3C', letterSpacing: -0.5, marginBottom: 2 }}>Tahlil</h2>
        <p style={{ fontSize: 13, color: '#8B82C4' }}>Iyul 2026</p>
      </div>

      {/* Summary */}
      <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Daromad', val: '4.5M', sub: 'so\'m', color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Xarajat', val: '1.8M', sub: '+33% o\'tganga', color: '#DC2626', bg: '#FEF2F2' },
          { label: 'Tejash', val: '2.7M', sub: '60% daromad', color: '#7C3AED', bg: '#F5F3FF' },
          { label: 'Qarzlar', val: '500K', sub: 'to\'lanmagan', color: '#D97706', bg: '#FFFBEB' },
        ].map((c) => (
          <div key={c.label} style={{
            background: c.bg, borderRadius: 18, padding: '16px',
            border: '1px solid rgba(0,0,0,0.04)',
          }}>
            <p style={{ fontSize: 12, color: '#8B82C4', marginBottom: 8, fontWeight: 500 }}>{c.label}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: c.color, letterSpacing: -0.5, marginBottom: 2 }}>{c.val}</p>
            <p style={{ fontSize: 11, color: '#B8B0DC' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: '20px',
          border: '1px solid #E8E3F8',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E1A3C' }}>Daromad vs Xarajat</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ c: '#7C3AED', l: 'Daromad' }, { c: '#DDD6FE', l: 'Xarajat' }].map((x) => (
                <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: x.c }} />
                  <span style={{ fontSize: 11, color: '#8B82C4' }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 110 }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', width: '100%' }}>
                  <div style={{
                    flex: 1, height: `${(income[i] / maxV) * 100}px`,
                    background: '#7C3AED', borderRadius: '4px 4px 2px 2px', minHeight: 4,
                    opacity: i === 6 ? 1 : 0.6,
                  }} />
                  <div style={{
                    flex: 1, height: `${(spend[i] / maxV) * 100}px`,
                    background: '#DDD6FE', borderRadius: '4px 4px 2px 2px', minHeight: 4,
                  }} />
                </div>
                <span style={{ fontSize: 10, color: i === 6 ? '#7C3AED' : '#B8B0DC', fontWeight: i === 6 ? 600 : 400 }}>
                  {m}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal progress (from onboarding) */}
      {goal !== null && goalPct !== null && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{
            background: '#FFFFFF', borderRadius: 20, padding: '18px 20px',
            border: '1px solid #E8E3F8',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🎯</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1E1A3C' }}>Tejash maqsadi</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED' }}>{goalPct}%</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: '#F3F0FF', overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ width: `${goalPct}%`, height: '100%', background: '#7C3AED', borderRadius: 4, transition: 'width 0.3s ease' }} />
            </div>
            <p style={{ fontSize: 12, color: '#8B82C4' }}>
              {fmtFull(monthlySavings)} / {fmtFull(goal)} so'm
            </p>
          </div>
        </div>
      )}

      {/* Categories */}
      <div style={{ padding: '0 20px 24px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E1A3C', marginBottom: 14 }}>Xarajat tuzilmasi</h3>

        <div style={{ height: 8, borderRadius: 4, display: 'flex', overflow: 'hidden', marginBottom: 18 }}>
          {catsWithPct.map((c) => (
            <div key={c.name} style={{ width: `${c.pct}%`, background: c.color }} />
          ))}
        </div>

        <div style={{
          background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E3F8', overflow: 'hidden',
        }}>
          {catsWithPct.map((c, i) => (
            <div key={c.name} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px',
              borderBottom: i < catsWithPct.length - 1 ? '1px solid #F3F0FF' : 'none',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 14, color: '#1E1A3C', fontWeight: 500 }}>{c.name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1E1A3C' }}>
                {(c.amt / 1000).toFixed(0)}K
              </span>
              <span style={{ fontSize: 12, color: '#8B82C4', width: 34, textAlign: 'right' }}>{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI insight */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{
          background: '#F5F3FF', borderRadius: 18, padding: '18px',
          border: '1px solid #DDD6FE',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, background: '#EDE9FE',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>💡</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#5B21B6' }}>AI Tavsiya</span>
          </div>
          <p style={{ fontSize: 13, color: '#5B21B6', lineHeight: 1.65, opacity: 0.85 }}>
            Ko'ngil ochar xarajatlaringiz o'tgan oyga nisbatan 18% oshdi. Oylik 200 000 so'm limit qo'yish yiliga 2.4M so'm tejash imkonini beradi.
          </p>
        </div>
      </div>
    </div>
  )
}
