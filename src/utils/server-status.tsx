// Type definition for a single server status
export type Status =
  | {
      status: "operational" | "degraded";
      reason: string;
      is_active: boolean;
      is_final_grading: boolean;
      num_grading: number;
      num_pending: number;
    }
  | {
      status: "down";
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
        status: "down",
        reason: error,
      };
    }

    const data = await response.json();

    let status: Status["status"] = "operational";
    let reason = "Operational";

    if (data.is_final_grading) {
      status = "degraded";
      reason = "Final grading in progress";
    } else if (!data.is_active) {
      status = "degraded";
      reason = "Submission manually disabled";
    } else if (data.num_grading + data.num_pending >= server.capacity) {
      status = "degraded";
      reason = "Busy";
    }

    return {
      status,
      reason,
      is_active: data.is_active,
      is_final_grading: data.is_final_grading,
      num_grading: data.num_grading,
      num_pending: data.num_pending,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "down",
      reason: `Cannot reach server from your computer`,
    };
  }
}
