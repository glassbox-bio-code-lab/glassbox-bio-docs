import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Glassbox Bio Documentation",
  tagline:
    "Markdown-driven docs for deployment, operations, and API workflows.",
  favicon: "img/favicon.ico",
  customFields: {
    supportPageUrl:
      process.env.DOCS_SUPPORT_PAGE_URL ||
      "https://www.glassbox-bio.com/contact",
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.glassbox-bio.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "glassbox-bio-code-lab",
  projectName: "glassbox_docs_site",

  onBrokenLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          sidebarItemsGenerator: async ({
            defaultSidebarItemsGenerator,
            ...args
          }) => {
            const sidebarItems = await defaultSidebarItemsGenerator(args);

            const collapseCategories = (items: typeof sidebarItems) =>
              items.map((item) => {
                if (item.type !== "category") {
                  return item;
                }

                return {
                  ...item,
                  collapsed: true,
                  items: collapseCategories(item.items),
                };
              });

            return collapseCategories(
              sidebarItems.filter(
                (item) =>
                  !(
                    item.type === "doc" &&
                    (item.id === "index" || item.id === "intro")
                  ),
              ),
            );
          },
          editUrl: ({ docPath }) => `https://github.com/glassbox-bio-code-lab`,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "",
      logo: {
        alt: "Glassbox Bio",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href:
            process.env.DOCS_SUPPORT_PAGE_URL ||
            "https://www.glassbox-bio.com/contact",
          label: "Support Chat",
          position: "right",
        },
        {
          href: "https://github.com/glassbox-bio-code-lab",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Docs Home",
              to: "/docs/",
            },
            {
              label: "Getting Started",
              to: "/docs/getting-started",
            },
            {
              label: "Deployment & Operations",
              to: "/docs/deployment-and-operations",
            },
            {
              label: "Reference",
              to: "/docs/reference",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Support Chat",
              href:
                process.env.DOCS_SUPPORT_PAGE_URL ||
                "https://www.glassbox-bio.com/contact",
            },
            {
              label: "GitHub",
              href: "https://github.com/glassbox-bio-code-lab",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Glassbox Bio. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
