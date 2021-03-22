import {Message} from 'yup/lib/types';
import printValue from 'yup/lib/util/printValue';
import {josa} from 'josa';

export interface MixedLocale {
	default?: Message;
	required?: Message;
	oneOf?: Message<{ values: any }>;
	notOneOf?: Message<{ values: any }>;
	notType?: Message;
	defined?: Message;
}

export interface StringLocale {
	length?: Message<{ length: number }>;
	min?: Message<{ min: number }>;
	max?: Message<{ max: number }>;
	matches?: Message<{ regex: RegExp }>;
	email?: Message<{ regex: RegExp }>;
	url?: Message<{ regex: RegExp }>;
	uuid?: Message<{ regex: RegExp }>;
	trim?: Message;
	lowercase?: Message;
	uppercase?: Message;
}

export interface NumberLocale {
	min?: Message<{ min: number }>;
	max?: Message<{ max: number }>;
	lessThan?: Message<{ less: number }>;
	moreThan?: Message<{ more: number }>;
	positive?: Message<{ more: number }>;
	negative?: Message<{ less: number }>;
	integer?: Message;
}

export interface DateLocale {
	min?: Message<{ min: Date | string }>;
	max?: Message<{ max: Date | string }>;
}

export interface ObjectLocale {
	noUnknown?: Message;
}

export interface ArrayLocale {
	length?: Message<{ length: number }>;
	min?: Message<{ min: number }>;
	max?: Message<{ max: number }>;
}

export interface BooleanLocale {
	isValue?: Message;
}

export let mixed: Required<MixedLocale> = {
	default: ({path}) => josa(`${path}#{는} 올바르지 않습니다.`),
	required: ({path}) => josa(`${path}#{가} 필요합니다.`),
	oneOf: ({path, values}) => josa(`${path}#{는} 다음 값 중 하나여야 합니다: ${values}`),
	notOneOf: ({path, values}) => josa(`${path}#{는} 다음 값이 아니어야 합니다: ${values}`),
	notType: ({path, type, value, originalValue}) => {
		let isCast = originalValue != null && originalValue !== value;
		let msg =
			`${path}#{는} \`${type}\` 타입이어야 합니다. ` +
			`그러나 최종 값은 \`${printValue(value, true)}\`입니다` +
			(isCast
				? ` (값 \`${printValue(originalValue, true)}\`#{으로} 부터 변환 됨).`
				: '.');

		if (value === null) {
			msg += `\n 만약 "null"이 의도 된 경우 스키마를 \`.nullable()\`로 표시해야 합니다.`;
		}

		return josa(msg);
	},
	defined: ({path}) => josa(`${path}#{가} 정의되어야 합니다.`)
};

export let string: Required<StringLocale> = {
	length: ({path}) => josa(`${path}#{는} ${length} 글자여야 합니다.`),
	min: ({path, min}) => josa(`${path}#{는} 최소 ${min} 글자여야 합니다.`),
	max: ({path, max}) => josa(`${path}#{는} 최대 ${max} 글자여야 합니다.`),
	matches: ({path, regex}) => josa(`${path}#{는} 다음 정규식에 맞아야 합니다: "${regex}"`),
	email: ({path}) => josa(`${path}#{는} 올바른 이메일이어야 합니다.`),
	url: ({path}) => josa(`${path}#{는} 올바른 URL이어야 합니다.`),
	uuid: ({path}) => josa(`${path}#{는} 올바른 UUID이어야 합니다.`),
	trim: ({path}) => josa(`${path}#{는} 트림 된 문자열이어야 합니다.`),
	lowercase: ({path}) => josa(`${path}는 소문자여야 합니다.`),
	uppercase: ({path}) => josa(`${path}는 대문자여야 합니다.`)
};

export let number: Required<NumberLocale> = {
	min: ({path, min}) => josa(`${path}#{는} ${min}보다 크거나 같아야 합니다.`),
	max: ({path, max}) => josa(`${path}#{는} ${max}보다 작거나 같아야 합니다.`),
	lessThan: ({path, less}) => josa(`${path}#{는} ${less}보다 작아야 합니다.`),
	moreThan: ({path, more}) => josa(`${path}#{는} ${more}보다 커야 합니다.`),
	positive: ({path}) => josa(`${path}#{는} 양수여야 합니다.`),
	negative: ({path}) => josa(`${path}#{는} 음수여야 합니다.`),
	integer: ({path}) => josa(`${path}#{는} 정수여야 합니다.`)
};

export let date: Required<DateLocale> = {
	min: ({path, min}) => josa(`${path}#{는} ${min}의 이후여야 합니다.`),
	max: ({path, max}) => josa(`${path}#{는} ${max}의 이전이어야 합니다.`)
};

export let boolean: BooleanLocale = {
	isValue: ({path, value}) => josa(`${path}#{는} ${value}#{여}야 합니다.`)
};

export let object: Required<ObjectLocale> = {
	noUnknown: ({path}) => josa(`${path}에 다음 정의되지 않은 키가 있습니다: \${unknown}`)
};

export let array: Required<ArrayLocale> = {
	min: ({path, min}) => josa(`${path}#{는} 최소 ${min}개의 원소를 가져야합니다.`),
	max: ({path, max}) => josa(`${path}#{는} 최대 ${max}개의 원소를 가져야합니다.`),
	length: ({path, length}) => josa(`${path}#{는} ${length}개의 원소를 가져야합니다.`)
};

const yupLocaleKo = {
	mixed,
	string,
	number,
	date,
	object,
	array,
	boolean
};

export default yupLocaleKo;
