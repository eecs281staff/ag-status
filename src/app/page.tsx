"use client";

import Header from "@/components/header";
import Wrapper from "@/utils/wrapper";

import { useState, useEffect } from "react";
import { Server, ServerStatus, fetchServerStatus } from "@/utils/server-status";
import { MainStatus, MainStatusSkeleton } from "@/components/status-card";

export default function Home() {
  const [servers, setServers] = useState<Server[]>([
    {
      url: "https://eecs281a.eecs.umich.edu/",
      name: "Server A",
      capacity: 6,
    },
    {
      url: "https://eecs281b.eecs.umich.edu/",
      name: "Server B",
      capacity: 6,
    },
    {
      url: "https://eecs281c.eecs.umich.edu/",
      name: "Server C",
      capacity: 6,
    },
  ]);
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
      fetchServerStatus(server).then((status) => {
        setStatus((prev) => ({ ...prev, [server.url]: status }));
        setInFlight((prev) => ({ ...prev, [server.url]: false }));
      });
    });
  }, [servers, status, inFlight]);

  return (
    <div className="min-h-screen">
      <Header servers={servers} status={status} setStatus={setStatus} />
      <Wrapper>
        <h2 className="text-center text-2xl">AG Servers</h2>
        {servers.map((server) =>
          status[server.url] ? (
            <a key={server.url} href={server.url}>
              <MainStatus
                title={server.name}
                description={status[server.url].reason}
                state={status[server.url].state}
              ></MainStatus>
            </a>
          ) : (
            <MainStatusSkeleton key={server.url} />
          ),
        )}
      </Wrapper>
    </div>
  );
}
