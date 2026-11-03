---
title: An end-to-end MLOps pipeline for CAPTCHA character recognition
year: 2025
type: project
tags: [MLOps, Cloud deployment, Computer vision]
course:
  code: "02476"
  name: Machine Learning Operations
  url: https://kurser.dtu.dk/course/02476
group: true
github: https://github.com/s204431/mlops-CAPTCHA
# TODO: replace with a real thumbnail, e.g. the architecture diagram (see the
# figure TODO below).
thumbnail: /thumbs/placeholder.jpg
featured: true
blurb: A CAPTCHA character classifier taken from training to a monitored cloud service, with data versioning, tests, CI, containers and an API.
links: []
files: []
---

We took a CAPTCHA character classifier all the way from training to a monitored
cloud service, using the tools a production ML team would use.

> [!note] Course context
> The group project in DTU's three-week Machine Learning Operations course
> (January 2025). I worked on it with Jone Steinhoff, Mads Prip and TODO: names
> of the other two group members.

## The assignment

About a third of the course is a self-chosen group project, and it forms the
exam. The point is not to train the biggest model. It is to apply the course's
tools in a sensible way to a modest problem: version control for code and data,
reproducible environments and configs, testing and continuous integration,
containers, cloud training, deployment and monitoring. The project is documented
in a report template that lives in the repository.

## What we did

- **Data and model.** We used a public Kaggle dataset of more than 118,000
  black-and-white CAPTCHA characters (52 × 32 pixels, 20 classes). We fine-tuned
  a pretrained ResNet-18 from the PyTorch Image Models (timm) library, with
  PyTorch Lightning for the training code.
- **Reproducibility.** Hydra config files for experiments, DVC to version the raw
  and processed data with the files stored in the cloud, and ruff for linting and
  formatting.
- **Testing and CI.** 14 tests covering the data, model, training and API, with
  58 % code coverage, run by GitHub Actions workflows.
- **Containers and cloud training.** Separate Docker images for training and
  evaluation. We trained on Google Cloud, using both Compute Engine virtual
  machines and Vertex AI.
- **Serving.** The model was exported to ONNX for inference and served with
  BentoML in a container, behind a single `/predict` endpoint. A Streamlit
  frontend lets you upload an image.
- **Monitoring.** The service exposes a `/metrics` endpoint with usage metrics,
  and an alerting system warns when something goes wrong.

![Placeholder for the architecture diagram](/images/placeholder-figure.svg "Architecture: from local development with PyTorch Lightning, through version control, CI and container builds, to cloud training, deployment and monitoring.")

<!-- TODO: export the architecture diagram from the repository's report
(reports/figures/) to inbox/images/02476/ and replace the placeholder above. -->

## Results

- **Accuracy.** The fine-tuned model reached an average accuracy of around 55 %
  after ten epochs.
- **Load test.** The deployed API handled every request in our load test without
  failures, each within 100 ms.

## My contribution

TODO: Petr to write: which parts of the project were mine.

<!-- From the group's report (answer to Q31, Petr's entry): data version control,
logging, the data-change workflow, the data storage bucket, setting up training in
the cloud, and parts of the report writing. Use this as a starting point. -->
