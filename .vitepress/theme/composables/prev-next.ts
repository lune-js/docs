import { computed } from "vue";
import { getFlatSideBarLinks, getSidebar, type SidebarLink } from "../support/sidebar";
import { isActive, normalize, uniqBy } from "../support/utils";
import { useData } from "./data";

export function usePrevNext() {
  const { page, theme, frontmatter } = useData();

  return computed<{
    prev?: { text?: string; link?: string; target?: string; rel?: string };
    next?: { text?: string; link?: string; target?: string; rel?: string };
  }>(() => {
    const { relativePath } = page.value;
    const { docFooter, sidebar: sb } = theme.value;

    const getPrevNext = (value: any, candidate: SidebarLink) => {
      let text: string | undefined;
      let link: string | undefined;

      if (typeof value === "string") {
        text = value;
      } else if (typeof value === "object") {
        text = value.text;
        link = value.link;
      } else {
        text = candidate?.docFooterText ?? candidate?.text;
        link = candidate?.link;
      }

      return {
        text,
        link
      };
    };

    const sidebar = getSidebar(sb, relativePath);
    const links = getFlatSideBarLinks(sidebar);

    // ignore inner-page links with hashes
    const candidates = uniqBy(links, (link) => normalize(link.link));

    const index = candidates.findIndex((link) => {
      return isActive(page.value.relativePath, "", link.link, relativePath.includes("index.md"));
    });

    const prev = frontmatter.value.prev;
    const next = frontmatter.value.next;

    const hidePrev = (docFooter?.prev === false && !prev) || prev === false;
    const hideNext = (docFooter?.next === false && !next) || next === false;

    return {
      prev: hidePrev ? undefined : getPrevNext(prev, candidates[index - 1]),
      next: hideNext ? undefined : getPrevNext(next, candidates[index + 1])
    };
  });
}
