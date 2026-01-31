'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [answered, setAnswered] = useState(false)
  const [yesClicked, setYesClicked] = useState(false)
  const noButtonRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Make the "No" button run away from the mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (!noButtonRef.current) return

      const button = noButtonRef.current
      const rect = button.getBoundingClientRect()
      const buttonX = rect.left + rect.width / 2
      const buttonY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonX, 2) + Math.pow(e.clientY - buttonY, 2)
      )

      // If cursor is close to the button, make it run away
      if (distance < 150) {
        const angle = Math.atan2(buttonY - e.clientY, buttonX - e.clientX)
        const moveDistance = 100
        // Keep button within viewport, with padding
        const newX = Math.random() * (window.innerWidth - 200) + 100
        const newY = Math.random() * (window.innerHeight - 200) + 100
        
        // Clamp to prevent overflow
        const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 150))
        const clampedY = Math.max(0, Math.min(newY, window.innerHeight - 150))

        button.style.transform = `translate(${clampedX}px, ${clampedY}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div className={styles.heartContainer}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles.heart}>❤️</div>
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.content}>
          {!yesClicked ? (
            <>
              <div className={styles.bearContainer}>
                <div className={styles.bear}>
                  <div className={styles.head}>
                    <div className={styles.ears}></div>
                    <div className={styles.eyes}></div>
                    <div className={styles.mouth}></div>
                  </div>
                  <div className={styles.body}></div>
                  <div className={styles.flowers}>🌹</div>
                </div>
              </div>

              <h1 className={styles.question}>Hey Dunmininu Ifeoluwa Sarumi! <br></br>Will you be my Valentine?</h1>

              <div className={styles.buttonContainer}>
                <button
                  className={`${styles.button} ${styles.yesButton}`}
                  onClick={() => {
                    setAnswered(true)
                    setYesClicked(true)
                  }}
                >
                  Yes 💕
                </button>
                <button
                  ref={noButtonRef}
                  className={`${styles.button} ${styles.noButton}`}
                  onClick={() => {
                    const newX = Math.random() * (window.innerWidth - 200) + 100
                    const newY = Math.random() * (window.innerHeight - 200) + 100
                    noButtonRef.current.style.transform = `translate(${newX}px, ${newY}px)`
                  }}
                >
                  No 💔
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.celebrationContainer}>
                <div className={styles.bear_happy}>
                  <div className={styles.head_happy}>
                    <div className={styles.ears_happy}></div>
                    <div className={styles.eyes_happy}></div>
                    <div className={styles.smile}></div>
                  </div>
                  <div className={styles.body_happy}></div>
                </div>

                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.confetti}
                    style={{
                      left: Math.random() * 100 + '%',
                      '--delay': Math.random() * 0.5 + 's',
                      '--duration': Math.random() * 2 + 2 + 's',
                    }}
                  >
                    {['💕', '❤️', '💖', '✨', '🌹'][Math.floor(Math.random() * 5)]}
                  </div>
                ))}
              </div>

              <h1 className={styles.successMessage}>
                Yay! You just made me the happiest bear! 🎉
              </h1>

              <p className={styles.subtitle}>
                See you on Valentine's Day! 💝
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}