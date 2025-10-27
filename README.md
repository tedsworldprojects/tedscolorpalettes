# Teds Super-Fast Color Wheel

A professional-grade, interactive color scheme generator designed for designers, developers, and artists.

## 🚀 Overview

**Teds Super-Fast Wheel** is a highly responsive and intuitive application for creating beautiful and harmonious color palettes based on established color theory principles.

The application is engineered as a **standalone, single-file web app**. This means all its logic, styling, and dependencies are bundled into a single `index.html` file, allowing it to run directly in any modern browser, even when offline (after its initial load).

## ✨ Core Features

The application's interface is divided into three main, interactive sections:

### 1. Color Selection Panel
This is the primary control center where you define your starting color.

-   **Interactive Color Wheel:** Visually select a color by dragging the handle to adjust **hue** and **saturation**. The wheel is fully responsive and adapts its size to fit any screen.
-   **Lightness Slider:** Control the **lightness** or brightness of your selected color, from pure black to pure white.
-   **Base Color Information:** Instantly view and copy the precise values of your chosen base color in **HEX**, **RGB**, and **HSL** formats.

### 2. Color Combination (Harmony) Panel
Apply different color theory rules to your base color to generate a palette.

-   **Harmony Selection:** Choose from six professionally recognized color harmonies:
    -   `Complementary`
    -   `Analogous`
    -   `Triadic`
    -   `Tetradic`
    -   `Split Complementary`
    -   `Monochromatic`
-   **Instant Updates:** Selecting an option immediately recalculates and updates the color palette in real-time.

### 3. Palette Display Panel
The final output, showcasing the generated color scheme.

-   **Visual Swatches:** The generated colors are displayed as large, vertical swatches, making it easy to visualize how they work together.
-   **Dynamic Text Contrast:** The HEX code on each swatch automatically switches between black and white to ensure readability against any color background.
-   **One-Click Copy:** Click any color swatch in the palette to instantly copy its HEX code to your clipboard.

## 🛠️ Technical Implementation

-   **Technology Stack:** The app is built with **React**, **D3.js** (`d3-color`) for robust color calculations, and **Tailwind CSS** for styling.
-   **Single-File Architecture:** To ensure offline capability and eliminate cross-origin (CORS) errors when running from a local file, the entire application is self-contained within `index.html`. It uses the **Babel Standalone** library to transpile JSX and modern JavaScript directly in the browser.
