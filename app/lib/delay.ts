
// Helper to simulate latency in API calls

export async function delay(min = 300, max = 1200) {
    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * (max - min) + min)
    );
}