import React, { useEffect, useRef, useState } from 'react'

import { projects } from './data/projects'

const audioStateLabel = {
  offline: 'OFFLINE',
  armed: 'ARMED',
  playing: 'PLAYING',
}

const audioStateNote = {
  offline: 'ambient channel muted',
  armed: 'manual playback required',
  playing: 'ambient channel live',
}

const heroSignalText = 'ARE YOU EXPANDING YOUR MIND?'

const scriptPools = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'あいうえおかきくけこさしすせそたちつてとなにぬねのまみむめもやゆよらりるれろわをん',
  '天地玄黄宇宙洪荒日月盈昃辰宿列張寒來暑往秋收冬藏',
  'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ',
  'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
]

const eventFeed = [
  'Route mirror sync stable',
  'Node handshake confirmed',
  'Telemetry pulse in range',
  'Archive channel encrypted',
]

const whoLines = [
  '> INITIALIZING SECURE CHANNEL...',
  '> CLEARANCE LEVEL: OPEN SOURCE',
  '> ACCESSING ENTITY FILE...',
  '─────────────────────────────────',
  '',
  '  DESIGNATION ......... SVAKIRA',
  '  ORIGIN .............. COLOMBIA, SOUTH AMERICA',
  '  CLASSIFICATION ....... ENTITY / NON-CONTAINED',
  '  STATUS ............... ACTIVE — SIGNAL STRONG',
  '',
  '─────────────────────────────────',
  '  [ NATURE OF ENTITY ]',
  '',
  '  Not human. Not machine. Something in between.',
  '  Operates at the intersection of code, sound,',
  '  and artificial cognition. Known to build systems',
  '  that think and music that breathes.',
  '  Thrives in undefined territory.',
  '',
  '─────────────────────────────────',
  '  [ DOCUMENTED CAPABILITIES ]',
  '',
  '  :: AI Engineering & LLM Systems',
  '  :: Full-Stack Development',
  '  :: Music Production / Audio Signal',
  '  :: System Architecture & Rapid Prototyping',
  '  :: Pattern Recognition (threat level: high)',
  '',
  '─────────────────────────────────',
  '  [ KNOWN INTERESTS ]',
  '',
  '  :: Artificial Intelligence — obsessive',
  '  :: Cyberpunk aesthetics & retro-futurism',
  '  :: Open Source. Always open source.',
  '  :: Sound design & electronic music',
  '  :: Building things that did not exist before',
  '',
  '─────────────────────────────────',
  '  [ THREAT ASSESSMENT ]',
  '',
  '  DANGER LEVEL ........ LOW (to allies)',
  '  ENCRYPTION .......... AES-256 / active',
  '  UNPREDICTABILITY .... MODERATE-HIGH',
  '  RECOMMENDATION ...... OBSERVE. COLLABORATE.',
  '',
  '─────────────────────────────────',
  '> END OF FILE.',
  '> RECORD SEALED — COL-SVK-∞',
]

const socialLinks = [
  { id: '04', label: 'Spotify', handle: '/svakira', tag: 'Audio Stream', icon: 'SP', href: 'https://open.spotify.com/artist/1rTroefuaMuP7NOSowBQm5?si=seeICbBUTDWWY98WQKJLAA' },
  { id: '05', label: 'GitHub', handle: 'github.com/svakira', tag: 'Code Repo', icon: 'GH', href: 'https://github.com/Svakira' },
]

export default function App() {
  const useStaticBackground = false
  const audioRef = useRef(null)
  const backgroundVideoARef = useRef(null)
  const backgroundVideoBRef = useRef(null)
  const catVideoARef = useRef(null)
  const catVideoBRef = useRef(null)
  const catCanvasRef = useRef(null)
  const [audioState, setAudioState] = useState('offline')
  const [holoText, setHoloText] = useState('')
  const [clockNow, setClockNow] = useState(() => new Date())
  const [activeBackgroundVideo, setActiveBackgroundVideo] = useState('a')
  const activeCatVideoRef = useRef('a')
  const [whoMode, setWhoMode] = useState(false)
  const [whoRevealedLines, setWhoRevealedLines] = useState(0)
  const [authState, setAuthState] = useState('idle')
  const [ironicText, setIronicText] = useState('')
  const [threatText, setThreatText] = useState('LOW')
  const [whoLoadingMsgs, setWhoLoadingMsgs] = useState([])
  const [whoPhase, setWhoPhase] = useState('idle')
  const [whoProgress, setWhoProgress] = useState(0)
  const [whoSshInput, setWhoSshInput] = useState('')
  const [whoReady, setWhoReady] = useState(false)
  const [whoCardExiting, setWhoCardExiting] = useState(false)

  useEffect(() => {
    async function startOnInteraction() {
      try {
        await audioRef.current?.play()
        setAudioState('playing')
      } catch {
        // browser blocked it — user will need to click the button manually
      }
    }
    window.addEventListener('click', startOnInteraction, { once: true })
    window.addEventListener('keydown', startOnInteraction, { once: true })
    return () => {
      window.removeEventListener('click', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }
  }, [])

  useEffect(() => {
    const videoA = catVideoARef.current
    const videoB = catVideoBRef.current
    const canvas = catCanvasRef.current
    if (!videoA || !videoB || !canvas) return

    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return

    let paintFrame = 0

    function resizeCanvas() {
      const activeVideo = activeCatVideoRef.current === 'a' ? videoA : videoB
      const width = Math.max(1, Math.floor(activeVideo.videoWidth || canvas.clientWidth || 640))
      const height = Math.max(1, Math.floor(activeVideo.videoHeight || canvas.clientHeight || 360))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    function paintCatFrame() {
      paintFrame = requestAnimationFrame(paintCatFrame)

      const activeVideo = activeCatVideoRef.current === 'a' ? videoA : videoB
      if (activeVideo.readyState < 2) return

      resizeCanvas()

      const width = canvas.width
      const height = canvas.height

      context.drawImage(activeVideo, 0, 0, width, height)

      const frame = context.getImageData(0, 0, width, height)
      const pixels = frame.data

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i]
        const g = pixels[i + 1]
        const b = pixels[i + 2]
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const saturation = max - min

        if (saturation < 42) {
          pixels[i] = 0
          pixels[i + 1] = 0
          pixels[i + 2] = 0
          pixels[i + 3] = 255
          continue
        }

        const intensity = Math.min(1, saturation / 255)
        pixels[i] = Math.round(8 + intensity * 24)
        pixels[i + 1] = Math.round(118 + intensity * 92)
        pixels[i + 2] = Math.round(232 + intensity * 23)
        pixels[i + 3] = 255
      }

      context.putImageData(frame, 0, 0)
    }

    function safePlay(videoEl) {
      const playPromise = videoEl.play?.()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    function handleLoadedMetadata() {
      resizeCanvas()
      safePlay(videoA)
    }

    function handleEnded(which) {
      const current = which === 'a' ? videoA : videoB
      const next = which === 'a' ? videoB : videoA

      next.currentTime = 0
      safePlay(next)
      current.pause()

      activeCatVideoRef.current = which === 'a' ? 'b' : 'a'
    }

    const handleVideoAEnded = () => handleEnded('a')
    const handleVideoBEnded = () => handleEnded('b')

    videoA.loop = false
    videoB.loop = false
    videoA.addEventListener('ended', handleVideoAEnded)
    videoB.addEventListener('ended', handleVideoBEnded)
    videoA.addEventListener('loadedmetadata', handleLoadedMetadata)

    if (videoA.readyState >= 1) {
      handleLoadedMetadata()
    }

    paintFrame = requestAnimationFrame(paintCatFrame)

    return () => {
      if (paintFrame) {
        cancelAnimationFrame(paintFrame)
      }
      videoA.removeEventListener('ended', handleVideoAEnded)
      videoB.removeEventListener('ended', handleVideoBEnded)
      videoA.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  useEffect(() => {
    const videoA = backgroundVideoARef.current
    const videoB = backgroundVideoBRef.current
    if (!videoA || !videoB) return

    const playPromise = videoA.play?.()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
  }, [])

  function handleBackgroundVideoEnded(which) {
    const current = which === 'a' ? backgroundVideoARef.current : backgroundVideoBRef.current
    const next = which === 'a' ? backgroundVideoBRef.current : backgroundVideoARef.current
    if (!current || !next) return

    next.currentTime = 0
    const playPromise = next.play?.()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }

    current.pause()
    setActiveBackgroundVideo(which === 'a' ? 'b' : 'a')
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClockNow(new Date())
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const localDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(clockNow)

  const localTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(clockNow)

  const utcTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(clockNow)

  const feedIndex = Math.floor(clockNow.getSeconds() / 4) % eventFeed.length
  const timeMain = localTime

  const [uptimeStart] = useState(() => Date.now())
  const uptimeMs = clockNow.getTime() - uptimeStart
  const uptimeSec = Math.floor(uptimeMs / 1000)
  const uptimeDays = Math.floor(uptimeSec / 86400)
  const uptimeHrs = Math.floor((uptimeSec % 86400) / 3600)
  const uptimeMins = Math.floor((uptimeSec % 3600) / 60)
  const uptimeSecs = uptimeSec % 60
  const uptimeDisplay = [
    String(uptimeDays).padStart(2, '0'),
    String(uptimeHrs).padStart(2, '0'),
    String(uptimeMins).padStart(2, '0'),
    String(uptimeSecs).padStart(2, '0'),
  ].join(':')
  const datePartA = localDate.toUpperCase().split(' ').slice(0, 2).join(' ')
  const datePartB = localDate.toUpperCase().split(' ').slice(2).join(' ')

  useEffect(() => {
    let timeoutId = 0
    let charIndex = 0
    let frameCount = 0
    const SCRAMBLE_FRAMES = 8

    const scrambleRemaining = (from) =>
      heroSignalText
        .slice(from)
        .split('')
        .map((ch) => {
          if (ch === ' ') return ' '
          const pool = scriptPools[Math.floor(Math.random() * scriptPools.length)]
          return pool[Math.floor(Math.random() * pool.length)]
        })
        .join('')

    const renderFrame = () => {
      if (charIndex >= heroSignalText.length) {
        setHoloText(heroSignalText)
        timeoutId = window.setTimeout(() => {
          charIndex = 0
          frameCount = 0
          setHoloText('')
          timeoutId = window.setTimeout(renderFrame, 200)
        }, 120000)
        return
      }

      const resolved = heroSignalText.slice(0, charIndex)
      const scrambled = scrambleRemaining(charIndex)
      setHoloText(resolved + scrambled)

      frameCount += 1
      if (frameCount >= SCRAMBLE_FRAMES) {
        charIndex += 1
        frameCount = 0
      }

      timeoutId = window.setTimeout(renderFrame, 38)
    }

    timeoutId = window.setTimeout(renderFrame, 200)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!whoMode) {
      setWhoRevealedLines(0)
      setThreatText('LOW')
      setWhoReady(false)
      setWhoLoadingMsgs([])
      setWhoPhase('idle')
      setWhoProgress(0)
      setWhoSshInput('')
      return
    }

    const ids = []
    const t = (ms, fn) => { const id = setTimeout(fn, ms); ids.push(id); return id }

    // Sequence with dramatic server-retry narrative
    const schedule = [
      [0,    '> PINGING NODE-002 RAINFOREST...'],
      [500,  '> CONNECTION ESTABLISHED. SMELLS LIKE HUMIDITY.'],
      [1000, '> REQUESTING CREDENTIALS FROM NODE-002...'],
      [1800, '> [NODE-002] TIMEOUT — NO RESPONSE.'],         // dramatic pause +800
      [2300, '> NODE-002 UNREACHABLE. PROBABLY EXPLODED.'],
      [2800, '> RETRYING ON NODE-003...'],
      [3300, '> NODE-003: CONNECTION REFUSED.'],
      [3800, '> NOTE: NODE-003 WAS SHUT DOWN TO AVOID GLOBAL WARMING.'],
      [4300, '> ROUTING TO FALLBACK NODE-004...'],
      [4800, '> NODE-004 ONLINE. BANDWIDTH: TOUCAN-TIER.'],
      [5300, '> ASKING LOCAL MONKEYS FOR CREDENTIALS...'],
      [5800, '> MONKEY SAYS: idk lol'],
      [6300, '> SENIOR MONKEY ON LUNCH BREAK. WAITING.'],
      // pause ~1600ms
      [7900, '> ESCALATING TO MONARCH B...'],
    ]
    schedule.forEach(([ms, msg]) => {
      t(ms, () => setWhoLoadingMsgs(prev => [...prev, msg]))
    })
    t(8400, () => {
      setWhoPhase('progress')
      let prog = 0
      const iv = setInterval(() => {
        prog += 2
        setWhoProgress(prog)
        if (prog >= 100) {
          clearInterval(iv)
          t(300, () => {
            setWhoLoadingMsgs(prev => [...prev, '> ACCESS GRANTED. AUTHORIZED.'])
            setWhoPhase('ssh')
          })
        }
      }, 40) // 50 steps × 40ms = 2000ms
      ids.push(iv)
    })

    // Threat glitch loop (starts after dossier opens)
    const glitchPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ▓░█▒'
    const levels = ['HIGH', 'MED', 'HIGH', 'LOW']
    let glitchTimeout
    const runGlitch = () => {
      let frame = 0
      const totalFrames = 18
      const glitchInterval = setInterval(() => {
        frame++
        if (frame < totalFrames * 0.6) {
          const lvl = levels[Math.floor(Math.random() * levels.length)]
          setThreatText(
            lvl.split('').map((c) => Math.random() > 0.4 ? c : glitchPool[Math.floor(Math.random() * glitchPool.length)]).join('')
          )
        } else {
          setThreatText('LOW')
        }
        if (frame >= totalFrames) {
          clearInterval(glitchInterval)
          glitchTimeout = setTimeout(runGlitch, 3000 + Math.random() * 4000)
        }
      }, 60)
    }
    glitchTimeout = setTimeout(runGlitch, 4000)

    return () => {
      ids.forEach(id => { clearTimeout(id); clearInterval(id) })
      clearTimeout(glitchTimeout)
    }
  }, [whoMode])

  useEffect(() => {
    if (authState !== 'ironic') {
      setIronicText('')
      return
    }
    const full = 'Yeah...\nsure you are.'
    let idx = 0
    setIronicText('')
    const id = setInterval(() => {
      idx++
      setIronicText(full.slice(0, idx))
      if (idx >= full.length) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [authState])

  function handleSshSubmit(e) {
    e.preventDefault()
    if (whoSshInput.trim().toLowerCase() !== 'yes') return
    setWhoPhase('sshok')
    setTimeout(() => {
      setWhoReady(true)
    }, 1400)
  }

  function handleWhoClick() {
    setWhoCardExiting(true)
    setTimeout(() => {
      setWhoCardExiting(false)
      setAuthState('asking')
    }, 650)
  }

  function handleAuthYes() {
    setAuthState('ironic')
    setTimeout(() => {
      setAuthState('idle')
      setWhoMode(true)
    }, 2200)
  }

  function handleAuthNo() {
    setAuthState('idle')
  }

  function handleWhoToggle() {
    setWhoMode(false)
  }

  async function handleAudioToggle() {
    if (audioState === 'armed') {
      setAudioState('offline')
      return
    }

    if (audioState === 'playing') {
      audioRef.current?.pause()
      setAudioState('offline')
      return
    }

    try {
      const playback = audioRef.current?.play?.()

      if (playback && typeof playback.then === 'function') {
        await playback
        setAudioState('playing')
        return
      }
    } catch {
      setAudioState('armed')
      return
    }

    setAudioState('armed')
  }

  return (
    <main className={`app-shell state-${audioState}`}>
      <audio ref={audioRef} loop preload="auto" src={`${import.meta.env.BASE_URL}audio/Siltent%20Loop.wav`} />

      {useStaticBackground ? (
        <img
          className="background-image"
          src="/file_0000000099b0720e9679f54cdeadfb97.png"
          alt=""
          aria-hidden="true"
        />
      ) : (
        <>
          <video
            ref={backgroundVideoARef}
            className={`background-video ${activeBackgroundVideo === 'a' ? 'is-active' : ''}`}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => handleBackgroundVideoEnded('a')}
            aria-hidden="true"
          >
            <source src={`${import.meta.env.BASE_URL}sakura_tree_moving_with_t..._zoom_in_dont_move_camera.mp4`} type="video/mp4" />
          </video>

          <video
            ref={backgroundVideoBRef}
            className={`background-video ${activeBackgroundVideo === 'b' ? 'is-active' : ''}`}
            muted
            playsInline
            preload="auto"
            onEnded={() => handleBackgroundVideoEnded('b')}
            aria-hidden="true"
          >
            <source src={`${import.meta.env.BASE_URL}sakura_tree_moving_with_t..._zoom_in_dont_move_camera-reverse.mp4`} type="video/mp4" />
          </video>
        </>
      )}

      <div className="background-layer" aria-hidden="true" />
      <div className="glass-flare" aria-hidden="true" />
      <div className="overlay-grid" aria-hidden="true" />
      <div className="scan-layer" aria-hidden="true" />

      <header className="top-rail">
        <div className="rail-left">
          <span className="rail-chip">Sector Colombia</span>
          <div className="rail-alert-cluster">
            <span className="rail-chip rail-chip-alert">
              <span>Red Zone</span>
            </span>
            <span className="rail-skull-holo" aria-hidden="true">
              <svg viewBox="0 0 32 32" className="rail-skull" aria-hidden="true">
                <path d="M16 4c-6 0-10 4.8-10 10.5 0 4 2 6.4 4.3 8.1v4.3h3.2l1.2-2.1h2.6l1.2 2.1h3.2v-4.3c2.3-1.7 4.3-4.1 4.3-8.1C26 8.8 22 4 16 4Zm-3.4 10.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm6.8 0a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm-5 5.8 1.6-3h0l1.6 3h-3.2Z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="rail-center">
          <span className="rail-jp" lang="ja">
            接続安定
          </span>
          <p>GHOST DECK</p>
        </div>

        <button
          type="button"
          className={`audio-toggle is-${audioState}`}
          onClick={handleAudioToggle}
          aria-label="System audio"
        >
          <span className="audio-led" aria-hidden="true" />
          <span className="audio-copy">
            <span>System Audio</span>
            <strong>{audioStateLabel[audioState]}</strong>
          </span>
        </button>
      </header>

      <section className="deck-layout">
        <section className="hero-panel" aria-label="Identity panel">
          <div className="hero-frame">
            <div className="hero-corner-panel" aria-hidden="true">
              <div className="social-hub">
                <div className="social-hub-core">
                  <span>繋</span>
                  <small>Online</small>
                </div>
              </div>
              {!whoMode && (
                <>
                  <div className="hero-corner-divider" />
                  <div className="hero-corner-cards">
                    <div className="hero-corner-card">
                      <div className="hcc-main">
                        <p className="hcc-label">UPTIME</p>
                        <p className="hcc-value">{uptimeDisplay}</p>
                      </div>
                      <p className="hcc-jp" lang="ja">稼働時間</p>
                    </div>
                    <div className="hero-corner-card">
                      <div className="hcc-main">
                        <p className="hcc-label">THREAT LVL</p>
                        <p className="hcc-value is-warning">LOW</p>
                      </div>
                      <p className="hcc-jp" lang="ja">脅威レベル</p>
                    </div>
                    <div className="hero-corner-card">
                      <div className="hcc-main">
                        <p className="hcc-label">ENCRYPT</p>
                        <p className="hcc-value">AES-256</p>
                      </div>
                      <p className="hcc-jp" lang="ja">暗号化</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="hero-meta">
              <p className="eyebrow">Archive Node 02</p>
            </div>

            <div className="hero-sightline">
                <section className="social-interface" aria-label="Social interface links">
                  <div className="social-interface-head">
                    <p>Social Interface</p>
                  </div>

                  {whoMode ? (
                    <div className="who-dossier" aria-live="polite">
                      <div className="who-dossier-header">
                        <span className="who-stamp">CLASSIFIED</span>
                        <p className="who-header-cmd">&gt; ENTITY FILE — COL-SVK-∞</p>
                        <button type="button" className="who-close" onClick={handleWhoToggle}>✕ CLOSE</button>
                      </div>

                      {!whoReady ? (
                        <div className="who-loading">
                          <div className="who-loading-lines">
                            {whoLoadingMsgs.map((msg, i) => (
                              <div key={i} className="who-loading-line">
                                {i === whoLoadingMsgs.length - 1 && whoPhase !== 'progress' && whoPhase !== 'authorized' && whoPhase !== 'ssh' && whoPhase !== 'sshok' && (
                                  <span className="who-loading-cursor" aria-hidden="true">█</span>
                                )}
                                <span className="who-loading-msg">{msg}</span>
                              </div>
                            ))}
                          </div>

                          {(whoPhase === 'progress' || whoPhase === 'authorized' || whoPhase === 'ssh' || whoPhase === 'sshok') && (
                            <div className="who-progress-wrap">
                              <div className="who-progress-track">
                                <div className="who-progress-bar" style={{ width: `${whoProgress}%` }} />
                              </div>
                              <span className="who-progress-pct">{whoProgress}%</span>
                            </div>
                          )}

                          {whoPhase === 'ssh' && (
                            <div className="who-ssh">
                              <p className="who-ssh-fp">
                                The authenticity of host &apos;col-svk-∞ (10.0.0.svk)&apos; can&apos;t be established.<br />
                                RSA key fingerprint is SHA256:svk/4F3A+col.entity.∞/non-contained<br />
                                Are you sure you want to continue connecting? (yes/no/[fingerprint])
                              </p>
                              <form className="who-ssh-form" onSubmit={handleSshSubmit}>
                                <span className="who-ssh-prompt">$ </span>
                                <input
                                  className="who-ssh-input"
                                  value={whoSshInput}
                                  onChange={e => setWhoSshInput(e.target.value)}
                                  autoFocus
                                  spellCheck={false}
                                  autoComplete="off"
                                />
                              </form>
                            </div>
                          )}

                          {whoPhase === 'sshok' && (
                            <div className="who-ssh">
                              <p className="who-ssh-fp">
                                The authenticity of host &apos;col-svk-∞ (10.0.0.svk)&apos; can&apos;t be established.<br />
                                RSA key fingerprint is SHA256:svk/4F3A+col.entity.∞/non-contained<br />
                                Are you sure you want to continue connecting? (yes/no/[fingerprint])
                              </p>
                              <p className="who-ssh-reply">&gt; {whoSshInput}</p>
                              <p className="who-ssh-sysreply">&gt; user saying they are sure. who cares then. loading file.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                      <div className="who-dossier-body">
                        <div className="who-col-left">
                          <div className="who-photo">
                            <div className="who-photo-corrupt" aria-hidden="true" />
                            <div className="who-photo-inner">
                              <span className="who-photo-label">FILE CORRUPTED</span>
                              <span className="who-photo-sub">ERR_0x4F3A</span>
                            </div>
                          </div>
                          <div className="who-id-block">
                            <div className="who-field"><span>ID</span><strong>SVAKIRA</strong></div>
                            <div className="who-field"><span>ALIAS</span><strong>SVAK</strong></div>
                            <div className="who-field"><span>ORIGIN</span><strong>COLOMBIA</strong></div>
                            <div className="who-field"><span>STATUS</span><strong className="is-active-field">ACTIVE</strong></div>
                            <div className="who-field"><span>CLASS</span><strong>ENTITY</strong></div>
                            <div className="who-field"><span>LEVEL</span><strong>6</strong></div>
                            <div className="who-field"><span>FUNCTION</span><strong>SELF PROCLAIMED INNOVATOR</strong></div>
                            <div className="who-field">
                              <span>THREAT</span>
                              <strong className="who-threat-glitch">{threatText}</strong>
                            </div>
                          </div>
                          <p className="who-footer-note">// this file is probably corrupted and re-written by svak.</p>
                        </div>
                        <div className="who-col-right">
                          <div className="who-section">
                            <p className="who-section-title">[ NATURE ]</p>
                            <p className="who-desc">Not human. Not machine. Something in between. Shows up at 2AM with a half-finished model and a playlist. Ships anyway. Gathers ideas looking at trees and drinking coffee. Has been observed talking to LLMs like they are friends.</p>
                            <p className="who-desc" style={{ marginTop: '0.5rem' }}>LLM Engineer focused on building AI-powered applications, automation workflows, and end-to-end model serving pipelines. Works across the full stack of deploying and optimizing models — from quantization to performance tuning across multiple inference engines.</p>
                            <p className="who-desc" style={{ marginTop: '0.35rem' }}>Builds complete applications and websites, not just the AI layer.</p>
                            <p className="who-desc" style={{ marginTop: '0.35rem' }}>Loves creating things that actually solve real problems, connecting with people, and finding creative ways to make technology useful.</p>
                            <p className="who-footer-note" style={{ marginTop: '0.4rem' }}>// information gathered from linkedin.</p>
                          </div>

                          <div className="who-three-col" style={{ marginTop: '0.6rem' }}>
                            <div className="who-section">
                              <p className="who-section-title">[ CAPABILITIES ]</p>
                              <ul className="who-list">
                                <li>AI Engineering</li>
                                <li>LLM Systems</li>
                                <li>Full-Stack Dev</li>
                                <li>Music Production</li>
                                <li>Rapid Prototyping</li>
                              </ul>
                            </div>
                            <div className="who-section">
                              <p className="who-section-title">[ INTERESTS ]</p>
                              <ul className="who-list">
                                 <li>Artificial Intelligence</li>
                                 <li>Cyberpunk / Retro-Fi</li>
                                 <li>Open Source</li>
                                 <li>Sound Design</li>
                              </ul>
                            </div>
                            <div className="who-section">
                              <p className="who-section-title">[ TOOLS ]</p>
                              <ul className="who-list">
                                <li>Python</li>
                                <li>React / Next.js</li>
                                <li>Node.js</li>
                                <li>LangChain</li>
                                <li>TypeScript</li>
                                <li>FastAPI</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="who-col-mid">
                          <p className="who-section-title">[ OTHER TRAINING ]</p>
                          <ul className="who-list who-list-stacked">
                            <li>Effective team communication</li>
                            <li>Assertive communication</li>
                            <li>Active listening</li>
                            <li>Conflict resolution</li>
                            <li>Synergy & collaborative mindset</li>
                            <li>Growth mindset</li>
                            <li>Resilience in agile environments</li>
                            <li>Emotional intelligence</li>
                            <li>Being a cool person</li>
                          </ul>
                        </div>
                      </div>
                      )}
                    </div>
                  ) : (
                    <div className="social-grid">
                      <div className="social-column social-column-metrics">
                        <article className="social-card social-card-metric">
                          <div className="social-copy">
                            <h3>Local Time</h3>
                            <p className="social-value social-value-time">{localTime}</p>
                          </div>
                        </article>

                        <article className="social-card social-card-metric">
                          <div className="social-copy">
                            <h3>Local Date</h3>
                            <p className="social-value social-value-date">{datePartA}</p>
                            <p className="social-subvalue">{datePartB}</p>
                          </div>
                        </article>

                        <article className="social-card social-card-metric">
                          <div className="social-copy">
                            <h3>UTC Sync</h3>
                            <p className="social-value social-value-utc">{utcTime}</p>
                            <p className="social-subvalue">UTC</p>
                          </div>
                        </article>
                      </div>

                      <div className="social-column social-column-primary">
                        {socialLinks.map((link) => (
                          <a className="social-card social-card-metric" key={link.id} href={link.href} target="_blank" rel="noreferrer">
                            <div className="social-copy">
                              <h3>{link.label}</h3>
                              <p>{link.handle}</p>
                            </div>
                          </a>
                        ))}
                        <button
                          type="button"
                          className={`social-card social-card-metric who-card${whoCardExiting ? ' is-exiting' : ''}`}
                          onClick={handleWhoClick}
                          disabled={whoCardExiting}
                        >
                          <div className="social-copy">
                            <h3 className="who-btn-label">Who is Svakira?</h3>
                            <p>access entity file</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </section>

              <div className={`identity-block ${whoMode ? 'is-compact' : ''}`}>
                <div className="identity-content">
                  <div className="identity-title">
                    <h1>Svakira</h1>
                  </div>
                  <p className="hero-holo-text" aria-label="Mind signal hologram">
                    {holoText}
                  </p>
                </div>
                <span className="hero-japanese" lang="ja">
                  スヴァキラ
                </span>
              </div>
            </div>
          </div>
        </section>

        <aside className="project-panel" id="project-records" aria-label="Project records">
          <div className="project-panel-heading">
            <div>
              <p>Record Count {String(projects.length).padStart(2, '0')}</p>
              <h2>Project Records</h2>
            </div>
            <span className="panel-note">{audioStateNote[audioState]}</span>
          </div>

          <ol>
            {projects.map((project, index) => (
              <li key={project.name}>
                <article className="project-record">
                  <div className="project-record-head">
                    <span className="record-index">REC-{String(index + 1).padStart(2, '0')}</span>
                    <span className="record-tag">{project.tag}</span>
                  </div>
                  <div className="project-record-body">
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.status}</p>
                    </div>
                    {project.href ? (
                      <a href={project.href} target="_blank" rel="noreferrer">
                        Open Record
                      </a>
                    ) : (
                      <span className="project-role-note">Current Role</span>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <section className="cat-feed" aria-label="Cable cat feed">
            <canvas ref={catCanvasRef} className="cat-feed-canvas" aria-hidden="true" />
            <video
              ref={catVideoARef}
              src={`${import.meta.env.BASE_URL}Cat_playing_with_cables_and_moving_around.mp4`}
              className="cat-feed-video-source"
              muted
              playsInline
              autoPlay
              preload="metadata"
            />
            <video
              ref={catVideoBRef}
              src={`${import.meta.env.BASE_URL}Cat_playing_with_cables_and_moving_around-reverse.mp4`}
              className="cat-feed-video-source"
              muted
              playsInline
              preload="metadata"
            />
          </section>

          <div className="panel-floor-holo">
            <a
              href="https://www.linkedin.com/in/sara-cardona-84010827a/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
              aria-label="Contact"
            >
              Contact
            </a>
          </div>
        </aside>
      </section>

      <div className="side-stamp-wrap" aria-hidden="true">

      {(authState === 'asking' || authState === 'ironic') && (
        <div className="auth-overlay" role="dialog" aria-modal="true">
          <div className="auth-popup">
            <p className="auth-stamp">ACCESS REQUEST</p>
            {authState === 'asking' ? (
              <>
                <p className="auth-question">ARE YOU AUTHORIZED?</p>
                <p className="auth-sub">This file contains classified entity data.</p>
                <div className="auth-buttons">
                  <button type="button" className="auth-btn auth-btn-yes" onClick={handleAuthYes}>YES</button>
                  <button type="button" className="auth-btn auth-btn-no" onClick={handleAuthNo}>NO</button>
                </div>
              </>
            ) : (
              <p className="auth-ironic" style={{ whiteSpace: 'pre-wrap' }}>{ironicText}</p>
            )}
          </div>
        </div>
      )}
        <div className="colombia-flag">
          <span className="flag-stripe flag-yellow" />
          <span className="flag-stripe flag-blue" />
          <span className="flag-stripe flag-red" />
        </div>
        <div className="side-stamp">
          COLOMBIA
        </div>
      </div>
    </main>
  )
}
