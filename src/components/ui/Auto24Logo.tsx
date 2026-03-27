interface Auto24LogoProps {
  size?: number;
  color?: string;
}

export function Auto24Logo({ size = 40, color = "#185ADB" }: Auto24LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M100 20 A80 80 0 1 1 30 140"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
      <text
        x="100"
        y="125"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="42"
        fill={color}
        letterSpacing="-1"
      >
        AUTO24
      </text>
    </svg>
  );
}
