# SCALABLE.md — GitHubPH Scalability & Architecture Plan

---

## 🏗️ Current Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │ Next.js   │  │ Zustand   │  │ Framer Motion         │  │
│  │ App Router│  │ Store     │  │ Animations           │  │
│  └─────┬─────┘  └─────┬─────┘  └──────────────────────┘  │
│        │              │                                   │
├────────┼──────────────┼───────────────────────────────────┤
│        │              │                                   │
│  ┌─────▼──────────────▼──────────────────────────────┐   │
│  │              Next.js API Routes                    │   │
│  │  /api/auth/*  (Auth.js)                           │   │
│  │  /api/courses (Future)                            │   │
│  │  /api/lessons (Future)                            │   │
│  │  /api/progress (Future)                           │   │
│  └─────────────────────┬─────────────────────────────┘   │
│                        │                                  │
│  ┌─────────────────────▼─────────────────────────────┐   │
│  │              MongoDB Atlas                         │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │ users    │ │ lessons  │ │ analytics_events  │   │   │
│  │  ├──────────┤ ├──────────┤ ├──────────────────┤   │   │
│  │  │ profiles │ │ courses  │ │ xp_transactions  │   │   │
│  │  ├──────────┤ ├──────────┤ ├──────────────────┤   │   │
│  │  │ progress │ │ missions │ │ achievements     │   │   │
│  │  └──────────┘ └──────────┘ └──────────────────┘   │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │              Third-Party Services                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │   │
│  │  │ Auth.js   │ │ AWS S3   │ │ PostHog/Sentry   │   │   │
│  │  │ OAuth     │ │ Storage  │ │ Analytics/Errors │   │   │
│  │  └──────────┘ └──────────┘ └──────────────────┘   │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │              Vercel Deployment                     │   │
│  │  Edge Network → Global CDN → Serverless Functions │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Horizons

### Horizon 1: MVP (Current — Weeks 1-12)

**Traffic Target**: 100-1,000 concurrent users
**Data Volume**: < 1GB
**Architecture**: Monolithic Next.js app

| Component    | Current Setup         | Scaling Strategy                    |
| ------------ | --------------------- | ----------------------------------- |
| Frontend     | Next.js SSR + Static  | Vercel Edge Network auto-scales     |
| Auth         | Auth.js JWT           | Stateless — scales horizontally     |
| DB           | MongoDB Atlas M0 Free | Upgrade to M10+ for production      |
| Storage      | In-memory (mock data) | Migrate to MongoDB collections      |
| File Storage | None                  | AWS S3 + CloudFront CDN             |
| State        | Zustand (client only) | Add TanStack Query for server cache |
| Monitoring   | None                  | Sentry + PostHog                    |
| CI/CD        | None                  | GitHub Actions → Vercel deploy      |

### Horizon 2: Growth (Months 3-6 — 1,000-10,000 users)

**Traffic Target**: 1,000-10,000 concurrent users
**Data Volume**: 10-50 GB
**Architecture**: Monolithic Next.js with caching layer

**Changes from Horizon 1**:

- [ ] Upgrade MongoDB Atlas to M30 (3-node replica set)
- [ ] Add Redis cache layer (Upstash or ElastiCache)
- [ ] Implement TanStack Query for server state + cache invalidation
- [ ] Add rate limiting on API routes (`upstash/ratelimit`)
- [ ] Implement incremental static regeneration for course/lesson pages
- [ ] Add CDN for static assets (AWS CloudFront)
- [ ] Set up Sentry for error tracking
- [ ] Set up PostHog for product analytics
- [ ] Create API documentation (OpenAPI/Swagger)
- [ ] Add database indexes for common queries

### Horizon 3: Scale (Months 6-12 — 10,000-100,000 users)

**Traffic Target**: 10,000-100,000 concurrent users
**Data Volume**: 50-500 GB
**Architecture**: Microservices-ready with horizontal scaling

**Changes from Horizon 2**:

- [ ] Split into microservices:
  - Learning Service (courses, lessons, quizzes)
  - Gamification Service (XP, achievements, leaderboards)
  - Simulation Service (Git playground engine)
  - User Service (auth, profiles, settings)
  - Analytics Service (event processing)
- [ ] Message queue between services (Redis Pub/Sub or RabbitMQ)
- [ ] Database sharding by region (PH → Asia-Pacific first)
- [ ] Read replicas for query-heavy endpoints
- [ ] WebSocket server for real-time features:
  - Live collaboration in playground
  - Real-time leaderboard updates
  - Chat/discussion notifications
- [ ] GraphQL API gateway (Apollo Federation)
- [ ] Service-level caching (Redis per microservice)
- [ ] Kubernetes orchestration (EKS/GKE)
- [ ] Infrastructure as Code (Terraform)
- [ ] Multi-region deployment (Asia-Pacific → Global)

### Horizon 4: Enterprise (Year 2+ — 100,000+ users)

**Traffic Target**: 100,000+ concurrent users
**Data Volume**: 500GB+
**Architecture**: Event-driven, globally distributed

**Changes from Horizon 3**:

- [ ] Event sourcing for gamification (Kafka/Kinesis)
- [ ] Global CDN with edge computing (Cloudflare Workers)
- [ ] Multi-cloud strategy (AWS + GCP failover)
- [ ] Institutional SSO (SAML/OIDC for universities)
- [ ] On-premise deployment option for universities
- [ ] Data residency compliance (Philippine Data Privacy Act)
- [ ] AI/ML pipeline:
  - Recommendation engine (personalized learning paths)
  - Knowledge graph for skill mapping
  - Automated content generation
- [ ] Enterprise admin dashboard
- [ ] White-label version for institutions
- [ ] API marketplace for third-party integrations

---

## 🗄️ Database Scaling Strategy

### MongoDB Atlas — Current to Enterprise Path

| Tier      | Cluster   | RAM   | Storage | Connections | Cost/Month |
| --------- | --------- | ----- | ------- | ----------- | ---------- |
| M0 (Free) | Shared    | 512MB | 512MB   | 100         | $0         |
| M10       | Dedicated | 2GB   | 10GB    | 1,500       | ~$60       |
| M30       | Dedicated | 8GB   | 100GB   | 5,000       | ~$250      |
| M60       | Dedicated | 32GB  | 400GB   | 20,000      | ~$900      |
| M200      | Dedicated | 128GB | 1.6TB   | 80,000      | ~$3,500    |

### Indexing Strategy (Future Implementation)

```javascript
// users collection
{ email: 1 }                    // Unique index for login
{ "profile.totalXP": -1 }      // Leaderboard queries
{ createdAt: 1 }               // Analytics queries

// user_progress collection
{ userId: 1, lessonId: 1 }     // Compound unique index
{ userId: 1, status: 1 }       // Progress queries

// xp_transactions collection
{ userId: 1, timestamp: -1 }   // XP history queries
{ timestamp: 1 }               // Analytics aggregation

// analytics_events collection
{ userId: 1, event: 1, timestamp: -1 }  // Event queries
{ timestamp: 1, event: 1 }              // Time-series queries
```

### Data Archival Strategy

- **Hot Data** (last 90 days): Fastest storage (SSD)
- **Warm Data** (90-365 days): Standard storage
- **Cold Data** (1+ year): Object storage (S3) + queryable via Atlas Data Lake
- **Retention Policy**:
  - XP transactions: 2 years
  - Analytics events: 1 year (aggregated), 3 months (raw)
  - User accounts: Never delete (compliance)

---

## 🚀 Performance Optimization Plan

### Current Bundle Analysis (MVP)

```
Route                    First Load JS
/landing                 139 kB
/dashboard               139 kB
/learn                   135 kB
/playground              131 kB
/api/auth                0 B (server)
Middleware               79.3 kB (Edge)

Shared Chunks:
  chunks/117              31.7 kB (React, Next.js core)
  chunks/fd9d1056         53.6 kB (Common libraries)
  Other shared             1.95 kB
```

### Optimization Targets

1. **Code Splitting**

   - `React Flow` → Lazy load on Playground page only
   - `react-confetti` → Lazy load on LevelUpModal
   - `recharts` → Lazy load on Dashboard analytics
   - `react-markdown` → Lazy load on Lesson pages
   - **Target**: Reduce First Load JS by 20-30%

2. **Image Optimization**

   - Serve course thumbnails via `next/image` with WebP/AVIF
   - Use blurhash placeholders for loading states
   - Implement lazy loading for below-fold images
   - **Target**: Reduce LCP (Largest Contentful Paint) by 40%

3. **API Response Caching**

   ```javascript
   // Course list (rarely changes)
   Cache-Control: public, max-age=3600, stale-while-revalidate=86400

   // User progress (changes frequently)
   Cache-Control: private, max-age=30

   // Leaderboard (updates every 5 min)
   Cache-Control: public, max-age=300
   ```

4. **Database Query Optimization**

   - Use `select()` to return only necessary fields
   - Use `lean()` for read-only queries (faster, less memory)
   - Implement query result caching with Redis
   - **Target**: API response time < 100ms (p95)

5. **Static Generation Strategy**

```javascript
// Public pages — Static at build time
export const dynamic = "force-static";

// Course pages — ISR with 1-hour revalidation
export const revalidate = 3600;

// Lesson pages — ISR with 5-minute revalidation
export const revalidate = 300;

// Dashboard — Always dynamic (user-specific)
export const dynamic = "force-dynamic";
```

---

## 🔒 Security Scaling

### Authentication

- [ ] OAuth rate limiting (per IP, per provider)
- [ ] JWT rotation strategy (refresh tokens)
- [ ] Session timeout configuration
- [ ] Suspicious login detection (geolocation change)
- [ ] 2FA/MFA support for admin accounts (future)

### API Security

- [ ] Rate limiting per endpoint:
  ```
  /api/auth/*     — 10 req/min
  /api/learn/*    — 60 req/min
  /api/progress/* — 30 req/min
  ```
- [ ] CORS configuration for API access
- [ ] Input validation with Zod on all API routes
- [ ] Helmet.js for HTTP security headers
- [ ] CSRF protection for form submissions

### Data Security

- [ ] Encryption at rest (MongoDB Atlas built-in)
- [ ] Encryption in transit (HTTPS/TLS)
- [ ] PII masking in logs and analytics
- [ ] GDPR/DPA compliance for Philippine users
- [ ] Regular security audits (npm audit, dependency scanning)

---

## 🌍 Geographic Scaling

### Phase 1: Philippines Only

- Vercel Edge Network (Asia-Pacific)
- MongoDB Atlas in `ap-southeast-1` (Singapore)

### Phase 2: Southeast Asia

- Vercel Edge Network (Global)
- MongoDB Atlas multi-region clusters
- Localized content (Bahasa, Thai, Vietnamese)

### Phase 3: Global

- Multi-cloud deployment (AWS + GCP)
- Regional MongoDB clusters (APAC, EU, NA)
- Geo-routing via Cloudflare Workers
- Localized content per region

---

## 👥 Team Scaling Plan

### Current (1-2 developers)

- Monorepo structure
- Shared codebase
- Manual testing
- No CI/CD pipeline

### Growth (3-5 developers)

- [ ] Monorepo with Turborepo/Nx
- [ ] Feature branches + PR review process
- [ ] GitHub Actions CI/CD
- [ ] Automated testing (unit + integration)
- [ ] Storybook for component library
- [ ] Linear/Jira for project management

### Scale (5-15 developers)

- [ ] Service-oriented monorepo
- [ ] Dedicated QA engineer
- [ ] Design system documentation
- [ ] E2E testing with Playwright/Cypress
- [ ] Performance budget automation
- [ ] Feature flags (LaunchDarkly)
- [ ] A/B testing infrastructure

### Enterprise (15+ developers)

- [ ] Platform engineering team
- [ ] SRE (Site Reliability Engineering)
- [ ] Developer experience team
- [ ] Internal tooling
- [ ] Open source contribution guidelines

---

## 📊 Monitoring & Observability Roadmap

### MVP (Current)

- Console logging (basic)
- Next.js error pages

### Growth

- [ ] Sentry → Error tracking + performance monitoring
- [ ] PostHog → Product analytics + session recording
- [ ] Vercel Analytics → Core Web Vitals
- [ ] Custom dashboards (Grafana)

### Scale

- [ ] OpenTelemetry → Distributed tracing
- [ ] Datadog/New Relic → Full APM
- [ ] PagerDuty → On-call alerting
- [ ] Custom SLO monitoring (uptime, latency, error rate)
- [ ] Business metrics dashboard (DAU, retention, revenue)

---

## 🔄 Migration & Upgrade Paths

### Database Migration (Current Mock → MongoDB)

1. Design Mongoose schemas (✓ types defined)
2. Seed database with initial course content (Markdown → DB)
3. Migrate user data from JWT to MongoDB profiles
4. Implement progress tracking persistence
5. Add analytics event collection
6. Deprecate in-memory data stores

### Frontend Migration (Pages Router → App Router)

- ✓ Already on App Router (Next.js 14)
- Future: Migrate to React Server Components for data-heavy pages

### Auth Migration (Auth.js v5 Beta → Stable)

- Monitor Auth.js v5 stable release
- Test migration on staging
- Update API routes if breaking changes

### Styling Migration (Tailwind v3 → v4)

- Wait for Tailwind v4 stable release
- Evaluate Oxide engine performance gains
- Migrate config to CSS-first approach

---

## 💰 Cost Projections

### MVP (Current)

```
Vercel Hobby      $0/month
MongoDB Atlas M0  $0/month
Domain            ~$12/year
Total             ~$1/month
```

### Growth (1,000 users)

```
Vercel Pro        $20/month
MongoDB M10       $60/month
Sentry            $26/month
PostHog           $0/month (free tier)
Upstash Redis     $10/month
Total             ~$116/month
```

### Scale (10,000 users)

```
Vercel Pro        $20/month
MongoDB M30       $250/month
Sentry Team       $80/month
PostHog           $0/month (free tier)
AWS S3 + CDN      $50/month
Upstash Redis     $50/month
Total             ~$450/month
```

### Enterprise (100,000+ users)

```
Vercel Enterprise $500+/month
MongoDB M200      $3,500/month
Sentry Business   $250/month
PostHog Scale     $450/month
AWS Multi-AZ      $1,000/month
Kubernetes        $500/month
Total             ~$6,200+/month
```

---

## 🎯 Key Architecture Decisions Log

| Decision                    | Rationale                                         | Date |
| --------------------------- | ------------------------------------------------- | ---- |
| Next.js App Router          | Future-proof, server components, improved routing | MVP  |
| MongoDB over PostgreSQL     | Flexible schema for varied content types          | MVP  |
| Auth.js v5 (beta)           | Modern auth with Edge support, OAuth providers    | MVP  |
| Zustand over Redux          | Lighter weight, simpler API, fast for simulations | MVP  |
| Tailwind over CSS Modules   | Rapid prototyping, consistent design system       | MVP  |
| Framer Motion               | Best React animation library, declarative API     | MVP  |
| Vercel over AWS EC2         | Zero-config deployments, Edge Network, free tier  | MVP  |
| Monolith over Microservices | Startup velocity, low complexity                  | MVP  |
| In-memory state over DB     | MVP speed, no DB setup required yet               | MVP  |
