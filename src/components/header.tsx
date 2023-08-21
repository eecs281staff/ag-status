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

      if (!bestServer || s.load < bestLoad) {
        bestServer = server;
        bestLoad = s.load;
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
                viewBox="0 0 24 24"
                aria-hidden
                role="img"
                className="-mt-0.5 ml-0.5 inline h-5 w-5 fill-mblue dark:fill-maize"
              >
                <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
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
            <a href={bestServer.url} referrerPolicy="unsafe-url">
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
