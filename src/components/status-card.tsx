interface StatusInfo {
  ringColor: string;
  textColor: string;
  icon: React.ReactNode;
}

const STATUSES: Record<string, StatusInfo> = {
  operational: {
    ringColor: "dark:ring-green-800",
    textColor: "text-green-400",
    icon: <OperationalIcon />,
  },
  degraded: {
    ringColor: "dark:ring-amber-600/80",
    textColor: "text-amber-400",
    icon: <DegradedIcon />,
  },
  down: {
    ringColor: "dark:ring-rose-800",
    textColor: "text-rose-400",
    icon: <DownIcon />,
  },
};

type StatusType = keyof typeof STATUSES;

interface MainStatusProps {
  state: StatusType;
  title: string;
  description: string;
}

const CARD_BASE_CLASS =
  "relative top-6 flex flex-row items-center gap-4 rounded-md bg-white p-4 shadow dark:bg-pumablack dark:ring-2";

export function MainStatus({ state, title, description }: MainStatusProps) {
  const { ringColor, textColor, icon } = STATUSES[state];
  return (
    <section className={`${CARD_BASE_CLASS} ${ringColor}`}>
      {icon}
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className={`text-sm ${textColor}`}>{description}</p>
      </div>
    </section>
  );
}

export function MainStatusSkeleton() {
  return (
    <section className={`${CARD_BASE_CLASS} dark:ring-slate-700`}>
      <LoadingIcon />
      <div className="w-full animate-pulse space-y-2">
        <h2 className="h-5 w-56 rounded-lg bg-slate-200"></h2>
        <p className="h-4 w-28 rounded-lg bg-slate-200"></p>
      </div>
    </section>
  );
}

function BaseIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      role="img"
      aria-hidden
      className={`inline-block h-8 w-8 flex-none rounded-full border-2 text-center text-xl ${className}`}
    >
      {children}
    </span>
  );
}
function OperationalIcon() {
  return <BaseIcon className="border-green-500 text-green-500">➔</BaseIcon>;
}

function DegradedIcon() {
  return <BaseIcon className="border-amber-400 text-amber-400">!</BaseIcon>;
}

function DownIcon() {
  return <BaseIcon className="border-rose-500 text-rose-500">✕</BaseIcon>;
}

function LoadingIcon() {
  return <BaseIcon className="border-slate-400 text-slate-400">···</BaseIcon>;
}
