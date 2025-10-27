<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>
Application Overview
Teds Super-Fast Wheel is a professional-grade, interactive color scheme generator designed for designers, developers, and artists. It provides a highly responsive and intuitive user interface for creating beautiful and harmonious color palettes based on established color theory principles.
The application is engineered as a standalone, single-file web app. This means all its logic, styling, and dependencies are bundled into a single index.html file, allowing it to run directly in any modern browser, even when offline (after its initial load).
Core Functionality & Features
The application's interface is divided into three main, interactive sections:
1. The Color Selection Panel:
This is the primary control center where you define your starting color.
Interactive Color Wheel: A large, vibrant color wheel allows you to visually select a color. By clicking and dragging the circular handle, you can intuitively adjust the hue and saturation. The wheel is fully responsive and adapts its size to fit the screen, ensuring a great experience on both desktop and mobile devices.
Lightness Slider: Located directly below the wheel, this slider allows you to control the lightness or brightness of your selected color, from pure black to pure white. The slider's background dynamically updates to show a gradient based on your current color choice.
Base Color Information: Below the slider, a dedicated section displays the precise values of your chosen base color in three standard web formats: HEX, RGB, and HSL. Each value is a clickable button, allowing you to instantly copy the code to your clipboard for use in other applications. The UI provides brief visual feedback ("Copied!") upon a successful copy.
2. The Color Combination (Harmony) Panel:
This panel allows you to apply different color theory rules to your base color to generate a palette.
Harmony Selection: It presents a clean list of six professionally recognized color harmonies:
Complementary: Two colors opposite each other on the color wheel.
Analogous: Three colors that are adjacent on the color wheel.
Triadic: Three colors evenly spaced around the color wheel.
Tetradic: Four colors arranged in two complementary pairs.
Split Complementary: A base color plus the two colors adjacent to its complement.
Monochromatic: A set of colors derived from a single base hue, with variations in saturation and lightness.
Instant Updates: Selecting any of these options immediately recalculates and updates the main color palette in real-time. The currently active harmony is highlighted for clarity.
3. The Palette Display Panel:
This is the final output, showcasing the generated color scheme.
Visual Swatches: The generated colors are displayed as a series of large, vertical swatches, making it easy to visualize how they work together.
Dynamic Text Contrast: To ensure readability, the HEX code displayed on each swatch automatically switches between black and white depending on the brightness of the color behind it.
Copy Functionality: Just like the Base Color info, each color swatch in the palette is clickable. Clicking a swatch instantly copies its HEX code to the clipboard, streamlining the workflow for using these colors in design mockups or code.
Responsive & Accessible Design: The entire layout is built with Tailwind CSS and is fully responsive. On large screens, it uses a multi-column layout for an efficient overview. On smaller screens (tablets and phones), it gracefully collapses into a single-column layout that is easy to scroll and use.
Technical Implementation
Technology Stack: The app is built with React for its component-based UI, D3.js (specifically d3-color) for robust color calculations, and Tailwind CSS for styling.
Single-File Architecture: To ensure offline capability and eliminate cross-origin (CORS) errors when running from a local file, the entire application—including all React components, helper functions, and dependencies—is contained within the index.html. It uses the Babel Standalone library to transpile the JSX and modern JavaScript code directly in the browser at runtime.

