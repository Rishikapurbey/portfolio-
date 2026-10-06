import { useEffect, useState } from 'react'

type Piece = { id: string; glyph: string; white: boolean; square: string }

const T = '︎' // forces text (not emoji) rendering of chess glyphs
const BACK = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
const FILES = 'abcdefgh'

const START: Piece[] = [
  ...BACK.map((g, i) => ({ id: `w${FILES[i]}1`, glyph: g + T, white: true, square: `${FILES[i]}1` })),
  ...[...FILES].map((f) => ({ id: `w${f}2`, glyph: '♟' + T, white: true, square: `${f}2` })),
  ...BACK.map((g, i) => ({ id: `b${FILES[i]}8`, glyph: g + T, white: false, square: `${FILES[i]}8` })),
  ...[...FILES].map((f) => ({ id: `b${f}7`, glyph: '♟' + T, white: false, square: `${f}7` })),
]

// The Italian Game, finishing with white castling: each step moves one or two pieces.
const MOVES: { san: string; moves: [string, string][] }[] = [
  { san: 'e4', moves: [['we2', 'e4']] },
  { san: 'e5', moves: [['be7', 'e5']] },
  { san: 'Nf3', moves: [['wg1', 'f3']] },
  { san: 'Nc6', moves: [['bb8', 'c6']] },
  { san: 'Bc4', moves: [['wf1', 'c4']] },
  { san: 'Bc5', moves: [['bf8', 'c5']] },
  { san: 'O-O', moves: [['we1', 'g1'], ['wh1', 'f1']] },
]

const coords = (sq: string) => ({ x: FILES.indexOf(sq[0]), y: 8 - Number(sq[1]) })

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function Board() {
  // With reduced motion the board just shows the final position.
  const [step, setStep] = useState(() => (reducedMotion() ? MOVES.length : 0))

  useEffect(() => {
    if (reducedMotion()) return
    const delay = step === 0 ? 900 : step >= MOVES.length ? 3200 : 1100
    const timer = setTimeout(() => setStep((s) => (s >= MOVES.length ? 0 : s + 1)), delay)
    return () => clearTimeout(timer)
  }, [step])

  const position = START.map((p) => {
    let square = p.square
    for (const m of MOVES.slice(0, step)) for (const [id, to] of m.moves) if (id === p.id) square = to
    return { ...p, square }
  })

  const last = step > 0 ? MOVES[step - 1].moves.flatMap(([id, to]) => [START.find((p) => p.id === id)!.square, to]) : []

  return (
    <figure className="ch-board-wrap">
      <div className="ch-board" role="img" aria-label="A chessboard playing the opening moves of the Italian Game">
        {Array.from({ length: 64 }, (_, i) => {
          const x = i % 8
          const y = Math.floor(i / 8)
          const sq = `${FILES[x]}${8 - y}`
          return (
            <span
              key={sq}
              className={`ch-sq${(x + y) % 2 ? ' ch-sq--dark' : ''}${last.includes(sq) ? ' ch-sq--last' : ''}`}
            >
              {y === 7 && <i className="ch-sq__file">{FILES[x]}</i>}
              {x === 0 && <i className="ch-sq__rank">{8 - y}</i>}
            </span>
          )
        })}
        {position.map((p) => {
          const { x, y } = coords(p.square)
          return (
            <span
              key={p.id}
              className={`ch-piece ${p.white ? 'ch-piece--white' : 'ch-piece--black'}`}
              style={{ transform: `translate(${x * 100}%, ${y * 100}%)` }}
              aria-hidden="true"
            >
              {p.glyph}
            </span>
          )
        })}
      </div>
      <figcaption className="ch-notation">
        {MOVES.map((m, i) => (
          <span key={m.san} className={i < step ? 'is-played' : ''}>
            {i % 2 === 0 && <b>{i / 2 + 1}.</b>} {m.san}
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
