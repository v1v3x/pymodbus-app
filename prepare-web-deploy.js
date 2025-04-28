#!/usr/bin/env node

/**
 * This script prepares the project for web deployment by:
 * 1. Disabling or removing Electron-specific code
 * 2. Creating web-only versions of relevant files
 * 3. Adding helpful comments about web deployment limitations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Preparing project for web deployment...');

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to create a backup of a file
function backupFile(filePath) {
  const backupPath = `${filePath}.bak`;
  if (fs.existsSync(filePath) && !fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`✅ Created backup of ${filePath}`);
  }
}

// Function to add a web deployment comment at the top of a file
function addWebDeploymentComment(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const comment = `/**
 * NOTE: This file has been modified for web deployment.
 * Some features related to Electron or direct hardware access may be disabled.
 * For full functionality, use the desktop version of this application.
 */
`;
    if (!content.includes('modified for web deployment')) {
      fs.writeFileSync(filePath, comment + content);
      console.log(`✅ Added web deployment comment to ${filePath}`);
    }
  }
}

// Create a web-specific vite config
function createWebViteConfig() {
  const viteConfigPath = path.join(__dirname, 'vite.config.ts');
  const webViteConfigPath = path.join(__dirname, 'vite.config.web.ts');
  
  if (fs.existsSync(viteConfigPath)) {
    backupFile(viteConfigPath);
    
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Remove Electron plugin if present
    viteConfig = viteConfig.replace(/electron\([^)]*\),?/g, '');
    
    // Add comment
    viteConfig = `// This is a web-only version of the Vite config\n${viteConfig}`;
    
    fs.writeFileSync(webViteConfigPath, viteConfig);
    console.log('✅ Created web-specific Vite config');
  }
}

// Disable any direct hardware access APIs for web deployment
function disableHardwareAccess() {
  const files = [
    // Add paths to files that need modification
  ];
  
  files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      backupFile(filePath);
      addWebDeploymentComment(filePath);
    }
  });
}

// Create a web deployment README
function createWebReadme() {
  const readmePath = path.join(__dirname, 'WEB_DEPLOYMENT.md');
  const content = `# Web Deployment Notes

This application has been prepared for web deployment on Vercel or similar platforms.

## Limitations

When accessing this application through a web browser, the following limitations apply:

1. **Direct Modbus Communication**: Web browsers cannot directly communicate with Modbus devices. This requires a backend API.
2. **Hardware Access**: Web browsers have limited access to hardware like serial ports.
3. **File System Access**: Web browsers have restricted access to the local file system.

## Solutions

For a complete experience with all features, consider:

1. Using the desktop application for direct hardware access
2. Setting up a backend API for Modbus communication in the web version
3. Using Firebase or another cloud service for data storage and synchronization

## Documentation

For more information, please see the DEPLOYMENT.md file in this repository.
`;

  fs.writeFileSync(readmePath, content);
  console.log('✅ Created web deployment README');
}

// Main function to prepare for web deployment
function prepareForWebDeployment() {
  // Create backups directory
  ensureDirectoryExists(path.join(__dirname, 'backups'));
  
  // Create web-specific Vite config
  createWebViteConfig();
  
  // Disable hardware access
  disableHardwareAccess();
  
  // Create web deployment README
  createWebReadme();
  
  console.log('✅ Project prepared for web deployment!');
  console.log('📝 Please review the changes and test before deploying.');
}

// Run the preparation
prepareForWebDeployment(); 