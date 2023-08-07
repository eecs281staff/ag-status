"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Wrapper from "@/components/wrapper";

import { useState, useEffect } from "react";
import { ServerStatus, fetchServerStatus } from "@/utils/server-status";
import {
  ServerStatusCard,
  ServerStatusSkeleton,
} from "@/components/status-card";

import servers from "@/data/servers.json";

export default function Home() {
  const [status, setStatus] = useState<ServerStatus>({});
  const [inFlight, setInFlight] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const toFetch = servers.filter(
      (server) => !status[server.url] && !inFlight[server.url],
    );

    // set inFlight to true for all servers that need to be fetched
    if (toFetch.length > 0) {
      setInFlight((prev) => ({
        ...prev,
        ...Object.fromEntries(toFetch.map((server) => [server.url, true])),
      }));
    }

    // fetch all servers that need to be fetched
    toFetch.forEach((server) => {
      // make fetching take at least 300ms to avoid flickering
      // and to make it look like the page is doing something
      const delay = Math.random() * 700 + 300;
      Promise.all([
        fetchServerStatus(server),
        new Promise((resolve) => setTimeout(resolve, delay)),
      ]).then(([status]) => {
        setStatus((prev) => ({ ...prev, [server.url]: status }));
        setInFlight((prev) => ({ ...prev, [server.url]: false }));
      });
    });
  }, [status, inFlight]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header servers={servers} status={status} setStatus={setStatus} />
      <Wrapper>
        <h2 className="mb-5 mt-8 text-center text-2xl">Autograder Servers</h2>
        <div className="flex flex-col divide-y overflow-hidden rounded-md border dark:divide-slate-600/60 dark:border-slate-600/60 dark:bg-pumablack">
          {servers.map((server) =>
            status[server.url] ? (
              <ServerStatusCard
                key={server.url}
                server={server}
                status={status[server.url]}
              ></ServerStatusCard>
            ) : (
              <ServerStatusSkeleton key={server.url} server={server} />
            ),
          )}
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
}
