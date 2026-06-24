interface VMark2Props {
    size?: number
    className?: string
}

export function VMark2({ size = 28, className = "" }: VMark2Props) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <circle cx="18" cy="18" r="16.5" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
            <path
                d="M9 11 L18 27 L27 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
            <circle cx="18" cy="6" r="1" fill="currentColor" />
        </svg>
    )
}