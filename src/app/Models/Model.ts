export interface ServerResponse {
    code: number;
    idString: string | null;
    idInt64: string | null;
    data: any | null;
    succeeded: boolean;
    errors: string[] | null;
    message: string | null;
    correlationId: string | null;
  }