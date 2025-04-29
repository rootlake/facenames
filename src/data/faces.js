// Groups of faces to learn
export const groups = {
  'isaac-facilities': {
    name: 'Isaac Facilities',
    path: '/groups/isaac-facilities',
    files: [
      'Brenda_Bullied.png',
      'Charles_Delsignore.png',
      'Jeremy_Griffin.png',
      'Adam_Hill.png',
      'Stephany_Kerensky.png',
      'Matt_Lussier.png',
      'Mike_McCabe.png',
      'Todd_Milanese.png',
      'Darren_Moran.png',
      'Alec_Nystrom.png',
      'Paul_Proulx.png',
      'Joe_Sirmans.png',
      'Eric_Staplins.png',
      'Ryan_Vertefuille.png'
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