export const IconEnvelope = ({open = false, ...props}) =>
  open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="175.297"
      height="145.394"
      viewBox="0 0 175.297 145.394"
    >
      <defs>
        <filter
          x="7.5"
          y="53.408"
          width="160.297"
          height="81.648"
          filterUnits="userSpaceOnUse"
        >
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feFlood flood-opacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          x="0"
          y="78.212"
          width="175.297"
          height="67.182"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur-2" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="translate(-43 -181.309)">
        <path
          d="M157.293,57.58v-2.91a7.564,7.564,0,0,0-4.109-6.736L84.906,2.1a11.27,11.27,0,0,0-12.538,0L3.95,47.9A7.572,7.572,0,0,0,0,54.547V57.58Z"
          transform="translate(52.004 181.813)"
          fill="#bbddde"
          stroke="rgba(112,112,112,0.15)"
          strokeWidth="1"
        />
        <rect
          width="78.161"
          height="157.054"
          transform="translate(209.054 236.464) rotate(90)"
          fill="#add5d6"
        />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="175.297"
      height="91.986"
      viewBox="0 0 175.297 91.986"
    >
      <defs>
        <filter
          x="7.5"
          y="0"
          width="160.297"
          height="81.648"
          filterUnits="userSpaceOnUse"
        >
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          x="0"
          y="24.805"
          width="175.297"
          height="67.182"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur-2" />
          <feFlood floodOpacity="0.161" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="translate(-43 -234.717)">
        <rect
          width="78.161"
          height="157.054"
          transform="translate(209.054 236.464) rotate(90)"
          fill="#add5d6"
        />
        <path
          d="M157.293.2V3.11a7.564,7.564,0,0,1-4.109,6.736L84.906,55.676a11.27,11.27,0,0,1-12.538,0L3.95,9.881A7.572,7.572,0,0,1,0,3.233V.2Z"
          transform="translate(52.004 235.813)"
          fill="#bbddde"
          stroke="rgba(112,112,112,0.14)"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
