---
title: Predicting water pipe failures in Danish drinking-water networks
year: 2026
type: thesis
thesis:
  degree: MSc
  institution: DTU Sustain, Technical University of Denmark
  supervisors: [Roland Löwe, Frederik Tinus Jeppesen]
tags: [Survival analysis, Machine learning, Water infrastructure]
# TODO: replace with a real thumbnail in public/thumbs/ (a figure Petr exports;
# never a map or anything showing pipe locations).
thumbnail: /thumbs/placeholder.jpg
featured: true
blurb: MSc thesis. Do weather, soil and nearby roads and railways help predict water pipe failures beyond the pipes' own attributes?
links: []
files: []
---

I tested whether weather, soil and nearby roads and railways help predict which
drinking-water pipes will fail, beyond what the pipes' own age, length, material
and diameter already tell us.

> [!note] About this thesis
> My MSc thesis at DTU Sustain, supervised by Roland Löwe and Frederik Tinus
> Jeppesen. It was
> carried out in collaboration with Envidan, using pipe and failure data from
> HOFOR, VandCenter Syd and Aarhus Vand.

## Abstract

This thesis investigates whether environmental and infrastructural features
improve the prediction of water pipe failures beyond intrinsic pipe features.
Intrinsic pipe features, such as *pipe age, length, material* and *diameter*,
are commonly among the most important predictors of water pipe failures. Yet
external conditions, such as weather, soil, and proximity to roads and
railways, may also influence water pipe failures through frost, drought, soil
properties and traffic loading.

This thesis uses water pipe failure records from Danish water utilities, along
with environmental and geospatial data, and applies a discrete-time survival
framework and machine learning methods. The results show that intrinsic pipe
features were the most important predictors of water pipe failures. In
particular, the *pipe age, length, material* and *diameter* contributed more to
the model predictive performance than the environmental and infrastructural
features.

Weather features such as freezing and dry conditions showed some association
with water pipe failures, but including weather in the models did not improve
their predictive performance, alongside soil and proximity to the road and
railways.

In conclusion, the results and the literature review suggest that
environmental and infrastructural features may be associated with water pipe
failures, but they do not improve the models' predictive performance beyond
that of the intrinsic pipe features within the scope of this thesis.

## The problem

Drinking-water networks are critical infrastructure. In Denmark, water
utilities pump up groundwater, treat it and distribute it to homes and
businesses. The pipes are about 39 years old on average, and failures are one
of the main signs of their condition: every failure loses treated water and
interrupts supply.

Denmark already loses relatively little water, about 7.8 %, compared with
roughly 20 % in Europe and 30 % globally. But the utilities face large
investments in the network over the coming decades, and replacing a pipe that
still works is both wasteful and expensive. Knowing which pipes are most likely
to fail helps decide which to replace first.

Machine-learning models can make that prediction from historical failures and
pipe characteristics. Earlier studies agree that a pipe's own attributes (age,
length, diameter and material) are the strongest predictors. Weather, soil and
other surroundings have also been linked to failures, but how much they add to
the predictions is less clear, and no similar study had been done for Danish
networks. My research question was therefore: to what extent does
environmental data improve the prediction of water pipe failures, compared with
the pipes' own attributes, in a Danish setting?

To answer it, I asked:
- which environmental factors are the best established in the literature
- which of them can be obtained from open Danish data
- how they relate to the observed failures
- whether they improve the models' predictions
- which features matter most

## Data and approach

- **Pipe and failure data** from the three largest water utilities in Denmark:
  Aarhus Vand, HOFOR and VandCenter Syd.
- **Environmental and infrastructure features**, chosen from the literature
  review: temperature and precipitation (as signs of frost and drought), soil,
  and the distance to roads and to railways (traffic loading). These come from
  open sources: DMI, GEUS and GeoDanmark.
- **Discrete-time survival analysis** combined with machine-learning models.
  I compared models that use only the pipes' own attributes with models that
  also include the environmental and infrastructure features.

## Findings

- **The pipes' own attributes matter most.** Age, length, material and
  diameter were the most important predictors, as in the earlier studies.
- **Some weather conditions are associated with failures.** Features related
  to freezing and drought showed some association with failures; soil and the
  infrastructure features did not.
- **None of them improved the predictions.** Adding the environmental and
  infrastructure features did not improve predictive performance beyond the
  pipes' own attributes.
- **That does not make them unimportant.** My method could not show an
  improvement, but a different way of formulating or including these features
  might. Finding one would help utilities rank pipes by failure risk, lowering
  renewal costs and reducing water loss further.

![Placeholder for the feature-importance plot](/images/placeholder-figure.svg "Feature importance: the pipes' own attributes compared with the environmental and infrastructure features.")

<!-- TODO: Petr to export a feature-importance plot to inbox/images/thesis-msc/
and replace the placeholder above. No maps or pipe locations. -->

![Placeholder for the model comparison](/images/placeholder-figure.svg "Predictive performance with and without the environmental and infrastructure features.")

<!-- TODO: Petr to export a model comparison (with vs. without the environmental
features) to inbox/images/thesis-msc/ and replace the placeholder above. -->
