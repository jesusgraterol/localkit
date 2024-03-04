# localkit

![localkit](./readme-assets/screenshot-01.png)

The localkit CLI provides a series of utilities that can be used by web developers to enhance their workflow. Note that this CLI can be used when connected to the Internet and in offline mode for more sensitive operations.

The key modules are:

- [Password: generate and analyze passwords](./readme-assets/modules/PASSWORD/README.md)
- [UUID: generate and validate UUIDs (Universally Unique Identifiers)](./readme-assets/modules/UUID/README.md)
- [OTP: generate OTP (One Time Password) secrets and tokens](./readme-assets/modules/OTP/README.md)
- [YoutubeDownloader: download videos/audio files from YouTube](./readme-assets/modules/YOUTUBE_DOWNLOADER/README.md)
- [Favicon Builder: build all the favicon files required by modern web apps](./readme-assets/modules/FAVICON_BUILDER/README.md)
- [PWA Assets Builder: build all the images required for a PWA to be published](./readme-assets/modules/PWA_ASSETS_BUILDER/README.md)
- [AES256: encrypt and decrypt messages with the AES256 algorithm](./readme-assets/modules/AES256/README.md)
- [MD5: hash and validate messages with the MD5 Algorithm](./readme-assets/modules/MD5/README.md)




<br/>

## Getting Started

1) Install the CLI Globally
```bash
$ npm install -g localkit
```

2) Run it with:
```bash
$ localkit
```

<br/>

## Forking Instructions

If you wish to make use of the LocaLKit CLI to perform sensitive operations, I suggest that you fork this repository and lock all dependencies in the `package.json` file (equivalent to using the  `--save-exact` flag) for security reasons.

### Requirements

- GIT
- NodeJS ^v21.0.0
- NPM ^v10.2.0

### Installation

1) Clone the repository
```bash
$ git clone git@github.com:your-username/localkit.git
```

2) Install the dependencies
```bash
$ npm install
```

3) Run it
```bash
$ npm start
```






<br/>

## Deployment

```bash
$ npm publish
```




<br/>

## Built With

- JavaScript




<br/>

## Running the Tests

```bash
# Unit Tests
$ npm run test:unit

# Integration Tests
$ npm run test:integration
```




<br/>

## @TODO

- Implement the JavaScript/Typescript/CSS file template generators




<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)




<br/>

## Acknowledgments

- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [node-aes256](https://github.com/JamesMGreene/node-aes256)
- [check-password-strength](https://github.com/deanilvincent/check-password-strength)
- [date-fns](https://github.com/date-fns/date-fns)
- [generate-password](https://github.com/brendanashworth/generate-password)
- [node-md5](https://github.com/pvorb/node-md5)
- [uuid](https://github.com/uuidjs/uuid)
- [otplib](https://github.com/yeojz/otplib)
- [ytdl](https://github.com/fent/node-ytdl-core)
- [sharp](https://github.com/lovell/sharp)
- [png-to-ico](https://github.com/steambap/png-to-ico)
- [ffmpeg](https://ffmpeg.org/)




<br/>

## Sources

- [Adding favicons in a multi-browser multi-platform world](https://mobiforge.com/design-development/adding-favicons-in-a-multi-browser-multi-platform-world)
- [How to enhance your PWA with HTML tags for iOS and Android](https://www.modyo.com/developer-tips/how-to-enhance-your-pwa-with-html-tags-for-ios-and-android)
- [Adaptive icon support in PWAs with maskable icons](https://web.dev/articles/maskable-icon)
- [Define icons and a theme color](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/icon-theme-color)
- [awesome-meta-and-manifest](https://github.com/gokulkrishh/awesome-meta-and-manifest)
- [PWABuilder](https://www.pwabuilder.com/imageGenerator)
- [pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)


