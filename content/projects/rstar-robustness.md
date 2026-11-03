---
title: Evaluating the robustness of rStar
year: 2024
type: project
tags: [LLM reasoning, Robustness evaluation]
course:
  code: "02456"
  name: Deep Learning
  url: https://kurser.dtu.dk/course/02456
group: true
github: https://github.com/lukyrasocha/rStar
poster: /files/posters/02456-rstar-robustness-poster.pdf
# TODO: replace with a real thumbnail exported to public/thumbs/, e.g. the
# accuracy-drop chart (report Fig. 3) or a crop of the poster.
thumbnail: /thumbs/placeholder.jpg
featured: false
blurb: We tested whether rStar, a search-based reasoning framework for small language models, still solves grade-school maths problems when the questions are reworded.
links: []
files: []
---

We tested whether rStar, a framework that makes small language models better at
maths reasoning, still gets the answers right when familiar benchmark questions
are reworded.

> [!note] Course context
> A group project in DTU's Deep Learning course, supervised by Ole Winther and
> Davide Venuto. I worked on it with Jone Steinhoff, Lukas Rasocha,
> Panagiota Emmanouilidi and Robert Spralja.

## The assignment

rStar is a published method that pairs a small open-source language model with
Monte Carlo tree search. The model explores different reasoning steps, and
answers that the model reaches consistently are rewarded. The authors report
large gains on maths benchmarks. Our brief was to understand how the method
works, reproduce it with the authors' code, and then probe it: change the set of
reasoning actions, and test it on new questions that resemble the benchmark but
cannot have been in the model's training data.

## What we did

Benchmarks such as GSM8K (grade-school maths word problems) may flatter a model
if some of the test questions leaked into its training data. Following the
GSM-Symbolic approach of Mirzadeh et al., we checked how much of rStar's
accuracy survives when the questions change but the maths stays the same.

- **Baseline.** We picked 20 random questions from the GSM8K test set and ran
  rStar on them with the original authors' code and setup. rStar uses
  Mistral 7B to generate reasoning paths and Phi-3-mini to check them.
- **Five kinds of variation.** We wrote templates that turn each question into
  new versions:
  1. different names
  2. different numbers
  3. both of these together
  4. "NoOps": an added sentence that fits the story but doesn't change the answer
  5. irrelevant information: an off-topic sentence that contains a number

  Each template was realised five times, for 500 new questions in total. The
  NoOps sentences were written by hand; the others were generated in Python.
- **A new reasoning action.** The generator model often worked the irrelevant
  numbers into its reasoning, so we added a sixth action to rStar. It asks the model to rewrite
  the question without the irrelevant information before reasoning about it.

![Placeholder for the project overview diagram](/images/placeholder-figure.svg "Overview: GSM8K questions are turned into five kinds of variation and run through rStar's generator and discriminator.")

<!-- TODO: export the project overview diagram (report Fig. 1) to
inbox/images/02456/ and replace the placeholder above. -->

## Results

Accuracy fell compared with the baseline in every experiment. All but one of the
drops were larger than one standard deviation.

| Variation                | Accuracy change vs. baseline |
| :----------------------- | ---------------------------: |
| Different numbers        |                        −17 % |
| NoOps                    |                         −8 % |
| Names and numbers        |                         −7 % |
| Irrelevant information   |                         −6 % |
| Different names          | smallest; within one std. dev. |

- **Numbers hurt most.** Changing only the numbers caused the largest drop.
  Changing names and numbers together hurt far less. One possible explanation is
  data contamination: the model may recognise the original questions, and a
  heavier rewrite pushes it to actually reason. This is a hypothesis we could
  not test.
- **Plausible-looking sentences hurt more than off-topic ones.** NoOps cost
  slightly more accuracy than irrelevant information.
- **Compared with the published numbers.** Mirzadeh et al. report a 28.3 % drop
  for Mistral 7B on its own on their NoOps set. Our NoOps drop with rStar was
  8 %. However, our NoOps sentences were probably simpler than theirs, so the
  comparison is rough.
- **The new action did not help yet.** On one irrelevant-information set, it
  removed the irrelevant sentence correctly in only 2 of 20 questions. In the
  others it either kept the sentence or also removed information needed to solve
  the problem.

![Placeholder for the accuracy chart](/images/placeholder-figure.svg "Average accuracy of rStar's discriminator and majority vote in each experiment, against the baseline.")

<!-- TODO: export the accuracy-by-experiment chart (report Fig. 2) to
inbox/images/02456/ and replace the placeholder above. -->

![Placeholder for the accuracy-drop chart](/images/placeholder-figure.svg "Accuracy change relative to the baseline in each experiment, alongside two results from Mirzadeh et al.")

<!-- TODO: export the accuracy-drop chart (report Fig. 3) to
inbox/images/02456/ and replace the placeholder above. -->

> [!tip] What we would do next
> Use more questions and more variations, and repeat each run to account for the
> randomness of language models. Run plain Mistral 7B on our own NoOps set, so the
> comparison with published results is like for like. Try other prompts for the
> filtering action.

## My contribution

TODO: Petr to write: which parts of the project were mine.
