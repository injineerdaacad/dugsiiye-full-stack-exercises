export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Agent, setGlobalDispatcher } = await import("undici");
    // This sandbox has no IPv6 route; force fetch (used by the Neon driver)
    // to only ever attempt IPv4 so it can't hang on unreachable IPv6 candidates.
    setGlobalDispatcher(new Agent({ connect: { family: 4 } }));
  }
}
