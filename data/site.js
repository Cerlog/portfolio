// Everything personal lives here. Edit this file first.

export const site = {
  name: "Petr",
  fullName: "Petr Lastname",
  title: "Petr — MSc student, DTU",
  description: "Personal site of Petr, MSc student at DTU.",

  // Shown on the front page, one string per paragraph.
  // Use <a> tags freely — they are rendered as HTML.
  intro: [
    `I am an MSc student at the <a href="https://www.dtu.dk/">Technical University of Denmark</a>,
     where I work on statistical modelling and machine learning. My thesis is on predicting
     failures in municipal water networks using discrete-time survival analysis.`,

    `Before that I [add a line about your bachelor's, previous work, or an internship].
     I am mostly interested in [two or three topics you actually want to be asked about].`,

    `Outside of the university I [a line about what you do for fun — this is the part
     people remember]. Happy to hear from you if any of this overlaps with your work.`,
  ],

  photo: "/me.jpg", // put your photo at public/me.jpg
  cv: "/cv.pdf", // put your CV at public/cv.pdf

  links: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourname" },
    { label: "Email", href: "mailto:you@example.com" },
  ],
};
