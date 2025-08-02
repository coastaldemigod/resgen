const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ResumeGenerator {
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

      // Launch Puppeteer
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined
      });

      const page = await browser.newPage();
      
      // Set viewport for consistent rendering
      await page.setViewport({ width: 1200, height: 1600 });
      
      // Load the HTML file
      await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle0' });
      
      // Wait for any dynamic content to load
      await page.waitForTimeout(1000);
      
      // Generate PDF
      const pdfPath = path.join(this.outputPath, outputFilename);
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        }
      });

      await browser.close();
      
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
    
    const generator = new ResumeGenerator();
    await generator.generatePDF(jsonData);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = ResumeGenerator; 