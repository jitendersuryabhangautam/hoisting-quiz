import IntroductionTabs from "@/components/IntroductionTabs";

export const metadata = {
  title: "Introduction | JavaScript Interview Lab",
  description: "Personal introduction page for Jitender.",
};

const projectLinks = [
  {
    name: "Tech Practice UI",
    href: "https://tech-practice-ui.vercel.app/",
  },
  {
    name: "E-commerce Frontend",
    href: "https://ecommerce-frontend-sepia-beta.vercel.app/",
  },
  {
    name: "Two Good Co Clone",
    href: "https://jitendersuryabhangautam.github.io/two-good-co/",
  },
  {
    name: "Hoisting Quiz",
    href: "https://hoisting-quiz-in5z.vercel.app/",
  },
  {
    name: "Architecture Website",
    href: "https://architecture-website-gray.vercel.app/",
  },
  {
    name: "Portfolio",
    href: "https://jitendersuryabhangautam.github.io/portfolio-jitender/",
  },
];

const introText =
  "Good afternoon sir, my name is Jitender. I am a software developer with 2+ years of experience working in full-stack web development using React.js, Next.js, PostgreSQL, and Golang. Currently, I am working at the National Institute for Smart Government, deployed at the Centre of Excellence in Postal Technologies. I am contributing to the Customer Self-Service module under the IT 2.0 initiative by India Post, which is live and being used by thousands of customers for booking articles, tracking consignments, creating contracts, and generating reports. I have around 2 years of experience in full-stack development using Next.js, React.js, Tailwind CSS, and ShadCN UI on the frontend, and Node.js, Golang, and PostgreSQL on the backend. I also have hands-on experience with Redis caching, Docker containerization, and cloud deployments, helping build scalable and efficient applications. Apart from this, I have also worked on some full-stack projects on my own, including an e-commerce platform and an AI-integrated tech revision platform, where I explored system design and performance optimization.";

const resumePath = "/assets/Resume-8587808287-Jitender-full-stack5.pdf";

export default function IntroductionPage() {
  return (
    <IntroductionTabs
      introText={introText}
      projectLinks={projectLinks}
      resumePath={resumePath}
    />
  );
}
