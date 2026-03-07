import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Glassbox CRUD API Docs",
  tagline:
    "Markdown-driven docs for deployment, operations, and API workflows.",
  favicon: "img/favicon.ico",
  customFields: {
    supportPageUrl:
      process.env.DOCS_SUPPORT_PAGE_URL ||
      "https://www.glassbox-bio.com/support",
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
  organizationName: "ai-wes",
  projectName: "glassbox_crud_api",

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
          editUrl: ({ docPath }) =>
            `https://github.com/ai-wes/glassbox_crud_api/tree/main/docs/${docPath}`,
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
    navbar: {
      title: "GLASSBOX BIO",
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
            "https://www.glassbox-bio.com/support",
          label: "Support Chat",
          position: "right",
        },
        {
          href: "https://github.com/ai-wes/glassbox_crud_api",
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
              label: "Overview",
              to: "/docs/",
            },
            {
              label: "Deployment Guide",
              to: "/docs/DEPLOYMENT_GUIDE",
            },
            {
              label: "API Test Commands",
              to: "/docs/API_TEST_COMMANDS",
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
                "https://www.glassbox-bio.com/support",
            },
            {
              label: "GitHub",
              href: "https://github.com/ai-wes/glassbox_crud_api",
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
