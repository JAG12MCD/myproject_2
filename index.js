let equation = '';

const main = () => {};

const showContent = (content) => {
	document.getElementById('screen').innerHTML = content;
};

const makeChunks = (equation) => {
	const chunks = [];
	let chunk = '';
	for (const char of equation) {
		if (['+', '-', '/', '*', '%', '^'].includes(char)) {
			chunks.push(parseFloat(chunk));
			chunks.push(char);
			chunk = '';
		} else chunk += char;
	}
    if(chunk)   chunks.push(parseFloat(chunk))
	return chunks;
};

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;
const mod = (a, b) => a % b;
const pow = (a, b) => a ** b;

const eval = (a, b, operation) => {
	if (operation == '+') return sum(a, b);
	else if (operation == '-') return sub(a, b);
	else if (operation == '*') return mul(a, b);
	else if (operation == '/') return div(a, b);
	else if (operation == '^') return pow(a, b);
	else if (operation == '%') return mod(a, b);
};

const calculate = () => {
	let chunks = makeChunks(equation);
	for (let i = 0; i < 3; i++) {
		temp = [];
		target = [];
		if (i === 0) target = ['^'];
		else if (i == 1) target = ['/', '*', '%'];
		else target = ['+', '-'];

		for(let i=0;i<chunks.length;i++){
            const chunk = chunks[i];
            if(target.includes(chunk)){
                const ans = eval(chunks[i-1],chunks[i+1], chunk);
                temp.pop();
                temp.push(ans);
                i+=1;
            }
            else{
                temp.push(chunk);
            }
        }
        chunks = temp;
	}
	equation = '';
    showContent(chunks[0])
};

const handleButtonClick = (ele) => {
	equation += ele;
	showContent(equation);
};

const erase = ()=>{
    equation = equation.slice(0,-1);
    showContent(equation)
}

const clearScreen = ()=>{
    equation = "";
    showContent(equation);
}

document.addEventListener('DOMContentLoaded', main);
