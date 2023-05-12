import { isValidPhoneNumber } from "libphonenumber-js";
import { countryPhoneDataArray } from "../src/countryPhoneData";
import { generatePhoneNumber } from "../src/index";

describe("generatePhoneNumber", () => {
  it.each(Array.from(Array(100000)))(
    "Should succeed generating phone number %s",
    () => {
      expect(isValidPhoneNumber(generatePhoneNumber())).toBeTruthy();
    }
  );

  it.each(countryPhoneDataArray)(
    "Should succeed generating phone number with country code: %s",
    (countryPhoneData) => {
      const phoneNumber = generatePhoneNumber({
        countryCode: countryPhoneData.country_code,
      });
      expect(
        phoneNumber.startsWith(`+${countryPhoneData.country_code}`)
      ).toBeTruthy();
      expect(isValidPhoneNumber(phoneNumber)).toBeTruthy();
    }
  );

  it.each(countryPhoneDataArray)(
    "Should succeed generating phone number with country name: %s",
    (countryPhoneData) => {
      const phoneNumber = generatePhoneNumber({
        countryName: countryPhoneData.country_name,
      });
      expect(
        phoneNumber.startsWith(`+${countryPhoneData.country_code}`)
      ).toBeTruthy();
      expect(isValidPhoneNumber(phoneNumber)).toBeTruthy();
    }
  );

  it.each(countryPhoneDataArray)(
    "Should succeed generating phone number with country tag: %s",
    (countryPhoneData) => {
      const phoneNumber = generatePhoneNumber({
        countryTag3: countryPhoneData.alpha3,
      });
      expect(phoneNumber.includes(countryPhoneData.country_code)).toBeTruthy();
      expect(isValidPhoneNumber(phoneNumber)).toBeTruthy();
    }
  );
});
