---
title: Generating brain tumour MRI images with vision-language and diffusion models
year: 2025
type: poster
tags: [Diffusion models, Vision-language models, Medical imaging]
course:
  code: "02501"
  name: Advanced Deep Learning in Computer Vision
  url: https://kurser.dtu.dk/course/02501
group: true
poster: /files/posters/02501-brain-tumour-mri-diffusion-poster.pdf
thumbnail: /thumbs/brain-mri-diffusion.jpg
featured: false
blurb: Vision-language models wrote descriptions of brain MRI scans; we used them to fine-tune Stable Diffusion so the tumour's location, size and shape can be set in the prompt.
links: []
files: []
---

We used vision-language models to describe brain MRI scans in words, then used
those descriptions to fine-tune Stable Diffusion. The aim was to generate
realistic tumour images whose location, size and shape are set in the prompt.

> [!note] Course context
> A group project in DTU's Advanced Deep Learning in Computer Vision course,
> presented as a poster, with Jone Steinhoff, Lukas Rasocha and Mads Prip.

## The assignment

Text-to-image diffusion models are trained mostly on web images, which contain
little medical data, and privacy rules keep most medical images and their
reports out of public reach. The project brief was to work around this:
1. Use a vision-language model (VLM) to write descriptions of medical images.
2. Fine-tune a text-to-image diffusion model on those image–text pairs.
3. Evaluate the generated images with standard metrics such as FID and KID.
4. Explore downstream uses such as data augmentation and classification.

## What we did

- **Data.** A public brain MRI dataset with three tumour types (pituitary,
  meningioma and glioma) and scans without a tumour. We merged the tumour types
  into one class, giving 4,417 tumour and 1,595 no-tumour training images, and
  split off a small validation set from the original test set.
- **Four VLMs as annotators.** LLaVA (an 8B medical variant), Gemma (12B), Ovis
  (34B) and Gemini were asked to describe each scan in a fixed structure: whether
  there is a tumour, its location, size, shape and intensity, the orientation of
  the slice, plus a free-text description.
- **Fine-tuning with LoRA.** We fine-tuned Stable Diffusion and Stable Diffusion
  XL on the image–description pairs with low-rank adaptation (LoRA ranks 128 and
  248, 512-pixel images), with and without a trainable text encoder.
- **Downstream test.** A vision transformer (ViT) classifies scans as tumour or
  no tumour, to compare training on real and on synthetic data.

![Pipeline diagram in three stages: an MRI image and a prompt go into a VLM, whose output text is used to fine-tune Stable Diffusion with LoRA; an inference prompt then makes Stable Diffusion generate synthetic data; a vision transformer classifies tumour versus no tumour.](/images/brain-mri-diffusion/pipeline.png "The pipeline: VLM descriptions for fine-tuning, synthetic data generation, and classification.")

## Results

- **SDXL with a trainable text encoder worked best**, so the remaining VLMs were
  compared on that setup.
- **The choice of VLM matters.** The best scores came from Gemma descriptions
  with LoRA rank 248 (lowest FID, 5.055) and Ovis descriptions with rank 128
  (lowest KID, 0.020). LLaVA's descriptions gave clearly worse images (FID
  11.992 at rank 128). For reference, random noise scores an FID of 30.
- **The prompts give real control.** Changing one attribute in a structured
  prompt, such as the tumour's location or size, changed that attribute in the
  generated image. Of the VLMs whose prompts we checked, the generated images
  followed Gemini's most closely.

![Two bar charts of FID and KID for SDXL models trained on descriptions from Ovis, Gemini, Gemma and LLaVA at LoRA ranks 128 and 248, with random noise as a reference. Gemma 248 has the lowest FID (5.055) and Ovis 128 the lowest KID (0.020).](/images/brain-mri-diffusion/sdxl-fid-kid.png "FID and KID (lower is better) for SDXL fine-tuned on each VLM's descriptions, at LoRA ranks 128 and 248.")

![A reference MRI with a tumour, followed by five generated scans, each from a prompt with one attribute changed: no tumour, location, size, shape and intensity.](/images/brain-mri-diffusion/generated-mri.png "Generated scans: starting from one structured prompt, each image changes a single attribute.")

## My contribution

TODO: Petr to write: which parts of the project were mine.
