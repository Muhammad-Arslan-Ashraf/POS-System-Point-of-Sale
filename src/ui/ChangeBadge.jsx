const ChangeBadge = ({ pct }) => {
  if (pct === null)
    return (
      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
        No data from yesterday
      </span>
    );

  const isUp = pct >= 0;
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit
      ${isUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
    >
      {isUp ? "↑" : "↓"} {Math.abs(pct)}% vs yesterday
    </span>
  );
};

export default ChangeBadge;
