# localkit

![localkit](./readme-assets/screenshot-01.png)

The [`localkit`](https://www.npmjs.com/package/localkit) package is an open-source command-line interface (CLI) designed to streamline your web development workflow. It provides a suite of tools for common tasks, including secure password generation, Base64URL encoding/decoding, UUID creation, OTP management, encryption, hashing, favicon creation, PWA asset generation, and Material Icon installation.

The modules are:

- [Password:](./readme-assets/modules/PASSWORD/README.md) generate and analyze passwords
- [Random Bytes:](./readme-assets/modules/RANDOM_BYTES/README.md) generate and validate Base64URL encoded sequences of random bytes
- [UUID:](./readme-assets/modules/UUID/README.md) generate and validate UUIDs (Universally Unique Identifiers)
- [OTP:](./readme-assets/modules/OTP/README.md) generate OTP (One Time Password) secrets and tokens
- [AES256:](./readme-assets/modules/AES256/README.md) encrypt and decrypt messages with the AES256 algorithm
- [MD5:](./readme-assets/modules/MD5/README.md) hash and validate messages with the MD5 Algorithm
- [Favicon Builder:](./readme-assets/modules/FAVICON_BUILDER/README.md) build all the favicon files required by modern web apps
- [PWA Assets Builder:](./readme-assets/modules/PWA_ASSETS_BUILDER/README.md) build all the assets required for a PWA to be published
- [Material Icons:](./readme-assets/modules/MATERIAL_ICONS/README.md) download and install the Material Icons on a web application




<br/>

## Getting Started

Install the CLI Globally
```bash
npm i -g localkit

# can be updated with
npm update -g localkit
```

Run it with:
```bash
localkit
```

<br/>

## Forking Instructions

If you wish to make use of the LocaLKit CLI to perform sensitive operations, I suggest that you fork this repository and lock all dependencies in the `package.json` file (equivalent to using the  `--save-exact` flag) for security reasons.

### Requirements

- Git
- NodeJS ^v22.11.0
- NPM ^10.9.0

### Installation

Clone the repository
```bash
git clone git@github.com:your-username/localkit.git
```

Install the dependencies
```bash
npm install
```

Run it
```bash
npm start
```




<br/>

## Built With

- JavaScript




<br/>

## Running the Tests

```bash
# unit tests
npm run test:unit

# integration tests
npm run test:integration
```




<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br/>

## Sources

- [Adding favicons in a multi-browser multi-platform world](https://mobiforge.com/design-development/adding-favicons-in-a-multi-browser-multi-platform-world)
- [How to enhance your PWA with HTML tags for iOS and Android](https://www.modyo.com/developer-tips/how-to-enhance-your-pwa-with-html-tags-for-ios-and-android)
- [Adaptive icon support in PWAs with maskable icons](https://web.dev/articles/maskable-icon)
- [Define icons and a theme color](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/icon-theme-color)
- [awesome-meta-and-manifest](https://github.com/gokulkrishh/awesome-meta-and-manifest)
- [PWABuilder](https://www.pwabuilder.com/imageGenerator)
- [pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)
- [Material Symbols Guide](https://developers.google.com/fonts/docs/material_symbols)

