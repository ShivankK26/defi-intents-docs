import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function IconOneApi(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10 7h4M10 12h4M10 17h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.2 4.9c.6-1 1.7-1.6 2.9-1.6h3.8c1.2 0 2.3.6 2.9 1.6l.9 1.5c.3.5.9.8 1.5.8h.5c1.2 0 2.2 1 2.2 2.2v8.2c0 1.2-1 2.2-2.2 2.2H5.2C4 20.8 3 19.8 3 18.6V10.4c0-1.2 1-2.2 2.2-2.2h.5c.6 0 1.2-.3 1.5-.8l.9-1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSwapsBridges(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 7h10v3H7V7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 14h10v3H7v-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 10l3 2 3-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDeveloperReady(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 18 3 12l6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 5.8 10.8 18.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type CardItem = {
  title: string;
  description: ReactNode;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  link?: {to: string; label: string};
};

const CardList: CardItem[] = [
  {
    title: 'One integration',
    description:
      'A single, consistent interface for swaps, bridges, and provider capabilities.',
    icon: IconOneApi,
  },
  {
    title: 'Swaps + bridges',
    description:
      'Route intents across DeFi providers so your app doesn’t need provider-specific logic.',
    icon: IconSwapsBridges,
  },
  {
    title: 'Developer-ready',
    description:
      'Clear request/response patterns and integration stability designed for production.',
    icon: IconDeveloperReady,
    link: {to: '/docs/how-it-works', label: 'How it works'},
  },
];

function Card({title, description, icon: Icon, link}: CardItem) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} aria-hidden="true">
        <Icon className={styles.icon} />
      </div>

      <Heading as="h3" className={styles.cardTitle}>
        {title}
      </Heading>
      <p className={styles.cardDescription}>{description}</p>

      {link ? (
        <div className={styles.cardLink}>
          <Link className="button button--secondary button--sm" to={link.to}>
            {link.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.cardsGrid}>
          {CardList.map((item) => (
            <Card key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
