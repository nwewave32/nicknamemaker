import nameList from "../nameCollection.json";
import { zodiac as zodiacConst } from "lib/data/constant";
const MakeNameUtil = () => {
  const makeNameFuncMain = (info, unique = false) => {
    let result;
    const hasMiddleName = info.bloodType === "A" || info.bloodType === "AB";
    let lastName = getName(nameList.lastName[info.vibe.name]);
    let middleName = hasMiddleName
      ? getName(nameList.middleName[determineLanguage(lastName)])
      : false;
    let firstName = "";

    if (lastName.length + middleName.length > 10) middleName = false;
    if (unique) {
      firstName = makeNameFuncSub(
        info.zodiac,
        info.birthday,
        determineLanguage(lastName) === "kor",
        middleName === false
          ? lastName.length
          : lastName.length + middleName.length
      );
    } else {
      firstName = getName(nameList.firstName[info.vibe.name]);

      if (firstName.length + middleName.length + lastName.length > 15) {
        lastName = "도";
      }
    }

    result = {
      first: firstName,
      middle: middleName,
      last: lastName,
    };
    return result;
  };

  const getName = (list) => {
    let targetNameList = [...list];
    const leng = targetNameList.length;
    const idx = Math.floor(Math.random() * (leng - 0));

    return targetNameList[idx];
  };

  const makeNameFuncSub = (zodiac, birthday, isKorean, leng) => {
    const targetZodiac = zodiacConst.find((item) => item.value === zodiac);
    const nameLeng = targetZodiac.id % 2 === 0 ? 2 : 3;
    console.log(
      "##nameLeng",
      nameLeng,
      targetZodiac.id,
      targetZodiac.id % 2 === 0
    );
    if (isKorean) return generateKoreanName(nameLeng);
    else return generateEnglishName(leng);
  };

  function determineLanguage(lastName) {
    if (/^[가-힣]/.test(lastName)) {
      // 한글 성씨
      return "kor";
    } else if (/^[a-zA-Z]/.test(lastName)) {
      // 영어 성씨
      return "eng";
    } else {
      // 그 외 (일본어 등)
      return "eng";
    }
  }

  function generateKoreanName(leng) {
    let result = "";
    const firstLetter = [
      "ㄱ",
      "ㄴ",
      "ㄷ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅅ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    const middleLetter = [
      "ㅏ",
      "ㅑ",
      "ㅓ",
      "ㅕ",
      "ㅗ",
      "ㅛ",
      "ㅜ",
      "ㅠ",
      "ㅡ",
      "ㅣ",
      "ㅐ",
      "ㅒ",
      "ㅔ",
      "ㅖ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅢ",
    ]; // 모음
    const middleLetter2 = [
      "ㅑ",

      "ㅕ",

      "ㅛ",

      "ㅡ",

      "ㅒ",

      "ㅖ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅢ",
    ];
    const lastLetter = ["ㄱ", "ㄴ", "ㄹ", "ㅂ", "ㅇ", ""];
    const compensateLetter = ["이", "우", "수", "아", "하"];
    //todo: 받침 없는 거 포함 시키기, 받침 두개는 안되게 하기
    for (let index = 0; result.length < leng; index++) {
      const randomConsonant =
        firstLetter[Math.floor(Math.random() * firstLetter.length)];
      const randomVowel =
        middleLetter[Math.floor(Math.random() * middleLetter.length)];
      const isUnique =
        middleLetter2.find((item) => item === randomVowel) !== undefined;
      const randomConsonant2 = isUnique
        ? ""
        : lastLetter[Math.floor(Math.random() * lastLetter.length)];

      result += hangulCompose(randomConsonant, randomVowel, randomConsonant2);
      if (isUnique)
        result +=
          compensateLetter[Math.floor(Math.random() * compensateLetter.length)];
    }
    return result;
  }

  function generateEnglishName(leng) {
    const syllables = [
      "a",
      "e",
      "i",
      "o",
      "u",
      "b",
      "d",
      "l",
      "m",
      "n",
      "r",
      "s",
      "t",
    ]; // 발음 가능한 음절
    let name = "";

    for (let i = 0; i < leng; i++) {
      const randomSyllable =
        syllables[Math.floor(Math.random() * syllables.length)];
      name += randomSyllable;
    }

    // 첫 글자 대문자 처리
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function hangulCompose(initial, medial, final = "") {
    const initialConsonants = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    const medialVowels = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    const finalConsonants = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    // 초성, 중성, 종성의 인덱스 계산
    const initialIndex = initialConsonants.indexOf(initial);
    const medialIndex = medialVowels.indexOf(medial);
    const finalIndex = finalConsonants.indexOf(final);

    // 인덱스가 유효한지 확인
    if (initialIndex === -1 || medialIndex === -1 || finalIndex === -1) {
      throw new Error("Invalid characters for Hangul composition");
    }

    // 음절 Unicode 값 계산
    const syllableCode =
      0xac00 + initialIndex * 588 + medialIndex * 28 + finalIndex;

    // Unicode로 변환하여 한글 문자 반환
    return String.fromCharCode(syllableCode);
  }

  return {
    makeNameFuncMain: makeNameFuncMain,
  };
};

const makeNameUtil = MakeNameUtil();
export { makeNameUtil };
