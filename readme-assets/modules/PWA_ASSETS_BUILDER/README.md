[<- Back](../../../README.md)

# PWA Assets Builder

The PWA Assets Builder Module generates all the assets needed for a Progressive Web Application to be published correctly across different devices, operating systems, social networks, etc.



## Getting Started

In order to generate a build, you need:

1. The brand's color in hexadecimal format (e.g. `#000000`) that will be used for the background
2. The brand's icon in `.png` format and dimensions of `1024x1024` pixels. For example:

![Icon Example](./source.png)

**Important:** make sure there is sufficient color contrast between the background and the icon.

Launch the CLI in the directory where the required image is located and then initialize the PWA Assets Builder Module:

```bash
$ localkit
```

![PWA Assets Build](./pwa-assets-build.png)



### Build Output

Once the build has completed, it will output the following contents in the directory from which you invoked the CLI:

```
pwa-assets-build-${TIMESTAMP}
    │
    manifest.webmanifest
    receipt.txt
    source.png
    pwa-assets/
        ├───icons/
        |      ├───...
        |      └───...
        ├───apple-touch-screens/
        |      ├───...
        |      └───...
        ├───apple-splash-screens/
        |      ├───...
        |      └───...
        ├───telegram/
        |      └───512x512.png
        ├───facebook/
        |      └───720x720.png
        ├───github/
        |      └───500x500.png
        ├───instagram/
        |      └───1000x1000.png
        ├───linkedin/
        |      └───400x400.png
        ├───notification/
        |      └───256x256.png
        ├───twitter/
        |      └───400x400.png
        └───whatsapp/
               └───500x500.png
```



### Usage

@TODO



## Sources

- [Web app manifests | MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Web app manifest | web.dev](https://web.dev/learn/pwa/web-app-manifest)
- [App design | web.dev](https://web.dev/learn/pwa/app-design#display_modes)
- [Add a web app manifest | web.dev](https://web.dev/articles/add-manifest)
- [Web Application Manifest | w3c](https://w3c.github.io/manifest/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Adding favicons in a multi-browser multi-platform world](https://mobiforge.com/design-development/adding-favicons-in-a-multi-browser-multi-platform-world)
- [Define icons and a theme color](https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/icon-theme-color)
- [Iconography in Windows](https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/overview)