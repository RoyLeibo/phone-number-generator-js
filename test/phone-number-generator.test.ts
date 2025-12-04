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
