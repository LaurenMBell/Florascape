# RFC: Cross-platform app development and frontend framework decision

| Field | Value |
| --- | --- |
| Author | Lauren Bell |
| Date | 2026-11-22 |
| Status | Accepted |
| Decision Date | 10-27-26 |
| Deciders | Annie Luse, Nat Rurka, and Lauren Bell |

## Problem and Context
We are building a species identification mobile game where users gain experience, purchase or win new cosmetics for their profile, and complete challenges within teams or individually by snapping photos of plants and identifying them. Users are able to friend one another, participate in community events, play minigames, scroll a feed of local sightings from friends or community members, and visualize local sightings on a map of their area. This idea, and several of the crucial features, are adapted from the scientific citizen science app, iNaturalist. We are drawing significant inspiration from the iNaturalist app, as well as Pokemon Go’s location-based game experience and Instagram’s feed and user connection structure. 

Because this is an entirely new application with no inherited codebase, we need to choose a development framework to use from the beginning. There are several good options, however, in terms of timeline, we need to decide what's best as soon as possible so we can start app development in a way that is commitment-oriented. Some important goals of ours we are keeping in mind while deliberating this choice:

We want the app to be cross-platform and available to users on both mobile and web. We want to be able to develop each of these versions (i.e. web, iOS, and Android versions) in a single codebase, instead of building each platform’s respective version individually.
We have relatively limited mobile development experience (no experience with Kotlin for Android or experience with Dart or Flutter for iOS), however, we've each designed JavaScript/HTML/CSS websites and apps before in industry or coursework-based experiences, and have experience with component-based libraries like React through coursework CRUD apps.
With this lack of mobile-specific experience, we want to select a framework that is very well documented with tutorials for a variety of use cases, and has a lot of technical support behind it. 
In terms of necessary features, a critical part of the app is the ability to use the camera from within the application, as well as location-based tagging of photos. 
We also need to be able to render a map with location-based tags, which could be intensive on a given frontend framework’s performance.

There are several viable options, but also a lot of criteria to weigh. If we don't make this choice soon, the project will continue to be developed with a lack of commitment, since at any point we might migrate to a different, better framework.  

That case, if we want to switch frameworks partway through development, would require a potentially long delay in development during migration to (at its worst case) from one language to another. At its best, we'd only need time to rebuild components, but that would still push back our plans. 

Deciding something this foundational to a project will be key to building a strong foundation for the rest of the development lifecycle. 


## Options

### Option A: React Native + Expo

React Native Docs: https://reactnative.dev/docs/getting-started
Expo Docs: https://docs.expo.dev

React Native is a cross-platform component library for JavaScript apps, and Expo is the leading recommended framework for developing React Native apps. A large benefit of this option is that we have previous experience with JS and React, and the transfer would be less time
consuming. 

While we could develop the app without Expo, Expo provides tools for development for both iOS and Android without necessarily needing to install XCode or Android Studio (or write platform-specific code), which will help us accomplish more, faster. Expo oﬀers additional components to the UI options built into React Native, including a camera preview component and a location reader. React Native and Expo both have thorough documentation and a wealth of tutorials, which is a major benefit for a team not super accustomed to mobile development. 

There aren't any strong arguments against using React Native and Expo when compared to other options, it definitely seems like the best choice. 

# We’ve moved forward with utilizing React Native and Expo as our frontend and development frameworks. 

### Option B: Ionic + Capacitor

Ionic Docs: https://ionicframework.com/docs/components 
Capacitor Docs: https://capacitorjs.com/docs/getting-started/with-ionic

With the above said, another component-based JavaScript library that could be a viable option is Ionic. It has its own CLI, and was specifically made for mobile applications, so many of the features that we need (like camera and location) are also provided by Ionic through their tool Capacitor. It's made to be compatible with Vue, Angular, and React, so other technologies that we've had experience with are easy to use, and have a lot of existing documentation.

### Option C: Do Nothing

If we were to not select a cross platform framework, we'd have to develop versions of the app for diﬀerent OS's individually, in languages we're not particularly familiar with, so we definitely need to select a framework that allows for cross-platform development, and early. This isn’t unheard of, and is the choice of development methods for many apps (WhatsApp, Uber, Twitter/X). This wouldn’t be an indefensible choice, but would be much more time consuming and have a much higher ‘activation energy’ than selecting a framework similar to languages our team has used before.

As of the first draft of this RFC, we have been heavily favoring React Native/Expo, and with that have begun creating scaﬀolding to move forward with that as our choice. It won't be a big change to switch to Ionic during early Fall term when we're still working oﬀ the template Expo app, but when we actually have working code or a substantial number of functional features, it'll be a little more diﬃcult to switch to an alternative framework. 

## Analysis

The research for this RFC mostly consisted of scouring developer blog posts and software engineering Reddit threads for mobile app developer recommendations, with some of the notable ones being:

A blog post from the Kotlin developers recommending Ionic as a cross-platform framework worth considering, with the main draw being its integrations with Angular, React, and Vue. 
URL: https://kotlinlang.org/docs/multiplatform/cross-platform-frameworks.html#ionic

A Reddit thread recommending React Native to a new mobile developer looking for a framework to utilize. This thread was particularly relevant to our need as React Native’s thorough documentation and large number of users was cited as helpful for beginning mobile developers. 
URL: https://www.reddit.com/r/learnprogramming/comments/1hi5lbq/creating_cross_platform_mobile_app_where_to_start/

Similarly, a thread comparing React Native to Ionic that reiterates React Native’s superior documentation. Devs also brought up recent updates to React Native’s underlying engine bringing increased speed to both mobile OS’s. 
URL: https://www.reddit.com/r/ionic/comments/103be07/ionic_vs_react_native/


A blog post comparing performance of Ionic vs React Native from the Ionic team argued that differences in performance between React Native and Ionic were mainly marginal, and that Ionic and React Native were both well-suited for the goal of cross-platform mobile applications. 
URL: https://ionic.io/blog/ionic-vs-react-native-performance-comparison


Finally, a Medium article argued for and against different cross-platform app development frameworks, keeping in mind small teams and CRUD apps. A large takeaway from this piece was that because React Native is so similar to React, teams with previous web development experience in React would transfer easier to React Native than another framework. Since speed of development is a priority and important characteristic for our team, this piece brought additional clarity about what learning a new framework would require. 
URL: https://medium.com/@arinvolkov/cross-platform-development-fundamentals-building-apps-for-a-multi-device-world-4246e5b92498

(All works cited officially under References.)

In terms of performance, Ionic and React Native act very similarly. According to the Ionic team’s article comparing the two, the only noticeably diﬀerences in performance between the two is that React Native has a slightly shorter boot time, and Ionic is less CPU intensive. Both are JavaScript-based, so we won't have as much of a steep learning curve as developing in C# or a native language. Both frameworks oﬀer the integrations we need for our app's functionality.

 All in all, both are good options, and we just need to pick one and commit to it.

As of Sprint 2, we have committed fully to development in React Native utilizing Expo. 

## Recommendation and Verification Plan

When this decision was first being posed, we had begun working oﬀ an Expo tutorial app, however, seeing how early in the process we were, we didn’t consider it to be hard to switch to Ionic if that's what was decided when posed with additional information.

A big benefit of React Native, that Ionic lacks in, is just the amount of documentation provided by its maintainer, Meta. Seeing as we're starting from scratch either way, having ample amount of technical support will be important to succeeding in a reasonable timeframe. React Native and Expo offer many tutorials and encyclopedic documentation, as well as a large base of users and user forums, so it doesn’t seem unreasonable to consider React Native and Expo better documented than Ionic and Capacitor. (Additionally, our project mentor has experience in React Native and Expo development, and can serve as another resource as we adapt our pre-existing knowledge.)

Furthermore, our team already has experience with React and its component-based structure through web development coursework, so picking up React Native shouldn't be a large barrier or time-consuming step. Our heaviest graphics will be rendering the map, so we will need to implement that within the first few sprints in order to determine if the slowdown from the JavaScript bridge is a dealbreaker. If so, we'll consider workarounds within React Native first, then look into alternative frameworks like Ionic. 

As development has continued, we found map providers for web and mobile that are light, open-source, and able to have data overlaid without impacting the interface or user experience in a way that would make us reconsider our frontend framework. That has helped solidify our choice in developing the app with React Native and Expo. 

## Constraints

No licensing, data use, IP, and partner confidentiality boundaries for this decision.

## Delegation and Validation

- **What you handed to AI tools** This decision was made entirely by our team without utilizing AI tools. 
- **What checks made that reasonable** There are currently no existing gates or partner obligations, so the choice was made entirely by our team via deliberation and research. While we didn’t perform any head-to-head comparison of metrics between React Native and Expo, early work on the app made it evident that React Native and Expo’s performance is fast and satisfactory for our use cases as of now. If performance becomes an issue down the line, we will work to mitigate that without considering switching frontend frameworks. Additionally, Expo offers easy access to testing mobile versions through their app, Expo Go, which although we didn’t first consider, it has become a crucial part of developing our application. 
- **Where you stopped and validated the result yourself, and why those points.** Research was done to determine the benefits and drawbacks of each development framework, and the decision was made on the basis that we can reverse if needed early in the process of developing our application. Furthermore, implementation with React Native showed that performance was satisfactory for our initial use cases. 

## Decision

React Native + Expo officially committed as our choice of cross-platform development framework as of 10-30-26, by the members of Team 26: Nat Rurka, Lauren Bell, and Annie Luse.

## Revision Log
| Source | Feedback | Decision | Where or Why | 
| --- | --- | --- | — |
| Reviewer 1 | No credible option referenced for ‘Do nothing’ | Changed | Doing nothing would be more akin to implementing platform-specific versions and the reasoning would be more in line with time consumption than what was posed. | 
| Reviewer 1 | Verification plan is too subjective | Changed | The previous verification plan was subjective without any general guidelines, now the verification plan is specifically determined by team satisfaction instead of arbitrarily decided as ‘too slow’. | 
| Reviewer 2 | Verification plan is too subjective, similar to feedback received from Reviewer 1 | Changed | The verification plan is inherently subjective, as we didn’t implement a head-to-head comparison between the two leading options, however, we found React Native to be satisfactory for our needs and as such, our verification has been based on user experience instead of quantitative metrics | 
| Instructor Feedback | Include additional context | Changed | This was a note from other reviewers as well, an additional paragraph of overview has been added to the beginning. | 


## References

Sources cited above informally. 

Introduction to Expo. (n.d.). Expo Documentation. Retrieved November 22, 2026, from https://docs.expo.dev
Ionic. (n.d.). UI components - ionic documentation. Ionic Docs. Retrieved November 22, 2026, from https://ionicframework.com/docs/components
Kotlin multiplatform help. (2017). Kotlin Multiplatform Help. https://kotlinlang.org/docs/multiplatform/cross-platform-frameworks.html
React Native. (n.d.). Introduction · REACT NATIVE. Reactnative.Dev. Retrieved November 22, 2026, from https://reactnative.dev/docs/getting-started
Simmons, C. (2022, March 23). Ionic vs. react native: Performance comparison. Ionic Blog. https://ionic.io/blog/ionic-vs-react-native-performance-comparison
u/dromance. (n.d.). Ionic vs react native ? [Online forum post]. Reddit. Retrieved November 22, 2026, from https://www.reddit.com/r/ionic/comments/103be07/ionic_vs_react_native
u/Fizzy_Chocolate. (2024, December 19). Creating cross platform mobile app, where to start...? [Online forum post]. Reddit. https://www.reddit.com/r/learnprogramming/comments/1hi5lbq/creating_cross_platform_mobile_app_where_to_start
Volkov, A. (2026, January 27). Cross platform development fundamentals: Building apps for a multi-device world. Medium. https://medium.com/@arinvolkov/cross-platform-development-fundamentals-building-apps-for-a-multi-device-world-4246e5b92498

