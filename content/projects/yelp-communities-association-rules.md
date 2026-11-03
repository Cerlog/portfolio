---
title: Global versus community taste patterns in Yelp reviews
year: 2025
type: project
tags: [Graph clustering, Association rules, Sentiment analysis]
course:
  code: "02807"
  name: Computational Tools for Data Science
  url: https://kurser.dtu.dk/course/02807
group: true
github: https://github.com/Cerlog/02807-project
thumbnail: /thumbs/yelp-communities-association-rules.png
featured: false
blurb: Louvain communities in the Yelp friendship network, and association rules on restaurant categories, showing that communities have strong patterns the global data hides.
links: []
files: []
---

We found communities in Yelp's friendship network and mined restaurant
preferences inside each one. This showed that the patterns within a community
are much stronger than, and largely different from, the patterns across all
users.

> [!note] Course context
> The final group project in DTU's Computational Tools for Data Science course,
> with Alejandra Caballero Perez, Karoline Helene Baarsøe Jørgensen and Kristine
> Rigmor Agergaard Andersen.

## The assignment

Choose a technically challenging, real-world data-science problem and solve it
with at least one, preferably two, of the course's main topics (for example
frequent itemsets, clustering or graph clustering). The project also had to
include at least one technique not taught in the course, explained in the
report.

## What we did

The question was whether "market basket" rules, such as *users who like X also
like Y*, look different inside close-knit groups of users than across everyone.

- **Data.** The Yelp Open Dataset: about 7 million reviews of more than 150,000
  businesses by about 2 million users, plus a Kaggle list of food and restaurant
  categories.
- **Friendship graph.** Half of the users list no friends, so we kept the largest
  connected component (about 900,000 users and 7 million friendships). To make
  the analysis manageable, we sampled 30,000 users and took the largest connected
  part again, giving a network of 4,132 users and 6,003 friendships.
- **Communities.** On the sampled network, spectral clustering reached a
  modularity of 0.44 (57 clusters), while the Louvain algorithm reached 0.77
  (55 communities). We used the Louvain communities.
- **Baskets.** Each user is a basket, and the restaurant categories they reviewed
  are the items.
  - **Simplifying categories:** the businesses had 37,946 unique food and
    restaurant categories. We reduced these to 200 by picking one
    category per business at random. A check with 100 Monte Carlo simulations
    showed this barely changes the distribution.
  - **Liked and hated:** we split the baskets by rating, liked (4 stars or more)
    or hated (under 3 stars), giving about 3 million and 1 million baskets.
- **Association rules.** We ran Apriori (minimum support 0.012, confidence 0.4)
  on all users and on each of the six largest communities. We compared the rule
  sets with the Jaccard similarity and with their average support, confidence
  and lift.
- **Sentiment check (outside the course).** We used a pretrained RoBERTa
  sentiment model to confirm that the star-based liked/hated split matches the
  tone of the review texts.

![Histogram of node degrees in the sampled friendship network, with almost all users having very few friends (minimum 1, maximum 147, average 2.906), overlaid on a drawing of the network.](/images/yelp-communities-association-rules/degree-distribution.png "Degree distribution of the sampled friendship network: most users have only a few friends.")

## Results

- **Community rules are stronger.** Averaged over the six largest communities,
  the rules have much higher support, confidence and lift than the global rules:

  | Baskets | Scope       | Support | Confidence | Lift |
  | :------ | :---------- | ------: | ---------: | ---: |
  | Liked   | All users   |   0.025 |       0.57 | 2.36 |
  | Liked   | Communities |   0.111 |       0.78 | 3.33 |
  | Hated   | All users   |   0.013 |       0.42 | 1.72 |
  | Hated   | Communities |   0.134 |       0.86 | 4.61 |

- **They are also different rules.** The Jaccard similarity between the global
  rules and each community's rules was low, at most 0.12. For some communities
  there was no overlap at all, so patterns that show up across all users don't
  carry over into the communities.
- **The liked/hated split holds up.** Liked reviews were strongly positive in
  tone (mostly above 0.9) in every community. Hated reviews were negative, but
  less strongly. Neutral reviews leaned slightly positive, which supports leaving
  them out.
- **Limitation.** Everything was done on one sample of 30,000 users from a graph
  of almost 2 million. Repeating the analysis over many samples, or on the full
  graph, would be needed for firm conclusions.

![Six network drawings of the largest Louvain communities, from 633 users down to 177. The largest has a dense central hub; the others are more tree-like with several small hubs.](/images/yelp-communities-association-rules/louvain-communities.png "The six largest Louvain communities in the sampled friendship network.")

## My contribution

TODO: Petr to write: which parts of the project were mine.

<!-- From the group's report: Petr worked on the Apriori analysis (with
Alejandra) and the sentiment analysis (with Kristine). Use as a starting point. -->
