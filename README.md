# Phone number generator &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## What is phone number generator?

phone-number-generator-js a versatile JavaScript library that generates random mobile phone numbers in the E.164 format.

With this library, you can easily generate a completely random phone number or configure it to generate numbers specific to a particular country.

It supports a wide range of countries, with a total of 227 supported countries, allowing you to generate phone numbers that are valid and appropriate for various regions across the globe.

By default, if no configuration is provided, a totally random phone number will be generated from any of the 226 supported countries.

## Features

✨ **Generate single or multiple phone numbers** - Create one number or batch generate thousands  
🌍 **227 countries supported** - Generate valid numbers for any region worldwide  
📱 **E.164 format compliance** - All numbers follow international standards  
✅ **Built-in validation** - Every generated number is validated using libphonenumber-js  
⚙️ **Flexible configuration** - Generate with or without country codes  
🎯 **Country-specific generation** - Target specific countries for localized testing  
🚀 **High performance** - Generate thousands of numbers in seconds  
📦 **Multiple formats** - Available as CJS, ESM, and UMD modules  
💪 **TypeScript support** - Fully typed for excellent IDE support

## Use Cases

🧪 **Testing & QA** - Generate test data for phone number validation  
📊 **Database Seeding** - Populate databases with realistic phone numbers  
🔄 **Load Testing** - Create large datasets for performance testing  
🎭 **Mock Data** - Generate sample data for demos and prototypes  
📝 **Form Testing** - Automate form filling with valid phone numbers  
🌐 **Multi-region Testing** - Test applications across different countries  

### Relevant links:

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
const { generatePhoneNumber, generatePhoneNumbers } = require("phone-number-generator-js");

// or

import { generatePhoneNumber, generatePhoneNumbers } from "phone-number-generator-js";
```

### 1. Generate a single phone number

```javascript
generatePhoneNumber(); // '+85265698900'
```

### 2. Generate multiple phone numbers (batch generation)

```javascript
// Generate 10 random phone numbers
generatePhoneNumbers(10);
// Returns: ['+85265698900', '+436508162890', '+12125551234', ...]

// Generate 5 phone numbers from a specific country
generatePhoneNumbers(5, { countryName: CountryNames.United_States });
// Returns: ['+12125551234', '+13105555678', '+14155559876', ...]

// Generate multiple numbers without country code
generatePhoneNumbers(3, {
  countryName: CountryNames.Austria,
  withoutCountryCode: true,
});
// Returns: ['6501234567', '6509876543', '6503456789']
```

### 3. With config

#### Using countryName enum

```javascript
generatePhoneNumber({ countryName: CountryNames.Austria }); // '+436508162890'
```

#### Using withoutCountryCode flag (defaults to false)

```javascript
generatePhoneNumber({
  countryName: CountryNames.Austria,
  withoutCountryCode: true,
}); // '5483746575'
```

## Test

```
npm run test

// or

yarn test
```

## Build

```
npm run build

// or

yarn build
```

## Supported countries:

| Countries                                     |                                     |                                     |                                |
| --------------------------------------------- | ----------------------------------- | ----------------------------------- | ------------------------------ |
| Afghanistan 🇦🇫                                | Albania 🇦🇱                          | Algeria 🇩🇿                          | American Samoa 🇦🇸              |
| Andorra 🇦🇩                                    | Angola 🇦🇴                           | Anguilla 🇦🇮                         | Antigua and Barbuda 🇦🇬         |
| Argentina 🇦🇷                                  | Armenia 🇦🇲                          | Aruba 🇦🇼                            | Australia 🇦🇺                   |
| Austria 🇦🇹                                    | Azerbaijan 🇦🇿                       | Bahamas 🇧🇸                          | Bahrain 🇧🇭                     |
| Bangladesh 🇧🇩                                 | Barbados 🇧🇧                         | Belarus 🇧🇾                          | Belgium 🇧🇪                     |
| Belize 🇧🇿                                     | Benin 🇧🇯                            | Bermuda 🇧🇲                          | Bhutan 🇧🇹                      |
| Bolivia 🇧🇴                                    | Bosnia and Herzegovina 🇧🇦           | Botswana 🇧🇼                         | Brazil 🇧🇷                      |
| British Virgin Islands 🇻🇬                     | Brunei Darussalam 🇧🇳                | Bulgaria 🇧🇬                         | Burkina Faso 🇧🇫                |
| Burundi 🇧🇮                                    | Cambodia 🇰🇭                         | Cameroon 🇨🇲                         | Canada 🇨🇦                      |
| Cape Verde 🇨🇻                                 | Cayman Islands 🇰🇾                   | Central African Republic 🇨🇫         | Chad 🇹🇩                        |
| Chile 🇨🇱                                      | China 🇨🇳                            | Colombia 🇨🇴                         | Comoros 🇰🇲                     |
| Congo 🇨🇩                                      | Cook Islands 🇨🇰                     | Costa Rica 🇨🇷                       | Côte D'Ivoire 🇨🇮               |
| Croatia 🇭🇷                                    | Cuba 🇨🇺                             | Curaçao 🇨🇼                          | Cyprus 🇨🇾                      |
| Czech Republic 🇨🇿                             | DR Congo 🇨🇩                        | Denmark 🇩🇰                          | Djibouti 🇩🇯                    |
| Dominica 🇩🇲                                   | Dominican Republic 🇩🇴               | East Timor 🇹🇱                       | Ecuador 🇪🇨                     |
| Egypt 🇪🇬                                      | El Salvador 🇸🇻                      | Equatorial Guinea 🇬🇶                | Eritrea 🇪🇷                     |
| Estonia 🇪🇪                                    | Eswatini 🇸🇿                         | Ethiopia 🇪🇹                         | Falkland Islands (Malvinas) 🇫🇰 |
| Faroe Islands 🇫🇴                              | Fiji 🇫🇯                             | Finland 🇫🇮                          | France 🇫🇷                      |
| French Guiana 🇬🇫                              | French Polynesia 🇵🇫                 | Gabon 🇬🇦                            | Gambia 🇬🇲                      |
| Georgia 🇬🇪                                    | Germany 🇩🇪                          | Ghana 🇬🇭                            | Gibraltar 🇬🇮                   |
| Greece 🇬🇷                                     | Greenland 🇬🇱                        | Grenada 🇬🇩                          | Guadeloupe 🇬🇵                  |
| Guam 🇬🇺                                       | Guatemala 🇬🇹                        | Guinea 🇬🇳                           | Guinea-Bissau 🇬🇼               |
| Guyana 🇬🇾                                     | Haiti 🇭🇹                            | Honduras 🇭🇳                         | Hong Kong 🇭🇰                   |
| Hungary 🇭🇺                                    | Iceland 🇮🇸                          | India 🇮🇳                            | Indonesia 🇮🇩                   |
| Iran 🇮🇷                                       | Iraq 🇮🇶                             | Ireland 🇮🇪                          | Israel 🇮🇱                      |
| Italy 🇮🇹                                      | Jamaica 🇯🇲                          | Japan 🇯🇵                            | Jordan 🇯🇴                      |
| Kazakhstan 🇰🇿                                 | Kenya 🇰🇪                            | South Korea 🇰🇷                       |
| Kuwait 🇰🇼                                     | Kyrgyzstan 🇰🇬                       | Laos 🇱🇦                              | Latvia 🇱🇻                      |
| Lebanon 🇱🇧                                    | Lesotho 🇱🇸                          | Liberia 🇱🇷                          | Libya 🇱🇾                       |
| Liechtenstein 🇱🇮                              | Lithuania 🇱🇹                        | Luxembourg 🇱🇺                       | Macao 🇲🇴                       |
| North Macedonia 🇲🇰                            | Madagascar 🇲🇬                       | Malawi 🇲🇼                           | Malaysia 🇲🇾                    |
| Maldives 🇲🇻                                   | Mali 🇲🇱                             | Malta 🇲🇹                            | Marshall Islands 🇲🇭            |
| Martinique 🇲🇶                                 | Mauritania 🇲🇷                       | Mauritius 🇲🇺                        | Mexico 🇲🇽                      |
| Micronesia 🇫🇲                                 | Moldova 🇲🇩                          | Monaco 🇲🇨                           |
| Mongolia 🇲🇳                                   | Montenegro 🇲🇪                       | Montserrat 🇲🇸                       | Morocco 🇲🇦                     |
| Mozambique 🇲🇿                                 | Myanmar 🇲🇲                          | Namibia 🇳🇦                          | Nauru 🇳🇷                       |
| Nepal 🇳🇵                                      | Netherlands 🇳🇱                      | New Caledonia 🇳🇨                    | New Zealand 🇳🇿                 |
| Nicaragua 🇳🇮                                  | Niger 🇳🇪                            | Nigeria 🇳🇬                          | Niue 🇳🇺                        |
| Norfolk Island 🇳🇫                             | Northern Mariana Islands 🇲🇵         | Norway 🇳🇴                           | Oman 🇴🇲                        |
| Pakistan 🇵🇰                                   | Palau 🇵🇼                            | Panama 🇵🇦                           | Papua New Guinea 🇵🇬            |
| Paraguay 🇵🇾                                   | Peru 🇵🇪                             | Philippines 🇵🇭                      | Pitcairn 🇵🇳                    |
| Poland 🇵🇱                                     | Portugal 🇵🇹                         | Puerto Rico 🇵🇷                      | Qatar 🇶🇦                       |
| Réunion 🇷🇪                                    | Romania 🇷🇴                          | Russian Federation 🇷🇺               | Rwanda 🇷🇼                      |
| Saint Helena 🇸🇭                               | Saint Kitts And Nevis 🇰🇳            | Saint Lucia 🇱🇨                      | Saint Pierre And Miquelon 🇵🇲   |
| Saint Vincent And The Grenedines 🇻🇨           | Samoa 🇼🇸                            | San Marino 🇸🇲                       | Sao Tome and Principe 🇸🇹       |
| Saudi Arabia 🇸🇦                               | Senegal 🇸🇳                          | Serbia 🇷🇸                           | Seychelles 🇸🇨                  |
| Sierra Leone 🇸🇱                               | Singapore 🇸🇬                        | Sint Maarten 🇸🇽                     | Slovakia 🇸🇰                    |
| Slovenia 🇸🇮                                   | Solomon Islands 🇸🇧                  | Somalia 🇸🇴                          | South Africa 🇿🇦                |
| South Sudan 🇸🇸                                | Spain 🇪🇸                            | Sri Lanka 🇱🇰                        | Sudan 🇸🇩                       |
| Suriname 🇸🇷                                   | Sweden 🇸🇪                           | Switzerland 🇨🇭                      | Syria 🇸🇾                        |
| Taiwan 🇹🇼                                     | Tajikistan 🇹🇯                       | Tanzania 🇹🇿                         | Thailand 🇹🇭                    |
| Timor-Leste 🇹🇱                                | Togo 🇹🇬                             | Tokelau 🇹🇰                          | Tonga 🇹🇴                       |
| Trinidad and Tobago 🇹🇹                        | Tunisia 🇹🇳                          | Turkey 🇹🇷                           | Turkmenistan 🇹🇲                |
| Turks and Caicos Islands 🇹🇨                   | Tuvalu 🇹🇻                           | Uganda 🇺🇬                           | Ukraine 🇺🇦                     |
| United Arab Emirates 🇦🇪                       | United Kingdom 🇬🇧                   | United States 🇺🇸                    | Uruguay 🇺🇾                     |
| Uzbekistan 🇺🇿                                 | Vanuatu 🇻🇺                          | Vietnam 🇻🇳                          | Yemen 🇾🇪                       |
| Virgin Islands, British 🇻🇬                    | Virgin Islands, U.S. 🇻🇮             | Wallis and Futuna 🇼🇫                |
| Zambia 🇿🇲                                     | Zimbabwe 🇿🇼                         |

## Credits

1. Validating that the generated phone number is valid & following the E.164 format - [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js)
2. Countries phone number data (country code, mobile starting digits & length) - [phone](https://github.com/AfterShip/phone)
