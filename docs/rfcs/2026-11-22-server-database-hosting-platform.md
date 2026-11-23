<!-- docs/rfcs/2026-11-22-server-database-hosting-platform.md -->

# RFC: Server and Database Hosting Platform

<!-- Decision record header. Leave Status as "Draft" while the RFC is under review.
     When your team decides, fill in the outcome and the decision date. The
     document stays where it is; this header is what makes it a record. -->

| Field         | Value      |
|---------------|------------|
| Author        | Nat Rurka  |
| Date          | 2026-11-22 |
| Status        | Accepted   |
| Decision Date | 2026-11-11 |
| Deciders      | Nat Rurka  |
| Superseded By | N/A        |

## Problem and Context

Our application is Florascape, which is an online application with many user accounts, each of which stores individual user data, as well as having a number of Sightings tied to each user. Sightings are essentially a social media post with a user-uploaded image of a specific organism, species identification, number of likes, and geolocation information.

Some important facts to consider outside the project description itself are that our team members are most familiar interacting with relational, SQL, databases, so choosing a NoSQL database would have an additional learning curve. None of our team members have any experience using any specific database provider listed here. It is also important to consider the realistic scope of this project, and if it would end up being large enough to warrant added complexity in database management for the sake of optimization, security, and identity access management.

The risks in making a poor choice in terms of database hosting platform are the tradeoff between initial setup complexity and future customizability once the app grows, the potential for outpacing the free tier of any database provider, and the challenges of transitioning database/authentication providers.
We are still relatively early into the development process of this app, and this means that switching database providers would be simpler to do now than in the future. This is why this is still up for consideration despite an option having been selected.

## Options

### Option A: Firebase

#### Description
Firebase is a cloud backend hosting service run by Google. They allow developers to pay for server and database time and space without having to handle physical servers, networking, or the low level information security specifics of managing a server.
It is specifically designed with mobile and web application development in mind.

#### Benefits
- Has quality insights built in with Android Studio, as Android is owned by Google
- Has a free tier for no monetary cost *(see costs)
- NoSQL database offered for the free tier is quick *(see our other RFC on SQL/NoSQL)
- Authentication can be handled through Firebase including:
  - Account creation
  - Email verification
  - Multiple different SSO providers
  - Multi-factor authentication
  - https://firebase.google.com/docs/auth
- Firebase appears to have a more unified approach for developing simple apps
- Free $300 of credits "if eligible"*
  - Free credits only last 90 days

#### Costs
- **Supabase is currently in use for Florascape, so switching to Firebase would require additional work refactoring code to use Firebase instead**
  - It would also require redoing database schema and learning how to use NoSQL unless we decide to pay for SQL
- Free tier limits: 1GiB total data, 10GiB network usage per month, 20k writes/day, 50k reads/day
  - Fortunately, our app will likely not exceed the network, read, and write limits
  - For the free tier, the storage limit may be hard if we are uploading images
- If we decide to pay for storage
  - $0.15/GiB/Month for stored data
  - $0.06 per 100k reads (after 50k free reads)
  - $0.18 per 100k writes (after 20k free writes)
  - $0.02 per 100k deleted (after 80k free deletes)
- Only the NoSQL database tier is free
  - If we want to use the free tier, then we would have to use a new database architecture, which none of our team members are familiar with
  - For a SQL database, we would be paying somewhere around \$7-\$10 per month, which is quite reasonable
  - https://cloud.google.com/sql/pricing#mysql-and-postgresql-pricing
- Lesser customizability than competing options (AWS) which are more complex yet specific

### Option B: Amazon Web Services Database

#### Description
Amazon Web Services (AWS) is a more advanced, in-depth, enterprise tier hosting service that also allows developers to run servers without worrying about the physical servers, or specific networking details that usually come with running servers.

#### Benefits
- Free tier offers either NoSQL or SQL
  - All team members are familiar with SQL so this is a big benefit over Firebase
- Complexity that leads to high levels of customizability
- New AWS accounts are given $100 in credits to use, which could sustain the app for a while based on the costs
  - Potential for another $100 of free credits from use
  - These free credits only last 6 months
- Greater free tier with DynamoDB, providing 25GB of storage

#### Costs
- **Supabase is currently in use for Florascape, so switching to AWS would require immense work**
- AWS is significantly more complex to set up
- Arguably too large-scale for a small app like ours
- Paid storage and compute costs of Amazon DynamoDB
  - $0.25/GB/Month
  - $0.025 per 100k reads
  - $0.125 per 100k writes
  - $0.125 per 100k deletes
  - NOTE: 2.5 million free requests before billing occurs
    - Significantly greater than Firebase free tier
- AWS free tier is only valid for 6 months, meaning if it was initialized in Fall term, we would not be able to use the free tier for the entire capstone process
- Previously mentioned complexity means greater configuration time and thoughts about system architecture design
- Complexity brings risks about information security

### Option C: Supabase (aka Do Nothing)

#### Description
Supabase is an open-source backend-as-a-service (BAAS) platform that utilizes PostgreSQL. Supabase is its own independent company unlike Firebase, owned by Google, and AWS, owned by Amazon. Supabase is often known as a go-to database provider for smaller projects.
This is currently also the "Do Nothing" option, as we have moved to using Supabase since the last draft of this RFC.

#### Benefits
- **This is the database, server, and authentication provider currently in use**
  - There is no greater effort associated with selecting this option, as it simply means continuing development as is
- Free tier offers SQL
  - Once again, all team members are familiar with SQL
- Authentication through Supabase Auth, also handles:
  - Account creation
  - Multiple different SSO providers
  - MFA
- Free tier provides acceptable amounts of storage
  - 0.5GB of database size
  - 1.0GB of bucket storage (for images)
  - 5.0GB of data egress
  - **Unlimited read/write calls on free tier**
- Far lower complexity than AWS
- Pricing and usage limits appear more transparent and easier to find than Firebase
- Edge functions provide the possibility of using Supabase for backend/server utilities, not just database
- Row Level Security (RLS) allows access control policies to be written relatively simply

#### Costs
- According to Alex, despite it being open-source, transitioning to a self-hosted Supabase instance is painful mostly in terms of setting up Supabase Auth with Docker
- The app may outscale the Supabase free tier based on database size, bucket storage, and egress limits
  - Our application will be very heavy on bucket storage, as we will have users uploading their own images
  - Due to the small amount of bucket storage provided by Supabase, we will need to run lossy or heavy lossless compression on all uploaded images, which could harm the user experience
  - 1.0GB of bucket storage should be fine for a proof of concept like this, but would not be acceptable if Florascape's userbase grows sharply
- After free plan data is used up, the database freezes until payment is provided
  - Unlike Firebase and AWS, where you can stay on the free plan and then pay per GB, Supabase has a tiered system
  - After free, Pro is $25/month, but provides the following
    - 8.0GB of database size (then $0.125 per GB)
    - 100.0GB of bucket storage (then $0.0213 per GB)
    - 250.0GB of data egress (then $0.09 per GB)
  - The risk is the possibility of outpacing storage sizes, and needing to pay a minimum $25/month instead of being able to simply pay as we go, like Firebase and AWS provide
- Lesser customizability than AWS

## Analysis

Amazon Web Services' free tier provides a significant amount of value from their free tier, with 2.5 million read/write requests before charging, and 25GB of storage, the high levels of complexity and security risk involved with configuring AWS instances mean that it is not acceptable for our use cases. AWS would be the go-to in the future if Florascape becomes popular enough to warrant an upgrade to infrastructure, as AWS is *highly* configurable, providing separation for database, server, IAM, integration with multiple databases or multiple servers, etc.

Firebase is the second-best choice for our use case, as it is almost on par with Supabase in terms of simplicity of design, setup, and integration. With the free credits that Firebase offers, and the possibility of getting funding for this project, Firebase was a close second. The ability to pay-as-you-go offers a distinct scalability advantage over Supabase for mid-sized applications, where the $25/month that Supabase costs is far higher than the costs associated with running Firebase.

Supabase was the most appealing option for us, as it wins out in simplicity for our use. While it may not have hundreds of dollars of free credits, Supabase's free tier will most likely be acceptable for the amount of data we expect to hold and use for the proof of concept that this app is. The most limiting factor for Florascape is the 1.0GB of bucket storage allocated on the free tier, as Florascape will be heavy on user-uploaded images.
Supabase does offer expansions out of the free tier at $25/month then pay-as-you-go, which would be acceptable if we need to secure funding for this project.
The fact alone that Supabase is already in use in Florascape is a benefit in its own right, as it means that we would not have to refactor all of our code to use a different database provider, as long as Supabase is selected. If we were to switch to Firebase, we would have to either pay for SQL, or learn NoSQL. Switching to AWS leads to a boom in complexity for managing AWS cloud infrastructure and interconnections.

## Recommendation and Verification Plan

From the simple research done over the past few days, it seems like Firebase is the clear winner for a small-scale mobile and web application. If this project were to expand further into something that would be marketed as a real product, it is likely that AWS would eclipse Firebase as the ideal provider due to its higher level of customizability and the fact that it is the enterprise standard for cloud database hosting.

Despite previous recommendations for Firebase, Supabase is now the selected option. In the previous draft of this RFC, Supabase had not yet been considered as a possibility for our use, but the feedback provided Supabase as an alternative.
Firebase comes in close in second as an option, and we have already selected Supabase.

In terms of verification, verification that we have selected correctly will come as the app expands to our testing userbase, where we will see small-scale database usage. Once beta testing is in effect, we will be able to analyze database usage and understand if we are reaching our limits with the selected tier of database provider.
Depending on which database provider is selected, if a credit card is provided, billing stops or alerts can be warnings that we are reaching the limits of our selected database option.

## Constraints

As we have no partner in this project, there is little to no risk in terms of partner confidentiality. Our product will be licensed under an open source license, meaning that there is also little consideration for licensing. The largest concern would likely be data use, as we are handling the data of the end user. In terms of database choice, the security practices either implemented by the provider, in the case of Firebase, our systems design, in the case of Amazon Web Services, or our RLS choices, in the case of Supabase would affect the safety of our users' data.
The only other major constraint to consider is data usage limits and associated costs with each database provider, although all of them have been weighed above. If it comes down to it, our group members would be willing to provide funds to keep the database running.

## Delegation and Validation

Nothing was handed to AI tools when it came to this RFC. Our group has elected to not make use of any AI tools, as we do not have enough trust in their outputs to be reliable. We also believe that, as students, our goal is to learn the fundamentals of each class/topic and then build on them, whereas AI provides the fundamentals, which risks our abilities to understand more advanced concepts that build on our fundamentals.

## Decision

Accepted, 2026-11-11 by Nat Rurka. A Supabase account and project was created on this date, marking a decision to use Supabase as our database, server, and authentication provider.


## Revision log


| Source         | Feedback                                                                                  | Decision | Where or why                                                                                                                                                                                                                                                                                                                                                                 |
|----------------|-------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Both Reviewers | Problem and Context is too simple, does not fully explain project or risks of poor choice | Changed  | Problem and Context section was overhauled, with an explanation of Florascape and its requirements, specifically the user-uploaded images. Problem and Context section now also provides context on the team, our familarity with SQL/NoSQL, familiarity with database providers, and our expectations for the scope of this project, to keep reader expectations realistic. |
| Both Reviewers | Supabase is missing as an option                                                          | Changed  | We took this suggestion to heart and a new decision option for Supabase has been created and fleshed out with the associated costs and benefits. In fact, we selected Supabase and are currently using it for our project, so we greatly appreciate the feedback provided by our peers.                                                                                      |
| Both Reviewers | Draft lacks proper verification plan in Recommendation and Verification Plan              | Changed  | Implemented verification section under Recommendation and Verification Plan.                                                                                                                                                                                                                                                                                                 |
| Reviewer 1     | Decision section is still left as the draft                                               | Changed* | Decision section was left blank as no decision had yet been made. Supabase has now been chosen as the database provider for this project. Decision section has been updated accordingly.                                                                                                                                                                                     |
| Reviewer 2     | Clear up SQL vs NoSQL in Analysis section, explain which one is chosen                    | Declined | Deciding SQL vs NoSQL was the subject of a separate group member's RFC, and therefore no decision had yet been made. A decision has now been made, but it is still important to us to keep valid routes open in case refactoring is necessary.                                                                                                                               |