// This is the only file you need to edit to add, remove or reorder projects.
// `featured: true` puts a project on the front page as well.
//
// Images live in /public/projects/ — so image: "/projects/pipes.jpg"
// refers to the file public/projects/pipes.jpg

export const projects = [
  {
    slug: "pipe-failure-prediction",
    title: "Predicting water pipe failures",
    blurb:
      "MSc thesis. Discrete-time survival analysis on a municipal water network to estimate which pipes fail next.",
    tags: ["Survival analysis", "DTU"],
    year: "2026",
    image: "/projects/placeholder.jpg",
    featured: true,
    links: [
      { label: "Code", href: "https://github.com/yourname/your-repo" },
      // { label: "Report", href: "/reports/thesis.pdf" },
    ],
    // Each string is one paragraph on the project page.
    body: [
      "Replace this with a short description of the problem: who has it, why it is hard, and what makes the data interesting.",
      "Then describe your approach. Two or three paragraphs is plenty — this is a portfolio, not the report itself.",
      "Finish with what you found and what you would do differently. Link to the code or the PDF above.",
    ],
  },
  {
    slug: "second-project",
    title: "Second project",
    blurb: "One sentence on what it does and why anyone should care.",
    tags: ["Machine learning", "DTU"],
    year: "2025",
    image: "/projects/placeholder.jpg",
    featured: true,
    links: [{ label: "Code", href: "https://github.com/yourname/your-repo" }],
    body: [
      "A paragraph about the problem.",
      "A paragraph about what you built.",
    ],
  },
  {
    slug: "third-project",
    title: "Third project",
    blurb: "Course project, small tool, or something you built for fun.",
    tags: ["Course project"],
    year: "2025",
    image: "/projects/placeholder.jpg",
    featured: false,
    links: [],
    body: ["A paragraph about the problem.", "A paragraph about the result."],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
