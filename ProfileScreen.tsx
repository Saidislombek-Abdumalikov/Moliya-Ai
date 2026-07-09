interface Props {
  onLogout: () => void
}

const menuSections = [
  {
    title: 'Hisob',
    items: [
      { icon: '🔔', label: 'Bildirishnomalar', sub: 'Hammasi yoqilgan' },
      { icon: '🔒', label: 'Xavfsizlik', sub: 'Face ID, PIN' },
      { icon: '💳', label: "To'lov usullari", sub: "2 ta karta" },
    ],
  },
  {
    title: 'Ilova',
    items: [
      { icon: '🌐', label: 'Til', sub: "O'zbek" },
      { icon: '📊', label: 'Hisobot eksport', sub: 'PDF, Excel' },
      { icon: '❓', label: 'Yordam', sub: '24/7' },
    ],
  },
]

export default function ProfileScreen({ onLogout }: Props) {
  return (
    <div>
      <div style={{ height: 54 }} />

      <div style={{ padding: '4px 20px 24px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1E1A3C', letterSpacing: -0.5 }}>Profil</h2>
      </div>

      {/* User card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: '#FFFFFF', borderRadius: 22, padding: '20px',
          border: '1px solid #E8E3F8',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20, background: '#EDE9FE',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#7C3AED', flexShrink: 0,
          }}>
            JT
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1E1A3C', marginBottom: 3 }}>Jasur Toshmatov</h3>
            <p style={{ fontSize: 13, color: '#8B82C4', marginBottom: 2 }}>+998 90 123 45 67</p>
            <p style={{ fontSize: 12, color: '#B8B0DC' }}>jasur@moliya.uz</p>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 11, background: '#F7F5FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #E8E3F8', cursor: 'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11 2L14 5L5.5 13.5L2 14L2.5 10.5L11 2Z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { val: '3', label: 'Oy' },
          { val: '247', label: 'Tranzaksiya' },
          { val: '98', label: 'AI savol' },
        ].map((s) => (
          <div key={s.label} style={{
            background: '#FFFFFF', borderRadius: 16, padding: '14px 12px', textAlign: 'center',
            border: '1px solid #E8E3F8',
          }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>{s.val}</p>
            <p style={{ fontSize: 11, color: '#8B82C4' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Premium */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: '#7C3AED', borderRadius: 20, padding: '18px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -24, right: -24, width: 100, height: 100,
            borderRadius: '50%', background: 'rgba(255,255,255,0.07)',
          }} />
          <div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>Joriy tarif</p>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 2 }}>Bepul</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>10/50 AI savol</p>
          </div>
          <button style={{
            padding: '10px 16px', borderRadius: 12, border: 'none',
            background: 'rgba(255,255,255,0.15)', color: '#fff',
            fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
          }}>
            Premium →
          </button>
        </div>
      </div>

      {/* Menu sections */}
      {menuSections.map((section) => (
        <div key={section.title} style={{ padding: '0 20px 16px' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#B8B0DC', marginBottom: 10, letterSpacing: 0.4 }}>
            {section.title.toUpperCase()}
          </p>
          <div style={{
            background: '#FFFFFF', borderRadius: 20, border: '1px solid #E8E3F8', overflow: 'hidden',
          }}>
            {section.items.map((item, i) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                borderBottom: i < section.items.length - 1 ? '1px solid #F3F0FF' : 'none',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#1E1A3C' }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: '#8B82C4' }}>{item.sub}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3L9 7L5 11" stroke="#C4BDE8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div style={{ padding: '4px 20px 40px' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%', padding: '14px', borderRadius: 16,
            border: '1px solid #FEE2E2', background: '#FEF2F2',
            color: '#DC2626', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          Chiqish
        </button>
      </div>
    </div>
  )
}
