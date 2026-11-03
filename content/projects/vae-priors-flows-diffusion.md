---
title: VAE priors, normalising flows and diffusion on MNIST
year: 2025
type: project
tags: [Generative models, VAE, Diffusion models]
course:
  code: "02460"
  name: Advanced Machine Learning
  url: https://kurser.dtu.dk/course/02460
group: true
thumbnail: /thumbs/vae-priors-flows-diffusion.png
featured: false
blurb: We compared three priors for variational autoencoders, then set VAE samples against a normalising flow and a diffusion model.
links: []
files: []
---

We compared three priors for variational autoencoders on MNIST, then compared
samples from a VAE, a normalising flow and a diffusion model.

> [!note] Course context
> Mini-project 1 of 3 in DTU's Advanced Machine Learning course, written as a
> one-page report with Jone Steinhoff, Lukas Rasocha and Mads Prip. See also
> [mini-project 2](/projects/vae-latent-geodesics) and
> [mini-project 3](/projects/molecular-graph-generation).

## The assignment

Train and evaluate several deep generative models on MNIST handwritten digits.
First, compare different priors for a variational autoencoder (VAE): how well
each prior matches the distribution the encoder actually produces, and how
each affects the test log-likelihood. Second, train a flow-based model and a
denoising diffusion model, and compare the quality of their samples with a
VAE's.

## What we did

- **Three priors.** We trained VAEs on binarised MNIST with a standard Gaussian
  prior, a mixture of Gaussians and a VampPrior. Each was trained with two
  architectures: a fully connected network (two hidden layers of 512 units) and
  a convolutional network (three convolutional layers). We used 3- and
  10-dimensional latent spaces and a Bernoulli decoder, and trained each model
  for 40 epochs.
- **KL warm-up.** We phased in the KL term over 10 epochs for the 3-dimensional
  models and 25 epochs for the 10-dimensional ones. Larger latent spaces needed a
  longer warm-up, and with a short warm-up the mixture prior collapsed onto a few
  of its components.
- **Flows and diffusion.** On dequantised MNIST we trained a normalising flow
  with three masking strategies (checkerboard, ordered and random), using 60
  transformations, 512 hidden units and a tanh on the scale network for
  stability. We also trained a denoising diffusion model (DDPM) with a U-Net and
  1000 diffusion steps.

## Results

The VampPrior gave the best test ELBO with both architectures. The table shows
the mean and standard deviation over five runs, with 10 latent dimensions.

| Prior               | Fully connected   | Convolutional     |
| :------------------ | ----------------: | ----------------: |
| Standard Gaussian   | −85.316 ± 0.315   | −80.245 ± 0.569   |
| Mixture of Gaussians| −84.448 ± 0.501   | −79.437 ± 0.741   |
| VampPrior           | −83.686 ± 0.232   | −78.700 ± 0.794   |

- **Prior fit.** Forcing the encoder's output to match a standard Gaussian left
  holes: regions the prior considers likely but where almost no data lands. The
  mixture and the VampPrior adapt to the data instead. The VampPrior fitted best,
  because it is not restricted to Gaussian components. This matches the original
  VampPrior paper.
- **Sample quality.** All the models learned to draw recognisable digits. The VAE
  samples look pixelated, because the Bernoulli decoder makes every pixel either
  black or white. Flows and diffusion produced smoother shapes, and the diffusion
  model gave good-looking digits most consistently.

![Six scatter plots in two rows (fully connected and convolutional) and three columns (Gaussian, mixture of Gaussians, VampPrior), each showing encoded digits coloured by class over a heat map of the prior's log-density.](/images/vae-priors-flows-diffusion/mp1-priors.png "Prior log-density with the encoded data on top, for a 3-dimensional latent space (projected with PCA). Top: fully connected; bottom: convolutional.")

![A grid of generated digits 4, 6, 8 and 9 from three VAEs, three flow variants and a diffusion model. The VAE digits are blocky, the flow and diffusion digits smoother.](/images/vae-priors-flows-diffusion/mp1-samples.png "Samples of the digits 4, 6, 8 and 9 from convolutional VAEs (10 dimensions), the three flow variants and the diffusion model.")

## My contribution

TODO: Petr to write: which parts of the project were mine.
