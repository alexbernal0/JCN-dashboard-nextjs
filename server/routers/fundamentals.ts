import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getFundamentals } from "../motherduck";

export const fundamentalsRouter = router({
  /**
   * Get fundamentals data for given stock tickers
   */
  getByTickers: publicProcedure
    .input(
      z.object({
        tickers: z.array(z.string()),
      })
    )
    .query(async ({ input }) => {
      try {
        const data = await getFundamentals(input.tickers);
        return {
          success: true,
          data,
        };
      } catch (error) {
        console.error("Error fetching fundamentals:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          data: [],
        };
      }
    }),
});
