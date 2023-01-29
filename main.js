function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

const renderNums = () => {
	const num2Value = random(1, 10);
	const num1 = document.querySelector('.math__numbers-num1');
	const num2 = document.querySelector('.math__numbers-num2');
	num1.textContent = num1.dataset.num1;
	num2.textContent = num2Value;
};
const init = () => {
	renderNums(selectNum1());
	const startBtn = document.querySelector('.math__header-start');
	startBtn.addEventListener('click', e=>{
		renderNums();
	});
};

const selectNum1 = () => {
	const num1V = document.querySelector('.math__numbers-num1');
	const nums = document.querySelector('.math__header-numbers');
	nums.addEventListener('click', e => {
		const num1 = e.target.textContent;
		num1V.dataset.num1= num1;
	});
};

init();

