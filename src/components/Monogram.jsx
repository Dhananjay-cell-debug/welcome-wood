import { forwardRef } from 'react'

/**
 * The Welcome Woods mark — a W whose centre apex rises above its shoulders,
 * so the letter also reads as a treeline. Drawn as a single open stroke with
 * mitred joins, which is what gives it the sharp serif-adjacent points.
 *
 * `pathLength="100"` normalises the geometry so the draw-on animation can use
 * a plain 0–100 dashoffset regardless of the real path length.
 */
const Monogram = forwardRef(function Monogram(
  {
    className = '',
    strokeWidth = 3,
    stroke = 'currentColor',
    pathRef = null,
    ...rest
  },
  ref
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      <path
        ref={pathRef}
        pathLength="100"
        d="M14 32 L32 76 L50 24 L68 76 L86 32"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />
    </svg>
  )
})

export default Monogram
