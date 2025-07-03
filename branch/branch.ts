import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("branch", { migrations: "./migrations" });

interface Branch {
  id: number;
  name: string;
  branch_id: string;
  address?: string;
  phone_number?: string;
  open_hour: string;
  close_hour: string;
}

interface ListResponse {
  branches: Branch[];
}

export const listBranch = api(
  { expose: true, method: "GET", path: "/branch" },
  async (): Promise<ListResponse> => {
    const rows = db.query`
        SELECT id, name, branch_id, address, phone_number, open_hour, close_hour
        FROM branches`;

    const branches: Branch[] = [];
    for await (const row of rows) {
      branches.push({
        id: row.id,
        name: row.name,
        branch_id: row.branch_id,
        address: row.address,
        phone_number: row.phone_number,
        open_hour: row.open_hour,
        close_hour: row.close_hour,
      });
    }

    return { branches };
  }
);
