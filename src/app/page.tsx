import Film from "@/components/cinematic/Film";
import Scene from "@/components/cinematic/Scene";
import {
  Eyebrow,
  Caption,
  Script,
  Heading,
  Meta,
  Weds,
  Divider,
} from "@/components/cinematic/Type";
import { scenes, wedding as w } from "@/data/scenes";

export default function Home() {
  return (
    <main>
      <Film unit={1.35}>
        {/* 1 · THE OFFICE */}
        <Scene {...scenes.office}>
          <Caption>It was just an ordinary day&hellip;</Caption>
        </Scene>

        {/* 2 · THE NOTIFICATION */}
        <Scene {...scenes.notification}>
          <Caption>&hellip;until one message changed everything.</Caption>
        </Scene>

        {/* 3 · THE REACTION */}
        <Scene {...scenes.reaction}>
          <Caption>She said yes.</Caption>
        </Scene>

        {/* 4 · THE TRAIN TO PAYYOLI (image pending) */}
        <Scene {...scenes.train}>
          <Caption>And so the journey begins&hellip;</Caption>
        </Scene>

        {/* 5 · PAYYOLI RAILWAY STATION */}
        <Scene {...scenes.station}>
          <Caption>Welcome to Payyoli.</Caption>
        </Scene>

        {/* 6 · THE WALK TO THE HOUSE (image pending) */}
        <Scene {...scenes.walk}>
          <Eyebrow>You&rsquo;re warmly invited</Eyebrow>
          <Caption>Come walk with us, all the way home. 💛</Caption>
        </Scene>

        {/* 7 · THE KERALA HOUSE — the names */}
        <Scene {...scenes.house}>
          <Eyebrow>With our families&rsquo; blessings</Eyebrow>
          <Heading>{w.groom}</Heading>
          <Weds />
          <Heading>{w.bride}</Heading>
        </Scene>

        {/* 8 · TRANSITION — aerial decorated venue (visual breath) */}
        <Scene {...scenes.transition} />

        {/* 9 · THE DECORATED GATE — venue */}
        <Scene {...scenes.gate}>
          <Eyebrow>The Celebration</Eyebrow>
          <Meta>📍 {w.venue}</Meta>
        </Scene>

        {/* 10 · INSIDE THE PANDAL — the date (Gregorian + Malayalam) */}
        <Scene {...scenes.pandal}>
          <Eyebrow>Save the Date</Eyebrow>
          <Divider mark="✦" />
          <Heading>{w.date}</Heading>
          <Script>{w.malayalamDate}</Script>
          <Meta>{w.muhurtham}</Meta>
        </Scene>

        {/* 11 · THE SACRED FIRE */}
        <Scene {...scenes.fire}>
          <Caption>Two souls. One fire. One forever.</Caption>
        </Scene>

        {/* 12 · THE CLOSING (image pending) */}
        <Scene {...scenes.closing}>
          <Eyebrow>Together with our families</Eyebrow>
          <Heading>
            {w.groom} &amp; {w.bride}
          </Heading>
          <Divider mark="✦ ✦ ✦" />
          <Caption>
            We&rsquo;d be honoured to have you share in our joy as two hearts
            become one.
          </Caption>
          <Meta>Your presence and blessings are the only gift we seek 💛</Meta>
        </Scene>
      </Film>
    </main>
  );
}
