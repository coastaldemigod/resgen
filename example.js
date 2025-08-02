const SimpleResumeGenerator = require('./index-simple.js');

// Example resume data
const exampleResumeData = {
  "meta": {
    "tailwindColorName": "blue"
  },
  "fullName": "John Doe",
  "subtext": "Senior Software Engineer",
  "experiences": {
    "title": "Work Experience",
    "content": [
      {
        "logo": "https://via.placeholder.com/20x20/3B82F6/FFFFFF?text=JD",
        "company": "Tech Corp",
        "href": "https://techcorp.com",
        "roles": [
          {
            "title": "Senior Software Engineer",
            "date": "Jan 2022 - Present",
            "description": "- **Team**: Backend Services\n- Led development of microservices architecture\n- Improved system performance by 40%\n- **Tech Stack**: Node.js, React, AWS, Docker"
          }
        ]
      }
    ]
  },
  "about": {
    "title": "About Me",
    "content": "Passionate software engineer with 5+ years of experience building scalable web applications."
  },
  "skills": {
    "title": "Skills",
    "content": [
      { "name": "JavaScript" },
      { "name": "React" },
      { "name": "Node.js" },
      { "name": "AWS" },
      { "name": "Docker" }
    ]
  },
  "contact": {
    "title": "Contact",
    "content": [
      {
        "icon": "email-icon",
        "label": "john.doe@example.com",
        "href": "mailto:john.doe@example.com"
      },
      {
        "icon": "phone-icon",
        "label": "+1 (555) 123-4567",
        "href": "tel:+15551234567"
      },
      {
        "icon": "github-icon",
        "label": "github.com/johndoe",
        "href": "https://github.com/johndoe"
      }
    ]
  },
  "projects": {
    "title": "Projects",
    "content": [
      {
        "name": "E-commerce Platform",
        "url": {
          "label": "github.com/johndoe/ecommerce",
          "href": "https://github.com/johndoe/ecommerce"
        },
        "description": "Full-stack e-commerce platform built with React and Node.js"
      }
    ]
  },
  "awards": {
    "title": "Awards",
    "content": [
      {
        "icon": "heroicons:check-circle-20-solid",
        "href": "#",
        "label": "Best Developer Award 2023"
      }
    ]
  },
  "education": {
    "title": "Education",
    "content": [
      {
        "icon": "heroicons:academic-cap-20-solid",
        "name": "Bachelor of Science in Computer Science",
        "institute": {
          "label": "University of Technology",
          "href": "https://university.edu"
        },
        "duration": "3.8/4.0 GPA"
      }
    ]
  },
  "footer": {
    "url": {
      "href": "https://johndoe.dev",
      "label": "johndoe.dev"
    }
  }
};

async function generateExampleResume() {
  try {
    console.log('Generating example resume...');
    
    const generator = new SimpleResumeGenerator();
    const pdfPath = await generator.generatePDF(exampleResumeData, 'example-resume.pdf');
    
    console.log(`✅ Example resume generated: ${pdfPath}`);
    console.log('📄 You can now customize the resume-data.json file with your own information');
    
  } catch (error) {
    console.error('❌ Error generating example resume:', error.message);
  }
}

if (require.main === module) {
  generateExampleResume();
}

module.exports = { exampleResumeData }; 