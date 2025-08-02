# ResGen - PDF Resume Generator

A Node.js application that generates professional PDF resumes from JSON data. The generated resume features a clean, two-column layout with modern styling.

## Features

- **Two-column layout**: Left column for personal info, right column for work experience
- **Professional styling**: Clean, modern design with proper typography
- **Company logos**: Automatic display of company logos from URLs
- **Responsive design**: Optimized for A4 paper format
- **Icon support**: Built-in support for common icons (email, phone, GitHub, LinkedIn, etc.)
- **Markdown support**: Bold text formatting in descriptions
- **Skills tags**: Visual skill tags with rounded corners
- **Contact links**: Clickable contact information

## Installation

1. Clone the repository:
```bash
git clone https://github.com/coastaldemigod/resgen.git
cd resgen
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Basic Usage

1. Prepare your resume data in JSON format (see `resume-data.json` for example)
2. Run the generator:
```bash
npm start
```

This will read `resume-data.json` and generate `output/resume.pdf`.

### Using the CLI Script

For better user experience, use the CLI script:
```bash
node generate.js
```

### Custom JSON File

To use a different JSON file:
```bash
node generate.js path/to/your/resume-data.json
```

### Custom Output File

To specify a custom output filename:
```bash
node generate.js resume-data.json my-resume.pdf
```

### Programmatic Usage

```javascript
const ResumeGenerator = require('./index.js');

const generator = new ResumeGenerator();
const jsonData = require('./resume-data.json');

generator.generatePDF(jsonData, 'my-resume.pdf')
  .then(pdfPath => console.log(`PDF generated: ${pdfPath}`))
  .catch(error => console.error('Error:', error));
```

## JSON Schema

The resume data should follow this structure:

```json
{
  "meta": {
    "tailwindColorName": "gray"
  },
  "fullName": "Your Name",
  "subtext": "Your Title",
  "experiences": {
    "title": "Work Experience",
    "content": [
      {
        "logo": "https://company-logo-url.com/icon.svg",
        "company": "Company Name",
        "href": "https://company-website.com",
        "roles": [
          {
            "title": "Job Title",
            "date": "Start Date - End Date",
            "description": "Job description with **bold** text support"
          }
        ]
      }
    ]
  },
  "about": {
    "title": "About Me",
    "content": "Your brief description"
  },
  "skills": {
    "title": "Skills",
    "content": [
      { "name": "Skill 1" },
      { "name": "Skill 2" }
    ]
  },
  "contact": {
    "title": "Contact",
    "content": [
      {
        "icon": "email-icon",
        "label": "email@example.com",
        "href": "mailto:email@example.com"
      }
    ]
  },
  "projects": {
    "title": "Projects",
    "content": [
      {
        "name": "Project Name",
        "url": {
          "label": "project-url.com",
          "href": "https://project-url.com"
        },
        "description": "Project description"
      }
    ]
  },
  "awards": {
    "title": "Awards",
    "content": [
      {
        "icon": "heroicons:check-circle-20-solid",
        "href": "https://award-url.com",
        "label": "Award description"
      }
    ]
  },
  "education": {
    "title": "Education",
    "content": [
      {
        "icon": "heroicons:academic-cap-20-solid",
        "name": "Degree Name",
        "institute": {
          "label": "University Name",
          "href": "https://university-website.com"
        },
        "duration": "GPA or Duration"
      }
    ]
  },
  "footer": {
    "url": {
      "href": "https://your-website.com",
      "label": "your-website.com"
    }
  }
}
```

## Supported Icons

The generator supports these icon types:
- `email-icon` - Email
- `phone-icon` - Phone
- `globe-icon` - Website
- `heroicons:check-circle-20-solid` - Checkmark (for awards)
- `heroicons:academic-cap-20-solid` - Education
- `linkedin-icon` - LinkedIn
- `github-icon` - GitHub

## Output

The generated PDF will be saved in the `output/` directory with:
- A4 page format
- Professional margins
- Print-optimized styling
- High-quality rendering

## Customization

### Styling
Edit `template.html` to modify the visual design. The template uses Tailwind CSS classes for styling.

### Layout
The layout is defined in the HTML template with CSS Grid and Flexbox. Modify the column widths and spacing as needed.

### Icons
Add new icons by updating the `getIconSVG()` function in the template.

## License

MIT License - see LICENSE file for details. 