'use client'

import { useState, useEffect, useRef } from 'react'
import { Instagram, Send, Youtube, Linkedin, ExternalLink, Heart, Stethoscope, Trophy, BookOpen, Users, GraduationCap, Star, ChevronDown, ChevronUp } from 'lucide-react'

type IconKey = 'instagram' | 'telegram' | 'youtube' | 'linkedin'
type IconComponent = React.ComponentType<{ size?: number; className?: string }>

export default function PremiumMedicalCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  const [profile] = useState({
    name: 'Юлдошев Набижон Пиримович',
    bio: 'Олий тоифали шифокор. Тиббиёт фанлари доктори, "Европа Кардиологлар Жамияти" аъзоси (ESC)',
    image: './logo.jpg',
    logo: './klinika.jpg',
    socialLinks: [
      { id: 1, platform: 'Инстаграм', url: 'https://www.instagram.com/soglom_hayot_klinikasi?igsh=bnhrY2o3M3VmMmc=', icon: 'instagram' as IconKey },
      { id: 2, platform: 'Телеграм', url: 'https://t.me/SoglomHayot2022klinika', icon: 'telegram' as IconKey },
      { id: 3, platform: 'Локатция', url: 'https://yandex.ru/maps/-/CLGLrXiP', icon: 'youtube' as IconKey }
    ]
  })

  const iconMap: Record<IconKey, IconComponent> = {
    instagram: Instagram,
    telegram: Send,
    youtube: Youtube,
    linkedin: Linkedin,
  }

  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    
    const handleMove = (event: Event) => {
      if (!(event instanceof PointerEvent)) return
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height
      el.style.setProperty('--rx', `${-y * 8}deg`)
      el.style.setProperty('--ry', `${x * 10}deg`)
      el.style.setProperty('--tz', `${Math.max(0, 12 - Math.hypot(x * 100, y * 100) / 8)}px`)
    }
    
    const handleLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--tz', '6px')
    }
    
    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-lg transform-gpu"
        style={{ perspective: '1000px' }}
      >
        <div className="card-3d bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/12 p-2">
                <Stethoscope size={22} />
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-white p-1 flex items-center justify-center shadow">
              <img src={profile.logo || "/placeholder.svg"} alt="logo" className="object-contain w-full h-full rounded-full" />
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 pt-6">
            <div className="flex justify-center -mt-20">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                  <img src={profile.image || "/placeholder.svg"} alt={profile.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h1 className="text-xl font-semibold text-gray-800">{profile.name}</h1>
              <p className="text-sm text-indigo-600 font-medium mt-1 flex items-center justify-center gap-2">
                {profile.bio}
              </p>
            </div>

            <div className="mt-0 grid grid-cols-3 gap-3">
              {[
                { label: 'Умумий меҳнат стажи', value: '27 йил' , icon: Trophy},
                { label: 'Илмий ишлар', value: '250+' , icon: BookOpen},
                { label: 'Мастер-класслар', value: '100+' , icon: Star},
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-lg p-1 border border-gray-100 text-center shadow-sm">
                  <div className="w-7 h-9 rounded-lg bg-indigo-50 mx-auto flex items-center justify-center mb-2">
                    <s.icon size={16} className="text-indigo-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Expandable section */}
            <div className="mt-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between gap-3 p-4 rounded-lg bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <h2 className="text-sm font-semibold text-gray-800">Юлдошев Набижон Пиримович ҳақида</h2>
                    <p className="text-xs text-gray-500">Кўпроқ маълумот олиш учун тугмани босинг</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              <div className={`transition-all duration-400 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1200px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-3">

                  {[
                    {
                      text: 'Тиббиёт фанлари доктори. ЎзЛиДеП ДЕПУТАТИ.  2015 йилда "Ўзбекистон Республикасида хизмат кўрсатган соғлиқни сақлаш ходими" унвони билан мукофотланган. Умумий меҳнат стажи 27 йил'
                    },
                    {
                      text: `Олий тоифали шифокор. Тиббиёт фанлари доктори, Европа Кардиологлар Жамияти аъзоси (ESC). 
Республика ҳукумати томонидан олиб борилаётган ислоҳотларни қўллаб-қувватлайди ҳамда ўз иш фаолияти давомида уларни тарғиб қилади. 
Набижон Пиримович мамлакатимизда биринчи бўлиб Польша Республикасида орттирилган тажриба асосида юрак ишемик касаллигини даволашда биосўрилувчан каркасларни қўллашни амалиётини тадбиқ этди.`
                    },
                    {
                      text: ' 2016 йилда Швейцариянинг Цюрих шаҳри Klinik im Park, Hirslanden Group клиникасида малака оширишда бўлиб қайтди. Ушбу клиникада  ёши улуғ хамда кардиохирургик амалиётга қарши кўрсатмалар бўлган холларда аортал клапани торайишли беморларни даволашнинг энг замонавий усулини, яъни "Тери орқали аортал клапан имплантацияси – TAVI" жарроҳлик амалиётини ўзлаштириб келди'
                    },
                    {
                      text: '   2020 йилда Юлдошев Набижон Пиримович  Ўзбекистон Республикаси соғлиқни сақлаш вазирлигининг 23 ноябр кунидаги 488 сонли буйруғига асосан Республика ихтисослаштирилган кардиология илмий амалий тиббиёт маркази Қарши филиали директори лавозимида ишлаб келмоқда'
                    },
                    {
                      text: `2021 йил давомида 20та марказ ходимларини агетация килиб УзЛиДеп партиясига аъзоликда актив иштирок этди. 
  2018 йилдан хозирга кадар  Юлдошев Набижон Пиримович раҳбарлигида 4 та тиббиёт йўналишидаги фалсафа доктори диссертацияси мувафаққиятли ҳимоя қилинди. Ҳозирги кунда 1 та фалсафа докторига талабгорлик диссертацияларини бўйича илмий ишлар олиб борилмоқда.   
Унинг томонидан 250 дан ортиқ илмий ишлар чоп этилган ва Республика интеллектуал мулк Агентлиги томонидан 1 та ихтиро учун патент  олинган. Юлдошев Н.П. халқаро илмий конгресс ва форумларда (Хитой, Польша, АҚШ,  Англия, Франция, Россия давлатлар) ўз маърузалари билан қатнашиб келмоқда. 
2018 йилдан бери  Олий Аттестацион комиссия таркибида хам химоя, хам илмий семинарда аъзо сифатида иштирок этиб  келмокда.`
                    }
                  ].map((it, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                          <GraduationCap size={16} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mt-1">{it.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-[1px] bg-gray-200"></div>
                <p className="text-sm font-semibold text-gray-700">Ижтимоий тармоқлар</p>
                <div className="flex-1 h-[1px] bg-gray-200"></div>
              </div>

              <div className="space-y-3">
                {profile.socialLinks.map((link) => {
                  const IconComponent = iconMap[link.icon] || ExternalLink
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:shadow transition"
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <IconComponent size={18} className="text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800">{link.platform}</p>
                      </div>
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center border">
                        <ExternalLink size={14} />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .card-3d {
          --rx: 0deg;
          --ry: 0deg;
          --tz: 6px;
          transition: transform 220ms cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 220ms;
          transform-style: preserve-3d;
          transform: translateZ(var(--tz)) rotateX(var(--rx)) rotateY(var(--ry));
        }
        .card-3d:hover {
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
        }
      `}</style>
    </main>
  )
}
