import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./HomepageFeatures/styles.module.css";

/* ------------------------------------------------------------------ */
/*  Where to Begin                                                     */
/* ------------------------------------------------------------------ */

type BeginItem = {
  title: string;
  href: string;
  description: ReactNode;
};

const BeginList: BeginItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started/overview",
    description: (
      <>
        Platform overview, core concepts, and how Glassbox fits into AI-biology
        pipelines. Recommended for first-time users and decision-makers
        evaluating the system.
      </>
    ),
  },
  {
    title: "PreFlight UI",
    href: "/docs/preflight-ui/overview",
    description: (
      <>
        The verification gateway before analysis. PreFlight validates inputs,
        checks program readiness, and ensures a run meets required data and
        configuration standards before entering computational diligence. Use
        this section when preparing a program for analysis.
      </>
    ),
  },
  {
    title: "Computational Safety Diligence",
    href: "/docs/computational-safety-diligence/overview",
    description: (
      <>
        The core Glassbox analysis engine. This section explains how
        computational diligence is executed, what each module evaluates, and how
        to interpret outputs such as failure-mode ontology, translational risk
        signals, physics and safety checks, evidence-linked findings, and the
        CB-TRI risk index. This is the primary documentation for running and
        interpreting audits.
      </>
    ),
  },
  {
    title: "Add-Ons",
    href: "/docs/add-ons/overview",
    description: (
      <>
        Optional capability layers that extend the core workflow. Each module
        answers a <strong>specific, bounded question</strong> and integrates
        directly with the primary decision artifact. Examples include IP /
        Freedom-to-Operate analysis, extended target validation modules, and
        additional diligence signals.
      </>
    ),
  },
  {
    title: "Deployment & Operations",
    href: "/docs/deployment-and-operations/overview",
    description: (
      <>
        Infrastructure and operational guidance. Includes Kubernetes deployment,
        configuration and environment setup, runtime architecture, artifact
        storage and access, and operational best practices. Recommended for
        platform operators and technical administrators.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Product Surfaces                                                   */
/* ------------------------------------------------------------------ */

type SurfaceItem = {
  title: string;
  description: string;
};

const SurfaceList: SurfaceItem[] = [
  {
    title: "PreFlight Verification",
    description:
      "Input validation and run readiness checks before analysis begins.",
  },
  {
    title: "Computational Safety Diligence",
    description:
      "The deterministic analysis system that generates the final decision artifact.",
  },
  {
    title: "Add-On Modules",
    description:
      "Specialized analytical layers that extend the core diligence workflow.",
  },
];

/* ------------------------------------------------------------------ */
/*  Reading Paths                                                      */
/* ------------------------------------------------------------------ */

type ReadingPath = {
  persona: string;
  path: string;
};

const ReadingPaths: ReadingPath[] = [
  {
    persona: "New user",
    path: "Getting Started → PreFlight UI → Computational Safety Diligence",
  },
  {
    persona: "Technical operator",
    path: "Deployment & Operations → PreFlight UI → Reference sections",
  },
  {
    persona: "Decision-maker",
    path: "Getting Started → Computational Safety Diligence → Trust & Security",
  },
];

/* ------------------------------------------------------------------ */
/*  What the System Produces                                           */
/* ------------------------------------------------------------------ */

const ArtifactItems: string[] = [
  "Reproducible analysis outputs",
  "Evidence-linked findings",
  "Failure-mode projections",
  "Translational Risk Index (CB-TRI)",
  "Decision-ready summary materials",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HomepageFeatureSection(): ReactNode {
  return (
    <>
      {/* ---- Intro ---- */}
      <section className={styles.features}>
        <div className="container">
          <p className={styles.introText}>
            The platform converts AI-generated molecular programs into{" "}
            <strong>deterministic, evidence-linked risk artifacts</strong>{" "}
            before capital deployment or wet-lab execution.
          </p>
          <p className={styles.introText}>
            This documentation explains how to prepare inputs, run verification
            workflows, interpret outputs, and operate the platform in production
            environments.
          </p>
          <p className={styles.introMuted}>
            Start here if you are deploying, operating, or evaluating Glassbox
            Bio.
          </p>
        </div>
      </section>

      {/* ---- Where to Begin ---- */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <div className="section-eyebrow">Where to Begin</div>
            <Heading as="h2" className="section-headline">
              Use the documentation based on where you are in the workflow.
            </Heading>
          </div>
          <div className={styles.beginGrid}>
            {BeginList.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={styles.beginCard}
              >
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Product Surfaces ---- */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <div className="section-eyebrow">Product Surfaces</div>
            <Heading as="h2" className="section-headline">
              Glassbox Bio consists of three primary operational surfaces.
            </Heading>
          </div>
          <div className={styles.featureGrid}>
            {SurfaceList.map((item) => (
              <div key={item.title} className={styles.featureCard}>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Suggested Reading Paths ---- */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <div className="section-eyebrow">Suggested Reading Paths</div>
          </div>
          <div className={styles.featureGrid}>
            {ReadingPaths.map((rp) => (
              <div key={rp.persona} className={styles.featureCard}>
                <Heading as="h3">{rp.persona}</Heading>
                <p>{rp.path}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What the System Produces ---- */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionIntro}>
            <div className="section-eyebrow">What the System Produces</div>
            <Heading as="h2" className="section-headline">
              Every Glassbox run produces a structured verification artifact.
            </Heading>
          </div>
          <ul className={styles.artifactList}>
            {ArtifactItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.introMuted}>
            The artifact is designed to support{" "}
            <strong>investment, research, and experimental decisions</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
