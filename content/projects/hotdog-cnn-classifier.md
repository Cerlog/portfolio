---
title: Hot dog or not? Image classification with a CNN
year: 2024
type: poster
tags: [Computer vision, CNN, Explainable AI]
course:
  code: "02516"
  name: Introduction to Deep Learning in Computer Vision
  url: https://kurser.dtu.dk/course/02516
group: true
poster: /files/posters/02516-hotdog-cnn-poster.pdf
thumbnail: /thumbs/hotdog-cnn-classifier.jpg
featured: false
blurb: A convolutional network that tells hot dogs from everything else, tuned step by step against overfitting and inspected with saliency maps.
links: []
files: []
---

We built a convolutional neural network that decides whether a photo shows a hot
dog, tuned it step by step to fight overfitting, and used saliency maps to see
what it looks at.

> [!note] Course context
> Project 1 of 3 in DTU's Introduction to Deep Learning in Computer Vision
> course, presented as a poster, with Jone Steinhoff, Lukas Rasocha and Mads
> Prip. See also [project 2](/projects/retina-skin-segmentation) and
> [project 3](/projects/pothole-detection-rcnn).

## The assignment

Design, train and evaluate a CNN that sorts photos into two classes, hot dog or
not hot dog. The images come from several ImageNet categories (food, people,
pets, furniture and others) and vary in size and shape. Document the design
choices (architecture, optimiser, augmentation, batch normalisation) and use
saliency maps to explain what the trained network responds to.

## What we did

- **Data.** We split the training images 80/20 into training and validation
  sets, resized every image to 224 × 224 and normalised it. The augmentations
  were padding, flips, rotation, colour jitter, erasing and cropping.
- **Baseline.** A simple CNN with four convolutional layers (3 × 3 filters, max
  pooling), trained with binary cross-entropy, batch size 64, a learning rate of
  0.0001 and early stopping. Each result is averaged over five runs.
- **Step-by-step tuning.** The baseline overfitted: 91.6 % training accuracy
  against 77.0 % on validation. We added one change at a time:
  - dropout 0.7
  - batch normalisation on every layer
  - Adam with a weight decay of 1e-5
  - augmentation and normalisation of the input images

  Training was slow to converge at first, so we lowered the learning rate and
  then switched from SGD to Adam.
- **Explaining the model.** SmoothGrad and Grad-CAM saliency maps for correct and
  incorrect predictions, and the feature maps of the first convolutional layer.

![A tree of tuning steps with training and validation accuracy at each: the baseline (77.0 % validation), then dropout rates 0.5 to 0.8, batch normalisation on or off, two weight-decay values, and four combinations of augmentation and normalisation.](/images/hotdog-cnn-classifier/hotdog-tuning.png "How each tuning step changed training and validation accuracy, from the baseline to the final model.")

## Results

- **Test accuracy rose from 0.71 to 0.79** between the baseline and the final
  model.
- **The model leans towards "hot dog".** It recognised 801 of the 895 hot dogs,
  but also called 316 of 967 other images hot dogs.

![A bar chart of test accuracy (baseline 0.71, final model 0.79) next to a confusion matrix: 801 hot dogs correct, 94 missed, 316 other images wrongly called hot dogs, 651 correct.](/images/hotdog-cnn-classifier/hotdog-test-results.png "Test accuracy of the baseline and final models, and the final model's confusion matrix.")

![A three-by-four grid: a true positive, true negative, false positive and false negative, each shown as the original photo, a SmoothGrad map and a Grad-CAM overlay.](/images/hotdog-cnn-classifier/hotdog-saliency.jpg "SmoothGrad and Grad-CAM saliency maps for a correct and an incorrect prediction of each class.")

> [!tip] What we would do next
> Look into which kinds of image (people, pets, furniture, food) the model gets
> wrong most often.

## My contribution

TODO: Petr to write: which parts of the project were mine.
