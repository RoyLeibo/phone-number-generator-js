import { CountryCode, isValidNumberForRegion } from "libphonenumber-js";
import { CountryNames } from "../src/config";
import { countryPhoneDataArray } from "../src/countryPhoneData";
import { generatePhoneNumber } from "../src/index";
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
