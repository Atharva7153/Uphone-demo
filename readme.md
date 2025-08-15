# 📱 UPhone - 3D Phone Experience

A stunning interactive 3D phone showcase built with Three.js, featuring scroll-triggered camera animations and dynamic content overlays.


## 🎯 Live Demo

**[🚀 View Live Demo](http://localhost:5174/)** *(Run `npm run dev` to start the development server)*

## ✨ Features

### 🎬 **Interactive 3D Experience**
- **Scroll-Controlled Animation**: Camera movement synchronized with page scroll
- **Smooth Transitions**: Professional camera animations with easing
- **High-Quality Rendering**: Enhanced lighting and visual effects

### 🎨 **Dynamic Content System**
- **Timed Content Display**: Text overlays appear at specific scroll points
- **Gap-Based Timing**: Content sections with intentional gaps for visual rhythm
- **Responsive Design**: Works perfectly on all device sizes

### 💡 **Enhanced Lighting**
- **Multi-Light Setup**: 7 different light sources for dramatic effect
- **Color Grading**: Blue fill light, orange rim light, and golden point light
- **Professional Studio Lighting**: Creates cinematic visual appeal

### 📱 **Content Sections**
1. **Intro**: "ATHARVA SHARMA Presents"
2. **Design**: "Ultra-Futuristic Look" with moon crystal humor
3. **Technology**: "Camera Specs" with hilarious feature descriptions
4. **Display**: "The Sun Called..." lampooning ultra-bright displays
5. **Battery**: "All-Day Battery Life"
6. **Finale**: "U-PHONE 12 Ultra Pro Max" with trademark humor

## 🛠️ Technology Stack

- **Three.js** - 3D graphics and rendering
- **GSAP** - Scroll-triggered animations
- **Vite** - Fast development and building
- **GLTF Loader** - 3D model loading
- **Modern JavaScript** - ES6+ features

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd UPhone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174/
   ```

## 📁 Project Structure

```
UPhone/
├── public/
│   └── models/
│       ├── phone.glb          # 3D phone model
│       └── iphone_14_pro.glb  # Alternative model
├── src/
│   └── main.js               # Main Three.js application
├── index.html                # HTML structure
├── style.css                 # Styling and animations
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🎮 How It Works

### **Scroll-Triggered Animation**
- The page has a height of 300vh (3x viewport height)
- GSAP ScrollTrigger controls the 3D camera animation
- Animation progress is calculated based on scroll position
- Camera movement is synchronized with scroll

### **Content Timing System**
- Content sections appear at specific scroll progress points
- Each section shows for 10% of scroll progress
- 10% gaps between sections for visual breathing room
- Smooth fade in/out transitions

### **3D Scene Setup**
- **7 Light Sources**: Key, fill, rim, top, bottom, ambient, and point lights
- **Enhanced Rendering**: High-quality shadows and lighting
- **Responsive Design**: Adapts to different screen sizes

## 🎨 Customization

### **Changing Content Timing**
Edit the `updateContentVisibility` function in `src/main.js`:

```javascript
// Example: Make intro section longer
if (progress >= 0.05 && progress < 0.20) { // 15% instead of 10%
  if (contentSections.intro) {
    contentSections.intro.classList.add('active');
  }
}
```

### **Modifying Content**
Edit the HTML sections in `index.html`:

```html
<div class="content-section" id="intro">
  <h1>YOUR NAME</h1>
  <p>Your tagline</p>
</div>
```

### **Adjusting Lighting**
Modify light intensities and colors in `src/main.js`:

```javascript
const keyLight = new THREE.DirectionalLight(0xffffff, 4.0); // Change intensity
const fillLight = new THREE.DirectionalLight(0x4a90e2, 2.0); // Change color
```

## 🎯 Key Features Explained

### **Scroll Animation**
- Uses GSAP ScrollTrigger for smooth scroll-based animation
- Animation time is clamped to prevent looping
- Progress calculation ensures smooth transitions

### **Content Management**
- Content sections are positioned absolutely over the 3D scene
- Z-index layering ensures proper display order
- CSS transitions provide smooth fade effects

### **Performance Optimization**
- Efficient 3D rendering with proper light management
- Responsive design with mobile optimization
- Smooth 60fps animations

## 🐛 Troubleshooting

### **Model Not Loading**
- Check if the GLB file exists in `public/models/`
- Verify the file path in the loader
- Check browser console for errors

### **Animation Not Working**
- Ensure GSAP ScrollTrigger is properly imported
- Check if the model has animation data
- Verify scroll trigger configuration

### **Content Not Appearing**
- Check if content sections have correct IDs
- Verify CSS classes and transitions
- Check browser console for JavaScript errors

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not supported)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Atharva Sharma**

## 🙏 Acknowledgments

- Three.js community for amazing 3D graphics library
- GSAP team for powerful animation tools
- Vite for fast development experience

---

⭐ **Star this repository if you found it helpful!**
