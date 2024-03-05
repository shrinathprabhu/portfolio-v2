import type { Analytics } from "@useoutline/analytics";

export const useAnalytics = () =>
  useState<Analytics | null>("analytics", () => null);
