---
title: Segmenting cell membranes in electron microscopy images with a U-Net
year: 2025
type: poster
tags: [Image segmentation, U-Net, Microscopy]
course:
  code: "02506"
  name: Advanced Image Analysis
  url: https://kurser.dtu.dk/course/02506
group: true
poster: /files/posters/02506-em-membrane-segmentation-poster.pdf
thumbnail: /thumbs/em-membrane-segmentation.jpg
featured: false
blurb: A U-Net that traces cell membranes in electron microscopy images, compared across image sizes, augmentation and patching, then applied to slices of a human nerve.
links: []
files: []
---

We trained a U-Net to trace cell membranes in electron microscopy images,
tested how image size, data augmentation and patching affect it, and then used
the same pipeline to find myelinated axons in slices of a human nerve.

> [!note] Course context
> A group project in DTU's Advanced Image Analysis course, presented as a
> poster, with Casper Brun Pedersen and Mads Prip.

## What we did

- **Data.** The ISBI Challenge dataset of electron microscopy (EM) images of
  neuronal tissue, with hand-drawn membrane masks. We split the 30 training
  images into 25 for training and 5 for validation, keeping the 30 test images
  apart.
- **Model.** A U-Net trained for up to 100 epochs with focal loss, Adam (learning
  rate 0.0005, batch size 16) and early stopping.
- **Three things we varied:**
  - **Image size:** the original 512 × 512 pixels, or resized to 384 or 256.
  - **Augmentation:** elastic deformation, brightness and contrast changes, small
    rotations and random crops turned the 25 training images into 250.
  - **Patching:** at prediction time, splitting each image into smaller patches,
    predicting each patch, and stitching the results back together.
- **Transfer.** We then ran the pipeline on slices of a human nerve, to pick out
  the myelinated axons.

![An EM image of neuronal tissue next to its membrane mask: black membrane outlines on white.](/images/em-membrane-segmentation/input-and-mask.png "An input image from the ISBI dataset and its ground-truth membrane mask.")

## Results

- **Full resolution was best.** The model trained on the original 512 × 512
  images with augmentation reached the highest validation accuracy, 91.7 %.
  Shrinking the images lost detail and hurt performance.
- **Augmentation helped every model.** Patching made little difference, probably
  because the images are small to begin with.

| Metric      | U-Net 512 with augmentation |
| :---------- | --------------------------: |
| Accuracy    |                      91.7 % |
| Sensitivity |                      92.7 % |
| Specificity |                      87.8 % |
| Dice        |                      94.7 % |
| IoU         |                      90.0 % |

- **It transfers to nerve tissue.** On the nerve slices the same pipeline gave
  96.9 % accuracy, 76.8 % sensitivity, 99.7 % specificity, a Dice score of
  85.7 % and an IoU of 75.4 %.

![The ground-truth mask followed by predicted masks from eight models: original size 512, resized 384 and 256, the same three with augmentation, and augmentation with patches at 384 and 256.](/images/em-membrane-segmentation/predictions.png "Predicted membrane masks on a validation image for every model variant, next to the ground truth.")

![A grey cross-section of a nerve full of ring-shaped axons, and the predicted mask with each axon as a white blob; a blue box marks the same region in both.](/images/em-membrane-segmentation/nerve.png "The same pipeline applied to a slice of a human nerve: input and predicted mask of the myelinated axons.")

<!-- Unsure: the poster's second metrics table is titled "U-Net 512 with
augmentation" like the first; its position next to the nerve images suggests it
is for the nerve data. Confirm with Petr. -->

## My contribution

TODO: Petr to write: which parts of the project were mine.
