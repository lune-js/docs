import type { PageData, UserConfig } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";

/**
 * Custom Nav
 * -------------------------------------------------------------------------- */

type NavItemChildren = {
  text?: string;
  items: NavItemWithLink[];
};

export type NavItemWithChildren = {
  text?: string;
  items: (NavItemChildren | NavItemWithLink)[];

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   */
  activeMatch?: string;
};

export type NavItemWithLink = {
  text: string;
  link: string | ((payload: PageData) => string);
  items?: never;

  /**
   * `activeMatch` is expected to be a regex string. We can't use actual
   * RegExp object here because it isn't serializable
   */
  activeMatch?: string;
  rel?: string;
  target?: string;
  noIcon?: boolean;
  subNav?: NavItemWithLink[];
};

export type NavItemWithLinkAndSubNav = {
  text: string;
  link: string;
  subNav: NavItemWithLink[];
};

export type NavItem = NavItemWithChildren | NavItemWithLink | NavItemWithLinkAndSubNav;

/**
 * Search
 * -------------------------------------------------------------------------- */

type FooterTranslations = {
  selectText?: string;
  selectKeyAriaLabel?: string;
  navigateText?: string;
  navigateUpKeyAriaLabel?: string;
  navigateDownKeyAriaLabel?: string;
  closeText?: string;
  closeKeyAriaLabel?: string;
};

export interface LocalSearchTranslations {
  button?: ButtonTranslations;
  modal?: ModalTranslations;
}

export interface ButtonTranslations {
  buttonText?: string;
  buttonAriaLabel?: string;
}

export interface ModalTranslations {
  displayDetails?: string;
  resetButtonTitle?: string;
  backButtonTitle?: string;
  noResultsText?: string;
  footer?: FooterTranslations;
}

/**
 * Custom Config
 * -------------------------------------------------------------------------- */

export interface ThemeConfig extends DefaultTheme.Config {
  nav: NavItem[];
}
export type VPConfig = UserConfig<NoInfer<ThemeConfig>>;
