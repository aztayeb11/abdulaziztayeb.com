/* ==========================================================================
   SITE CONFIG — the only file you need to edit to finish the site.
   ========================================================================== */

/* ---- 1. YOUTUBE VIDEOS --------------------------------------------------
   Paste either the 11-character video ID or the full YouTube link between the
   quotes of `youtube`. Examples that both work:
       youtube: 'dQw4w9WgXcQ'
       youtube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
   - While `youtube` is empty, a slot falls back to its local `local` file (if
     it has one) and otherwise stays hidden for visitors.
   - Once ALL local videos have a YouTube ID you can delete the assets/videos
     folder and every `local:` line below to keep the repository small.
   - Preview empty slots while editing by opening the site with ?placeholders
     on the end of the address, e.g. http://localhost:8000/?placeholders
   -------------------------------------------------------------------------- */
window.SITE_VIDEOS = {
  /* Knight Night: teaser (top of the Knight Night case study) */
  'kn-teaser': {
    title: 'Knight Night teaser',
    youtube: '',
    local: 'assets/videos/kn-teaser.mp4',
    localRatio: '848/370',
    poster: 'assets/images/kn-teaser-poster-848.webp'
  },
  /* Knight Night: "Feel & atmosphere" section (four videos) */
  'atmosphere-1': { title: 'Knight Night: atmosphere 1', youtube: 'https://youtu.be/fIISRqMzr6g' },
  'atmosphere-2': { title: 'Knight Night: atmosphere 2', youtube: 'https://youtu.be/zpiLzdXxoqM' },
  'atmosphere-3': { title: 'Knight Night: atmosphere 3', youtube: 'https://youtu.be/yVFfJ0Q4go4' },
  'atmosphere-4': { title: 'Knight Night: atmosphere 4', youtube: 'https://youtu.be/XQOClBNK5qk' },

  /* Knight Night: combat videos (under "Combat that fits the setting") */
  'combat':        { title: 'Knight Night: combat', youtube: 'https://youtu.be/NziXtvCOuos' },
  'combo-showcase': { title: 'Knight Night: combo showcase', youtube: 'https://youtu.be/jvjFQw6ZY4c' },

  /* Knight Night: "Boss presentation & in-game cinematography" section (three videos) */
  'boss-showcase':       { title: 'Knight Night: boss showcase', youtube: 'https://youtu.be/i4ypS8u-Ip4' },
  'boss-presentation-1': { title: 'Knight Night: boss presentation 1', youtube: 'https://youtu.be/jH4AZBATj4U' },
  'boss-presentation-2': { title: 'Knight Night: boss presentation 2', youtube: 'https://youtu.be/nLf0eQlZEmE' },

  /* MASTERM1ND: networks cutscene (inside "The story") */
  'mm-cutscene': {
    title: 'MASTERM1ND networks cutscene',
    youtube: '',
    local: 'assets/videos/mm-network-cutscene.mp4',
    localRatio: '16/9',
    poster: 'assets/images/mm-cutscene-poster-1280.webp'
  }
};

/* ---- 2. SOCIAL LINKS ----------------------------------------------------
   Leave empty to hide the link. Paste the full profile address to show it
   in the Contact section.
   -------------------------------------------------------------------------- */
window.SITE_LINKS = {
  linkedin: '',   // e.g. 'https://www.linkedin.com/in/your-name'
  github: ''      // e.g. 'https://github.com/your-username'
};
