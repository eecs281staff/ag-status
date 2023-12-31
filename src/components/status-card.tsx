import {
  Server,
  Status as ServerStatus,
  LOAD_THRESHOLDS,
} from "@/utils/server-status";

interface StatusInfo {
  ringColor: string;
  textColor: string;
  indicatorColor: string;
  icon: React.ReactNode;
}

const STATUSES: Record<string, StatusInfo> = {
  operational: {
    ringColor: "dark:ring-green-800",
    textColor: "text-green-400",
    indicatorColor: "bg-green-500",
    icon: <OperationalIcon />,
  },
  degraded: {
    ringColor: "dark:ring-amber-600/80",
    textColor: "text-amber-400",
    indicatorColor: "bg-amber-400",
    icon: <DegradedIcon />,
  },
  down: {
    ringColor: "dark:ring-rose-800",
    textColor: "text-rose-400",
    indicatorColor: "bg-rose-500",
    icon: <DownIcon />,
  },
};

type StatusType = keyof typeof STATUSES;

interface StatusProps {
  state: StatusType;
  title: string;
  description: string;
}

const MAIN_CARD_BASE_CLASS =
  "relative top-6 flex flex-row items-center gap-3 rounded-md bg-white p-4 shadow transition-shadow hover:shadow-md dark:bg-pumablack dark:ring-2 dark:hover:ring-4 sm:gap-4";

export function MainStatus({ state, title, description }: StatusProps) {
  const { ringColor, textColor, icon } = STATUSES[state];
  return (
    <section className={`${MAIN_CARD_BASE_CLASS} ${ringColor}`}>
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
    <section className={`${MAIN_CARD_BASE_CLASS} dark:ring-slate-700`}>
      <LoadingIcon />
      <div className="w-full animate-pulse space-y-3">
        <h2 className="h-5 w-56 rounded-lg bg-slate-200 dark:bg-slate-400"></h2>
        <p className="h-4 w-28 rounded-lg bg-slate-200 dark:bg-slate-400"></p>
      </div>
    </section>
  );
}

export function ServerStatusCard({
  server,
  status,
}: {
  server: Server;
  status: ServerStatus;
}) {
  const { textColor, indicatorColor } = STATUSES[status.state];

  let num_grading_color = "text-rose-400";
  let num_pending_color = "text-rose-400";
  if (status.state !== "down") {
    for (const { thres, grading, pending } of LOAD_THRESHOLDS) {
      if (status.load < thres) {
        num_grading_color = grading;
        num_pending_color = pending;
        break;
      }
    }
  } else {
    num_grading_color = "text-gray-300";
    num_pending_color = "text-gray-300";
  }

  return (
    <section className="flex flex-row flex-wrap items-center gap-4 p-4 dark:bg-pumablack md:px-6">
      <span className="flex items-center gap-4">
        <span className="relative flex h-5 w-5">
          <span
            className={`absolute inline-flex h-full w-full animate-[ping_5s_infinite] rounded-full ${indicatorColor} opacity-75`}
          ></span>
          <span
            className={`relative inline-flex h-5 w-5 rounded-full ${indicatorColor}`}
          ></span>
        </span>

        <div>
          <a
            href={`${server.url}?utm_source=ag-status&utm_content=list`}
            referrerPolicy="unsafe-url"
            onClick={(e) => {
              if (!localStorage.getItem("main_card_notice_dismissed")) {
                e.preventDefault();
                e.stopPropagation();
                localStorage.setItem("main_card_notice_dismissed", "true");
                alert(
                  `Feel free to simply click on the "Go Submit on Server..." card below the page title to use the recommended AG server. Only manually select a server if you have a specific reason* to do so. This would help us to balance load across servers. Thank you.\n\n * If you do have a specific reason, please let us know at eecs281ag@umich.edu, we appreciate your feedback! \n\n This message will not be shown again.`,
                );
              }
            }}
          >
            <h3 className="text-lg font-bold">{server.name}</h3>
          </a>
          <p className={`text-sm ${textColor}`}>{status.reason}</p>
        </div>
      </span>

      <div className="ml-auto text-right">
        <span className={`text-lg ${num_grading_color}`}>
          {status.state === "down"
            ? "N/A"
            : status.num_grading.toLocaleString()}
        </span>
        <p className="text-sm">Grading</p>
      </div>
      <div className="text-right">
        <span className={`text-lg ${num_pending_color}`}>
          {status.state === "down"
            ? "N/A"
            : status.num_pending.toLocaleString()}
        </span>
        <p className="text-sm">Queued</p>
      </div>
    </section>
  );
}

export function ServerStatusSkeleton({ server }: { server: Server }) {
  return (
    <section className="flex flex-row flex-wrap items-center gap-4 p-4 dark:bg-pumablack md:px-6">
      <span className="flex items-center gap-4">
        <span className="relative flex h-5 w-5">
          <span
            className={`relative inline-flex h-5 w-5 rounded-full bg-slate-400`}
          ></span>
        </span>

        <div>
          <a href="#" referrerPolicy="unsafe-url">
            <h2 className="text-lg font-bold">{server.name}</h2>
          </a>
          <p className="mt-1 h-4 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-400 md:w-28"></p>
        </div>
      </span>

      <div className="ml-auto text-right">
        <span className="mb-2 block h-5 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-400"></span>
        <p className="text-sm">Grading</p>
      </div>
      <div className="text-right">
        <span className="mb-2 block h-5 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-400"></span>
        <p className="text-sm">Queued</p>
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
      className={`mt-0.5 inline-block h-8 w-8 flex-none rounded-full border-2 text-center text-xl ${className}`}
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
