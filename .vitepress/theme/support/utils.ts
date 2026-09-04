import { inBrowser, withBase } from "vitepress";
import { useData } from "../composables/data";

const DRIVE_LETTER_REGEX = /^[a-z]:/i;
const HASH_OR_QUERY_RE = /[?#].*$/;
const HASH_RE = /#.*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;
// oxlint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
export const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;

export const ensureStartingSlash = (path: string): string => (path.startsWith("/") ? path : `/${path}`);

// https://github.com/sindresorhus/escape-string-regexp/blob/ba9a4473850cb367936417e97f1f2191b7cc67dd/index.js
export const escapeRegExp = (str: string): string => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");

export const isExternal = (path: string): boolean => EXTERNAL_URL_RE.test(path);

export const normalize = (path: string): string =>
  decodeURI(path).replace(HASH_OR_QUERY_RE, "").replace(INDEX_OR_EXT_RE, "$1");

export function isActive(
  currentPath: string,
  currentHash: string,
  matchPath: string,
  asRegex: boolean = false,
  skipHashCheck: boolean = false
): boolean {
  const path = normalize(`/${currentPath}`);

  if (asRegex) return new RegExp(matchPath).test(path);
  if (skipHashCheck) return true;
  if (normalize(matchPath) !== path) return false;

  const hashMatch = matchPath.match(HASH_RE);
  if (hashMatch) return currentHash === hashMatch[0];

  return true;
}

export function normalizeLink(url: string): string {
  const { pathname, search, hash, protocol } = new URL(url, "http://a.com");

  if (isExternal(url) || url.startsWith("#") || !protocol.startsWith("http") || !treatAsHtml(pathname)) return url;

  const { site } = useData();

  const normalizedPath =
    pathname.endsWith("/") || pathname.endsWith(".html")
      ? url
      : url.replace(
          /(?:(^\.+)\/)?.*$/,
          `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? "" : ".html")}${search}${hash}`
        );

  return withBase(normalizedPath);
}

/**
 * Converts a url path to the corresponding js chunk filename.
 */
export function pathToFile(path: string) {
  let pagePath = path.replace(/\.html$/, "");
  pagePath = decodeURIComponent(pagePath);
  pagePath = pagePath.replace(/\/$/, "/index"); // /foo/ -> /foo/index
  if (import.meta.env.DEV) {
    // always force re-fetch content in dev
    pagePath += `.md?t=${Date.now()}`;
  } else {
    // in production, each .md file is built into a .md.js file following
    // the path conversion scheme.
    // /foo/bar.html -> ./foo_bar.md
    if (inBrowser) {
      const base = import.meta.env.BASE_URL;
      pagePath = sanitizeFileName(pagePath.slice(base.length).replace(/\//g, "_") || "index") + ".md";
      // client production build needs to account for page hash, which is
      // injected directly in the page's html
      let pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      if (!pageHash) {
        pagePath = pagePath.endsWith("_index.md") ? pagePath.slice(0, -9) + ".md" : pagePath.slice(0, -3) + "_index.md";
        pageHash = __VP_HASH_MAP__[pagePath.toLowerCase()];
      }
      if (!pageHash) return null;
      pagePath = `${base}${__ASSETS_DIR__}/${pagePath}.${pageHash}.js`;
    } else {
      // ssr build uses much simpler name mapping
      pagePath = `./${sanitizeFileName(pagePath.slice(1).replace(/\//g, "_"))}.md.js`;
    }
  }

  return pagePath;
}

function sanitizeFileName(name: string): string {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";

  return (
    driveLetter +
    name
      .slice(driveLetter.length)
      .replace(INVALID_CHAR_REGEX, "_")
      .replace(/(^|\/)_+(?=[^/]*$)/, "$1")
  );
}

export function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeoutId: NodeJS.Timeout;
  let called = false;

  return () => {
    if (timeoutId) clearTimeout(timeoutId);

    if (!called) {
      fn();
      called = true;
      if (called) {
        setTimeout(() => (called = false), delay);
      }
    } else timeoutId = setTimeout(fn, delay);
  };
}

const KNOWN_EXTENSIONS = new Set();
export function treatAsHtml(filename: string): boolean {
  if (KNOWN_EXTENSIONS.size === 0) {
    const extraExts =
      (typeof process === "object" && process.env?.VITE_EXTRA_EXTENSIONS) ||
      (import.meta as any).env?.VITE_EXTRA_EXTENSIONS ||
      "";

    // md, html? are intentionally omitted
    (
      "3g2,3gp,aac,ai,apng,au,avif,bin,bmp,cer,class,conf,crl,css,csv,dll," +
      "doc,eps,epub,exe,gif,gz,ics,ief,jar,jpe,jpeg,jpg,js,json,jsonld,m4a," +
      "man,mid,midi,mjs,mov,mp2,mp3,mp4,mpe,mpeg,mpg,mpp,oga,ogg,ogv,ogx," +
      "opus,otf,p10,p7c,p7m,p7s,pdf,png,ps,qt,roff,rtf,rtx,ser,svg,t,tif," +
      "tiff,tr,ts,tsv,ttf,txt,vtt,wav,weba,webm,webp,woff,woff2,xhtml,xml," +
      "yaml,yml,zip" +
      (extraExts && typeof extraExts === "string" ? "," + extraExts : "")
    )
      .split(",")
      .forEach((ext) => KNOWN_EXTENSIONS.add(ext));
  }

  const ext = filename.split(".").pop();

  return ext == null || !KNOWN_EXTENSIONS.has(ext.toLowerCase());
}

export function uniqBy<T>(array: T[], keyFn: (item: T) => any): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const k = keyFn(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
