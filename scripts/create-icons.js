const fs = require('fs');
const path = require('path');

const icons = {
  'logo.svg': '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="8" fill="#2563EB"/><path d="M10 12C10 11.4477 10.4477 11 11 11H25C25.5523 11 26 11.4477 26 12V15C26 15.5523 25.5523 16 25 16H11C10.4477 16 10 15.5523 10 15V12Z" fill="white"/><path d="M10 18.5C10 17.9477 10.4477 17.5 11 17.5H25C25.5523 17.5 26 17.9477 26 18.5V21.5C26 22.0523 25.5523 22.5 25 22.5H11C10.4477 22.5 10 22.0523 10 21.5V18.5Z" fill="white" opacity="0.8"/><path d="M10 25C10 24.4477 10.4477 24 11 24H25C25.5523 24 26 24.4477 26 25C26 25.5523 25.5523 26 25 26H11C10.4477 26 10 25.5523 10 25Z" fill="white" opacity="0.6"/><circle cx="29" cy="10" r="4" fill="#F59E0B"/><path d="M28 9H30M29 8V10V8ZM29 10V12V10ZM29 10H31H29ZM29 10H27H29Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>',
  'search.svg': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 16.5L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  'menu.svg': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  'arrow-right.svg': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'user.svg': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 20C4 16.5 7 14 12 14C17 14 20 16.5 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Clear existing icons
const existing = fs.readdirSync(iconsDir);
existing.forEach(f => {
  if (f !== '.gitkeep') fs.unlinkSync(path.join(iconsDir, f));
});

// Write new icons
Object.entries(icons).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(iconsDir, filename), content, 'utf-8');
  console.log(`Created: /icons/${filename}`);
});

// Also write logo to root public
fs.writeFileSync(path.join(__dirname, '..', 'public', 'logo.svg'), icons['logo.svg'], 'utf-8');
console.log('Created: /logo.svg');