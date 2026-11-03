---
title: Detecting potholes with an R-CNN-style detector
year: 2024
type: poster
tags: [Object detection, Computer vision, Transfer learning]
course:
  code: "02516"
  name: Introduction to Deep Learning in Computer Vision
  url: https://kurser.dtu.dk/course/02516
group: true
poster: /files/posters/02516-pothole-rcnn-poster.pdf
thumbnail: /thumbs/pothole-detection-rcnn.jpg
featured: false
blurb: An object detector built from scratch on selective-search proposals and a frozen ResNet-18, reaching a mean average precision of 0.8 on road photos.
links: []
files: []
---

We built a pothole detector from the ground up: region proposals from selective
search, a classifier and box regressor on top of a frozen ResNet-18, and
non-maximum suppression to clean up the output.

> [!note] Course context
> Project 3 of 3 in DTU's Introduction to Deep Learning in Computer Vision
> course, presented as a poster, with Jone Steinhoff, Lukas Rasocha and Mads
> Prip. See also [project 1](/projects/hotdog-cnn-classifier) and
> [project 2](/projects/retina-skin-segmentation).

## The assignment

Build a deep-learning system that finds potholes in road photos, using a dataset
of 665 images with bounding-box labels. The first part covered object proposals:
extract candidate regions, measure how many are needed to cover the true
potholes, and label each proposal as pothole or background. The later parts
trained a detector on those proposals and evaluated it.

## What we did

- **Proposals.** We split the images 60/20/20 and ran selective search (quality
  mode), keeping up to 500 proposals per image. A proposal counted as a pothole if
  it overlapped a true box with an IoU above 0.5, and as background otherwise.
- **Balancing.** Background proposals vastly outnumber potholes, so we resampled
  to 25 % pothole and 75 % background. Every proposal was resized to 256 × 256.
- **Model.** A ResNet-18 with frozen weights and its last layer removed, followed
  by a small feed-forward head with two branches:
  - **Classification:** pothole or background, trained with cross-entropy.
  - **Box regression:** corrections to the box position and size (for
    potholes), trained with mean squared error.

  We trained with Adam for up to 50 epochs, with early stopping.
- **Experiments.** We varied how much the regression loss is weighted relative to
  the classification loss, and the overlap threshold for non-maximum suppression
  (NMS), which merges overlapping detections of the same pothole.

![A pipeline of five steps: an original road photo with ground-truth boxes, selective-search proposals, proposals labelled pothole or background by overlap, a 25/75 class balance, and crops resized to 256 by 256.](/images/pothole-detection-rcnn/pothole-pipeline.png "From image to training data: proposals, labelling by overlap, class balancing and resizing.")

## Results

- **Best mean average precision: 0.80.** This came from weighting the regression
  loss 15 times higher than the classification loss, with an NMS threshold of
  0.05.
- **A strict NMS threshold matters most.** Lowering it from 0.3 to 0.05 raised
  the mAP at every loss weighting, from 0.34–0.49 to 0.68–0.80.
- **NMS cleans up the clutter.** Before NMS, a single pothole is covered by many
  overlapping boxes. After NMS, one or a few boxes remain.

![Bar chart of mean average precision for nine experiments: regression weights 1, 5, 10 and 15 with NMS 0.3 score 0.34 to 0.49; the same weights with NMS 0.05 score 0.68 to 0.80; weight 10 with NMS 0.1 scores 0.70.](/images/pothole-detection-rcnn/pothole-map.png "Mean average precision for each combination of regression-loss weight (REG) and NMS threshold.")

![Two road photos, each shown before NMS with many overlapping red boxes and after NMS with one to three boxes around the potholes.](/images/pothole-detection-rcnn/pothole-nms.png "Detections before and after non-maximum suppression.")

> [!tip] What we would do next
> Try more combinations of NMS threshold, loss weights and other settings, and
> compare with faster detectors such as Fast R-CNN.

## My contribution

TODO: Petr to write: which parts of the project were mine.
