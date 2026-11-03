---
title: Segmenting retinal vessels and skin lesions, with and without full labels
year: 2024
type: poster
tags: [Image segmentation, U-Net, Weak supervision, Medical imaging]
course:
  code: "02516"
  name: Introduction to Deep Learning in Computer Vision
  url: https://kurser.dtu.dk/course/02516
group: true
poster: /files/posters/02516-retina-skin-segmentation-poster.pdf
thumbnail: /thumbs/retina-skin-segmentation.png
featured: false
blurb: One segmentation setup for two medical datasets, comparing loss functions, and training from a few simulated clicks instead of full masks.
links: []
files: []
---

We built one segmentation setup for two quite different medical image datasets,
compared loss functions, and tested how well a model learns from a handful of
simulated clicks instead of full masks.

> [!note] Course context
> Project 2 of 3 in DTU's Introduction to Deep Learning in Computer Vision
> course, presented as a poster, with Jone Steinhoff, Lukas Rasocha and Mads
> Prip. See also [project 1](/projects/hotdog-cnn-classifier) and
> [project 3](/projects/pothole-detection-rcnn).

## The assignment

Design one generic segmentation architecture and apply it to two datasets: PH2
(skin lesions) and DRIVE (blood vessels in the retina). Build the data splits and
loaders, compare a simple encoder–decoder with a U-Net, and report Dice, IoU,
accuracy, sensitivity and specificity. Run an ablation study on the loss
function (cross-entropy, focal loss and class-weighted cross-entropy). The
second part of the project added weak supervision: training from a few labelled
points per image instead of a full mask.

![Four panels: a PH2 skin lesion photo and its white lesion mask, and a DRIVE retina photo and its white vessel mask.](/images/retina-skin-segmentation/seg-datasets.png "The two datasets: a PH2 skin lesion and a DRIVE retina, each with its ground-truth mask.")

## What we did

- **Data.** We split each dataset 70/15/15 into training, validation and test
  sets, normalised the images per dataset, and used random 256-pixel crops.
- **Models.** A simple encoder–decoder and a U-Net, trained with Adam (learning
  rate 0.001).
- **Losses.** Binary cross-entropy, focal loss, a weighted cross-entropy for
  class imbalance, and a masked cross-entropy for the weakly supervised runs.
- **Avoiding shortcuts.** A model can learn that lesions usually sit in the middle
  of the image, or rely on the zero padding at its edges. To prevent this we
  trained on random crops without padding. At prediction time we split each image
  into sub-images, predicted each one and stitched the results back together.
- **Weak supervision.** We replaced each full mask with simulated clicks: a few
  points labelled lesion or background. We placed them in three ways (on a grid,
  at random, or stratified) and used 5 or 15 clicks per image.

![Four panels: a full lesion mask, then clicks placed on a regular grid, at random, and stratified, shown as black (background) and white (lesion) dots.](/images/retina-skin-segmentation/seg-weak-supervision.png "From a full mask to simulated clicks: grid, random and stratified placement.")

## Results

- **Focal loss worked best** on both datasets.
- **The loss matters most on DRIVE.** Blood vessels cover only a small part of
  each image. The encoder–decoder trained with plain cross-entropy learned to
  predict no vessels at all, giving a sensitivity of zero.
- **Fifteen clicks can be enough.** With stratified placement and 15 clicks per
  image, one of the weakly supervised models performed comparably to the fully
  supervised ones on PH2.
- **The datasets are small.** This limited how reliable the evaluation is.
  Cross-validation would have helped, but we didn't have the time or compute for
  it.

![Left: example predictions for a weakly supervised PH2 model, a fully supervised PH2 model and a DRIVE model, each beside the image and true mask. Right: line charts of accuracy, sensitivity, specificity, Dice and IoU for every PH2 and DRIVE model variant.](/images/retina-skin-segmentation/seg-results.png "Example predictions (left) and the five metrics for every model variant on PH2 and DRIVE (right).")

## My contribution

TODO: Petr to write: which parts of the project were mine.
