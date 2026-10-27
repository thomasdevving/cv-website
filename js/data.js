/*
 * All CV content lives here. Edit this file to update the site;
 * main.js renders everything from this object.
 */
window.CV = {
  name: "Thomas Nguyen",
  handle: "thomasdevving",
  location: "Amsterdam, NL",
  role: "AI Engineer @ Schiphol Express",
  study: "BSc Artificial Intelligence @ UvA",
  headline: "I build systems that show their work.",
  intro:
    "AI engineer and Artificial Intelligence student at the University of Amsterdam. I turn complex ideas into practical, secure and scalable systems: AI agents, workflow automation and security tooling that prove what they claim.",
  links: {
    github: "https://github.com/thomasdevving",
    linkedin: "https://www.linkedin.com/in/thomas-nguyen-75447329a/",
  },

  principles: [
    {
      k: "Agents decide. Code computes.",
      v: "LLMs choose what to look at. Every number comes from deterministic, testable code, never from a model's guess.",
    },
    {
      k: "Verify independently.",
      v: "A second checker, written separately, cross-examines the first. A failed check can't be argued away.",
    },
    {
      k: "Honest by design.",
      v: "Results carry their own scope. When the evidence isn't there, the output says “could not establish” instead of sounding reassuring.",
    },
  ],

  disciplines: [
    {
      n: "01",
      t: "AI agents & automation",
      d: "Multi-agent workflows and business-process automation with Python, TypeScript, n8n and Microsoft Azure, built on Agent Framework, Claude, OpenAI and Bedrock.",
    },
    {
      n: "02",
      t: "Security & privacy",
      d: "DeFi control analysis, Kubernetes NetworkPolicy remediation and privacy-first product design, verified with independent checkers and runtime proof.",
    },
    {
      n: "03",
      t: "On-chain tooling",
      d: "Solana upgrade-impact analysis in Rust on LiteSVM, Token-2022 and Meteora DLMM checks, and EVM mainnet-fork proofs with Foundry.",
    },
    {
      n: "04",
      t: "Product & web",
      d: "Full-stack products and client sites with Next.js, Expo, Supabase and Cloudflare Workers, plus a native iOS app in SwiftUI.",
    },
  ],

  stats: [
    { v: 2, s: "×", l: "First place at Common S3nse" },
    { v: 8, s: "", l: "Hackathons in 2026" },
    { v: 400, s: "+", l: "Commits this year" },
    { v: 360, s: "+", l: "Automated tests written" },
  ],

  experience: [
    {
      when: "Oct 2026 — Now",
      role: "Building",
      org: "plsteach.me",
      meta: "Founder",
      d: "A practical-skills learning platform with AI camera coaching, a reviewed teacher studio and organisation training. Next.js on Cloudflare Workers, Supabase and OpenAI vision.",
      tags: ["Product", "AI", "Full-stack"],
    },
    {
      when: "Jun 2026 — Now",
      role: "AI Engineer",
      org: "Schiphol Express",
      meta: "Part-time · Schiphol · On-site",
      d: "Building automations inside business processes in the Microsoft Azure environment, implementing AI tools while meeting a wide range of privacy and security requirements.",
      tags: ["Azure", "Python", "TypeScript"],
    },
    {
      when: "Jul 2026 — Now",
      role: "Strategic Partner — Inter Compass",
      org: "Drost Project Groep B.V.",
      meta: "Hybrid",
      d: "Designed and developed intake and CRM structures for the real-estate sector, focused on process optimisation, data flows and scalability. Built AI agents that automate workflows and streamline operations.",
      tags: ["Agents", "Real estate", "Data"],
    },
    {
      when: "Nov 2025 — Jun 2026",
      role: "AI Automation Specialist",
      org: "Big Push",
      meta: "Part-time · Amsterdam",
      d: "Developed software with Python, n8n and other tools to automate business processes with AI, and learned how B2B relationships and organisations really operate.",
      tags: ["n8n", "Python", "Automation"],
    },
    {
      when: "Apr — May 2026",
      role: "Teacher & Exam Trainer",
      org: "AthenaSchool",
      meta: "Part-time · On-site",
      d: "Taught lessons and exam-preparation sessions, explaining complex concepts to groups clearly and engagingly.",
      tags: ["Teaching", "Communication"],
    },
  ],

  education: [
    { when: "2025 — 2028", t: "BSc Artificial Intelligence", o: "University of Amsterdam" },
    { when: "2024 — 2025", t: "BSc Econometrics & Data Science", o: "University of Amsterdam" },
  ],

  extras: [
    { when: "Jul 2026 — Now", t: "Ambassador, Amsterdam", o: "Hackathon Hub · Volunteering" },
    { when: "Apr 2024", t: "C2 Proficiency", o: "Cambridge English" },
    { when: "May 2021", t: "Goethe-Zertifikat B1", o: "Goethe-Institut" },
  ],

  projects: [
    {
      id: "ripcord",
      images: [
        { src: "assets/img/photo-pitch.webp", alt: "Thomas presenting Ripcord at the Common S3nse Top 10 Showcase" },
        { src: "assets/img/photo-award.webp", alt: "Thomas on stage at Common S3nse as Ripcord wins Best Security" },
        { src: "assets/img/ripcord-report.webp", alt: "Ripcord report for Compound III cUSDCv3: a two-day notice route against $540M movable on a fork" },
        { src: "assets/img/ripcord-index.webp", alt: "Ripcord calibration set across 26 mainnet protocols" },
      ],
      name: "Ripcord",
      year: "2026",
      kind: "Hackathon",
      award: "1st · Security track + 1st · Mobula challenge",
      builtFor: "Common S3nse by CryptoCanal, built solo",
      line: "Can users exit before the people in control can act?",
      summary:
        "Audits check code for bugs, not who controls upgrades, minting or fund movement. Give Ripcord a contract address and it reconstructs the protocol's control structure, identifies sensitive powers, follows the authority behind them and measures the shortest enforced warning users get: the Exit Window.",
      highlights: [
        "Opens a real position on a pinned mainnet fork, proves a withdrawal works, executes the privileged action, then retries the withdrawal to prove whether the exit can be closed",
        "Detects proxy patterns, owners and AccessControl roles, and follows authority chains three levels deep",
        "Mobula adds asset discovery; Ripcord verifies every claim on-chain so the verdict stays evidence-based",
        "Pitched live to judges and presented in the Top 10 Showcase, competing solo against teams of up to five",
      ],
      metrics: [
        { v: "2× 1st", l: "Security track + Mobula" },
        { v: "26", l: "Mainnet protocols calibrated" },
        { v: "224", l: "Network-free unit tests" },
      ],
      stack: ["TypeScript", "Node 22", "viem", "zod", "Foundry", "Alchemy", "Chainlink", "Mobula", "Vitest"],
      links: [
        { label: "Reports", url: "https://thomasdevving.github.io/ripcord/" },
        { label: "Source", url: "https://github.com/thomasdevving/ripcord" },
      ],
      pattern: "rings",
    },
    {
      id: "offscript",
      images: [
        { src: "assets/img/offscript-3d.webp", alt: "OFFSCRIPT 3D pitch view of an alternative continuation" },
        { src: "assets/img/offscript-decision.webp", alt: "OFFSCRIPT casual-fan mode comparing options at a key decision" },
      ],
      name: "OFFSCRIPT",
      year: "2026",
      kind: "Hackathon",
      builtFor: "Microsoft × Premier League “Inside the Game” Hackathon 2026",
      line: "Every decision creates another game.",
      summary:
        "A multi-agent counterfactual football analyst. It watches a live synthetic match, detects key decisions, and asks whether a better option existed. Five agents propose alternatives, run paired Monte Carlo simulations from the frozen game state, verify the numbers and explain the trade-offs to fans, analysts and broadcasters.",
      highlights: [
        "Football Multiverse: pick an action and attacking and defending agents plan against each other; rewind, fork and compare branches",
        "Decision Value Added (DVA): modelled goal chance lost per player and team, with 95% intervals",
        "Stress-test mode deliberately corrupts an analysis and shows the system catching and recovering from every fault",
        "2D and 3D alternative playback with broadcast, tactical and player cameras",
      ],
      metrics: [
        { v: "432/432", l: "Injected corruptions caught" },
        { v: "2.6s", l: "p50 end-to-end analysis" },
        { v: "138", l: "Backend, unit & E2E tests" },
      ],
      stack: ["Python", "FastAPI", "Microsoft Agent Framework", "Next.js 16", "TypeScript", "Azure Container Apps", "Microsoft Foundry", "Bicep", "Playwright"],
      links: [
        { label: "Live demo", url: "https://parallelwebplb33l5h5wpok.z1.web.core.windows.net" },
        { label: "Source", url: "https://github.com/thomasdevving/offscript" },
      ],
      pattern: "pitch",
    },
    {
      id: "plsteachme",
      images: [
        { src: "assets/img/plsteach-companions.webp", alt: "plsteach.me companion mascots" },
        { src: "assets/img/plsteach-mascots.webp", alt: "plsteach.me mascots in expressive poses" },
      ],
      name: "plsteach.me",
      year: "2026",
      kind: "Product",
      builtFor: "My own startup, for learners, teachers and organisations",
      line: "Learn real skills with a coach that watches.",
      summary:
        "A practical-skills learning app with illustrated step-by-step lessons and automatic camera coaching that checks whether each step is done right. Includes learning journeys, community skill requests, a reviewed teacher studio and an organisation training module.",
      highlights: [
        "Server-side vision coaching; frames are never stored and the API key never leaves the server",
        "Vision lab to record labelled landmark clips and train per-lesson models that run in shadow mode on-device",
        "Teacher studio: apply, record demonstrations, edit with AI assistance, submit for independent review",
        "Privacy-first analytics, retention cleanup and account deletion built in",
      ],
      metrics: [
        { v: "9", l: "Illustrated starter lessons" },
        { v: "63", l: "Coached steps" },
        { v: "3", l: "Audiences served" },
      ],
      stack: ["Next.js", "TypeScript", "Supabase", "OpenAI Responses API", "AI SDK", "Cloudflare Workers", "Turnstile", "Vitest", "Playwright"],
      links: [
        { label: "plsteach.me", url: "https://plsteach.me" },
        { label: "Source", url: "https://github.com/thomasdevving/plsteachme" },
      ],
      pattern: "steps",
    },
    {
      id: "multilond",
      images: [
        { src: "assets/img/multilond-cover.webp", alt: "Multilönd AI cover: a camera checking an assembly step" },
        { src: "assets/img/multilond-product.webp", alt: "Multilönd AI product page" },
        { src: "assets/img/multilond-station.webp", alt: "Multilönd AI worker station with a locked step" },
      ],
      name: "Multilönd AI",
      year: "2026",
      kind: "Hackathon",
      builtFor: "AMD Developer Hackathon: ACT III, Intelligent Industry track (team of six)",
      line: "Catch hidden assembly mistakes while they're still visible.",
      summary:
        "A vision assistant for manual assembly lines. A camera above the workstation watches each step; OpenCV filters bad frames, an open multimodal model on AMD hardware inspects the step and returns bounding boxes around suspected defects, and deterministic gates block cover-up steps until the defect is fixed.",
      highlights: [
        "My part: the SQLite evidence log, the vLLM client and environment wiring, and the queries that feed the manager and executive dashboards",
        "Owned the pitch: demo script, speaker notes and submission copy, with every number recalculated from the raw benchmark records",
        "Describing a correct part instead of asking a generic question caught 7× more defects, with zero false alarms on clean units",
        "Faces are never in frame; metrics are for coaching, not punishment",
      ],
      metrics: [
        { v: "7×", l: "More defects caught" },
        { v: "0", l: "False alarms on clean units" },
        { v: "~5.6s", l: "Check latency on AMD cloud" },
      ],
      stack: ["Python", "FastAPI", "React", "OpenCV", "vLLM", "AMD MI300X / ROCm", "AMD Token Factory", "SQLite", "Streamlit"],
      links: [{ label: "Source", url: "https://github.com/acagliol/amdactiii" }],
      pattern: "scan",
    },
    {
      id: "eplyx",
      images: [
        { src: "assets/img/eplyx-hero.webp", alt: "Eplyx landing page: know what changes before you deploy" },
        { src: "assets/img/eplyx-dashboard.webp", alt: "Eplyx dashboard with a failed upgrade check" },
        { src: "assets/img/eplyx-comparison.webp", alt: "Eplyx baseline versus candidate comparison" },
      ],
      name: "Eplyx",
      year: "2026",
      kind: "Product",
      builtFor: "Solana developers and protocol teams, before they deploy",
      line: "See the consequences of an upgrade before mainnet does.",
      summary:
        "Program upgrades, token migrations and fee changes can alter outcomes in ways the IDL, account layout or a bytecode diff won't reveal. Eplyx runs the baseline and candidate builds against the same retained state and reports the measured consequences, such as two successful transactions that silently make a lending position liquidatable.",
      highlights: [
        "Upgrade impact with an expectation-based CI gate",
        "Token migration rehearsal, holder coverage, stress tests and bounded search",
        "Token-2022 transfer-fee and Stake Pool fee analysis",
        "Read-only binding of a Squads governance proposal to a loader-v3 upgrade",
      ],
      metrics: [
        { v: "127", l: "Commits" },
        { v: "Rust", l: "CLI + engine" },
        { v: "CI", l: "Deployment gate" },
      ],
      stack: ["Rust", "Solana SBF", "LiteSVM", "TypeScript", "PostgreSQL", "Playwright", "Docker", "Railway", "Cloudflare"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/Eplyx" }],
      pattern: "diff",
    },
    {
      id: "clavure",
      name: "Clavure",
      year: "2026",
      kind: "Hackathon",
      builtFor: "GitLab “Life After Code” Hackathon",
      line: "The least disruptive fix that closes the hole.",
      summary:
        "Derives the effective connectivity of a Kubernetes cluster from real NetworkPolicy manifests, finds connections that break declared security requirements, and proposes the smallest fix that still satisfies every hard constraint, then proves it on a live cluster.",
      highlights: [
        "Reachability engine using three-valued logic, plus permission diffs between versions",
        "Bounded exhaustive remediation search ranked by a cost model with six hard constraints",
        "Independent verifier with different code and algorithms, cross-checked over 400 randomised worlds",
        "Runtime verification in a disposable k3d cluster with canary, health and probe checks",
      ],
      metrics: [
        { v: "400", l: "Differential test worlds" },
        { v: "H1–H6", l: "Hard constraints enforced" },
        { v: "1 line", l: "Fix chosen in the demo" },
      ],
      stack: ["Python 3.12", "uv", "Kubernetes", "k3d", "Docker", "GitLab CI", "GitLab Duo Agent Platform", "pytest"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/clavure" }],
      pattern: "graph",
    },
    {
      id: "eplyx-sta",
      images: [
        { src: "assets/img/sta-result.webp", alt: "Eplyx Stock Transition Assurance landing page" },
        { src: "assets/img/sta-after.webp", alt: "Eplyx STA analysis page" },
      ],
      name: "Eplyx STA",
      year: "2026",
      kind: "Hackathon",
      builtFor: "Stocklana Hackathon",
      line: "STATE₀ + CHANGE → STATE₁, measured.",
      summary:
        "Stock Transition Assurance evaluates a proposed tokenised-asset lifecycle change against freshly captured production state. A worked SPACEX conversion case study walks through account snapshots, Meteora DLMM exposure, Token-2022 transfers, secondary-market exits and readiness gating.",
      highlights: [
        "14-phase lifecycle analysis with a readiness gate that honestly returns “Incomplete”",
        "Read-only mainnet capture and bounded local VM execution; no mainnet transaction submitted",
        "Installers for macOS, Linux and Windows with SHA-256 verification",
        "No telemetry; optional cloud sync uploads reports only",
      ],
      metrics: [
        { v: "14", l: "Analysis phases" },
        { v: "3", l: "Platforms shipped" },
        { v: "53", l: "Commits" },
      ],
      stack: ["Rust", "LiteSVM", "Solana", "Meteora DLMM", "Token-2022", "Node.js", "Playwright", "GitHub Actions"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/eplyx-stock-transition-assurance" }],
      pattern: "bars",
    },
    {
      id: "ring-drive",
      images: [
        { src: "assets/img/ring-phones.webp", alt: "Ring Drive iPhone screens: driving, parked and review" },
      ],
      name: "Ring Drive",
      year: "2026",
      kind: "Hackathon",
      builtFor: "Amazon App Dev Hackathon 2026",
      line: "Your home, in one sentence, while you drive.",
      summary:
        "An iPhone app and backend that turn Ring camera activity into short spoken updates for a driver, and flag expected activity that didn't happen, like a child not seen leaving for school. The driver responds by tap or Siri; video only unlocks once parked.",
      highlights: [
        "Deterministic triage and absence rules across all exit cameras",
        "Parking gate: 20 s of continuous standstill plus explicit confirmation before video",
        "Escalation ladders with attention-aware routing that skips household members who are driving",
        "Self-hosted MCP server with its own OAuth so Alexa+ can answer “what happened while I was away?”",
      ],
      metrics: [
        { v: "Swift", l: "SwiftUI + Live Activities" },
        { v: "MCP", l: "Alexa+ integration" },
        { v: "20s", l: "Parking gate" },
      ],
      stack: ["SwiftUI", "ActivityKit", "App Intents", "CarPlay", "Node 22", "Amazon Bedrock", "Amazon SNS", "MCP"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/ring-drive" }],
      pattern: "radar",
    },
    {
      id: "burping-cows",
      images: [
        { src: "assets/img/burping-phones.webp", alt: "Burping Cows app screens: farm profile, results and action plan" },
        { src: "assets/img/burping-figma.webp", alt: "Burping Cows illustration from the Figma design" },
      ],
      name: "Burping Cows",
      year: "2026",
      kind: "Hackathon",
      builtFor: "Climate Hack-tion 2026, co-built with Anthony Tran for Australian dairy and piggery farmers",
      line: "From methane to money, minus the mystery.",
      summary:
        "A mobile app that tells a farm operator whether capturing methane from animal effluent could earn Australian Carbon Credit Units, and whether it would pay off. A nine-step assessment covers baseline, scheme screening, technical estimate, financial scenario and an action plan, with a landing page that takes farmers from first question to next step.",
      highlights: [
        "Took the Figma design into the whole Expo app: a design-token system, custom illustrations, redesigned tab navigation, assessment screens and results view, across 60 files",
        "Designed, built and shipped the landing page in React and Vite, with a price-assumption explorer and a results snapshot computed from the app's own calculation engine, deployed on Cloudflare Pages",
        "Researched and sourced real carbon-market examples (Rivalea's piggery biogas, Rio Tinto's offtake, the NSW Tiwi Island purchase) so every claim on the page links to a primary source",
        "Four separate result dimensions: eligibility, preparation, financial viability and calculation status; unknown answers stay unknown, not false",
      ],
      metrics: [
        { v: "9", l: "Assessment steps" },
        { v: "~6.4y", l: "Demo-farm payback" },
        { v: "3", l: "Platforms: iOS, Android, web" },
      ],
      stack: ["React Native", "Expo", "TypeScript", "Supabase", "React Hook Form", "Zod", "Figma", "Cloudflare"],
      links: [{ label: "Source", url: "https://github.com/Burping-Cows/burping-cows" }],
      pattern: "waves",
    },
    {
      id: "intercompass",
      name: "InterCompass",
      year: "2026",
      kind: "Client",
      builtFor: "Drost Project Groep B.V.",
      line: "Real-estate due diligence, one agent per question.",
      summary:
        "A multi-agent platform for real-estate investment analysis. Each agent researches one category, starting with demographics from Dutch CBS open data, and writes to a single generic table, so scaling to around 100 categories means adding prompts, not migrations.",
      highlights: [
        "Generic information_items schema with category-specific raw JSON",
        "EU-hosted Supabase with split service-role writes and anon reads",
        "Scoring deliberately left empty until the methodology exists, so categories stay comparable",
      ],
      metrics: [
        { v: "~100", l: "Planned categories" },
        { v: "1", l: "Table for all agents" },
        { v: "EU", l: "Data residency" },
      ],
      stack: ["Python 3.12", "Anthropic API", "Supabase", "PostgreSQL", "CBS Open Data"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/inter-compass-agents" }],
      pattern: "compass",
    },
    {
      id: "newera",
      images: [
        { src: "assets/img/newera-og.webp", alt: "Studio NewEra brand mark with gold arc" },
      ],
      name: "Studio NewEra",
      year: "2026",
      kind: "Client",
      builtFor: "Studio NewEra, a Dutch B2B kitchen studio",
      line: "Square corners, gold arcs, zero tracking.",
      summary:
        "Marketing site, nine-step process page and project-request flow for a company that designs, supplies and installs kitchens for business clients. Forms validate with shared zod schemas and accept attachments; email and storage sit behind pluggable adapters.",
      highlights: [
        "Request form with up to 5 × 10 MB attachments",
        "Pluggable adapters: Resend for email, S3/Supabase/Azure for storage",
        "Groundwork for a three-role customer portal (clients, team, installers)",
        "Subtle motion that respects reduced-motion preferences",
      ],
      metrics: [
        { v: "8", l: "Pages" },
        { v: "0", l: "Tracking scripts" },
        { v: "Edge", l: "Cloudflare Workers" },
      ],
      stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Motion", "react-hook-form", "zod", "Cloudflare Workers"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/newera-website" }],
      pattern: "arc",
    },
    {
      id: "gpa-defenders",
      name: "GPA Defenders",
      year: "2026",
      kind: "Study",
      builtFor: "University of Amsterdam team project",
      line: "Defend your 10.0 against deadlines.",
      summary:
        "A tower-defence game in Python and pygame. Waves of assignments, deadlines, exams and professors march on your GPA; coffee, study groups, tutors and energy drinks hold the line. Drop below 5.5 and you fail.",
      highlights: [
        "Four tower types with an Energy economy earned from defeated enemies",
        "Wave system, pause menu and keyboard shortcuts",
      ],
      metrics: [
        { v: "4", l: "Tower types" },
        { v: "5.5", l: "Pass mark" },
        { v: "37", l: "Commits" },
      ],
      stack: ["Python", "pygame"],
      links: [{ label: "Source", url: "https://github.com/thomasdevving/gpa-defenders" }],
      pattern: "path",
    },
  ],

  hackathons: [
    { name: "Common S3nse — CryptoCanal", project: "Ripcord", result: "1st Security · 1st Mobula", date: "Sep 2026", win: true },
    { name: "AMD Developer Hackathon: ACT III", project: "Multilönd AI", result: "Team of six", date: "Oct 2026" },
    { name: "Microsoft × Premier League — Inside the Game", project: "OFFSCRIPT", result: "", date: "Oct 2026" },
    { name: "GitLab — Life After Code", project: "Clavure", result: "", date: "Oct 2026" },
    { name: "Amazon App Dev Hackathon", project: "Ring Drive", result: "", date: "Oct 2026" },
    { name: "Climate Hack-tion 2026", project: "Burping Cows", result: "Team of two", date: "Oct 2026" },
    { name: "Stocklana", project: "Eplyx STA", result: "", date: "Sep 2026" },
    { name: "Nebius × NVIDIA Global AI Hackathon", project: "Personal AI track", result: "In progress", date: "Oct 2026" },
  ],

  photos: [
    { src: "assets/img/photo-award.webp", alt: "Thomas on stage under a Best Security slide for Ripcord", caption: "Best Security \u2014 Ripcord, Common S3nse" },
    { src: "assets/img/photo-pitch.webp", alt: "Thomas presenting Ripcord from a lectern", caption: "Pitching Ripcord in the Top 10 Showcase" },
    { src: "assets/img/photo-building.webp", alt: "Thomas working at a table with two collaborators", caption: "Heads down, building" },
  ],

  stack: [
    { g: "Languages", items: ["Python", "TypeScript / TSX", "Rust", "Swift", "SQL"] },
    { g: "AI & agents", items: ["Microsoft Agent Framework", "Claude API", "OpenAI", "Amazon Bedrock", "vLLM", "MCP", "n8n"] },
    { g: "Web & product", items: ["Next.js", "React", "React Native / Expo", "FastAPI", "Node.js", "Tailwind CSS", "Supabase"] },
    { g: "Chain", items: ["Solana SBF", "LiteSVM", "Token-2022", "viem", "Foundry"] },
    { g: "Cloud & infra", items: ["Microsoft Azure", "Cloudflare Workers", "Kubernetes", "Docker", "Bicep", "Railway"] },
    { g: "Quality", items: ["pytest", "Vitest", "Playwright", "GitHub Actions", "GitLab CI", "gitleaks"] },
  ],
};
