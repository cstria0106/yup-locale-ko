# yup-locale-ko
입력 값 검증 라이브러리 [yup](https://github.com/jquense/yup) 의 한국어 번역입니다.

## 설치
```sh
$ npm install yup yup-locale-ko

혹은

$ yarn add yup yup-locale-ko 
```

## 사용법

```js
import * as yup from 'yup';
import ko from 'yup-locale-ko';

yup.setLocale(ko);
```

## 조사 처리

한국어 종성에 맞는 조사를 사용합니다.

### 예시(은)
```js
yup.object({
	name: yup.string().label('이름'),
}).validateSync({
	name: 12345,
}, {
	strict: true,
})
```

### 출력
```sh
ValidationError: 이름은 `string` 타입이어야 합니다. 그러나 최종 값은 `12345`입니다.
```

### 예시(는)
```js
yup.object({
	age: yup.number().label('나이'),
}).validateSync({
	age: '홍길동',
}, {
	strict: true,
})
```

### 오류 출력
```sh
ValidationError: 나이는 `number` 타입이어야 합니다. 그러나 최종 값은 `"홍길동"`입니다.
```
