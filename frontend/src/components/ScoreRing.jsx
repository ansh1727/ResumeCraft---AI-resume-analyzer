const ScoreRing = ({ score, label, size = 'md' }) => {
  const radius = size === 'lg' ? 54 : 40;
  const stroke = size === 'lg' ? 8 : 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#eab308';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  };

  const color = getColor(score || 0);
  const dim = (radius + stroke) * 2;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: dim, height: dim }}
      >
        <span className={`font-bold ${size === 'lg' ? 'text-2xl' : 'text-lg'}`} style={{ color }}>
          {score ?? 0}
        </span>
      </div>
      {label && (
        <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
      )}
    </div>
  );
};

export default ScoreRing;
