'use client'

import { useEffect, useRef, useState } from 'react'

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [wave, setWave] = useState(1)
  const requestRef = useRef<number>()
  const isPlayingRef = useRef(false)
  const gameOverRef = useRef(false)
  const pausedRef = useRef(false)

  // Game entities
  const playerRef = useRef({ 
    x: 0, y: 0, width: 40, height: 40, speed: 6, dx: 0, 
    color: '#00ff88',
    bullets: [] as { x: number; y: number; speed: number }[]
  })
  const enemiesRef = useRef<{ 
    x: number; y: number; width: number; height: number; 
    speed: number; hp: number; color: string; type: 'basic' | 'fast' | 'tank'
  }[]>([])
  const particlesRef = useRef<{ 
    x: number; y: number; vx: number; vy: number; life: number; color: string; type: 'explosion' | 'spark'
  }[]>([])
  const bulletsRef = useRef<{ x: number; y: number; speed: number }[]>([])
  const enemyBulletsRef = useRef<{ x: number; y: number; speed: number; targetX: number; targetY: number }[]>([])

  // Wave management
  const enemiesToSpawnRef = useRef<{ x: number; y: number; speed: number; hp: number; type: 'basic' | 'fast' | 'tank' }[]>([])
  const spawnTimerRef = useRef(0)
  const waveTimerRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Load high score
    const savedHighScore = localStorage.getItem('spaceInvadersHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }

    // Global keydown handler
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsPaused(!isPaused)
        pausedRef.current = !pausedRef.current
        e.preventDefault()
      } else if (e.code === 'Space') {
        if (!isPlayingRef.current || gameOverRef.current) {
          // Start or restart game
          enemiesRef.current = []
          bulletsRef.current = []
          enemyBulletsRef.current = []
          particlesRef.current = []
          enemiesToSpawnRef.current = []
          setScore(0)
          setGameOver(false)
          setIsPlaying(true)
          setWave(1)
          pausedRef.current = false
          canvasRef.current?.focus()
          e.preventDefault()
        } else if (isPaused) {
          setIsPaused(false)
          pausedRef.current = false
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    // Initialize player
    const initPlayer = () => {
      playerRef.current.x = canvas.width / 2 - playerRef.current.width / 2
      playerRef.current.y = canvas.height - 80
      playerRef.current.bullets = []
    }
    initPlayer()

    // Spawn enemy
    const spawnEnemy = () => {
      const types: { type: 'basic' | 'fast' | 'tank'; speed: number; hp: number; size: number; color: string }[] = [
        { type: 'basic', speed: 2, hp: 1, size: 30, color: '#ff4444' },
        { type: 'fast', speed: 4, hp: 1, size: 20, color: '#ffaa00' },
        { type: 'tank', speed: 1, hp: 5, size: 50, color: '#aa00ff' }
      ]
      
      const type = types[Math.floor(Math.random() * types.length)]
      enemiesRef.current.push({
        x: Math.random() * (canvas.width - type.size),
        y: -type.size,
        width: type.size,
        height: type.size,
        speed: type.speed,
        hp: type.hp,
        color: type.color,
        type: type.type
      })
    }

    // Create explosion particles
    const createExplosion = (x: number, y: number, color: string, count: number = 15) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          life: 1.0,
          color,
          type: 'explosion'
        })
      }
    }

    const createSpark = (x: number, y: number, color: string) => {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        life: 0.5,
        color,
        type: 'spark'
      })
    }

    // Wave system
    const startWave = () => {
      const enemyCount = 5 + wave * 3
      for (let i = 0; i < enemyCount; i++) {
        enemiesToSpawnRef.current.push({
          x: Math.random() * (canvas.width - 40),
          y: -40,
          speed: 2 + wave * 0.5,
          hp: 1 + Math.floor(wave / 3),
          type: wave > 3 && Math.random() > 0.7 ? 'tank' : wave > 1 && Math.random() > 0.5 ? 'fast' : 'basic'
        })
      }
    }

    const update = () => {
      // Always draw background and stars
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars background
      ctx.fillStyle = '#ffffff'
      for (let i = 0; i < 100; i++) {
        const x = (Math.sin(i * 137.5 + Date.now() / 300) * canvas.width + i * 100) % canvas.width
        const y = (Math.cos(i * 137.5 + Date.now() / 200) * canvas.height + i * 100) % canvas.height
        ctx.globalAlpha = 0.2 + Math.sin(Date.now() / 150 + i) * 0.3
        ctx.fillRect(x, y, 2, 2)
      }
      ctx.globalAlpha = 1

      // Update wave timer
      waveTimerRef.current++
      if (waveTimerRef.current % 120 === 0 && enemiesToSpawnRef.current.length === 0) {
        setWave(w => w + 1)
        startWave()
      }

      // Update spawn timer
      spawnTimerRef.current++
      if (spawnTimerRef.current % 60 === 0 && enemiesToSpawnRef.current.length > 0) {
        const enemy = enemiesToSpawnRef.current.shift() as typeof enemiesToSpawnRef.current[0]
        enemiesRef.current.push(enemy)
      }

      // Only update and draw game elements if playing and not paused
      if (isPlayingRef.current && !gameOverRef.current && !pausedRef.current) {
        const player = playerRef.current

        // Update player
        player.x += player.dx
        player.x = Math.max(0, Math.min(canvas.width - player.width, player.x))

        // Draw player (triangle ship)
        ctx.fillStyle = player.color
        ctx.beginPath()
        ctx.moveTo(player.x + player.width / 2, player.y)
        ctx.lineTo(player.x + player.width, player.y + player.height)
        ctx.lineTo(player.x + player.width / 2, player.y + player.height - 15)
        ctx.lineTo(player.x, player.y + player.height)
        ctx.closePath()
        ctx.fill()

        // Draw player glow
        ctx.shadowColor = player.color
        ctx.shadowBlur = 20
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw bullets
        bulletsRef.current = bulletsRef.current.filter(bullet => {
          bullet.y -= bullet.speed
          ctx.fillStyle = '#ffff00'
          ctx.fillRect(bullet.x, bullet.y, 4, 10)
          return bullet.y > -10
        })

        // Spawn bullets on click/touch
        if (player.bullets.length < 3) {
          player.bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            speed: 10
          })
        }

        // Update and draw enemies
        enemiesRef.current = enemiesRef.current.filter(enemy => {
          enemy.y += enemy.speed
          enemy.speed += 0.0005 // Gradually increase difficulty

          // Draw enemy based on type
          ctx.fillStyle = enemy.color
          if (enemy.type === 'tank') {
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
          } else if (enemy.type === 'fast') {
            ctx.beginPath()
            ctx.moveTo(enemy.x + enemy.width / 2, enemy.y)
            ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height)
            ctx.lineTo(enemy.x, enemy.y + enemy.height)
            ctx.closePath()
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2)
            ctx.fill()
          }

          // Check collision with player bullets
          for (let i = player.bullets.length - 1; i >= 0; i--) {
            const bullet = player.bullets[i]
            if (
              bullet.x < enemy.x + enemy.width &&
              bullet.x + 4 > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + 10 > enemy.y
            ) {
              enemy.hp--
              createSpark(bullet.x, bullet.y, '#ffff00')
              player.bullets.splice(i, 1)
              
              if (enemy.hp <= 0) {
                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color)
                setScore(s => s + (enemy.type === 'tank' ? 50 : enemy.type === 'fast' ? 20 : 10))
                return false
              }
            }
          }

          return enemy.y < canvas.height
        })

        // Update and draw particles
        particlesRef.current = particlesRef.current.filter(particle => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.life -= 0.03

          ctx.fillStyle = particle.color
          ctx.globalAlpha = particle.life
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 3 * particle.life, 0, Math.PI * 2)
          ctx.fill()

          return particle.life > 0
        })

        // Draw score and wave
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 24px monospace'
        ctx.textAlign = 'left'
        ctx.fillText(`Score: ${score}`, 20, 40)
        ctx.fillText(`Wave: ${wave}`, 20, 70)
        ctx.fillText(`High Score: ${highScore}`, 20, 100)

        // Draw instructions
        ctx.font = '16px monospace'
        ctx.fillStyle = '#888888'
        ctx.textAlign = 'center'
        ctx.fillText('← → or A/D to move • Click/Touch to shoot • ESC to pause', canvas.width / 2, canvas.height - 20)
      } else if (gameOverRef.current) {
        // Draw game over screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#ff4444'
        ctx.font = 'bold 48px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20)

        ctx.fillStyle = '#ffffff'
        ctx.font = '24px monospace'
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30)
        ctx.fillText(`Wave Reached: ${wave}`, canvas.width / 2, canvas.height / 2 + 60)
        ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 100)
      } else if (isPaused) {
        // Draw pause screen
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 36px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2)
        ctx.font = '20px monospace'
        ctx.fillText('Press ESC to resume', canvas.width / 2, canvas.height / 2 + 40)
      }

      requestRef.current = requestAnimationFrame(update)
    }

    // Handle mouse/touch clicks for shooting
    const handleCanvasClick = (e: MouseEvent | TouchEvent) => {
      if (!isPlayingRef.current || gameOverRef.current || pausedRef.current) return
      
      e.preventDefault()
      
      const canvasRect = canvas.getBoundingClientRect()
      const clickX = 'clientX' in e ? e.clientX : (e as TouchEvent).touches[0].clientX
      const clickY = 'clientY' in e ? e.clientY : (e as TouchEvent).touches[0].clientY
      
      const canvas = canvasRef.current
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const mouseX = clickX - rect.left
      const mouseY = clickY - rect.top
      
      // Calculate angle to click position
      const player = playerRef.current
      const angle = Math.atan2(mouseY - player.y, mouseX - (player.x + player.width / 2))
      const bulletSpeed = 10
      const bulletX = player.x + player.width / 2 - 2
      const bulletY = player.y
      
      // Add angled bullet
      bulletsRef.current.push({
        x: bulletX,
        y: bulletY,
        speed: bulletSpeed
      })
      
      // Add velocity for angled shots
      bulletsRef.current[bulletsRef.current.length - 1].vx = Math.cos(angle) * bulletSpeed
      bulletsRef.current[bulletsRef.current.length - 1].vy = Math.sin(angle) * bulletSpeed
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlayingRef.current || gameOverRef.current || pausedRef.current) return

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        playerRef.current.dx = -playerRef.current.speed
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        playerRef.current.dx = playerRef.current.speed
      } else {
        playerRef.current.dx = 0
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isPlayingRef.current || gameOverRef.current || pausedRef.current) return

      if (e.code === 'ArrowLeft' || e.code === 'KeyA' ||
          e.code === 'ArrowRight' || e.code === 'KeyD') {
        playerRef.current.dx = 0
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPlayingRef.current || gameOverRef.current || pausedRef.current) return

      e.preventDefault()

      const touch = e.touches[0]
      const canvasRect = canvas.getBoundingClientRect()
      const touchX = touch.clientX - canvasRect.left
      const player = playerRef.current

      // Smooth follow
      player.x += (touchX - player.width / 2 - player.x) * 0.15
    }

    canvas.addEventListener('click', handleCanvasClick as any)
    canvas.addEventListener('touchstart', handleCanvasClick as any)
    canvas.addEventListener('touchmove', handleTouchMove)
    canvas.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('focus', () => {
      canvasRef.current?.focus()
    })

    requestRef.current = requestAnimationFrame(update)

    return () => {
      canvas.removeEventListener('click', handleCanvasClick as any)
      canvas.removeEventListener('touchstart', handleCanvasClick as any)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('keydown', handleKeyDown)
      canvas.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', handleGlobalKeyDown)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-400 mb-4">Space Defender</h1>
      <p className="text-gray-400 mb-4 text-sm">
        Use ← → arrows or A/D to move • Click/Touch to shoot • ESC to pause • Don't let enemies hit you!
      </p>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        tabIndex={0}
        className="border-2 border-green-800 rounded-lg bg-black cursor-none focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div className="mt-4 text-gray-500 text-sm">
        {gameOver ? 'Game Over!' : isPaused ? 'Paused' : isPlaying ? 'Playing...' : 'Press SPACE to start'}
      </div>
    </div>
  )
}