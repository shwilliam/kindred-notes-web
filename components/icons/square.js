export const IconSquare = ({fill = false, ...props}) =>
  fill ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      {...props}
    >
      <g
        id="Rectangle_32"
        data-name="Rectangle 32"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect width="25" height="25" rx="3" stroke="none" />
        <rect x="0.5" y="0.5" width="24" height="24" rx="2.5" fill="none" />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      {...props}
    >
      <g
        id="Rectangle_32"
        data-name="Rectangle 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect width="25" height="25" rx="3" stroke="none" />
        <rect x="0.5" y="0.5" width="24" height="24" rx="2.5" fill="none" />
      </g>
    </svg>
  )
