---
title: Generating molecular graphs with a graph VAE
year: 2025
type: project
tags: [Generative models, Graph neural networks]
course:
  code: "02460"
  name: Advanced Machine Learning
  url: https://kurser.dtu.dk/course/02460
group: true
thumbnail: /thumbs/molecular-graph-generation.png
featured: false
blurb: We built a graph variational autoencoder that generates molecule-like graphs, and compared it with a random-graph baseline.
links: []
files: []
---

We built a variational autoencoder that generates new molecule-like graphs, and
compared it with a simple random-graph baseline.

> [!note] Course context
> Mini-project 3 of 3 in DTU's Advanced Machine Learning course, written as a
> one-page report with Jone Steinhoff, Lukas Rasocha and Mads Prip. See also
> [mini-project 1](/projects/vae-priors-flows-diffusion) and
> [mini-project 2](/projects/vae-latent-geodesics).

## The assignment

Build a deep generative model that produces graph structures for MUTAG, a small
dataset of 188 molecular graphs where atoms are nodes and bonds are edges. The
model had to use a graph neural network, and be compared with a random-graph
(Erdős–Rényi) baseline. Each model was to sample 1000 graphs, which were checked
for novelty and uniqueness and compared with the real molecules on a set of
graph statistics.

## What we did

- **Baseline.** For each new graph, we drew the number of nodes from the training
  data, used the average edge density of training graphs of that size, and
  sampled a random graph with that density.
- **Graph VAE.** The encoder is a three-layer Graph Isomorphism Network (GIN).
  It passes messages between neighbouring atoms, then sums over all nodes into a
  single latent vector for the whole graph. The GIN update for node $u$ is:

  $$
  \mathbf{h}_u^{(k)} = \mathrm{MLP}^{(k)}\Bigl(\bigl(1+\epsilon^{(k)}\bigr)\,\mathbf{h}_u^{(k-1)} + \sum_{v\in\mathcal{N}(u)} \mathbf{h}_v^{(k-1)}\Bigr)
  $$

- **Decoder.** An MLP decodes the latent vector into node and edge
  probabilities, mirrored to keep the graph undirected.
  - **Different graph sizes:** graphs are padded to 28 nodes, the largest in the
    data, and the padding is masked out of the loss.
  - **Node order:** a breadth-first search from the highest-degree atom fixes the
    order, because the MLP depends on it.
  - **Loss:** node and edge cross-entropies plus a weighted KL term.

## Results

| Model    | Novel (%) | Unique (%) | Novel and unique (%) |
| :------- | --------: | ---------: | -------------------: |
| Baseline |       100 |        100 |                  100 |
| Graph VAE|      99.3 |       67.9 |                 67.8 |

- **Novelty alone is not the goal.** The baseline's graphs are all new and all
  different, but only because they don't resemble real molecules. The VAE's
  graphs are almost all new (99.3 %), while sharing more structure with each
  other (67.9 % unique).
- **Closer to real molecules.** The VAE matched the real data better on the graph
  statistics. Real molecules almost never form triangles (a clustering
  coefficient near zero): the VAE captured this, and the baseline did not. The
  VAE also followed the eigenvector centrality and the upper range of the node
  degrees more closely. It missed the lower range of degrees, which suggests its
  graphs are more chain-like than real molecules.

![A three-by-three grid of histograms: clustering coefficient, eigenvector centrality and node degree (rows) for the baseline, the real data and the graph VAE (columns). The real data's clustering coefficient is all zero; the VAE's is mostly zero, the baseline's is spread around 0.26.](/images/molecular-graph-generation/mp3-graph-stats.png "Graph statistics for the baseline, the real molecules and the graph VAE.")

## My contribution

TODO: Petr to write: which parts of the project were mine.
