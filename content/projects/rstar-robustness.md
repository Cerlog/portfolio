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
thumbnail: /thumbs/rstar-robustness.png
featured: true
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

![Diagram: the GSM8K dataset feeds four templates (names, numbers, NoOps, irrelevant information) of 20 questions each; these generate five variation datasets of 5 × 20 questions, which go through rStar's generator and discriminator, with a new custom action added, to a prediction.](/images/rstar-robustness/fig1-overview.png "Overview: GSM8K questions are turned into five kinds of variation and run through rStar's generator and discriminator.")

## Results

Accuracy fell compared with the baseline in every experiment. All but one of the
drops were larger than one standard deviation.

| Variation                | Change vs. baseline (as reported) |
| :----------------------- | ---------------------------: |
| Different numbers        |                        −17 % |
| NoOps                    |                         −8 % |
| Names and numbers        |                         −7 % |
| Irrelevant information   |                         −6 % |
| Different names          |                         −3 % |

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

![Bar chart of accuracy per experiment for the discriminator and the majority vote, with error bars and dashed baseline lines. Numbers is lowest; Names is highest.](/images/rstar-robustness/fig2-accuracy.png "Average accuracy of rStar's discriminator and majority vote in each experiment, against the baseline. Error bars show one standard deviation.")

![Bar chart of accuracy drops relative to the baseline: Mistral 7B on GSM-NoOp −28.3, Numbers −17.0, NoOps −8.0, Names and Numbers −7.0, Irrelevant information −6.0, Mistral 7B on GSM-Symbolic −3.4, Names −3.0.](/images/rstar-robustness/fig3-accuracy-drop.png "Accuracy change relative to the baseline in each experiment, alongside two results from Mirzadeh et al.")

> [!tip] What we would do next
> Use more questions and more variations, and repeat each run to account for the
> randomness of language models. Run plain Mistral 7B on our own NoOps set, so the
> comparison with published results is like for like. Try other prompts for the
> filtering action.

## My contribution

TODO: Petr to write: which parts of the project were mine.
