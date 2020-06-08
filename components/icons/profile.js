export default function Profile({fill = false, ...props}) {
  return fill ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19.079"
      height="24.944"
      viewBox="0 0 19.079 24.944"
      {...props}
    >
      <g id="user_4_" data-name="user (4)" transform="translate(-20.598)">
        <circle
          id="Ellipse_5"
          data-name="Ellipse 5"
          cx="5.244"
          cy="5.244"
          r="5.244"
          transform="translate(24.861)"
          fill="currentColor"
        />
        <path
          id="Path_1"
          data-name="Path 1"
          d="M30.1,150a9.5,9.5,0,0,0-9.5,9.5s-.223,1.551,3.668,2a53.62,53.62,0,0,0,11.946,0c3.82-.445,3.453-1.984,3.453-1.984A9.564,9.564,0,0,0,30.1,150Z"
          transform="translate(0 -136.89)"
          fill="currentColor"
        />
      </g>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.092"
      height="25.955"
      viewBox="0 0 20.092 25.955"
      {...props}
    >
      <g id="user_4_" data-name="user (4)" transform="translate(-20.094 0.5)">
        <circle
          id="Ellipse_5"
          data-name="Ellipse 5"
          cx="5.244"
          cy="5.244"
          r="5.244"
          transform="translate(24.861)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          id="Path_1"
          data-name="Path 1"
          d="M30.1,150a9.5,9.5,0,0,0-9.5,9.5s-.223,1.551,3.668,2a53.62,53.62,0,0,0,11.946,0c3.82-.445,3.453-1.984,3.453-1.984A9.564,9.564,0,0,0,30.1,150Z"
          transform="translate(0 -136.89)"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  )
}
