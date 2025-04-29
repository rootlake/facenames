# FaceNames

A simple web application for learning to match faces with names. Built with HTML, CSS, and JavaScript using Vite.

## Features

- Swipe through random faces
- Tap to reveal names
- Simple and intuitive interface
- Mobile-friendly design
- Automatic face directory scanning

## Managing Face Images

### File Structure
```
public/
  groups/
    isaac-facilities/      # Example group
      First_Last.png      # Example face image
    new-group-name/       # Additional groups
      Another_Person.png
```

### Adding New Faces

1. **Prepare Images**
   - Format: PNG files
   - Naming convention: `Firstname_Lastname.png`
   - Example: `John_Smith.png`

2. **Add to Groups**
   - Place images in `public/groups/[group-name]/`
   - For existing groups, just add files to that folder
   - For new groups, create a new folder with a hyphenated name
   - Example: `public/groups/new-faculty/`

3. **Generate Face List**
   ```bash
   npm run generate-faces
   ```
   This will:
   - Scan all group directories
   - Update src/data/faces.js
   - Show what faces were added or removed

4. **Deploy Changes**
   ```bash
   git add .
   git commit -m "Add new faces for [group]"
   git push
   ```
   GitHub Actions will automatically deploy to Pages.

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   This will:
   - Start the Vite dev server
   - Show a QR code for mobile testing
   - Open in your default browser

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

MIT
