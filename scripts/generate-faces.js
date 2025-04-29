import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the public directory path
const publicDir = path.join(__dirname, '../public');
const groupsDir = path.join(publicDir, 'groups');
const outputFile = path.join(__dirname, '../src/data/faces.js');

// Try to read existing faces.js
let existingGroups = {};
try {
  const existingContent = fs.readFileSync(outputFile, 'utf8');
  // Extract the groups object using regex
  const match = existingContent.match(/export const groups = ({[\s\S]*?});/);
  if (match) {
    existingGroups = JSON.parse(match[1]);
  }
} catch (error) {
  console.log('No existing faces.js found, will create new file');
}

// Scan the groups directory
const groups = {};
const groupDirs = fs.readdirSync(groupsDir);

// Track changes
const changes = {
  newGroups: [],
  removedGroups: [],
  groupChanges: {}
};

groupDirs.forEach(groupDir => {
  const groupPath = path.join(groupsDir, groupDir);
  if (fs.statSync(groupPath).isDirectory()) {
    const files = fs.readdirSync(groupPath)
      .filter(file => file.endsWith('.png'))
      .sort();
    
    // Convert directory name to display name
    const displayName = groupDir
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    groups[groupDir] = {
      name: displayName,
      path: `/facenames/groups/${groupDir}`,
      files: files
    };

    // Compare with existing group
    if (!existingGroups[groupDir]) {
      changes.newGroups.push(groupDir);
    } else {
      const existingFiles = existingGroups[groupDir].files;
      const newFiles = files.filter(f => !existingFiles.includes(f));
      const removedFiles = existingFiles.filter(f => !files.includes(f));
      
      if (newFiles.length > 0 || removedFiles.length > 0) {
        changes.groupChanges[groupDir] = {
          added: newFiles,
          removed: removedFiles
        };
      }
    }
  }
});

// Check for removed groups
Object.keys(existingGroups).forEach(groupDir => {
  if (!groups[groupDir]) {
    changes.removedGroups.push(groupDir);
  }
});

// Generate the faces.js content
const content = `// This file is auto-generated. Do not edit directly.
// To update, add/remove images in the public/groups directory and run 'npm run generate-faces'

// Groups of faces to learn
export const groups = ${JSON.stringify(groups, null, 2)};

// Function to convert filename to name
export function filenameToName(filename) {
  // Remove file extension and split by underscore
  const nameParts = filename.replace(/\\.[^/.]+$/, '').split('_');
  // Capitalize each part and join with space
  return nameParts.map(part => 
    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  ).join(' ');
}
`;

// Write the file
fs.writeFileSync(outputFile, content);

// Report changes
console.log('\nChanges detected:');
if (changes.newGroups.length > 0) {
  console.log('\nNew groups added:', changes.newGroups);
}
if (changes.removedGroups.length > 0) {
  console.log('\nGroups removed:', changes.removedGroups);
}
Object.entries(changes.groupChanges).forEach(([group, {added, removed}]) => {
  console.log(`\nChanges in ${group}:`);
  if (added.length > 0) {
    console.log('  Added:', added.map(f => filenameToName(f)));
  }
  if (removed.length > 0) {
    console.log('  Removed:', removed.map(f => filenameToName(f)));
  }
});

if (changes.newGroups.length === 0 && 
    changes.removedGroups.length === 0 && 
    Object.keys(changes.groupChanges).length === 0) {
  console.log('No changes detected');
}

// Helper function to convert filename to name (same as in faces.js)
function filenameToName(filename) {
  const nameParts = filename.replace(/\.[^/.]+$/, '').split('_');
  return nameParts.map(part => 
    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  ).join(' ');
} 