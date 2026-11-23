<!-- docs/rfcs/2026-10-25-server-database-hosting-platform.md ) -->

# RFC: Server and Database Hosting Platform

<!-- Decision record header. Leave Status as "Draft" while the RFC is under review.
     When your team decides, fill in the outcome and the decision date. The
     document stays where it is; this header is what makes it a record. -->

| Field         | Value      |
|---------------|------------|
| Author        | Nat Rurka  |
| Date          | 2026-10-25 |
| Status        | Draft      |
| Decision Date | N/A        |
| Deciders      | N/A        |
| Superseded By | N/A        |

## Problem and Context

As our application will be online and have user accounts, as well as uploads, we will need to store large amounts of data. The issue then is how do we store this data and serve it to our users? It is also important to consider a realistic scope for this project, in terms of how scalable our database hosting needs to be.

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
- Free tier limits: 1GiB total data, 10GiB network usage per month, 20k writes/day, 50k reads/day
    - Fortunately, our app will likely no exceed the network, read, and write limits
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
- Lesser customizability than cometing options (AWS) which are more complex yet specific

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

### Option C: Do Nothing

There is no "current path" for picking our database hosting. What this means is that if nothing is done in terms of picking a database host, we would have to design the app in such a way that it does not utilize a central database.
To my understanding, this is infeasible if not impossible to do. The risks of users hosting data on their own device leading to lost data, accounts, or users tampering with data, is not allowable, and thus a database-less architecture is unrealistic.

## Analysis

Even though Amazon Web Services does provide significantly more value in terms of the free tier, with 2.5 million read/write requests before charging, and 25GB of storage, Firebase wins out of plain simplicity of design, setup, and integration. AWS is complex for good reason, but that sort of complexity is simply a strong roadblock for us when it comes to creating this app.
With the free credits that Firebase offers, and the possibility of us getting funding for this project regardless, Firebase will lead to easier  and quicker integration with our project, allowing us to get started on putting our ideas into code more quickly, with less worry about server design.

## Recommendation and Verification Plan

From the simple research done over the past few days, it seems like Firebase is the clear winner for a small-scale mobile and web application. If this project were to expand further into something that would be marketed as a real product, it is likely that AWS would eclipse Firebase as the ideal provider due to its higher level of customizability and the fact that it is the enterprise standard for cloud database hosting.

## Constraints

As we have no partner in this project, there is little to no risk in terms of partner confidentiality. Our product will be licensed under an open source license, meaning that there is also little consideration for licensing. The largest concern would likely be data use, as we are handling the data of the end user. In terms of database choice, the security practices either implemented by the provider, in the case of Firebase, or our systems design, in the case of Amazon Web Services, would affect the safety of our users' data.

## Delegation and Validation

Nothing was handed to AI tools when it came to this RFC. As bothersome as navigating the many web pages of payment information, serverless architectures, and database designs was, it was done by me, *mostly* accurately, I hope.

## Decision

Accepted, rejected, or superseded, with the date and who chaired the decision. If superseded, link the RFC that replaces this one.