import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const supportPageUrl = String(
    siteConfig.customFields?.supportPageUrl ||
      'https://www.glassbox-bio.com/support',
  );

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link className="btn-primary" to="/docs">
            Open documentation
          </Link>
          <Link className="btn-outline" to={supportPageUrl}>
            Open support chat
          </Link>
          <Link className="btn-ghost" to="https://github.com/ai-wes/glassbox_crud_api">
            View repository
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Project documentation site powered by markdown files in the repository docs directory, with support routed to the main Glassbox website.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
