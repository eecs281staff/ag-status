// Type definition for a single server status
export type Status =
  | {
      state: "operational" | "degraded";
      reason: string;
      is_active: boolean;
      is_final_grading: boolean;
      num_grading: number;
      num_pending: number;
    }
  | {
      state: "down";
      reason: string;
    };

// Type definition for a single server
export type Server = {
  url: string;
  name: string;
  capacity: number; // max number of concurrent grading jobs
};

// Type definition for server -> status mapping
export type ServerStatus = Record<string, Status>;

export const LOAD_THRESHOLDS = [
  { thres: 0.5, grading: "text-cyan-500", pending: "text-cyan-500" },
  { thres: 1, grading: "text-amber-400", pending: "text-cyan-500" },
  { thres: 1.5, grading: "text-rose-400", pending: "text-cyan-500" },
  { thres: 5, grading: "text-rose-400", pending: "text-amber-400" },
];

export async function fetchServerStatus(server: Server): Promise<Status> {
  try {
    const response = await Promise.race([
      fetch(`${server.url}server/status`),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 5000),
      ),
    ]);
    if (!response.ok) {
      // try to parse the response body as JSON, see if error key exists
      let error = "Server reported an error status";
      try {
        const data = await response.json();
        if (data.error) {
          error = data.error;
        }
      } catch {}

      return {
        state: "down",
        reason: error,
      };
    }

    const data = await response.json();

    let state: Status["state"] = "operational";
    let reason = "Operational";

    if (data.is_final_grading) {
      state = "degraded";
      reason = "Final grading in progress";
    } else if (!data.is_active) {
      state = "degraded";
      reason = "Submission manually disabled";
    } else if (
      (data.num_grading + data.num_pending) / server.capacity >=
      LOAD_THRESHOLDS.slice(-1)[0].thres
    ) {
      state = "degraded";
      reason = "Busy";
    }

    return {
      state,
      reason,
      is_active: data.is_active,
      is_final_grading: data.is_final_grading,
      num_grading: data.num_grading,
      num_pending: data.num_pending,
    };
  } catch (error) {
    console.error(error);
    return {
      state: "down",
      reason: `Unreachable from your computer`,
    };
  }
}
