const htmlPdf = require('html-pdf-node');
const fs = require('fs');
const path = require('path');

class SimpleResumeGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, 'template.html');
    this.outputPath = path.join(__dirname, 'output');
  }

  async generatePDF(jsonData, outputFilename = 'resume.pdf') {
    try {
      // Create output directory if it doesn't exist
      if (!fs.existsSync(this.outputPath)) {
        fs.mkdirSync(this.outputPath, { recursive: true });
      }

      // Read the HTML template
      const template = fs.readFileSync(this.templatePath, 'utf8');
      
      // Inject the JSON data into the template
      const html = template.replace('{RESUME_DATA}', JSON.stringify(jsonData));
      
      // Write the HTML file temporarily
      const tempHtmlPath = path.join(this.outputPath, 'temp.html');
      fs.writeFileSync(tempHtmlPath, html);

      // Generate PDF using html-pdf-node
      const file = { url: `file://${tempHtmlPath}` };
      const options = {
        format: 'A4',
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        },
        printBackground: true,
        displayHeaderFooter: false
      };

      const pdfBuffer = await htmlPdf.generatePdf(file, options);
      
      // Save the PDF
      const pdfPath = path.join(this.outputPath, outputFilename);
      fs.writeFileSync(pdfPath, pdfBuffer);
      
      // Clean up temporary HTML file
      fs.unlinkSync(tempHtmlPath);
      
      console.log(`PDF generated successfully: ${pdfPath}`);
      return pdfPath;
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  try {
    // Read JSON data from file
    const jsonPath = process.argv[2] || 'resume-data.json';
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    const generator = new SimpleResumeGenerator();
    await generator.generatePDF(jsonData);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = SimpleResumeGenerator; 