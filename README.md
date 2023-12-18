# LocalKit

![LocalKit](./readme-assets/screenshot-01.png)

The LocalKit CLI provides a series of utilities that can be used by web developers to enhance their workflow. Note that this CLI can be used when connected to the Internet and in offline mode for more sensitive operations.

The key features are:

- Generation and analysis of passwords
- Generation and validation of UUIDs (Universally Unique Identifiers)
- Encryption and decryption of messages with the AES256 Algorithm
- Hashing of messages with the MD5 Algorithm
- Generation and validation of OTP (One Time Password) secrets and codes (@TODO)
- Youtube Video/Audio download (@TODO)




<br/>

## Getting Started

### Requirements

- GIT
- Python ^v3
- NodeJS ^v21.0.0
- NPM ^v10.2.0

### Installation

1) Clone the repository
```bash
git clone git@github.com:jesusgraterol/localkit.git
```

2) Install the dependencies
```bash
npm install
```



<br/>

## Usage

```bash
npm start
```




<br/>

## Deployment

@TODO




<br/>

## Built With

- JavaScript




<br/>

## Running the Tests

```bash
# Unit Tests
npm run test:unit

# Integration Tests
npm run test:integration

# E2E Tests
N/A
```




<br/>

## @TODO

- Implement the OTP (One Time Password) Module
- Implement the Youtube Downloader (mp4 & mp3)
- Implement the JavaScript/Typescript file template generators
- Publish the package on npm and adapt it so it can be installed globally, allowing it to be used as a proper CLI




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