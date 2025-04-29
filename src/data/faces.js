// This file is auto-generated. Do not edit directly.
// To update, add/remove images in the public/groups directory and run 'npm run generate-faces'

// Groups of faces to learn
export const groups = {
  "class-2024": {
    "name": "Class 2024",
    "path": "/facenames/groups/class-2024",
    "files": [
      "Adam_Hill.png",
      "Alec_Nystrom.png",
      "Stephany_Kerensky.png"
    ]
  },
  "isaac-facilities": {
    "name": "Isaac Facilities",
    "path": "/facenames/groups/isaac-facilities",
    "files": [
      "Adam_Hill.png",
      "Alec_Nystrom.png",
      "Brandon_Andrzejewski.png",
      "Brenda_Bullied.png",
      "Charles_Delsignore.png",
      "Darren_Moran.png",
      "Eric_Staplins.png",
      "Jeremy_Griffin.png",
      "Joe_Sirmans.png",
      "Matt_Lussier.png",
      "Mike_McCabe.png",
      "Paul_Andrzejewski.png",
      "Paul_Proulx.png",
      "Ryan_Vertefuille.png",
      "Stephany_Kerensky.png",
      "Steve_Allaire.png",
      "Todd_Milanese.png"
    ]
  }
};

// Function to convert filename to name
export function filenameToName(filename) {
  // Remove file extension and split by underscore
  const nameParts = filename.replace(/\.[^/.]+$/, '').split('_');
  // Capitalize each part and join with space
  return nameParts.map(part => 
    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  ).join(' ');
}
