import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "./constants";

const configSchema = z.object({
  language: z.enum(SUPPORTED_LANGUAGES),
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
