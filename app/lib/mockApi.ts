
// Helper to simulate latency in API calls
export async function delay(min = 300, max = 1200) {
    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * (max - min) + min)
    );
}

// Helper to simulate random failures (20% chance of failure)
export function mayFail() {
  const rand = Math.random();
  if (rand < 0.2) {
    throw new Error('Network error');
  }
}