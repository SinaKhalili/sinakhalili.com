function ensureEnvironmentVariables(variables: (string | undefined)[]) {
  return variables.map((variable, i) => {
    if (!variable) {
      const variableName = Object.keys(process.env).find(
        (key) => process.env[key] === variable
      );
      throw new Error(
        `Environment variable ${variableName} at index ${i} is not set`
      );
    }
    return variable;
  });
}

export const [SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY] =
  ensureEnvironmentVariables([
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  ]);
