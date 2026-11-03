---
title: Geodesics in the latent space of a VAE
year: 2025
type: project
tags: [Generative models, VAE, Differential geometry]
course:
  code: "02460"
  name: Advanced Machine Learning
  url: https://kurser.dtu.dk/course/02460
group: true
thumbnail: /thumbs/vae-latent-geodesics.png
featured: false
blurb: We measured distances in a VAE's latent space along curves that follow the data, and used an ensemble of decoders to make them more reliable.
links: []
files: []
---

We measured distances in a VAE's latent space along shortest paths that follow
the data (geodesics), and showed that an ensemble of decoders makes those
distances more reliable from one training run to the next.

> [!note] Course context
> Mini-project 2 of 3 in DTU's Advanced Machine Learning course, written as a
> one-page report with Jone Steinhoff, Lukas Rasocha and Mads Prip. See also
> [mini-project 1](/projects/vae-priors-flows-diffusion) and
> [mini-project 3](/projects/molecular-graph-generation).

## The assignment

Use a VAE on three classes of MNIST to estimate the geometry of its
two-dimensional latent space. First, compute geodesics under the metric that the
decoder induces, and judge whether they are reliable across training runs.
Second, account for model uncertainty with an ensemble of decoders. Then measure
whether that makes geodesic distances more stable than straight-line (Euclidean)
distances.

## What we did

- **A VAE with a 2-D latent space**, trained on three MNIST classes for 5000
  epochs. We picked 25 random pairs of images and encoded them.
- **Geodesics as optimised curves.** Between each pair we laid a curve of 100
  evenly spaced points with fixed endpoints. We then moved the inner points with
  Adam (learning rate 0.01, 500 steps) to minimise the curve's energy, measured
  in the space of decoded images:

  $$
  \tilde{\mathcal{E}}(c) = \sum_{i=0}^{N-1} \bigl\| f(c(t_i)) - f(c(t_{i+1})) \bigr\|^2
  $$

- **An ensemble of decoders.** We trained 10 VAEs with three decoders each,
  sampling one decoder uniformly at each epoch. The geodesics then minimise the
  energy averaged over randomly drawn pairs of decoders $f_l, f_k$, which we
  estimated by Monte Carlo with 200 samples per segment:

  $$
  \mathcal{E}(c) \approx \sum_{i=0}^{N-1} \mathbb{E}_{l,k} \bigl\| f_l(c(t_i)) - f_k(c(t_{i+1})) \bigr\|^2
  $$

- **Reliability** was measured with the coefficient of variation (CoV) of each
  pair's distance across training runs. Lower means more stable.

## Results

- **Single-decoder geodesics are mostly reliable.** Across five training runs
  most geodesics varied little, but 5 of the 25 varied noticeably more. These
  probably run through regions with little training data, where the decoders
  disagree most. They show up as the lighter areas in the right panel below.
- **More decoders, more stable distances.** The geodesic CoV fell as decoders
  were added: from about 0.22 with one decoder to about 0.18 with three. The
  Euclidean CoV stayed constant, because it depends only on the encoder. This
  agrees with Syrota et al.'s finding that decoder ensembles capture model
  uncertainty.

![Two latent-space plots of three digit classes with 25 geodesics drawn between point pairs. Left: a single decoder on a white background. Right: an ensemble, over a heat map of decoder uncertainty that is low near the data and high away from it.](/images/vae-latent-geodesics/mp2-geodesics.png "Geodesics between random latent pairs. Left: one decoder. Right: an ensemble of three, with decoder uncertainty in the background.")

![Line chart of the coefficient of variation against the number of decoders (1 to 3): the Euclidean CoV is flat at about 0.225, while the geodesic CoV drops from about 0.223 to 0.184.](/images/vae-latent-geodesics/mp2-cov.png "Coefficient of variation across training runs for 1, 2 and 3 decoders.")

## My contribution

TODO: Petr to write: which parts of the project were mine.
