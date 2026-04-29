import React, { useEffect, useRef, useState } from 'react'
import { HexGrid, Hexagon, Layout, Text } from 'react-hexgrid'

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

export default function App() {
  const audioRef = useRef(null)
  const catVideoRef = useRef(null)
  const [audioState, setAudioState] = useState('offline')
  const [holoText, setHoloText] = useState('')
  const [clockNow, setClockNow] = useState(() => new Date())

  useEffect(() => {
    const video = catVideoRef.current
    if (!video) return

    let reverseFrame = 0
    let reversing = false

    function stopReverse() {
      reversing = false
      if (reverseFrame) {
        cancelAnimationFrame(reverseFrame)
        reverseFrame = 0
      }
    }

    function safePlay() {
      const playPromise = video.play?.()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    function playForward() {
      stopReverse()
      video.playbackRate = 1
      safePlay()
    }

    function playBackwardFallback() {
      stopReverse()
      reversing = true
      video.pause()
      let lastTime = 0

      const step = (now) => {
        if (!reversing) return

        if (!lastTime) {
          lastTime = now
        }

        const deltaSeconds = Math.min(0.05, (now - lastTime) / 1000)
        lastTime = now

        const nextTime = Math.max(0, video.currentTime - deltaSeconds)
        video.currentTime = nextTime

        if (nextTime <= 0.03) {
          video.currentTime = 0
          playForward()
          return
        }

        reverseFrame = requestAnimationFrame(step)
      }

      reverseFrame = requestAnimationFrame(step)
    }

    function handleEnded() {
      playBackwardFallback()
    }

    function handleLoadedMetadata() {
      if (video.currentTime <= 0.01) {
        playForward()
      }
    }

    video.loop = false
    video.addEventListener('ended', handleEnded)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    if (video.readyState >= 1) {
      handleLoadedMetadata()
    }

    return () => {
      stopReverse()
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

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
  const datePartA = localDate.toUpperCase().split(' ').slice(0, 2).join(' ')
  const datePartB = localDate.toUpperCase().split(' ').slice(2).join(' ')

  useEffect(() => {
    let timeoutId = 0
    let charIndex = 0
    let scriptIndex = 0

    const renderFrame = () => {
      if (charIndex >= heroSignalText.length) {
        setHoloText(heroSignalText)
        timeoutId = window.setTimeout(() => {
          charIndex = 0
          scriptIndex = 0
          setHoloText('')
          timeoutId = window.setTimeout(renderFrame, 180)
        }, 1300)
        return
      }

      const targetChar = heroSignalText[charIndex]

      if (targetChar === ' ') {
        charIndex += 1
        scriptIndex = 0
        setHoloText(heroSignalText.slice(0, charIndex))
        timeoutId = window.setTimeout(renderFrame, 28)
        return
      }

      const pool = scriptPools[scriptIndex]
      const randomGlyph = pool[Math.floor(Math.random() * pool.length)]
      const assembled =
        `${heroSignalText.slice(0, charIndex)}${randomGlyph}` + ' '.repeat(heroSignalText.length - charIndex - 1)

      setHoloText(assembled)

      scriptIndex += 1

      if (scriptIndex >= scriptPools.length) {
        charIndex += 1
        scriptIndex = 0
      }

      timeoutId = window.setTimeout(renderFrame, 36)
    }

    timeoutId = window.setTimeout(renderFrame, 180)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

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
      <audio ref={audioRef} loop preload="none" src="/audio/signal-deck-ambient.mp3" />

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
            <div className="hero-meta">
              <p className="eyebrow">Archive Node 02</p>
              <span className="hero-secondary">Primary User</span>
            </div>

            <div className="hero-sightline">
              <aside className="ops-panel" aria-label="Control telemetry">
                <HexGrid className="ops-hexgrid" viewBox="-92 -84 184 168">
                  <Layout size={{ x: 20.5, y: 20.5 }} spacing={1.08} origin={{ x: -6, y: -6 }}>
                    <Hexagon q={-2} r={-1} s={3} className="hex-main hex-main-date">
                      <Text y={-4.7} className="hex-k">
                        LOCAL DATE
                      </Text>
                      <Text y={0.1} className="hex-v">
                        {datePartB}
                      </Text>
                    </Hexagon>

                    <Hexagon q={-2} r={0} s={2} className="hex-main hex-main-date hex-main-date-lower">
                      <Text y={0.2} className="hex-v">
                        {datePartA}
                      </Text>
                    </Hexagon>

                    <Hexagon q={0} r={-1} s={1} className="hex-main hex-main-time">
                      <Text y={-6.6} className="hex-k">
                        LOCAL TIME
                      </Text>
                      <Text y={2.1} className="hex-time">
                        {timeMain}
                      </Text>
                    </Hexagon>

                    <Hexagon q={1} r={-2} s={1} className="hex-small">
                      <Text y={-1.2} className="hex-v">{utcTime}</Text>
                      <Text y={4.3} className="hex-k">UTC</Text>
                    </Hexagon>
                    <Hexagon q={1} r={-1} s={0} className="hex-small">
                      <Text y={-1.2} className="hex-v">19 MS</Text>
                      <Text y={4.3} className="hex-k">PING</Text>
                    </Hexagon>
                    <Hexagon q={1} r={0} s={-1} className="hex-small">
                      <Text y={-1.2} className="hex-v">36 C</Text>
                      <Text y={4.3} className="hex-k">TEMP</Text>
                    </Hexagon>
                    <Hexagon q={1} r={1} s={-2} className="hex-small hex-feed">
                      <Text y={-1.2} className="hex-v">{eventFeed[feedIndex].split(' ').slice(0, 2).join(' ').toUpperCase()}</Text>
                      <Text y={2.1} className="hex-v">{eventFeed[feedIndex].split(' ').slice(2, 3).join(' ').toUpperCase()}</Text>
                      <Text y={4.8} className="hex-k">FEED</Text>
                    </Hexagon>
                  </Layout>
                </HexGrid>
              </aside>
            </div>

            <div className="identity-block">
              <div className="identity-title">
                <h1>Svakira</h1>
                <span className="hero-japanese" lang="ja">
                  スヴァキラ
                </span>
              </div>
              <p className="hero-holo-text" aria-label="Mind signal hologram">
                {holoText}
              </p>
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
            <video
              ref={catVideoRef}
              src="/Cat_playing_with_cables_and_moving_around.mp4"
              className="cat-feed-video"
              muted
              playsInline
              autoPlay
              preload="metadata"
            />
          </section>

          <div className="panel-floor-holo">
            <button type="button" className="contact-button" aria-label="Contactar">
              Contactar
            </button>
          </div>
        </aside>
      </section>

      <div className="side-stamp" aria-hidden="true">
        COLOMBIA
      </div>
    </main>
  )
}
