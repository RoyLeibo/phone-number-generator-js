import { CountryCode, isValidNumberForRegion, isValidPhoneNumber } from "libphonenumber-js";
import {isPhoneNumber} from 'class-validator';
import { random, sample } from "lodash";
import { CountryPhoneDataConfig } from "./config.js";
import { CountryPhoneData, countryPhoneDataArray } from "./countryPhoneData.js";

export default function generatePhoneNumber(
  config?: CountryPhoneDataConfig
): string {
  for (let i = 0; i < 100; i++) {
    const countryPhoneData: CountryPhoneData =
      getCountryPhoneDataByConfig(config);
    for (let j = 0; j < 1000; j++) {
      const phoneNumber = getRandomPhoneNumber(countryPhoneData, config?.withoutCountryCode);
      if (isPhoneNumberValid(phoneNumber,countryPhoneData,config?.withoutCountryCode)) {
        return phoneNumber;
      }
    }
    if (config) {
      break;
    }
  }
  throw new Error("Failed to generate phone number");
}

export function generatePhoneNumbers(
  count: number,
  config?: CountryPhoneDataConfig
): string[] {
  if (count <= 0) {
    throw new Error("Count must be greater than 0");
  }
  
  if (count > 10000) {
    throw new Error("Count exceeds maximum allowed (10000)");
  }

  const phoneNumbers: string[] = [];
  
  for (let i = 0; i < count; i++) {
    phoneNumbers.push(generatePhoneNumber(config));
  }
  
  return phoneNumbers;
}

export function isPhoneNumberValid(
  phoneNumber: string,
  countryPhoneData?: CountryPhoneData,
  withoutCountryCode?: boolean
): boolean {
  if (withoutCountryCode) {
    return countryPhoneData !== undefined && isValidNumberForRegion(phoneNumber, countryPhoneData.alpha2 as CountryCode);
  }
  if (countryPhoneData) {
    const nationalNumber = phoneNumber.slice(1 + countryPhoneData.country_code.length);
    if (!countryPhoneData.phone_number_lengths.includes(nationalNumber.length)) {
      return false;
    }
  }
  return isValidPhoneNumber(phoneNumber) && isPhoneNumber(phoneNumber);
}



function getRandomPhoneNumber(countryPhoneData: CountryPhoneData, withoutCountryCode: boolean = false): string {
  const randomMobileBeginWith: string = sample(countryPhoneData.mobile_begin_with) ?? "";
  const selectedLength: number = sample(countryPhoneData.phone_number_lengths) ?? countryPhoneData.phone_number_lengths[0];
  const suffixLength = selectedLength - randomMobileBeginWith.length;

  if (suffixLength <= 0) {
    return '';
  }

  const randomPhoneNumberSuffix = getRandomPhoneNumberSuffix(suffixLength);
  return `${withoutCountryCode ? '' : '+' + countryPhoneData.country_code}${randomMobileBeginWith}${randomPhoneNumberSuffix}`;
}

function getRandomPhoneNumberSuffix(phoneNumberLength: number): string {
  return `${random(2, 9)}${getRandomNumberInLength(phoneNumberLength - 1)}`;
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

  if (!config || !config.countryName) {
    countryPhoneData = sample(countryPhoneDataArray)!;
  } else {
    countryPhoneData =
      countryPhoneDataArray.find(
        (countryPhoneData) => countryPhoneData.country_name === config.countryName
      ) ?? (() => {
        throw new Error(`Invalid country name`);
      })();

  }

  return countryPhoneData;
}
