import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry for make.fun news-image-20261122: copy the pre-rendered front-page
// image (entry.png, in this repository) to the output directory. The file is
// a JPEG by its first bytes, kept under the competition's entry.png name.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const here = new URL(".", import.meta.url);
const source = fileURLToPath(new URL("entry.png", here));
const target = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

const sourceSize = statSync(source).size;
const targetSize = statSync(target).size;
if (sourceSize !== targetSize) {
  throw new Error(
    `entry.png copy size mismatch: source ${sourceSize} bytes, output ${targetSize} bytes`,
  );
}

console.log(`Wrote ${target} (${targetSize} bytes)`);
