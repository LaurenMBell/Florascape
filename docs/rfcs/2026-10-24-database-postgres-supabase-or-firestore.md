# RFC: Database for Project 026: PostgreSQL on Supabase or Cloud Firestore

Project 026  
Annie Luse   
lusean@oregonstate.edu

| Author | Annie Luse |
| :---- | :---- |
| Date | 2026-10-24 |
| Status | Accepted |
| Decision Date | 2026-11-15 |
| Deciders | Annie Luse, Lauren Bell, Nat Rurka |
| Superseded By | N/A |

## Problem and Context

Our app is a gamified citizen-science app in the spirit of Pokémon Go. Users “collect” plants and other species they see in real life by photographing them; the photos are uploaded and analyzed to detect the species, and users can see rankings for how many times a species has been spotted. Almost every feature in our proposal reads from or writes to shared data. That data includes user profiles and friendships, sightings with photos and GPS coordinates, species, community identification votes, and badges and levels earned from repeat sightings. We need to choose the database that holds all of it.

Our choice is between PostgreSQL hosted on Supabase (relational) and Cloud Firestore on Firebase (non-relational, document-based). This RFC compares those two platforms, not every relational or non-relational database. Firebase is the platform named in our proposal, and Supabase is a relational platform that bundles the same pieces (database, sign-in, and photo storage) on a free plan. Other non-relational databases are addressed under Options.  
The database determines how we model data, how we write every query, how we enforce access rules, and how authentication and photo storage connect to everything else. Undoing it later means redesigning all of our data management and schema and rewriting the screens and APIs built on top of it. It needs to be made now because the backend work for sightings, the map, and the profile depends on it, and every feature built on the wrong choice adds to the cost of switching.

If we do nothing, we don't end up with no database. The first teammate who needs to persist data will likely reach for Firebase because it is in our proposal, and our data model will be decided implicitly by that first feature. The cost arrives later, when a feature like “nearby sightings from my friends” turns out to be awkward in the model we fell into.

## Options

### Option A: Relational (PostgreSQL on Supabase) 

Store app data in Postgres tables with foreign keys (users, friendships, sightings, species, families, votes, badges, events), with PostGIS for location queries, Supabase Auth for sign-in, and Supabase Storage for photos.

Costs: We must design a schema up front and write SQL, including functions for geographic queries. Supabase's free plan pauses projects after one week of inactivity and allows only two active projects, so a dev/production split uses both slots. The free plan's 1 GB of file storage is our tightest limit. Offline support is not built in, so queued uploads from places with poor signal would be our own code.

This is the right choice if our core features depend on queries across entities (friends' sightings nearby, leaderboards by species, verification counts) and we want to stay on a free plan with no billing account.

### Option B: Non-relational (Cloud Firestore on Firebase) 

Store data as documents in collections, duplicating data where needed for fast reads (for example, keeping a per-species sighting counter on the species document). Use geohashes for location queries, Firebase Auth for sign-in, and Cloud Storage for Firebase for photos.

Costs: Nearby queries need a geohash workaround: several range queries plus client-side filtering of false positives. Counters and leaderboards need duplicated data kept in sync, usually with Cloud Functions. Cloud Storage and Cloud Functions both require the pay-as-you-go Blaze plan, so a teammate must link a payment method and is responsible for any overage.

This is the right choice if most reads are a single user's own data (profile, scrapbook), realtime updates and offline use in the field matter more than flexible queries, and my team is comfortable putting a billing account on the project.

### Option C: Do Nothing

Keep building the UI this term against local mock data and choose a database in winter, or let the first backend feature default to Firebase as named in the proposal.

Costs: Mock data encodes an unagreed data model, so screens built against it need rework later. An implicit default to Firebase takes on Option B's costs without weighing them. The cost arrives with the first real backend feature, likely early winter term, when time is shorter.

This is the right choice if the feature list is still unstable. If community verification, events, and friend feeds might be cut, most of the cross-entity querying that favors Option A disappears, and deferring until scope settles would be reasonable.

### Variants we considered

Other non-relational databases. A document database with native geospatial indexes, such as MongoDB Atlas, would remove Firestore's geohash workaround. It would not change the deciding factor in Analysis: our core features connect users, friendships, sightings, and species. Postgres enforces those relationships with foreign keys, while a document database leaves keeping them consistent to our code. We did not evaluate it further.

Option A with parts moved elsewhere. Because Option A is plain Postgres, its weak points can be fixed without changing the database. Photos can move to a separate storage service if they outgrow Supabase's 1 GB. The database can move to another Postgres host if the inactivity pause or two-project limit becomes a problem. An on-device upload queue can cover poor signal in the field. We treat these as fallbacks within Option A, triggered by the verification plan, rather than as separate options.

## Analysis

Fit to our data and queries:  
Cross-entity queries are the deciding case. Our core features (friends' sightings near me, leaderboards by species, verification vote counts) each combine several kinds of data. In Postgres each is one SQL query over tables the database keeps consistent; in Firestore each needs duplicated data or several queries combined in our code. Location makes the gap wider for Firestore specifically. Firestore has no native geospatial index, so Firebase's geoqueries guide stores a geohash, runs several range queries, and discards false positives on the client. Supabase supports PostGIS, with indexable geographic types and nearest-neighbor sorting by distance.

Performance, complexity, and security:  
At our scale (dozens of users, thousands of sightings), both will be fast enough. Firestore bills per document read, including the false positives a geohash query discards, but at dozens of users that cost is small and does not decide the choice. Firestore is faster to start but leaves duplicated data for our code to keep consistent, while Postgres front-loads schema design and then enforces it, with reviewable migrations. Both rely on access rules we write (row-level security or Security Rules), and the risk either way is a missing rule.

Cost and limits:  
Photos are central to our app, so Firebase means Blaze: still likely \$0, but a teammate's card covers any overage. Firebase holds about 5,000 photos at \~1 MB each versus about 1,000 on Supabase, and Supabase's pause is a risk before demos.

|  | Supabase Free | Firebase Spark | Firebase Blaze |
| :---- | :---- | :---- | :---- |
| Billing Account | No | No | Yes |
| Database | 500 MB | 1 GiB; 50K reads, 20K writes/day | Same, then pay-as-you-go |
| Photo storage | 1 GB | Not available (requires Blaze) | 5 GB stored free (bucket must be in a US region) |
| Inactivity | Paused after 1 week; 2 active projects | Not paused | Not paused |

Uncertainty: If verification or friend feeds are cut, the relational advantage narrows. Our compressed photo size is unknown, so storage estimates are rough until verification check 2 measures it. If offline field use becomes a requirement, Firestore's built-in offline support becomes a real advantage, though an on-device upload queue would close most of that gap.

## Recommendation and Verification Plan

We chose Option A: PostgreSQL on Supabase, using PostGIS for location queries, Supabase Auth, and Supabase Storage for photos.

It wins on the deciding factor: most of our features query across related entities, and Postgres answers each with one query over relationships the database enforces. Nearby sightings are native in PostGIS rather than a workaround. It also keeps us on a free plan with no billing account. Its main risks (the 1 GB photo limit, the inactivity pause, and access rules we must write ourselves) are predictable, and each has a check below. Firestore's advantages, offline support and faster setup, matter less to us than query fit.

The first check confirms the deciding factor; the other three target the risks most likely to hurt us. We run checks 1–3 during the first winter-term sprint, before the sightings feature merges, and check 4 before every demo. We do not benchmark Firestore: at our scale both options are fast enough, so speed would not change the decision, and check 1 tests the property we chose Postgres for.

| Check | Fails if | If it fails |
| :---- | :---- | :---- |
| 1\. Query fit: seed 50,000 test sightings (about 10× our expected volume) and build “friends' sightings near me” | The query needs more than one database call, or takes over 1 second | Reopen this decision, since query fit is the reason we chose Postgres |
| 2\. Photo storage: compress 20 real phone photos with the app's upload settings, then multiply the average size by the number of photos we expect by the final demo | The projection exceeds 800 MB (80% of the 1 GB limit) | Move photo storage off Supabase to a separate storage service; keep Postgres on Supabase |
| 3\. Access rules: Supabase's Security Advisor, plus a test signed in as user B that tries to read user A's private data and post a sighting as user A | The Advisor reports any table with row-level security disabled, or either test action succeeds | Add the missing policy before merging; add the test to our lint-and-test workflow so it runs on every pull request |
| 4\. Inactivity pause: check the production project's status in the Supabase dashboard before each demo | The project has been paused at any point that term | Add a scheduled request that queries the database daily (Supabase says a few requests a day keeps a project active), or move the database to another Postgres host |

If offline field use becomes a requirement, we will build an on-device queue that holds sightings until signal returns, rather than switching to Firestore for its built-in offline support.

## Constraints

Licensing: PostgreSQL and PostGIS are open source, and Supabase's platform is open source and can be self-hosted, so Option A doesn't lock our data into one vendor: the database could be exported and moved to any Postgres host, which is the fallback in verification check 4\. Firestore is proprietary to Google; leaving it means an export and a rewrite.

Data use: iNaturalist's developer page also shapes our schema. Each iNaturalist photo has a license: CC0 (free to use), CC BY (credit the creator), or CC BY-NC (credit the creator, no commercial use). Our database must store each item's license and creator so the app can show the right credit. CC BY-NC photos are fine for a class project but would have to be removed if the app ever made money. Because iNaturalist limits API use and heavy downloads, we should store iNaturalist links rather than copies of their photos. iNaturalist also publishes its full taxonomic tree as a monthly download. This is naturally table-shaped data that we can load directly into our species and family tables, which fits a relational database well.

We are a student-proposed project, so the partner confidentiality boundary does not apply. Our team owns its code, and the database choice doesn't change that.

## Delegation and Validation

What I handed to AI tools. I used Claude (Anthropic) to suggest framing the decision as Firestore versus Postgres on Supabase rather than abstract categories, to search for pricing and feature documentation, and to draft prose for each section of this RFC from my notes and our project proposal. For the revision, I used Claude again to map each review point to a change and draft the revised wording.

I checked every pricing and limit figure myself on the official Supabase and Firebase pricing pages and Firebase's Cloud Storage FAQ. My checks caught real errors. A third-party source the AI found listed Supabase's free file storage as 500 MB; the official page says 1 GB. Firebase's product list implies Cloud Storage has a free quota on any plan, but the official pricing table and Storage FAQ show it requires Blaze. For the revision, the new claims in the verification plan were checked against Supabase’s documentation on project pausing and on the Security Advisor. Rechecking Firebase’s geoqueries guide also showed that the draft’s claim that Firestore can range-filter on only one field per query was out of date, so Analysis now rests on Firestore having no native geospatial index.

Our repository now has CI: a GitHub Actions workflow, lint-and-test, runs ESLint on our pull requests. That catches problems in code, but nothing automated checks the facts or reasoning in this RFC, so I limited what I delegated to research and drafting, kept the decision itself for the team, and checked every fact against official sources.

## Decision

Accepted on 2026-11-15 by Annie Luse, Lauren Bell, and Nat Rurka: Option A, PostgreSQL on Supabase with PostGIS, Supabase Auth, and Supabase Storage. We reopen this decision if verification check 1 fails, or if community verification, events, and friend feeds are cut from scope.

## Sources

Project proposal, Nat Rurka, Annie Luse, and Lauren Bell, 2026-10-13.

[Supabase pricing](https://supabase.com/pricing), accessed 2026-10-24.

[Firebase pricing](https://firebase.google.com/pricing), accessed 2026-10-24.

[Firebase pricing plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans), accessed 2026-10-24.

[FAQs about changes to Cloud Storage for Firebase](https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024), accessed 2026-10-24.

[Firebase, Geo queries with Cloud Firestore](https://firebase.google.com/docs/firestore/solutions/geoqueries), accessed 2026-11-22.

[Firebase, Query with range and inequality filters on multiple fields](https://firebase.google.com/docs/firestore/query-data/multiple-range-fields), accessed 2026-11-22.

[MongoDB, Geospatial queries](https://www.mongodb.com/docs/manual/geospatial-queries/), accessed 2026-11-22.

[Supabase, PostGIS: Geo queries](https://supabase.com/docs/guides/database/extensions/postgis), accessed 2026-10-24.

[Supabase, Project pausing](https://supabase.com/docs/guides/platform/free-project-pausing), accessed 2026-11-22.

[Supabase, Advisors](https://supabase.com/docs/guides/observability/advisors), accessed 2026-11-22.

[Supabase database linter, 0013 RLS disabled in public](https://supabase.github.io/splinter/0013_rls_disabled_in_public), accessed 2026-11-22.

[iNaturalist, Developers](https://www.inaturalist.org/pages/developers), accessed 2026-10-24.

