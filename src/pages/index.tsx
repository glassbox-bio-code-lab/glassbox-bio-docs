import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import DocSidebarDesktopContent from "@theme/DocSidebar/Desktop/Content";
import HomepageFeatureSection from "@site/src/components/HomepageFeatureSection";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

type DocsSidebarDataModule = {
  version?: {
    docsSidebars?: {
      docsSidebar?: PropSidebarItem[];
    };
  };
};

type WebpackContextModule<T> = {
  keys(): string[];
  (id: string): T;
};

type WebpackRequire = NodeRequire & {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
  ): WebpackContextModule<DocsSidebarDataModule>;
};

function loadDocsSidebarItems(): PropSidebarItem[] {
  const docsSidebarContext = (require as WebpackRequire).context(
    "@generated/docusaurus-plugin-content-docs/default/p",
    false,
    /^\.\/docs-.*\.json$/,
  );

  for (const modulePath of docsSidebarContext.keys()) {
    const module = docsSidebarContext(modulePath);
    const sidebar = module.version?.docsSidebars?.docsSidebar;

    if (sidebar) {
      return sidebar;
    }
  }

  throw new Error("Unable to locate generated docs sidebar data.");
}

const docsSidebarItems = loadDocsSidebarItems();

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const supportPageUrl = String(
    siteConfig.customFields?.supportPageUrl ||
      "https://www.glassbox-bio.com/contact",
  );

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
          Glassbox Bio Documentation
        </Heading>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
          Verification infrastructure for AI-designed biology.
        </p>
        <div className={styles.buttons}>
          <Link className="btn-primary" to="/docs">
            Open documentation
          </Link>
          <Link className="btn-outline" to={supportPageUrl}>
            Open support chat
          </Link>
          <Link
            className="btn-ghost"
            to="https://github.com/glassbox-bio-code-lab"
          >
            View repository
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className={clsx("theme-doc-sidebar-container", styles.homeSidebar)}>
      <div className={styles.homeSidebarViewport}>
        <DocSidebarDesktopContent
          path={pathname === "/" ? "/docs/" : pathname}
          sidebar={docsSidebarItems}
        />
      </div>
    </aside>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Verification infrastructure for AI-designed biology. Prepare inputs, run verification workflows, interpret outputs, and operate the platform in production."
    >
      <div className={styles.homeLayout}>
        <HomepageSidebar />
        <div className={styles.homeMain}>
          <HomepageHeader />
          <main>
            <HomepageFeatureSection />
          </main>
        </div>
      </div>
    </Layout>
  );
}
