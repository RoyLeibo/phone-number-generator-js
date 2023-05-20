# Phone number generator &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## What is phone number generator?

An easy way to generate a random phone number in E.164 format.

Relevant links:

- [E.164 format definition](https://en.wikipedia.org/wiki/E.164)
- [What is E.164?](https://www.twilio.com/docs/glossary/what-e164)
- [What is the E.164 Format, and how to use it correctly](https://voipstudio.com/blog/what-is-the-e-164-format-and-how-to-use-it-correctly/)

## Install

```
npm install phone-number-generator-js

// or

yarn add phone-number-generator-js
```

## Usage

```javascript
const { phoneNumberGenerator } = require("phone-number-generator-js");

// or

import { phoneNumberGenerator } from "phone-number-generator-js";
```

### 1. Simple usage

```javascript
generatePhoneNumber(); // '+85265698900'
```

### 2. With config

#### Using countryName

```javascript
generatePhoneNumber({ countryName: "Austria" }); // '+436508162890'
```

#### Using countryTag3

```javascript
generatePhoneNumber({ countryTag3: "AUS" }); // '+432458562845'
```

#### Using countryCode

```javascript
generatePhoneNumber({ countryCode: "43" }); // '+435483746575'
```

#### Multiple fields

```javascript
generatePhoneNumber({
  countryName: "Austria",
  countryTag3: "AUS",
  countryCode: "43",
}); // '+438726225343'
```

```javascript
generatePhoneNumber({
  countryName: "Austria",
  countryTag3: "USA",
  countryCode: "43",
}); // An error will be thrown - invalid config (the country tag of Austria is not USA)
```

## Test

```
npm test
```

## Build

```
npm build
```

## Credits

1. Validating that the generated phone number is valid & following the E.164 format - [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js)
2. Countries phone number data (country code, mobile starting digits & length) - [phone](https://github.com/AfterShip/phone)
