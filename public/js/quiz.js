document.addEventListener('DOMContentLoaded',function() {
	const quiz = document.querySelector('#quiz');
	const score = document.querySelector('#score');
	const level = quiz.querySelector('#level');
	const num1Element = quiz.querySelector('#num1');
	const num2Element = quiz.querySelector('#num2');
  const operatorElement = quiz.querySelector('#operator');
  const progressBar = quiz.querySelector(".progress-bar");

  const icon1 = quiz.querySelector('#icon1');
  const icon2 = quiz.querySelector('#icon2');
	let userScore = 0, totalQuestions = 0, userLevel = 1, operators = [], range = [], result = 0, focus = true, num1, num2, randomOperator;

  var iconArray = new Array('volleyball-ball', 'futbol', 'money-bill-alt', 'truck', 'tree', 'sun', 'moon', 'lightbulb', 'star', 'snowflake', 'bowling-ball', 'bell', 'heart', 'truck-monster', 'truck-moving', 'truck-monster', 'paper-plane', 'tint', 'fish', 'glasses');

	function setOperatorsAndRange() {
		switch (userLevel) {
			case 1:
				operators = ['+', '-'];
				range = [1,10];
				break;
			case 2:
				operators = ['+', '-'];
				range = [30,50];
				break;
			case 3:
				operators = ['*', '/'];
				range = [2,10];
				break;
			case 4:
				operators = ['+', '-', '*', '/'];
				range = [1,20];
				break;
		}
	}

	function calculateResult(x,y,operator) {
		switch (operator) {
			case '+': return x + y;
			case '-': return x - y;
			case '*': return x * y;
			case '/': return x / y;
		}
	}

	function randomNumber(min,max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function generateQuestion() {
		score.innerHTML = `Score: ${userScore} / ${totalQuestions}`;
		level.innerHTML = `Level: ${userLevel} / 4`;
		setOperatorsAndRange();
		num1 = randomNumber(range[0],range[1]);
		num2 = randomNumber(range[0],range[1]);
		randomOperator = operators[randomNumber(0,operators.length)];
		if(randomOperator === '/') {
			while(num1 % num2 !== 0) {
				num1 = randomNumber(range[0],range[1]);
				num2 = randomNumber(range[0],range[1]);
			}
		}
		result = calculateResult(num1, num2, randomOperator);
		num1Element.innerHTML = `${num1}`;
		num2Element.innerHTML = `${num2}`;
    operatorElement.innerHTML = `${randomOperator}`;
    
    // generate random icon
    var randomIcon = Math.floor(Math.random()*(iconArray.length));
    // var randomIcon2 = Math.floor(Math.random()*(iconArray.length));
    icon1.innerHTML = '<i class="fas fa-' + iconArray[randomIcon] + '"></i>';
    icon2.innerHTML = '<i class="fas fa-' + iconArray[randomIcon] + '"></i>';
    
    // set progress bar width
    progressBar.setAttribute("style", "width: "+ ((userScore*10)%100) + "%");
    progressBar.setAttribute("aria-valuenow", (userScore*10)%100);
	}

  generateQuestion();

	quiz.querySelector('[name=answer]').addEventListener('keyup', function(e) {
		const ans = e.target.value;
		if(focus && e.which === 13) {
			if(ans.length === 0) {
				this.blur();
				swal({
					  title: 'Answer please!',
					  text: 'Type the answer and press enter',
					  type: 'warning'
					}).then(function() {
						this.focus();
						focus = false;
					}.bind(this));
			}
			else {
				e.target.value = '';
				if(+ans === result) {
					userScore++;
				}
				else {
					this.blur();
					swal({
					  title: "Awww Nooo!",
            html: '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX_W0JK7sGzFVmzGqk13wnReWeWkfYSuTfdg4YSsXMHIp8CJhFdQ">'+
            `<div class='message'>The correct answer is <div>${num1} ${randomOperator} ${num2} = ${result}</div></div>`
					}).then(function() {
						this.focus();
						focus = false;
					}.bind(this));
				}
				totalQuestions++;
				const currentLevel = userLevel;
				userLevel = Math.floor(userScore / 10) + 1;
				if(currentLevel !== userLevel) {
					this.blur();
					swal({
					  title: 'Yay! Good job human!',
            html: '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbkmJVTEEaOLcaXt55l77ZaEM-eF4OMpLM4zvZQjI7d4A92PfItA">'+
					  `<div class="message">You reached Level ${userLevel}!</div>`
          }).then(function() {
						this.focus();
						focus = false;
					}.bind(this));
				}
				if(userLevel === 5) {
					this.blur();
					swal({
            title: 'Congratulations!',
            html: '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVeD4o2VfIjRepKCU6mwzxJ931nHhVTflChLlFPh-d97p7YSG">'+            
					  `<div class="message">You completed the quiz</div>`,
					  type: 'success',
					  confirmButtonText: 'Restart the quiz'
					}).then(function () {
					  userScore = 0;
					  userLevel = 1;
					  totalQuestions = 0;
					  generateQuestion();
					  this.focus();
					  focus = false;
					}).bind(this);
				}
				else generateQuestion();
			}
		}
		focus = true;
	});
});