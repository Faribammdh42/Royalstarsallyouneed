export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="hsl(0, 0%, 90%)" />
            <stop offset="100%" stopColor="hsl(340, 100%, 75%)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#logoGradient)"
          d="M50 2.5l11.76 36.17h37.98l-30.73 22.36 11.76 36.17L50 74.84l-30.73 22.36 11.76-36.17L0.26 38.67h37.98L50 2.5z"
        />
        <path
          d="M50,42.5 c-5,-2.5 -10,-2.5 -15,0 l-2.5,7.5 c0,5 2.5,10 7.5,12.5 h10 c5,-2.5 7.5,-7.5 7.5,-12.5 l-2.5,-7.5 c-5,-2.5 -10,-2.5 -15,0 M35,42.5 c-2.5,-5 -2.5,-10 0,-15 M65,42.5 c2.5,-5 2.5,-10 0,-15"
          fill="none"
          stroke="hsl(var(--background))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
