type Analytics = {
  start: () => void;
  stop: () => void;
  sendEvent: (
    event: string,
    data?: Record<string, string | number> | undefined
  ) => void;
  setData: (data: Record<string, string | number>) => void;
} | null;

export const useAnalytics = () => useState<Analytics>("analytics", () => null);
