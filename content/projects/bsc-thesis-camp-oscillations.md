---
title: Designing, modelling and analysing the AC-cAMP-PDE subsystem
year: 2023
type: thesis
thesis:
  degree: BSc
  institution: Roskilde University
  supervisors: [Johnny T. Ottesen]
tags: [Dynamical systems, Mathematical biology, Bifurcation analysis]
group: true
thumbnail: /thumbs/bsc-thesis-camp-oscillations.png
featured: true
blurb: BSc thesis. A cell-signalling pathway modelled as nine coupled differential equations, reduced to two and three, and analysed for oscillations.
links: []
files: []
---

We modelled a cell-signalling pathway as nine coupled differential equations,
simplified the model to three and then two equations, and analysed when and why
it oscillates.

> [!note] About this thesis
> My BSc thesis at Roskilde University, supervised by Johnny T. Ottesen. I wrote
> it together with Rasmus W. Christiansen, Julien Hirsch, Marina Nocera and
> Ingvar Hjartarson.

## The problem

Many biological processes run in rhythms. The stress hormone cortisol follows a
daily (circadian) cycle, and within that cycle it also rises and falls on a
faster, ultradian rhythm, with periods from about 20 minutes to 6 hours.
Disturbed ultradian rhythms are associated with several diseases, depression
among them, so it is worth understanding where they come from.

One hypothesis is that the rhythms come from nonlinear behaviour somewhere in
the system that produces and releases cortisol. We looked at one candidate: the
AC-cAMP-PDE subsystem of the cAMP signalling pathway inside the cell, which helps
regulate many hormones, including cortisol. Can a simplified model of this
subsystem oscillate on its own, and are the simplifications valid?

## Model and approach

The subsystem has two switches. The enzymes AC and PDE each flip between an
active and an inactive form, and cAMP and two further enzymes, D and E, push them
one way or the other. Active AC produces cAMP; active PDE breaks it down.

![Diagram of the AC-cAMP-PDE pathway: PDE and PDEp, and AC and ACp, switch between their two forms; dashed loops show cAMP and the enzymes D and E driving those switches; cAMP is produced at rate k1 and removed at rates k2 and k3.](/images/bsc-thesis-camp-oscillations/compartmental-model.png "The AC-cAMP-PDE pathway: two switch-like enzyme modules around cAMP.")

Written out with the law of mass action, the full model has nine variables and
about thirty parameters. That is too many to see what drives the behaviour, so we
reduced it in several ways:

- the **standard quasi-steady-state approximation** (sQSSA), which brings it
  down to three variables and fifteen parameters
- the **total quasi-steady-state approximation** (tQSSA)
- the **Goldbeter–Koshland function**, which reduces each three-variable model to
  two variables

In the three-variable sQSSA model, for example, cAMP is produced by active AC and
removed by active PDE and a constant outflow:

$$
\frac{d[\mathrm{cAMP}]}{dt} = k_1[\mathrm{AC_p}] - \bigl(k_2[\mathrm{PDE_p}] + k_3\bigr)[\mathrm{cAMP}]
$$

For each reduced model we found the fixed points and their stability, ran
simulations from many initial conditions, and carried out a bifurcation
analysis on the parameters that mattered most.

An approximation like the sQSSA is only valid when the enzyme is scarce
compared with its substrate. We tested this with the condition

$$
\varepsilon = \frac{E_0}{S_0 + K_m} \ll 1,
$$

using $\varepsilon < 0.1$ as the threshold.

## Findings

- **Every reduced model oscillates.** All reductions reproduced the oscillating
  behaviour we were looking for: trajectories from different starting points
  settle onto a limit cycle.
- **Oscillations start through Hopf bifurcations.** Most of the parameters we
  examined in the two-variable sQSSA model produce supercritical Hopf
  bifurcations. For the total amount of AC, for example, the fixed point turns
  from a stable to an unstable spiral at $[\mathrm{AC}_t] = 3.94$, and a limit
  cycle appears.
- **Not every reduction is meaningful.** In the two-variable tQSSA model the
  Goldbeter–Koshland function grows without bound as cAMP approaches a certain
  value, which does not make sense biologically.
- **Only one reduction was valid.** For our parameters, only the
  three-variable tQSSA model met the conditions for its approximation. The
  sQSSA-based models did not.
- **The parameters have no biological backing.** We chose them to produce
  oscillations, not from measurements, so even the valid model is not yet a
  realistic description of the cell.

![Phase plot of PDEp against cAMP: trajectories from sixteen initial conditions all converge to the same closed loop.](/images/bsc-thesis-camp-oscillations/limit-cycle.png "Limit cycle of the two-variable sQSSA model: trajectories from different initial conditions are drawn to the same cycle.")

![Bifurcation diagram: the cAMP fixed point against the parameter ACt. Below about 4 the fixed point is a stable spiral; above it, it becomes an unstable spiral and the maximum and minimum of cAMP split apart as a limit cycle appears.](/images/bsc-thesis-camp-oscillations/bifurcation-act.png "Bifurcation diagram for the total amount of AC: a Hopf bifurcation at [ACt] = 3.94.")

> [!tip] What we would do differently
> Restrict the parameter search to values that satisfy the quasi-steady-state
> conditions from the start, so that the oscillating models are also valid ones.

## My contribution

TODO: Petr to write: which parts of the thesis were mine.
