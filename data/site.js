// Everything personal lives here. Edit this file first.

export const site = {
  name: "Petr",
  fullName: "Petr Boska Nylander",
  title: "Petr — Machine Learning & Data Science",
  // One line under the name on the front page.
  role: "MSc in Mathematical Modelling and Computation · Machine learning & data science",
  description:
    "Personal website of Petr Boska Nylander, MSc graduate in Mathematical Modelling and Computation from DTU.",

  // Shown on the front page, one string per paragraph.
  // Use <a> tags freely — they are rendered as HTML.
  intro: [
    `I am an MSc graduate in
    <a href="https://www.dtu.dk/english/education/graduate/msc-programmes/mathematical-modelling-and-computation" target="_blank" rel="noreferrer">
    Mathematical Modelling and Computation</a> from the
    <a href="https://www.dtu.dk/english/" target="_blank" rel="noreferrer">
    Technical University of Denmark (DTU)</a>, specializing in Data Science and Machine Learning.
    My studies covered statistics, machine learning, optimization, deep learning,
    computer vision and large-scale data analysis.`,

    `For my <a href="/projects/pipe-failure-prediction">MSc thesis</a> at
    <a href="https://sustain.dtu.dk/" target="_blank" rel="noreferrer">DTU Sustain</a>,
    supervised by
    <a href="https://www.dtu.dk/english/person/roland-lowe?id=66407" target="_blank" rel="noreferrer">
    Roland Löwe</a> and
    <a href="https://orbit.dtu.dk/en/persons/frederik-tinus-jeppesen/" target="_blank" rel="noreferrer">
    Frederik Tinus Jeppesen</a>, I worked on predicting failures in Danish drinking-water
    networks. The project was carried out in collaboration with
    <a href="https://www.envidan.com/" target="_blank" rel="noreferrer">Envidan</a>
    and used pipe and failure data from
    <a href="https://www.hofor.dk/" target="_blank" rel="noreferrer">HOFOR</a>,
    <a href="https://www.vandcenter.dk/" target="_blank" rel="noreferrer">VandCenter Syd</a>
    and
    <a href="https://www.aarhusvand.dk/" target="_blank" rel="noreferrer">Aarhus Vand</a>.`,

    `My thesis focused on statistical modelling and machine learning for
    pipe-failure prediction, including discrete-time survival analysis. I combined utility
    data with environmental and infrastructure data from
    <a href="https://www.dmi.dk/friedata" target="_blank" rel="noreferrer">DMI</a>,
    <a href="https://www.geus.dk/produkter-ydelser-og-faciliteter/data-og-kort/danmarks-geologiportal/download-jordartskort" target="_blank" rel="noreferrer">
    GEUS</a> and
    <a href="https://www.geodanmark.dk/anvend-geodata/hent-data/" target="_blank" rel="noreferrer">
    GeoDanmark</a> to investigate whether weather, soil and infrastructure information
    could improve failure-risk prediction.`,

    `Before DTU, I studied at
    <a href="https://ruc.dk/en" target="_blank" rel="noreferrer">Roskilde University</a>,
    where I received my BSc in Natural Science (Mathematical Modelling and Computation). My <a href="/projects/bsc-thesis-camp-oscillations">bachelor project</a>, supervised by
    <a href="https://forskning.ruc.dk/en/persons/johnny/" target="_blank" rel="noreferrer">
    Johnny T. Ottesen</a>, focused on analysing, simulating and simplifying a physiological
    system described by nine coupled differential equations.`,

    `I am particularly interested in applied machine learning, statistical modelling and
    computer vision, especially problems where models can be used to understand or improve
    real-world systems.`,

    `Outside of work, I enjoy spending time with my wife and daughters, reading fantasy,
    science fiction and spy novels, listening to music and cooking. I am always happy to
    hear about interesting projects or opportunities — preferably over a cup of coffee.`,
  ],

  photo: "/me.jpg",

  // TODO: replace the placeholder PDFs in public/files/ with the real CVs.
  cv: {
    en: "/files/cv-en.pdf",
    da: "/files/cv-da.pdf",
  },

  // One line per degree on the front page. `thesis` links to the thesis page.
  education: [
    {
      degree: "MSc in Mathematical Modelling and Computation",
      school: "Technical University of Denmark (DTU)",
      years: "2024–2026",
      thesis: "/projects/pipe-failure-prediction",
    },
    {
      degree: "BSc in Natural Science (Mathematical Modelling and Computation)",
      school: "Roskilde University",
      years: "2021–2024",
      thesis: "/projects/bsc-thesis-camp-oscillations",
    },
  ],

  experience: [
    {
      role: "Teaching assistant",
      // TODO: Petr to fill in: the university and the two years.
      place: "TODO: university",
      years: "TODO: years",
      detail:
        "Calculus; Introduction to Programming with Java; Introduction to Data Analysis with Python",
    },
  ],

  // Relevant DTU courses. `project` is the slug of a project page; courses
  // without one link to https://kurser.dtu.dk/course/<code>.
  coursework: [
    { code: "02456", name: "Deep Learning", project: "rstar-robustness" },
    { code: "02460", name: "Advanced Machine Learning", project: "vae-priors-flows-diffusion" },
    { code: "02476", name: "Machine Learning Operations", project: "mlops-captcha" },
    { code: "02477", name: "Bayesian Machine Learning" },
    { code: "02501", name: "Advanced Deep Learning in Computer Vision", project: "brain-mri-diffusion" },
    { code: "02506", name: "Advanced Image Analysis", project: "em-membrane-segmentation" },
    { code: "02516", name: "Introduction to Deep Learning in Computer Vision", project: "hotdog-cnn-classifier" },
    { code: "02807", name: "Computational Tools for Data Science", project: "yelp-communities-association-rules" },
    // TODO: Petr to add more courses here, in the same format:
    // { code: "0xxxx", name: "Official course name" },
  ],

  links: [
    {
      label: "GitHub",
      href: "https://github.com/Cerlog",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/petrbnylander",
    },
    {
      label: "Email",
      href: "mailto:petrboska@gmail.com",
    },
  ],
};