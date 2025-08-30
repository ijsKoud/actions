import { z } from "zod";

const configSchema = z.object({
  tests: z.object({
    enabled: z.boolean().default(false),
    script: z.string().default(""),
  })
})

export function validateConfig(config: unknown) {
  const results = configSchema.safeParse(config);
  if (!results.success) {
    throw new Error(`Invalid config: ${results.error}`);
  }
  
  return results.data;
}
