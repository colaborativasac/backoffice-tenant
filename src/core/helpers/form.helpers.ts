export function extractValidationErrors(errors: Record<string, string[]>): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [field, messages] of Object.entries(errors)) {
    result[field] = messages[0] ?? ''
  }

  return result
}
