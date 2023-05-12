import { isValidPhoneNumber } from "libphonenumber-js";
import { random, sample } from "lodash";
import { CountryPhoneData, countryPhoneDataArray } from "./countryPhoneData";

export class CountryPhoneDataConfig {
  countryTag3?: string;
  countryName?: string;
  countryCode?: string;
}

export default function generatePhoneNumber(
  config?: CountryPhoneDataConfig
): string {
  const countryPhoneData: CountryPhoneData =
    getCountryPhoneDataByConfig(config);
  let phoneNumber: string;
  do {
    phoneNumber = getRandomPhoneNumber(countryPhoneData);
  } while (!isValidPhoneNumber(phoneNumber));

  return phoneNumber;
}

function getRandomPhoneNumber(countryPhoneData: CountryPhoneData): string {
  const randomMobileBeginWith: string =
    sample(countryPhoneData.mobile_begin_with) ?? "";

  const randomPhoneNumberSuffix = getRandomPhoneNumberSuffix(
    countryPhoneData.phone_number_lengths[0] - randomMobileBeginWith.length
  );

  return `+${countryPhoneData.country_code}${randomMobileBeginWith}${randomPhoneNumberSuffix}`;
}

function getRandomPhoneNumberSuffix(phoneNumberLength: number): string {
  return `${random(2, 10)}${getRandomNumberInLength(phoneNumberLength - 1)}`;
}

function getRandomNumberInLength(length: number): number {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCountryPhoneDataByConfig(
  config: CountryPhoneDataConfig = {}
): CountryPhoneData {
  let countryPhoneData!: CountryPhoneData;
  const { countryTag3, countryName, countryCode } = config;

  if (!config || (!countryTag3 && !countryName && !countryCode)) {
    countryPhoneData = sample(countryPhoneDataArray)!;
  } else {
    if (countryTag3) {
      countryPhoneData =
        countryPhoneDataArray.find(
          (countryPhoneData) => countryPhoneData.alpha3 === countryTag3
        ) ?? throwError("tag");
      validateCountryPhoneData(countryPhoneData, config);
    }
    if (countryName) {
      countryPhoneData =
        countryPhoneDataArray.find(
          (countryPhoneData) => countryPhoneData.country_name === countryName
        ) ?? throwError("name");
      validateCountryPhoneData(countryPhoneData, config);
    }
    if (countryCode) {
      countryPhoneData =
        countryPhoneDataArray.find(
          (countryPhoneData) => countryPhoneData.country_code === countryCode
        ) ?? throwError("code");
      validateCountryPhoneData;
    }
  }

  return countryPhoneData;
}

function validateCountryPhoneData(
  countryPhoneData: CountryPhoneData,
  { countryTag3, countryName, countryCode }: CountryPhoneDataConfig
): void {
  if (countryTag3 && countryPhoneData.alpha3 !== countryTag3) {
    throw new Error("Invalid country tag");
  }
  if (countryName && countryPhoneData.country_name !== countryName) {
    throw new Error("Invalid country name");
  }
  if (countryCode && countryPhoneData.country_code !== countryCode) {
    throw new Error("Invalid country code");
  }
}

function throwError(invalidField: string): CountryPhoneData {
  return (() => {
    throw new Error(`Invalid country ${invalidField}`);
  })();
}
