# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

An npm library that generates random mobile phone numbers in E.164 format. Supports 227 countries. Validates generated numbers using `libphonenumber-js` and `class-validator`.

## Commands

```bash
yarn test                    # Run all tests (Jest)
yarn test -- -t "pattern"   # Run tests matching pattern
yarn build                   # Build all formats (CJS, ESM, UMD, types)
yarn lint                    # Lint with ESLint
yarn lint:fix                # Lint and auto-fix
```

Note: Tests include 100,000 iterations for random generation — expect them to take a while.

## Architecture

```
src/
  index.ts                  # Public API exports
  phone-number-generator.ts # Core logic: generatePhoneNumber, generatePhoneNumbers, isPhoneNumberValid
  config.ts                 # CountryPhoneDataConfig class and CountryNames enum (227 countries)
  countryPhoneData.ts       # CountryPhoneData interface + static array of country phone metadata
  utils.ts                  # Known invalid number list used in tests
```

**Generation flow**: `generatePhoneNumber()` picks a country (random or from config), builds a candidate number from `mobile_begin_with` prefixes + random suffix, then validates it via `libphonenumber-js` + `class-validator`. Retries up to 1000 times per country, up to 100 countries when random.

**Public API** (exported from `index.ts`):
- `generatePhoneNumber(config?)` — returns one E.164 phone number string
- `generatePhoneNumbers(count, config?)` — returns array of phone numbers (max 10,000)
- `isPhoneNumberValid(phoneNumber, countryPhoneData?, withoutCountryCode?)` — validation helper
- `CountryPhoneDataConfig` — config class with `countryName` and `withoutCountryCode` fields
- `CountryNames` — enum of all supported country names

**Build output** (`dist/`): CJS, ESM, UMD, and TypeScript declarations. Config files in `config/` directory.

## Key Dependencies

- `libphonenumber-js` — phone number validation
- `class-validator` — additional `isPhoneNumber` validation
- `lodash` — `random()` and `sample()` utilities

## Country Phone Data

`countryPhoneData.ts` contains a large static array sourced from [AfterShip/phone](https://github.com/AfterShip/phone). Each entry has: `alpha2`, `alpha3`, `country_code`, `country_name`, `mobile_begin_with[]`, `phone_number_lengths[]`.
