import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link
          href="/home"
          className={styles.card}
        >
          <h2>
            Home <span>-&gt;</span>
          </h2>
          <p>Home, a place that we met at the beginning.</p>
        </Link>

        <Link
          href="/about"
          className={styles.card}
        >
          <h2>
            About <span>-&gt;</span>
          </h2>
          <p>What do you think about me?</p>
        </Link>

        <Link href="/contact"
          className={styles.card}
        >
          <h2>
            Contact <span>-&gt;</span>
          </h2>
          <p>Hangout sometimes?</p>
        </Link>

        <Link
          href="/task"
          className={styles.card}
        >
          <h2>
            Task <span>-&gt;</span>
          </h2>
          <p>
            There is so many task that we have to do.
          </p>
        </Link>
      </div>
    </main>
  )
}
