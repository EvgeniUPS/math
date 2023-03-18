const numbers = document.querySelector('.math__header-numbers');
const number = document.querySelectorAll('.math__header-number');
const startBtn = document.querySelector('.math__header-start');
const num1Block = document.querySelector('.math__numbers-num1');
const num2Block = document.querySelector('.math__numbers-num2');
const answerBlock = document.querySelector('.math__numbers-result');
const bodyBlock = document.querySelector('.math__body');
const resultBlock = document.querySelector('.math__footer-result');
// const answerInput = document.querySelector('.math__answer-input');
const checkAnsweerBtn = document.querySelector('.math__answer-button');
const choiceList = document.querySelector('.math__choices');
const clearBtn = document.querySelector('.math__footer-clear');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const resList = document.querySelector('.result-list');
let count = 1;
const results = [];

let example = {};

// selectNum1();

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

// const example = selectNum1();

function generateNums(num) {
	const num2 = random(1, 10);
	const correctAnswer = num * num2;
	example = {num1: num, num2, correctAnswer};
	return example;
}

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

const selectNum1 = () => {
	numbers.addEventListener('click', e => {
		if (e.target.classList.contains('math__header-number')) {
			number.forEach(item=>item.classList.remove('active') );
			startBtn.classList.remove('disabled');
			e.target.classList.add('active');
			const num1 = +e.target.textContent;
			start(num1);
			return (num1);
		}
	});
};

function start(num1) {
	startBtn.addEventListener('click', e => {
		startBtn.classList.add('disabled');
		const nums = generateNums(num1);
		const correctAnswer = nums.num1 * nums.num2;
		num1Block.textContent = nums.num1;
		num2Block.textContent = nums.num2;
		if (bodyBlock.classList.contains('disabled')) {
			bodyBlock.classList.remove('disabled');
		}
		generateChoices(num1, correctAnswer);
	});
}


function generateChoices(num1, correctAnswer) {
	const arr = [];
	for (let i = 0; i < 4; i++) {
		arr.push(num1 * random(1, 10));
	}
	arr.push(correctAnswer);
	renderChoices(arr, correctAnswer);
}

function renderChoices(arr) {
	shuffle(arr);
	const html = arr.map(item => {
		return ` <div class="choices__item">${item}</div>`;
	}).join('');
	choiceList.innerHTML = html;
	checkAnswer();
}

function checkAnswer() {
	choiceList.addEventListener('click', e => {
		answerBlock.classList.remove('incorrect');
		const select = e.target;
		if (select.classList.contains('choices__item')) {
			const isCorrect = +select.textContent === example.correctAnswer;
			isCorrect ? correct() : inCorrect(select.textContent);
		}
	}, true);
}

function correct() {
	setTimeout(() => {
		console.log(`count`, count);
		count++;
		startBtn.classList.remove('disabled');
		//
		startBtn.classList.add('disabled');
		const nums = generateNums(example.num1);
		const correctAnswer = example.num1 * example.num2;
		num1Block.textContent = nums.num1;
		num2Block.textContent = nums.num2;
		if (bodyBlock.classList.contains('disabled')) {
			bodyBlock.classList.remove('disabled');
		}
		generateChoices(nums.num1, correctAnswer);
		answerBlock.textContent = '';
		//
	}, 2000);
	answerBlock.textContent = example.correctAnswer;
	answerBlock.classList.add('correct');
	results.push({status: 'Correct', ex: `${example.num1} * ${example.num2} = ${example.correctAnswer}`});
	localStorage.clear();
	const id = Date.now();
	localStorage.setItem('data', JSON.stringify(results));
}

function inCorrect(res) {
	answerBlock.textContent = res;
	answerBlock.classList.add('incorrect');
	results.push({status: 'Incorrect', ex: `${example.num1} * ${example.num2} = ${res}`});
	localStorage.clear();
	const id = Date.now();
	localStorage.setItem('data', JSON.stringify(results));

	// sendToLocalStorage(example.num1, example.num2, res);
}

// function showResult() {
// 	// resultBlock.addEventListener('click', () => {
// 	console.log(results);
// 	// popup.classList.remove('disabled');
// 	const resultList = JSON.parse(localStorage.getItem('data'));
// 	if (resultList) {
// 		const html = resultList.map(item => {
// 			// console.log(item.status);
// 			const statusClass = item.status === 'Correct' ? 'result__item_correct' : 'result__item_incorrect';
// 			return `<div class="result__item ${statusClass}">${item.ex}</div>`;
// 		});
// 		resList.innerHTML = html;
// 	}
// 	// });
// }

function sendToLocalStorage(num1, num2, res) {
	const result = {status: 'Correct', example: `${num1} * ${num2} = ${res}`};
	results.push(result);
}

//
// const storage = localStorage.getItem('results');
// console.log(storage);
// const temp = [];
// temp.push(storage);
// console.log(`temp`, JSON.parse(temp));
// // console.log(`storage`, storage);
// const toStorage = {
// 	example: `${example.num1} * ${example.num2} = ${example.correctAnswer}`,
// 	status: 'Correct',
// };
// temp.push(toStorage);
// localStorage.setItem('results', JSON.stringify(temp));


function soundClick() {
	const audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'click.mp3'; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем
}

const init = () => {
	document.addEventListener('keydown', function(e) {
		if (e.keyCode === 27) popup.classList.add('disabled');
	});
	selectNum1();
	popupClose.addEventListener('click', e => {

	});

	resultBlock.addEventListener('click', e => {
	});
	checkAnsweerBtn.addEventListener('click', e => {
		console.log('btn');
	});
	clearBtn.addEventListener('click', e => {
		// const pass = prompt('Пароль');
		// if (pass == '123') {
		localStorage.clear();
		console.log('Clear');
		// }
	});
	// showResult();
};
init();
