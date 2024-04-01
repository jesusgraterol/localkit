/**
 * PWA Assets Builder Configuration
 * The configuration that will be used in order to generate the PWA Assets.
 */
const CONFIG = {
  // the exact width and height the logo image needs to be in order for the assets to be generated
  logoDimensionsRequirement: { width: 1024, height: 1024 },

  // the list of assets that will be generated by category.
  // The logo scale is a float and can range from 0 - 1
  output: {
    icons: [
      { dimensions: { width: 48, height: 48 }, logoScale: 0.037 },
      { dimensions: { width: 72, height: 72 }, logoScale: 0.047 },
      { dimensions: { width: 96, height: 96 }, logoScale: 0.06 },
      { dimensions: { width: 120, height: 120 }, logoScale: 0.072 },
      { dimensions: { width: 128, height: 128 }, logoScale: 0.076 },
      { dimensions: { width: 144, height: 144 }, logoScale: 0.087 },
      { dimensions: { width: 152, height: 152 }, logoScale: 0.092 },
      { dimensions: { width: 168, height: 168 }, logoScale: 0.105 },
      { dimensions: { width: 180, height: 180 }, logoScale: 0.112 },
      { dimensions: { width: 192, height: 192 }, logoScale: 0.12 },
      { dimensions: { width: 384, height: 384 }, logoScale: 0.24 },
      { dimensions: { width: 512, height: 512 }, logoScale: 0.32 },
      { dimensions: { width: 1024, height: 1024 }, logoScale: 0.65 },
    ],
    'apple-touch-icons': [
      { dimensions: { width: 16, height: 16 }, logoScale: 0.012 },
      { dimensions: { width: 20, height: 20 }, logoScale: 0.014 },
      { dimensions: { width: 29, height: 29 }, logoScale: 0.022 },
      { dimensions: { width: 32, height: 32 }, logoScale: 0.024 },
      { dimensions: { width: 40, height: 40 }, logoScale: 0.030 },
      { dimensions: { width: 1024, height: 1024 }, logoScale: 0.65 },
    ],
    telegram: [
      { dimensions: { width: 512, height: 512 }, logoScale: 0.32 },
    ],
    facebook: [
      { dimensions: { width: 720, height: 720 }, logoScale: 0.42 },
    ],
    github: [
      { dimensions: { width: 500, height: 500 }, logoScale: 0.32 },
    ],
    instagram: [
      { dimensions: { width: 1000, height: 1000 }, logoScale: 0.65 },
    ],
    linkedin: [
      { dimensions: { width: 400, height: 400 }, logoScale: 0.24 },
    ],
    notification: [
      { dimensions: { width: 256, height: 256 }, logoScale: 0.18 },
    ],
    tiktok: [
      { dimensions: { width: 200, height: 200 }, logoScale: 0.12 },
    ],
    twitter: [
      { dimensions: { width: 400, height: 400 }, logoScale: 0.24 },
    ],
    whatsapp: [
      { dimensions: { width: 500, height: 500 }, logoScale: 0.32 },
    ],
  },
};

/**
 * Module Exports
 */
export default CONFIG;
