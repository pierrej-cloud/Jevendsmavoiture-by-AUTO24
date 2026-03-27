interface Auto24LogoProps {
  size?: number;
  color?: string;
  bgColor?: string;
}

export function Auto24Logo({ size = 40, color = "#185ADB", bgColor = "transparent" }: Auto24LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Background */}
      <rect width="200" height="200" fill={bgColor} rx="8" />

      {/* Open circle arc — gap at bottom-right */}
      <path
        d="M160 145 A70 70 0 1 0 155 60"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* AUTO24 text */}
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="38"
        fill={color}
        letterSpacing="-0.5"
      >
        AUT
        <tspan fill={color}>O</tspan>
        24
      </text>

      {/* Africa silhouette inside the O */}
      <path
        d="M112.5 96 C112 94.5 111 93 110 92 C109 91 108.5 90 108.5 89
           C108.5 88 109 87 108.5 86 C108 85.5 107 85 106.5 85
           C106 85 105.5 85.5 105 85.5 C104.5 85.5 104 85 103.5 85
           C103 85 102.5 85.5 102.5 86 C102 87 102 88 102 89
           C102 90 101.5 91 101 92 C100 93.5 99.5 95 99.5 96.5
           C99.5 98 99.5 99.5 100 101 C100.5 102.5 101 104 101 105.5
           C101 107 101.5 108.5 101.5 110 C101.5 111 102 112 102.5 113
           C103 113.5 104 114 105 114 C106 114 106.5 113.5 107.5 113
           C108 112.5 109 111.5 109.5 110.5 C110.5 109.5 111 108 112 106.5
           C112.5 105 113 103.5 113 102 C113 100 112.5 98 112.5 96 Z"
        fill="white"
      />
    </svg>
  );
}
