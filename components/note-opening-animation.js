const NoteBack = () => (
  <svg
    width="175.3"
    height="145.39"
    version="1.1"
    viewBox="0 0 175.3 145.39"
    xmlnsXlink="http://www.w3.org/2000/svg"
  >
    <g transform="translate(-43 -181.31)" data-name="Group 1">
      <path
        transform="translate(52.004 181.81)"
        d="M157.293,57.58v-2.91a7.564,7.564,0,0,0-4.109-6.736L84.906,2.1a11.27,11.27,0,0,0-12.538,0L3.95,47.9A7.572,7.572,0,0,0,0,54.547V57.58Z"
        fill="#bbddde"
        stroke="rgba(112,112,112,0.15)"
        data-name="Path 391"
      />
      <rect
        transform="translate(209.05 236.46) rotate(90)"
        width="78.161"
        height="157.05"
        fill="#add5d6"
        data-name="Rectangle 2"
      />
    </g>
  </svg>
)

const NoteMessage = ({state = 'CLOSED'}) => (
  <svg
    width="175.3"
    height="145.39"
    version="1.1"
    viewBox="0 0 175.3 145.39"
    xmlns="http://www.w3.org/2000/svg"
    className={`note-opening__message -${state.toLowerCase()}`}
  >
    <g transform="translate(-43 -181.31)" data-name="Group 1">
      <g transform="translate(20 218.75)">
        <rect
          transform="translate(55 23.263)"
          width="111"
          height="64"
          rx="7"
          fill="#48a9c6"
          data-name="Rectangle 3"
        />
      </g>
    </g>
  </svg>
)

const NoteFront = ({state = 'CLOSED'}) => (
  <svg
    width="175.3"
    height="145.39"
    version="1.1"
    viewBox="0 0 175.3 145.39"
    xmlnsXlink="http://www.w3.org/2000/svg"
    style={{zIndex: ['OPEN', 'EXPANDED'].includes(state) ? 0 : 2}}
  >
    <defs>
      <filter
        id="Path_1"
        x="7.5"
        y="53.408"
        width="160.3"
        height="81.648"
        filterUnits="userSpaceOnUse"
      >
        <feOffset input="SourceAlpha" />
        <feGaussianBlur result="blur" stdDeviation="0.5" />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur" operator="in" result="result1" />
        <feComposite in="SourceGraphic" in2="result1" />
      </filter>
      <filter
        id="Path_241"
        x="0"
        y="78.212"
        width="175.3"
        height="67.182"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy="3" input="SourceAlpha" />
        <feGaussianBlur result="blur-2" stdDeviation="3" />
        <feFlood floodOpacity=".161" />
        <feComposite in2="blur-2" operator="in" result="result1" />
        <feComposite in="SourceGraphic" in2="result1" />
      </filter>
    </defs>
    <g transform="translate(-43 -181.31)" data-name="Group 1">
      <g transform="translate(43 181.31)" filter="url(#Path_1)">
        <path
          transform="translate(9 54.91)"
          d="M145.87,5.555Q112.25,22.431,78.648,39.324,45.346,22.686,12.079,6.049C8.041,4.038,4.021,2.01,0,0V78.648H157.3V0Z"
          fill="#bbddde"
          data-name="Path 1"
        />
      </g>
      <g transform="translate(43 181.31)" filter="url(#Path_241)">
        <path
          transform="translate(9 -408.49)"
          d="M157.3,541.882v-2.91a7.564,7.564,0,0,0-4.109-6.736L78.648,492.7,3.95,532.183A7.6,7.6,0,0,0,0,538.849v3.033Z"
          fill="#c3e7e8"
          data-name="Path 241"
        />
      </g>
    </g>
  </svg>
)

export const NoteOpeningAnimation = ({state = 'CLOSED'}) => (
  <div className={`bg note-opening__bg ${state === 'EXPANDED' ? '-hide' : ''}`}>
    <div className={`note-opening -${state.toLowerCase()}`} aria-hidden>
      <NoteBack />
      <NoteFront state={state} />
      <NoteMessage state={state} />
    </div>
  </div>
)
