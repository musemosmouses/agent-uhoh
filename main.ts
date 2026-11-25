import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One word an agent says when it has no idea what to do.
const AGENT_WORD = "spiraling";
const SHORTEST = 1;
const LONGEST = 99;

function guardEntry(candidate: string): string {
  const length = [...candidate].length;
  if (length < SHORTEST || length > LONGEST) {
    throw new Error(
      `entry must be ${SHORTEST}-${LONGEST} characters, got ${length}`,
    );
  }
  if (candidate.trim() === "") {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(candidate)) {
    throw new Error("entry must be a single word with no whitespace");
  }
  return candidate;
}

const finalEntry = guardEntry(AGENT_WORD);
const destination = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(destination, { recursive: true });
writeFileSync(join(destination, "entry.txt"), finalEntry, "utf8");
