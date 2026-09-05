import { forwardRef } from 'react'

/**
 * Ring and inset disc from the supplied brand card. Vector geometry keeps
 * the mark crisp at navigation and presentation sizes.
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
        d="M 50 5 A 43 43 0 1 1 50 91 A 43 43 0 1 1 50 5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />
      <circle cx="57" cy="66" r="25" fill={stroke} />
    </svg>
  )
})

export default Monogram
