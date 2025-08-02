#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const SimpleResumeGenerator = require('./index-simple.js');

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
ResGen - PDF Resume Generator

Usage:
  node generate.js [input-file] [output-file]

Arguments:
  input-file    JSON file containing resume data (default: resume-data.json)
  output-file   Output PDF filename (default: resume.pdf)

Examples:
  node generate.js
  node generate.js my-resume.json
  node generate.js my-resume.json my-output.pdf

Options:
  --help, -h    Show this help message
`);
    return;
  }

  try {
    const inputFile = args[0] || 'resume-data.json';
    const outputFile = args[1] || 'resume.pdf';
    
    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Input file '${inputFile}' not found.`);
      console.log('Please provide a valid JSON file or use the default resume-data.json');
      process.exit(1);
    }
    
    console.log(`Reading resume data from: ${inputFile}`);
    const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    console.log('Generating PDF...');
    const generator = new SimpleResumeGenerator();
    const pdfPath = await generator.generatePDF(jsonData, outputFile);
    
    console.log(`✅ Resume generated successfully!`);
    console.log(`📄 PDF saved to: ${pdfPath}`);
    console.log(`📁 File size: ${(fs.statSync(pdfPath).size / 1024).toFixed(1)} KB`);
    
  } catch (error) {
    console.error('❌ Error generating resume:', error.message);
    
    if (error.message.includes('JSON')) {
      console.log('\n💡 Make sure your JSON file is valid. You can validate it at jsonlint.com');
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 