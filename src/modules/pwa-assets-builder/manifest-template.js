/**
 * manifest.webmanifest File
 * The following file represents the template for a manifest.webmanifest defined in the Web
 * Application Manifest specification. The manifest is used to provide information that the
 * browser needs to install a PWA on a device.
 * https://w3c.github.io/manifest/
 * https://developer.mozilla.org/en-US/docs/Web/Manifest
 * https://web.dev/learn/pwa/web-app-manifest
 */
const MANIFEST_FILE = {
  id: '/',
  scope: '/',
  start_url: '/',
  name: 'My Awesome App',
  short_name: 'My Awesome App',
  description: 'An explanation of what the PWA does.',
  categories: [],
  display: 'standalone',
  theme_color: '',
  background_color: '',
  default_locale: 'en',
  orientation: 'portrait',
  screenshots: [],
  shortcuts: [],
  related_applications: [],
  prefer_related_applications: true,
  file_handlers: [],
  share_target: {},
  icons: [],
};


/**
 * Module Exports
 */
export default MANIFEST_FILE;
