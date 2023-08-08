import { MainStatus, MainStatusSkeleton } from "@/components/status-card";
import { Server, ServerStatus } from "@/utils/server-status";
import Wrapper from "@/components/wrapper";

function NavItem({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <li className="inline-block hover:text-slate-50 dark:hover:text-maize/80">
      <a href={link} target="_blank" rel="noopener">
        {children}
      </a>
    </li>
  );
}

export default function Header({
  servers,
  status,
  setStatus,
}: {
  servers: Server[];
  status: ServerStatus;
  setStatus: React.Dispatch<React.SetStateAction<ServerStatus>>;
}) {
  const isStatusComplete: boolean = servers?.every(
    (s) => status[s.url] !== undefined,
  );
  const anyAbnormal: boolean =
    !status || Object.values(status).some((s) => s.state !== "operational");

  // Find the server with normal status and the lowest load
  let bestServer: Server | undefined = undefined;
  let bestLoad: number = Number.MAX_VALUE;
  if (isStatusComplete) {
    for (let server of servers) {
      const s = status[server.url];
      if (s.state === "down" || s.is_final_grading || !s.is_active) continue;

      const load = (s.num_pending + s.num_grading) / server.capacity;
      if (!bestServer || load < bestLoad) {
        bestServer = server;
        bestLoad = load;
      }
    }
  }

  return (
    <header className="mb-6 bg-maize dark:bg-mblue">
      <Wrapper className="pt-8">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <span className="ml-0.5 flex items-center font-extralight">
              EECS 281{" "}
              <svg
                viewBox="0 0 22 22"
                aria-hidden
                role="img"
                className="-mt-0.5 ml-0.5 inline h-5 w-5 fill-mblue dark:fill-maize"
              >
                <g>
                  <path d="M20.396 11a3.487 3.487 0 0 0-2.008-3.062 3.474 3.474 0 0 0-.742-3.584 3.474 3.474 0 0 0-3.584-.742A3.468 3.468 0 0 0 11 1.604a3.463 3.463 0 0 0-3.053 2.008 3.472 3.472 0 0 0-1.902-.14c-.635.13-1.22.436-1.69.882a3.461 3.461 0 0 0-.734 3.584A3.49 3.49 0 0 0 1.604 11a3.496 3.496 0 0 0 2.017 3.062 3.471 3.471 0 0 0 .733 3.584 3.49 3.49 0 0 0 3.584.742A3.487 3.487 0 0 0 11 20.396a3.476 3.476 0 0 0 3.062-2.007 3.335 3.335 0 0 0 4.326-4.327A3.487 3.487 0 0 0 20.396 11zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                </g>
              </svg>
            </span>
            <h1 className="align-middle text-3xl font-extrabold md:text-4xl">
              Autograder{" "}
              <span className="text-black/60 dark:text-white/80">Status</span>
            </h1>
          </div>
          <nav>
            <ul className="flex items-center gap-3 whitespace-nowrap">
              <NavItem link="https://www.gradescope.com/">Gradescope</NavItem>
              <NavItem link="https://piazza.com/">Piazza</NavItem>
              <button
                type="button"
                disabled={!isStatusComplete}
                className="rounded-md bg-black/80 px-2 py-0.5 font-bold text-maize dark:bg-white/70 dark:text-mblue"
                onClick={() => {
                  setStatus({});
                }}
              >
                {isStatusComplete ? "Recheck Status" : "Processing........"}
              </button>
            </ul>
          </nav>
        </div>
        {(() => {
          if (!isStatusComplete) {
            return <MainStatusSkeleton />;
          }

          if (!bestServer) {
            return (
              <MainStatus
                state="down"
                title="No available server"
                description="Contact course staff"
              />
            );
          }

          return (
            <a href={bestServer.url}>
              <MainStatus
                state={anyAbnormal ? "degraded" : "operational"}
                title={`Go to ${bestServer.name}`}
                description={
                  anyAbnormal
                    ? "Partial degradation"
                    : "All systems operational"
                }
              />
            </a>
          );
        })()}
      </Wrapper>
    </header>
  );
}
