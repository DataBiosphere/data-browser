import fs from "fs";
import { GetStaticPropsContext } from "next";
import pathTool from "path";
import { config } from "../../config/config";
import { CONTENT_FOLDER_NAME } from "./constants";

/**
 * Returns the path to the "content" directory.
 * @returns path to the "content" directory.
 */
export function getContentPathname(): string | undefined {
  const { contentDir } = config();
  if (!contentDir) {
    return;
  }
  return pathTool.join(process.cwd(), "/app/", CONTENT_FOLDER_NAME, contentDir);
}

/**
 * Returns the path and filename to the "content" file.
 * @param dirPath - Directory path.
 * @param slug - Slug.
 * @returns the filename path.
 */
export function getMarkdownPathname(dirPath: string, slug: string[]): string {
  return pathTool.join(dirPath, slug.join("/") + ".mdx");
}

/**
 * Returns the slug, as string array.
 * @param context - Static props context.
 * @returns slug.
 */
export function getSlug(context: GetStaticPropsContext): string[] | undefined {
  const { slug } = context.params || {};
  if (!slug) {
    return;
  }
  return Array.isArray(slug) ? slug : [slug];
}

/**
 * Returns true if the content exists.
 * @param dirPath - Directory path.
 * @param slug - Slug.
 * @returns true if the content exists.
 */
export function isContentPathnameExists(
  dirPath?: string,
  slug?: string[]
): boolean {
  if (!dirPath || !slug) {
    return false;
  }
  const markdownPathname = getMarkdownPathname(dirPath, slug);
  return fs.existsSync(markdownPathname);
}
