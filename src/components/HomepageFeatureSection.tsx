import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './HomepageFeatures/styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Markdown is the source of truth',
    description: (
      <>
        The site reads directly from the repository <strong>docs/</strong>{' '}
        directory, so the content you edit for the project is the content the
        site serves.
      </>
    ),
  },
  {
    title: 'Structured navigation',
    description: (
      <>
        Docusaurus generates the sidebar and doc routes automatically, turning
        the existing markdown files into a browsable documentation portal.
      </>
    ),
  },
  {
    title: 'Ready to publish',
    description: (
      <>
        You can run it locally for internal docs now, and later build static
        assets for deployment to Cloud Run, GitHub Pages, or any static host.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
}

export default function HomepageFeatureSection(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <div className="section-eyebrow">Documentation System</div>
          <Heading as="h2" className="section-headline">
            Static docs, structured navigation, routed support.
          </Heading>
          <p className="section-subline">
            The documentation portal stays fast and deployable on Vercel while
            customer support continues on the main Glassbox website.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
