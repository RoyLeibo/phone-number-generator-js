import { CountryCode, isValidNumberForRegion } from "libphonenumber-js";
import { CountryNames } from "../src/config";
import { countryPhoneDataArray } from "../src/countryPhoneData";
import { generatePhoneNumber, generatePhoneNumbers } from "../src/index";
import {invalidNumbers} from '../src/utils'
import { isPhoneNumberValid } from "../src/phone-number-generator";


describe("generatePhoneNumber", () => {
  it.each(invalidNumbers)(
    "Should fail validate phone number: %s",
    (invalidNumber) => {
      expect(isPhoneNumberValid(invalidNumber)).toBeFalsy();
    }
  );

  it.each(Array.from(Array(100000)))(
    "Should succeed generating phone number",
    () => {
      const startTime = Date.now();
      const phoneNumber = generatePhoneNumber();
      const endTime = Date.now();
      expect(isPhoneNumberValid(phoneNumber)).toBeTruthy();
      expect(endTime - startTime).toBeLessThan(100);
    }
  );

  it.each(countryPhoneDataArray)(
    "Should succeed generating phone number with country name: $country_name",
    (countryPhoneData) => {
      const phoneNumber = generatePhoneNumber({
        countryName: countryPhoneData.country_name as CountryNames,
      });
      expect(
        phoneNumber.startsWith(`+${countryPhoneData.country_code}`)
      ).toBeTruthy();
      expect(isPhoneNumberValid(phoneNumber)).toBeTruthy();
    }
  );

  it("Should throw error for not existing country name", () => {
    expect(() =>
      generatePhoneNumber({
        countryName: 'SSS' as CountryNames,
      })
    ).toThrowError();
  });

  it("Should create phone number with country code", () => {
    const phoneNumber = generatePhoneNumber({
      countryName: CountryNames.Austria
    });
    expect(phoneNumber.startsWith("+43")).toBeTruthy();
    expect(isPhoneNumberValid(phoneNumber)).toBeTruthy();
  });

  it("Should create phone number without country code", () => {

    const phoneNumber = generatePhoneNumber({
      countryName: CountryNames.Austria,
      withoutCountryCode: true
    });
    expect(phoneNumber.startsWith('+43')).toBeFalsy();
    expect(isValidNumberForRegion(phoneNumber, 'AT' as CountryCode)).toBeTruthy();
  });
});

describe("Country name normalization", () => {
  it.each([
    { newKey: "Vietnam", oldKey: "Viet_Nam", code: "+84" },
    { newKey: "Iran", oldKey: null, code: "+98" },
    { newKey: "South_Korea", oldKey: "Republic_of_Korea", code: "+82" },
    { newKey: "Laos", oldKey: "Lao_People's_Democratic_Republic", code: "+856" },
    { newKey: "Libya", oldKey: "Libyan_Arab_Jamahiriya", code: "+218" },
    { newKey: "Syria", oldKey: "Syrian_Arab_Republic", code: "+963" },
    { newKey: "North_Macedonia", oldKey: "Macedonia", code: "+389" },
    { newKey: "Micronesia", oldKey: "Federated_States_Of_Micronesia", code: "+691" },
    { newKey: "Tanzania", oldKey: "United_Republic_of_Tanzania", code: "+255" },
    { newKey: "Moldova", oldKey: "Republic_of_Moldova", code: "+373" },
    { newKey: "DR_Congo", oldKey: "The_Democratic_Republic_Of_The_Congo", code: "+243" },
  ])(
    "Should generate phone number for $newKey (code $code)",
    ({ newKey, oldKey, code }) => {
      const phoneNumber = generatePhoneNumber({
        countryName: CountryNames[newKey as keyof typeof CountryNames],
      });
      expect(phoneNumber.startsWith(code)).toBeTruthy();
      expect(isPhoneNumberValid(phoneNumber)).toBeTruthy();

      if (oldKey) {
        const oldPhoneNumber = generatePhoneNumber({
          countryName: CountryNames[oldKey as keyof typeof CountryNames],
        });
        expect(oldPhoneNumber.startsWith(code)).toBeTruthy();
        expect(isPhoneNumberValid(oldPhoneNumber)).toBeTruthy();
        expect(CountryNames[newKey as keyof typeof CountryNames]).toBe(
          CountryNames[oldKey as keyof typeof CountryNames]
        );
      }
    }
  );
});

describe("generatePhoneNumbers", () => {
  it("Should generate multiple phone numbers", () => {
    const count = 10;
    const phoneNumbers = generatePhoneNumbers(count);
    expect(phoneNumbers).toHaveLength(count);
    phoneNumbers.forEach(num => {
      expect(isPhoneNumberValid(num)).toBeTruthy();
    });
  });

  it("Should generate multiple phone numbers with country config", () => {
    const count = 5;
    const phoneNumbers = generatePhoneNumbers(count, { 
      countryName: CountryNames.United_States 
    });
    expect(phoneNumbers).toHaveLength(count);
    phoneNumbers.forEach(num => {
      expect(num.startsWith("+1")).toBeTruthy();
      expect(isPhoneNumberValid(num)).toBeTruthy();
    });
  });

  it("Should generate multiple phone numbers without country code", () => {
    const count = 3;
    const phoneNumbers = generatePhoneNumbers(count, { 
      countryName: CountryNames.Austria,
      withoutCountryCode: true
    });
    expect(phoneNumbers).toHaveLength(count);
    phoneNumbers.forEach(num => {
      expect(num.startsWith('+')).toBeFalsy();
      expect(isValidNumberForRegion(num, 'AT' as CountryCode)).toBeTruthy();
    });
  });

  it("Should throw error for invalid count (zero)", () => {
    expect(() => generatePhoneNumbers(0)).toThrowError("Count must be greater than 0");
  });

  it("Should throw error for invalid count (negative)", () => {
    expect(() => generatePhoneNumbers(-1)).toThrowError("Count must be greater than 0");
  });

  it("Should throw error for count exceeding maximum", () => {
    expect(() => generatePhoneNumbers(10001)).toThrowError("Count exceeds maximum allowed (10000)");
  });

  it("Should generate large batch of phone numbers", () => {
    const count = 100;
    const startTime = Date.now();
    const phoneNumbers = generatePhoneNumbers(count, { 
      countryName: CountryNames.United_Kingdom 
    });
    const endTime = Date.now();
    
    expect(phoneNumbers).toHaveLength(count);
    expect(endTime - startTime).toBeLessThan(10000); // Should complete in less than 10 seconds
    phoneNumbers.forEach(num => {
      expect(num.startsWith("+44")).toBeTruthy();
      expect(isPhoneNumberValid(num)).toBeTruthy();
    });
  });
});
