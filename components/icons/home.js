export const IconHome = ({fill = false, ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline
      fill={fill ? '#fff' : 'none'}
      points="9 22 9 12 15 12 15 22"
    ></polyline>
  </svg>
)
