import { writeFileSync, readFileSync, existsSync } from "fs";

const TARGET_TOTAL = 1400;

const ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Fullstack Engineer",
  "Data Engineer",
  "Product Designer",
];

const STAGES = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

const FIRST_NAMES = [
  "Alex","Jordan","Taylor","Chris","Morgan","Jamie","Riley","Casey",
  "Avery","Sam","Drew","Cameron","Quinn","Parker","Reese"
];

const LAST_NAMES = [
  "Smith","Johnson","Garcia","Martinez","Lee","Brown","Davis","Miller",
  "Wilson","Anderson","Moore","Taylor","Thomas"
];

const rand = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const randomName = () => `${rand(FIRST_NAMES)} ${rand(LAST_NAMES)}`;
const randomRole = () => rand(ROLES);

/**
 * Funnel probabilities
 * These matter — they show realism
 */
function generateStageFlow() {
  const flow = ["Applied"];

  if (Math.random() < 0.75) flow.push("Screening");
  if (Math.random() < 0.5) flow.push("Interview");
  if (Math.random() < 0.25) flow.push("Offer");

  if (flow.includes("Offer")) {
    flow.push(Math.random() < 0.7 ? "Hired" : "Rejected");
  } else if (flow.length > 1 && Math.random() < 0.4) {
    flow.push("Rejected");
  }

  return flow;
}

function generateActivities(candidateId: number, flow: string[]) {
  let timestamp =
    Date.now() -
    Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000);

  return flow.map((to, index) => {
    timestamp += Math.floor(Math.random() * 2 * 24 * 60 * 60 * 1000);

    return {
      id: `act_${candidateId}_${index + 1}`,
      from: index === 0 ? null : flow[index - 1],
      to,
      timestamp,
    };
  });
}

// Read existing candidates
const filePath = "./candidates.json";
let existingCandidates: any[] = [];

try {
  if (existsSync(filePath)) {
    const existingData = readFileSync(filePath, "utf8");
    existingCandidates = JSON.parse(existingData);
    console.log(`Found ${existingCandidates.length} existing candidates`);
  }
} catch (error) {
  console.log("No existing candidates file found, starting fresh");
}

const currentCount = existingCandidates.length;
const candidatesToGenerate = TARGET_TOTAL - currentCount;

if (candidatesToGenerate <= 0) {
  console.log(`Already have ${currentCount} candidates, target is ${TARGET_TOTAL}. No new candidates needed.`);
  process.exit(0);
}

console.log(`Generating ${candidatesToGenerate} additional candidates...`);

const newCandidates = [];

for (let i = 1; i <= candidatesToGenerate; i++) {
  const candidateId = currentCount + i;
  const flow = generateStageFlow();
  const activities = generateActivities(candidateId, flow);

  newCandidates.push({
    id: String(candidateId),
    name: randomName(),
    role: randomRole(),
    stage: flow[flow.length - 1],
    activities,
  });
}

// Combine existing and new candidates
const allCandidates = [...existingCandidates, ...newCandidates];

writeFileSync(
  filePath,
  JSON.stringify(allCandidates, null, 2)
);

console.log(`✅ Generated ${candidatesToGenerate} new candidates. Total: ${allCandidates.length} candidates`);
