export function Logo() {
  return (
    <div className="flex items-center justify-center size-16 bg-primary/10 rounded-2xl border-2 border-primary/20">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-8 text-primary"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <path d="M5 19.1V19a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v.1" />
            <path d="M9 17h6" />
            <path d="M12 17v-4" />
        </svg>
    </div>
  );
}
