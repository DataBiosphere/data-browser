import fs from "fs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { readDir, readFile } from "../../app/utils/tsvParser";

export const writeAsJSON = async function writeFile(
  fileName: string,
  obj: unknown
): Promise<void> {
  console.log(fileName);
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- why is this necessary? //TODO
  fs.writeFile(fileName, JSON.stringify(obj, null, 2), () => {});
};

/**
 * Timeout to delay fetch.
 *
 * @param timer - ms to delay.
 * @returns {Promise<unknown>} the promise that resoves when the timeout is over.
 */
export async function delayFetch(timer: number): Promise<unknown> {
  return new Promise((r) => setTimeout(r, timer));
}

/**
 * Reads and serializes each MDX files from the given directory,
 * and returns a map key-value pair (file) name and corresponding serialized source.
 * @param dir - Directory.
 * @returns key-value pair (file) name and mdx source.
 */
export async function getMDXByFilename(
  dir: string
): Promise<Map<string, MDXRemoteSerializeResult>> {
  const mdxSourceByFilename: Map<string, MDXRemoteSerializeResult> = new Map();
  // Read the directory file names.
  const fileNames = (await readDir(dir)) || [];
  // Read each file and serialize the contents.
  for (const fileName of fileNames) {
    const file = await readFile(`${dir}/${fileName}`);
    if (!file) {
      throw new Error(`File ${fileName} not found`);
    }
    const mdxSource = await serialize(file, {
      mdxOptions: { development: false }, // See https://github.com/hashicorp/next-mdx-remote/issues/307#issuecomment-1363415249 and https://github.com/hashicorp/next-mdx-remote/issues/307#issuecomment-1378362096.
    });
    const name = fileName.split(".")[0].toLowerCase();
    mdxSourceByFilename.set(name, mdxSource);
  }
  return mdxSourceByFilename;
}
