import { useState } from 'react'

const PHASES = [
  {
    id: 1, emoji: '🎯', color: '#8B5CF6', light: '#EDE9FE', name: 'Project Scope, PRD & AI Prompting Setup',
    objective: [
      'Before writing a single line of code, the most common mistake solo builders make is skipping a formal Product Requirements Document (PRD). For your consumer mobile app, this document becomes the AI-readable contract that every tool in your pipeline references. A well-formed PRD defines your problem statement, user personas, core features, success metrics, and — critically — an explicit list of out-of-scope items for your MVP. Scope creep is the primary killer of 7-day sprints.',
      'AI prompting setup is equally foundational. Create a master system prompt that captures your full project context: stack (Expo/React Native + Supabase), target users, app name, design language, and feature constraints. Paste this at the top of every Cursor, Claude, or Lovable session. Without it, each AI session starts blind, producing inconsistent architecture and naming conventions across your codebase.',
      'Also establish a lightweight decision log — a running document of every architectural choice made and why. When AI tools propose alternatives, you reference this log to maintain consistency. Set up naming conventions for components, database tables, and file structure before generating any code. These artifacts become your source of truth for the entire sprint.',
    ],
    learning: [
      "Search: 'How to write a Product Requirements Document PRD' — Lenny's Podcast and Product School YouTube channels have practical, template-driven walkthroughs used by real PMs",
      "Search: 'Advanced Claude prompting system prompts for developers 2024' — look for videos covering context injection, chain-of-thought prompting, and role assignment for code generation",
      "Search: 'MVP scoping mobile app what to cut' — Y Combinator and Indie Hackers YouTube channels cover brutal prioritization frameworks specifically for solo and small-team sprints",
    ],
    tools: [
      { name: 'Claude Projects', url: 'https://claude.ai', desc: "Store your PRD, architecture notes, and master system prompt as persistent project context. Every new conversation in the project auto-inherits this context, making all AI outputs consistently stack-aware and feature-scoped from session one." },
      { name: 'Linear', url: 'https://linear.app', desc: "AI-powered project management that generates issues directly from your PRD text. Use Linear's Cycles feature to map your 7-day sprint, and its GitHub integration auto-closes issues when code merges — keeping your backlog accurate with zero manual updates." },
      { name: 'Notion AI', url: 'https://notion.so', desc: "Generate a complete PRD template, auto-summarize decisions into action items, and maintain your living decision log. Notion AI can produce structured user stories from a single paragraph description of your app — saving hours of requirements writing." },
    ],
  },
  {
    id: 2, emoji: '🏗️', color: '#3B82F6', light: '#EFF6FF', name: 'System Architecture, Database Schema & Security',
    objective: [
      "This is the phase most design-background builders skip — and it causes the most expensive rewrites. For Expo + Supabase, architecture means defining how data flows between your mobile client, your Postgres database, and any third-party services before touching code. A simple diagram mapping screens to data sources to Supabase tables prevents 80% of structural bugs.",
      "Database schema design in Postgres means defining tables, columns, data types, relationships (one-to-many via foreign keys, many-to-many via junction tables), and indexes on frequently queried columns. A consumer app minimally needs: a profiles table extending Supabase's auth.users, and your core domain tables. Bad schema design means slow queries and impossible migrations later — it's always cheaper to get this right now.",
      "Row Level Security (RLS) is Supabase's most critical and most misunderstood feature. RLS policies are SQL rules enforced on every database query — they ensure users can only read and write their own data even if your frontend has a bug. Without RLS enabled, any authenticated user can read every row in every table. Enable RLS on all tables. Write explicit policies for SELECT, INSERT, UPDATE, and DELETE. Define which operations require Supabase Edge Functions (server-side) vs. the client — payment processing, cross-user operations, and email sending must never happen from the client.",
    ],
    learning: [
      "Search: 'Supabase Row Level Security RLS tutorial' — the official Supabase YouTube channel has deep-dives specifically on policy syntax and common RLS patterns for consumer apps",
      "Search: 'PostgreSQL database schema design for beginners' — Traversy Media and Hussein Nasser on YouTube cover normalization, foreign keys, and index strategy with clear visual examples",
      "Search: 'Supabase Edge Functions tutorial Deno serverless' — for understanding which logic belongs server-side and how to write and deploy Deno functions from your Supabase project",
    ],
    tools: [
      { name: 'Supabase AI Assistant', url: 'https://supabase.com', desc: "Supabase's built-in AI generates your entire Postgres schema from a plain-English app description, writes SQL migration files, suggests appropriate indexes, and flags missing constraints — all within the dashboard before writing any app code." },
      { name: 'dbdiagram.io', url: 'https://dbdiagram.io', desc: "Paste your schema SQL to get an instant visual ERD (Entity Relationship Diagram). Use this to catch relationship mistakes before running migrations. Its AI mode also generates schema from natural language, then exports SQL directly for Supabase." },
      { name: 'Cursor AI', url: 'https://cursor.sh', desc: "Use Composer mode to generate complete Supabase TypeScript Database types from your schema — these types propagate autocomplete and type-safety through your entire Expo codebase, catching data shape mismatches at compile time instead of runtime." },
    ],
  },
  {
    id: 3, emoji: '🎨', color: '#EC4899', light: '#FDF2F8', name: 'Design System, UI Layouts & UX Workflows',
    objective: [
      "For a consumer mobile app, design is your primary retention mechanism. This phase establishes your design system: a reusable set of color tokens, typography scales, spacing values, and components that every screen is built from. Without a design system, each screen ends up visually inconsistent — the clearest signal to users that your app is a side project.",
      "In the Expo/React Native ecosystem, your design system lives in code, not just Figma. This means a theme object with your color palette, font sizes, border radii, and spacing scale — referenced consistently via a styling library. Your options: NativeWind (Tailwind CSS syntax for React Native — fastest to learn if you know web), Tamagui (best performance for animations and universal web+native), or React Native Paper (Material Design 3 components, most opinionated). Choose before writing a single component — switching styling systems mid-build is extremely costly.",
      "UX workflow mapping means diagramming every screen as a node and every user action as an edge. Identify your critical path: the sequence from cold app launch to the core value action (your 'aha moment'). For consumer apps, this path must be 3 interactions or fewer. Validate this flow against your PRD before building — restructuring navigation in Expo Router's file-based system after implementation means renaming files and updating every navigation call throughout the codebase.",
    ],
    learning: [
      "Search: 'NativeWind v4 React Native Expo tutorial 2024' — for applying Tailwind-style utility classes to your Expo project with full dark mode and responsive support",
      "Search: 'Expo Router v3 file-based routing tutorial' — for mastering nested navigators, tab bars, dynamic routes, and modal presentations using the file system convention",
      "Search: 'Mobile UX design principles consumer app onboarding' — Figma's official YouTube and Growth.Design cover component-driven design and onboarding flow patterns with real app examples",
    ],
    tools: [
      { name: 'Figma AI + Make', url: 'https://figma.com', desc: "Use Figma AI to generate screen layouts from text prompts, then Figma Make to prototype interactive flows. Dev Mode exports exact spacing and color values as React Native-compatible numbers — eliminating the designer-to-developer translation gap." },
      { name: 'Lovable', url: 'https://lovable.dev', desc: "Describe your app screens in plain English and Lovable generates functional React component code with consistent styling. Use it to rapidly prototype your component library structure, then adapt the JSX output to NativeWind syntax — dramatically faster than writing component boilerplate from scratch." },
      { name: 'v0 by Vercel', url: 'https://v0.dev', desc: "Generate polished UI component code from screenshots, Figma designs, or descriptions. While v0 outputs web components, the component logic and layout hierarchy translates directly to React Native — use it to accelerate design-to-code by generating the structure, then swap in React Native primitives." },
    ],
  },
  {
    id: 4, emoji: '⚡', color: '#F59E0B', light: '#FFFBEB', name: 'Frontend & Backend Core Implementation',
    objective: [
      "This is the longest phase and where AI-assisted coding delivers its biggest return. Core implementation means building every screen with real Expo Router navigation, real Supabase data fetching, and real component composition — not mocked data or placeholder screens.",
      "Start by scaffolding all screens as empty Expo Router files. This creates the navigation skeleton first, giving AI tools full awareness of your app's structure when generating component code. Every screen should establish its data-fetching pattern (React Query with Supabase, or Supabase's built-in hooks) before filling in UI. React Query's useQuery and useMutation handle loading states, error states, caching, and background refetching automatically, eliminating entire categories of bugs that manual state management creates.",
      "Critical backend concept: never call Supabase with sensitive operations from the React Native client. The service role key — which bypasses RLS — must never appear in your mobile app's bundle. It can be extracted by anyone who downloads your app. Use Supabase Edge Functions (Deno-based serverless) for any operation involving payment processing, sending emails, cross-user data writes, or third-party API calls that require secret keys. The mobile client calls your Edge Function endpoint; the function uses the service role key securely on the server.",
    ],
    learning: [
      "Search: 'Expo Router full app build tutorial 2024' — look for videos building a complete app with tab navigation, stack navigation, dynamic routes, and Supabase data fetching together",
      "Search: 'TkDodo React Query tutorial' — TkDodo's blog and Supabase YouTube cover optimal server-state management patterns that eliminate manual loading/error state management in React Native",
      "Search: 'Supabase Edge Functions Deno tutorial 2024' — for understanding server-side logic, when to use Edge Functions vs. client queries, and how to call them from React Native",
    ],
    tools: [
      { name: 'Cursor AI', url: 'https://cursor.sh', desc: "The primary IDE for this phase. Use Composer with your PRD and schema as persistent context to generate complete screen components, Supabase query hooks, and navigation configurations. Its codebase-aware autocomplete understands your file structure, producing suggestions that fit your actual architecture." },
      { name: 'Bolt.new', url: 'https://bolt.new', desc: "Scaffold complete feature modules by describing them in plain English. Bolt's WebContainer runs the generated code instantly so you can verify behavior before copying into your Expo project — ideal for complex components like infinite scroll lists, search with debounce, or form validation logic." },
      { name: 'Replit Agent', url: 'https://replit.com', desc: "Build and test Supabase Edge Functions without any local environment setup. Describe your serverless function's purpose; Replit Agent writes it, deploys it, and provides a live endpoint URL you can immediately call from your Expo app — collapsing the function development loop to minutes." },
    ],
  },
  {
    id: 5, emoji: '🔐', color: '#0D9488', light: '#F0FDFA', name: 'Auth, State Management & API/Stripe Integration',
    objective: [
      "Authentication in a consumer mobile app is the full identity lifecycle: sign-up, email verification, social OAuth (Google, Apple), session persistence across app restarts, and secure token storage. Supabase Auth handles the identity layer, but Expo integration requires specific care.",
      "Never store JWT tokens in AsyncStorage — it is unencrypted and readable on jailbroken devices. Use Expo SecureStore, which wraps iOS Keychain and Android Keystore. Supabase's auth client accepts a custom storage adapter; swap in SecureStore here. Also: Sign in with Apple is mandatory. Apple's App Store Review Guideline 4.8 requires that any app offering a third-party social login (Google, Facebook) must also offer Sign in with Apple. This is a common rejection reason — configure it in your Apple Developer Account and Supabase dashboard before submission.",
      "For state management, use Zustand — lightweight, boilerplate-free, and well-suited to React Native. Store user session and app preferences in Zustand; keep all server data in React Query. Never mix them. For payments, use RevenueCat instead of direct Stripe Mobile SDK for digital goods. Apple requires in-app purchases for digital content — Stripe handles only web payments. RevenueCat abstracts Apple StoreKit 2 and Google Play Billing behind a single SDK, manages entitlements across platforms, and validates receipts server-side.",
    ],
    learning: [
      "Search: 'Supabase Auth Expo SecureStore React Native 2024' — specifically look for videos covering the custom storage adapter pattern and OAuth callback deep linking configuration",
      "Search: 'Sign in with Apple React Native implementation required' — this is frequently misconfigured; Apple Developer documentation walkthroughs are the most reliable source",
      "Search: 'RevenueCat React Native in-app purchases tutorial' — RevenueCat's own YouTube channel has step-by-step integration guides covering entitlements, paywalls, and restore purchases",
    ],
    tools: [
      { name: 'Supabase Auth Dashboard', url: 'https://supabase.com', desc: "Configure all OAuth providers (Google, Apple, GitHub) visually without writing backend code. Use Auth Hooks to trigger custom logic — like creating a profiles record — on every new signup, eliminating the need for a separate Edge Function for post-registration side effects." },
      { name: 'RevenueCat', url: 'https://revenuecat.com', desc: "The industry standard for mobile subscriptions and in-app purchases. Abstracts Apple StoreKit 2 and Google Play Billing into one SDK, manages entitlements across platforms, validates receipts server-side, and provides a subscription analytics dashboard — saving approximately 40 hours of platform-specific billing work." },
      { name: 'Clerk', url: 'https://clerk.com', desc: "If you need advanced auth features beyond Supabase Auth (MFA, organization/team accounts, complex roles), Clerk integrates via JWTs with Supabase as your database layer. Its React Native SDK and pre-built UI components reduce auth implementation to a few configuration lines." },
    ],
  },
  {
    id: 6, emoji: '🧪', color: '#EF4444', light: '#FEF2F2', name: 'AI-Driven QA, Testing & Error Logging',
    objective: [
      "QA for a consumer mobile app requires three testing layers: unit tests for business logic functions, component tests for UI interaction behavior, and end-to-end tests for complete user flows. Skipping any layer creates blind spots that surface as one-star reviews on launch day.",
      "Jest ships preconfigured with Expo. Write unit tests for pure functions — data transformers, validators, formatters, calculation helpers. Use React Native Testing Library (RNTL) for component tests: render your forms, auth flows, and payment screens in a test environment, simulate user interactions, and assert on output. These catch the class of bugs where your component renders but behaves incorrectly. For RLS and database logic, write integration tests using a Supabase test environment or mock client.",
      "For end-to-end testing, Maestro is the standout tool for mobile. It runs against your live Expo app on a simulator using simple YAML test syntax — no JavaScript, no selectors, just plain-English-style flows. Write E2E tests for your critical path: cold launch → signup → core feature → payment. Sentry's React Native SDK captures uncaught exceptions, ANRs on Android, and performance traces with full TypeScript source maps. Configure it before your first TestFlight build — you want error visibility from the first beta user, not after public launch.",
    ],
    learning: [
      "Search: 'React Native Testing Library tutorial 2024' — look for videos covering async testing with waitFor, user-event simulation, and mocking Supabase client responses",
      "Search: 'Maestro mobile E2E testing Expo tutorial' — Maestro's own YouTube has quickstart guides specifically for Expo managed workflow apps running on iOS Simulator and Android Emulator",
      "Search: 'Sentry React Native setup source maps performance monitoring' — focus on the source map upload step and setting up performance transaction tracing for Supabase queries",
    ],
    tools: [
      { name: 'Cursor AI (test generation)', url: 'https://cursor.sh', desc: "Use Cursor's 'Generate Tests' command on any component or utility function to auto-produce Jest test suites. Provide it with edge case descriptions — empty state, error state, network failure — and it writes comprehensive test files covering all branches in minutes." },
      { name: 'Maestro', url: 'https://maestro.mobile.dev', desc: "Write E2E test flows in plain YAML that reads like natural language. Maestro handles async waits automatically, runs against real Expo apps on simulators, and integrates with CI to block bad deployments. Its AI-assisted recording can capture your manual flows and auto-generate the YAML test files." },
      { name: 'Sentry', url: 'https://sentry.io', desc: "Integrate in under 10 minutes for immediate crash reporting, performance traces, and session replay. Use Sentry's AI 'Autofix' feature — it analyzes your stack trace against your actual codebase and suggests specific code-level fixes, dramatically reducing time from 'bug reported' to 'PR merged.'" },
    ],
  },
  {
    id: 7, emoji: '📊', color: '#16A34A', light: '#F0FDF4', name: 'Analytics, Privacy Policies & App Store Compliance',
    objective: [
      "This phase is the most legally consequential and the most frequently handled too late. For a consumer app in any major market, privacy compliance is a precondition for App Store approval — not an afterthought.",
      "App Tracking Transparency (ATT) is Apple's mandatory framework requiring explicit user permission before tracking across apps and websites. If you use any analytics with advertising attribution potential, you must display the ATT permission dialog and your Info.plist must include NSUserTrackingUsageDescription with a plain-English explanation. This is audited during review and is a common rejection reason for consumer apps. Handle the denied case gracefully — your app must work fully without tracking permission.",
      "Your Privacy Policy must be a real, live URL — not a placeholder. It must accurately describe what data you collect, where it's stored (Supabase Postgres, specify the region), how long it's retained, and users' deletion rights. For GDPR, EU users must be able to request full account deletion. Implement a 'Delete Account' button that cascades deletes through your Supabase schema. Link your privacy policy in both App Store Connect and Google Play Console before submission. PostHog is the recommended analytics platform: GDPR-compliant, open-source, with a React Native SDK covering events, funnels, session recordings, and feature flags in one tool.",
    ],
    learning: [
      "Search: 'App Tracking Transparency iOS React Native Expo implementation 2024' — look for videos covering the Info.plist NSUserTrackingUsageDescription and the expo-tracking-transparency package",
      "Search: 'GDPR mobile app compliance checklist 2024' — legal tech YouTube channels cover data minimization, retention schedules, deletion rights, and DPA requirements accessibly",
      "Search: 'PostHog React Native analytics feature flags tutorial' — PostHog's own YouTube covers event capture, funnel analysis, A/B testing, and GDPR-compliant configuration",
    ],
    tools: [
      { name: 'PostHog', url: 'https://posthog.com', desc: "An all-in-one open-source analytics platform with a React Native SDK covering event tracking, funnels, session recordings, and feature flags. The self-hosted option keeps all user data in your own infrastructure — a significant advantage for GDPR compliance and minimizing third-party data processor disclosures." },
      { name: 'Termly', url: 'https://termly.io', desc: "AI-powered privacy policy and terms of service generator that scans your app's described data practices and produces legally compliant documents covering GDPR, CCPA, and COPPA. Provides a hosted URL you link directly in App Store Connect, and auto-updates language when regulations change." },
      { name: 'Expo Privacy Manifests', url: 'https://docs.expo.dev', desc: "Apple's Privacy Manifest requirement (mandatory since May 2024) requires a PrivacyInfo.xcprivacy file declaring all data collected by your app and third-party SDKs. Expo's config plugin system handles this automatically — use the expo-privacy-manifests package to stay compliant without touching Xcode directly." },
    ],
  },
  {
    id: 8, emoji: '🚀', color: '#7C3AED', light: '#F5F3FF', name: 'CI/CD Pipelines, Deployment & App Store Submission',
    objective: [
      "Deploying a consumer mobile app is fundamentally different from web deployment. You're shipping signed binary artifacts (.ipa for iOS, .aab for Android) through platform-controlled review processes, each requiring certificates, entitlements, and metadata prepared in advance.",
      "EAS Build (Expo Application Services) compiles your Expo app into native binaries in the cloud — you never need Xcode or Android Studio for your build pipeline. Your eas.json defines build profiles (development, preview, production) with different signing configurations. Code signing is the most error-prone part: iOS requires a Distribution Certificate and Provisioning Profile. Run `eas credentials` and EAS handles creation, storage, and rotation automatically in Expo's secure vault — do not attempt to manage certificates manually on your first submission.",
      "A complete GitHub Actions CI/CD pipeline should: run Jest on every PR, trigger a preview EAS Build on merge to main, run Maestro E2E tests against the preview build, and on version tag push, trigger EAS Submit which sends your binary directly to TestFlight and Google Play Internal Testing. App Store metadata — screenshots (required for every device size), description, keywords, age rating — must all be complete in App Store Connect before review begins. Apple review: 24–72 hours. Google Play new app review: 2–7 days.",
    ],
    learning: [
      "Search: 'EAS Build Submit tutorial Expo 2024' — the official Expo YouTube channel has comprehensive guides covering credentials management, build profiles, and automated store submission",
      "Search: 'GitHub Actions CI/CD Expo React Native pipeline' — look for workflows combining test running, EAS Build triggers, and EAS Submit for both platforms in a single YAML file",
      "Search: 'App Store Connect tutorial screenshots metadata review guidelines' — Apple's WWDC sessions on submission are authoritative, free, and cover the common rejection pitfalls in detail",
    ],
    tools: [
      { name: 'EAS (Expo Application Services)', url: 'https://expo.dev/eas', desc: "The complete deployment platform for Expo apps. EAS Build compiles native binaries in the cloud, EAS Submit sends them to App Store Connect and Google Play Console, and EAS Update delivers JavaScript bundle OTA updates. One platform replaces Xcode, fastlane, and manual store uploads — essential for a solo sprint." },
      { name: 'GitHub Actions', url: 'https://github.com/features/actions', desc: "Configure YAML workflows that automatically run tests and trigger EAS Builds on every push to main, and EAS Submit on version tags. The expo/expo-github-action marketplace action handles auth and caching — a complete Expo CI/CD pipeline can be operational in under 30 minutes using its templates." },
      { name: 'Fastlane', url: 'https://fastlane.tools', desc: "Use Fastlane's Deliver (iOS) and Supply (Android) actions to automate App Store metadata uploads — screenshots, descriptions, keywords — via your CI pipeline. EAS wraps the most critical Fastlane functionality, but Fastlane is the right tool when you need screenshot automation across multiple device sizes and locales." },
    ],
  },
  {
    id: 9, emoji: '📡', color: '#6B7280', light: '#F9FAFB', name: 'Post-Launch Observability, DB Maintenance & OTA Hotfixes',
    objective: [
      "Shipping is the beginning. The post-launch phase establishes operational practices that keep your consumer app healthy, fast, and improvable — without requiring a full store resubmission for every change.",
      "Over-The-Air updates via EAS Update are your most powerful post-launch tool. Because your Expo app's JavaScript bundle is separate from the native binary, you can push bug fixes, UI changes, and non-native feature additions directly to users' devices without App Store review. This is explicitly permitted by Apple's guidelines for bug fixes and minor improvements. A critical bug can be patched and live on all users' devices in under 10 minutes using EAS Update — use update channels (production, preview, development) to test before rolling out to everyone.",
      "Database maintenance in Supabase includes: monitoring slow queries via the Query Performance dashboard, adding indexes on columns you discover are frequently filtered as your data grows, and setting up pg_cron scheduled jobs for periodic cleanup. Monitor Supabase's connection pool utilization — the free tier has a 60 concurrent connection limit; hitting this silently drops queries. Use Supabase's PgBouncer connection pooler in transaction mode for mobile clients. Feature flags in PostHog let you roll out new features to 10% of users before full release — the professional pattern for validating changes without a full app store cycle.",
    ],
    learning: [
      "Search: 'EAS Update over-the-air updates Expo channel system tutorial' — understand update channels (production, preview, development), rollback procedures, and which code changes require a full binary release",
      "Search: 'Supabase database performance monitoring index optimization' — Supabase YouTube covers the Query Performance dashboard, EXPLAIN ANALYZE, and pg_cron for scheduled database jobs",
      "Search: 'PostHog feature flags A/B testing React Native gradual rollout' — for understanding percentage-based rollouts, experiment tracking, and using flags to safely ship to production",
    ],
    tools: [
      { name: 'EAS Update', url: 'https://expo.dev/eas/update', desc: "Push JavaScript bundle updates to production users without App Store review. EAS Update's channel system lets you target beta users before rolling out to all production — combining web deployment speed with native mobile reach. Rollbacks are instant if a bad update is detected." },
      { name: 'Sentry Performance', url: 'https://sentry.io', desc: "Beyond crash reporting, Sentry's Performance module traces every API call and database query from your app's perspective. Configure p95 latency alerts on your Supabase queries — often the first signal of a missing index or N+1 query problem, caught before it causes widespread user churn." },
      { name: 'Supabase Branching', url: 'https://supabase.com/docs/guides/platform/branching', desc: "Creates isolated database instances for each GitHub branch — letting you test schema migrations safely against a copy of real production data before running them on the live database. For a consumer app with real users, never run migrations directly on production without first validating on a Supabase branch." },
    ],
  },
]

const TABS = [
  { key: 'objective', icon: 'ti-target', label: 'Objective' },
  { key: 'learning', icon: 'ti-school', label: 'Learning' },
  { key: 'tools', icon: 'ti-tool', label: 'AI Tools' },
]

const STACK = [
  { label: 'Expo / React Native', color: '#8B5CF6' },
  { label: 'Supabase + Postgres', color: '#3B82F6' },
  { label: 'Consumer mobile app', color: '#EC4899' },
  { label: '7-day sprint', color: '#F59E0B' },
]

function PhaseCard({ phase }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('objective')

  const s = {
    card: { marginBottom: 10, position: 'relative' },
    dot: {
      position: 'absolute', left: -25, top: 17,
      width: 22, height: 22, borderRadius: '50%',
      background: phase.color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 600, zIndex: 1,
      border: '2px solid var(--bg)',
    },
    header: {
      background: 'var(--bg)',
      border: '0.5px solid var(--border)',
      borderRadius: open ? '12px 12px 0 0' : 12,
      borderBottom: open ? '0.5px solid transparent' : undefined,
      padding: '13px 16px',
      cursor: 'pointer',
      userSelect: 'none',
      display: 'flex', alignItems: 'center', gap: 10,
    },
    phaseNum: { fontSize: 11, color: 'var(--text-tertiary)', minWidth: 50 },
    title: { fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', flex: 1 },
    chevron: {
      fontSize: 16, color: 'var(--text-tertiary)',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s',
    },
    body: {
      background: 'var(--bg)',
      border: '0.5px solid var(--border)',
      borderTop: 'none',
      borderRadius: '0 0 12px 12px',
      overflow: 'hidden',
    },
    tabs: {
      display: 'flex',
      borderBottom: '0.5px solid var(--border)',
    },
    tabBtn: (active) => ({
      flex: 1, padding: '10px 8px',
      fontSize: 12, fontWeight: 500,
      textAlign: 'center', cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      borderBottom: active ? `2px solid ${phase.color}` : '2px solid transparent',
      color: active ? phase.color : 'var(--text-secondary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      transition: 'all 0.15s',
    }),
    content: { padding: 16 },
    sectionLabel: {
      fontSize: 11, fontWeight: 500,
      color: 'var(--text-tertiary)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 10,
    },
    objPara: {
      fontSize: 13, color: 'var(--text-secondary)',
      lineHeight: 1.75, marginBottom: 10,
    },
    learnItem: {
      display: 'flex', gap: 10, padding: '10px 12px',
      background: 'var(--bg-secondary)',
      borderRadius: 8, marginBottom: 8,
    },
    learnNum: { fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', minWidth: 16, paddingTop: 1 },
    learnText: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 },
    toolCard: {
      border: '0.5px solid var(--border)',
      borderRadius: 8, padding: 12, marginBottom: 8,
      background: 'var(--bg)',
    },
    toolTop: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 },
    toolName: { fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' },
    toolLink: { fontSize: 11, color: phase.color, textDecoration: 'none' },
    toolDesc: { fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 },
  }

  return (
    <div style={s.card}>
      <div style={s.dot}>{phase.id}</div>
      <div style={s.header} onClick={() => setOpen(o => !o)} role="button" aria-expanded={open}>
        <span style={s.phaseNum}>Phase {phase.id}</span>
        <span style={{ fontSize: 18 }} aria-hidden="true">{phase.emoji}</span>
        <span style={s.title}>{phase.name}</span>
        <i className={`ti ti-chevron-down`} style={s.chevron} aria-hidden="true" />
      </div>

      {open && (
        <div style={s.body}>
          <div style={s.tabs}>
            {TABS.map(t => (
              <button key={t.key} style={s.tabBtn(tab === t.key)} onClick={() => setTab(t.key)}>
                <i className={`ti ${t.icon}`} aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>
          <div style={s.content}>
            {tab === 'objective' && (
              <>
                <div style={s.sectionLabel}>Phase objective &amp; technical deep-dive</div>
                {phase.objective.map((p, i) => (
                  <p key={i} style={{ ...s.objPara, marginBottom: i < phase.objective.length - 1 ? 10 : 0 }}>{p}</p>
                ))}
              </>
            )}
            {tab === 'learning' && (
              <>
                <div style={s.sectionLabel}>Recommended learning (3 curated topics)</div>
                {phase.learning.map((l, i) => (
                  <div key={i} style={{ ...s.learnItem, marginBottom: i < phase.learning.length - 1 ? 8 : 0 }}>
                    <span style={s.learnNum}>{i + 1}</span>
                    <span style={s.learnText}>{l}</span>
                  </div>
                ))}
              </>
            )}
            {tab === 'tools' && (
              <>
                <div style={s.sectionLabel}>Top 3 AI-native tools for this phase</div>
                {phase.tools.map((tool, i) => (
                  <div key={i} style={{ ...s.toolCard, marginBottom: i < phase.tools.length - 1 ? 8 : 0 }}>
                    <div style={s.toolTop}>
                      <span style={s.toolName}>{tool.name}</span>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" style={s.toolLink}>
                        {tool.url.replace('https://', '')}
                      </a>
                    </div>
                    <div style={s.toolDesc}>{tool.desc}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
          Production guide
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.2 }}>
          7-day app build sprint
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 14 }}>
          9-phase pipeline · Consumer mobile app · Click any phase to expand
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STACK.map(s => (
            <span key={s.label} style={{
              fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20,
              color: s.color, background: s.color + '14', border: `0.5px solid ${s.color}55`,
            }}>{s.label}</span>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', gap: 4, marginBottom: '1.5rem' }}>
        {PHASES.map(p => (
          <div key={p.id} style={{ flex: 1, height: 4, borderRadius: 2, background: p.color + '40' }} />
        ))}
      </div>

      <div style={{ position: 'relative', paddingLeft: 32 }}>
        <div style={{
          position: 'absolute', left: 14, top: 0, bottom: 0,
          width: 1.5, background: 'var(--border)',
        }} />
        {PHASES.map(phase => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>

      <div style={{
        marginTop: '2rem', padding: '12px 14px',
        background: 'var(--bg-secondary)',
        borderRadius: 8, border: '0.5px solid var(--border)',
      }}>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong>App store note:</strong> Apple App Store review takes 24–72 hours; Google Play review takes 2–7 days for new apps. Plan your sprint so your submission lands by Day 6, with Day 7 as a buffer for resubmission if needed.
        </p>
      </div>
    </div>
  )
}
