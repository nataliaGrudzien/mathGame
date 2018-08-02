//dlaczego podświetlaja sie prawidłowe odpowiedzi?
import React from 'react';
import ReactDOM from 'react-dom';

class MathQuestionGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: this.props.time,
			answers: [],
			ranNum1: 0,
			ranNum2: 0,
			operator: '',
			goodAnswer: 0,
			msg: '= ?', 
			counter: 0
		};

	} 

	setMath = () => {
		const operators = ["+", "-", "*"];
		let operator = operators[Math.floor(Math.random()*operators.length)];
		let num1 = Math.floor(Math.random() * (10 - 1) + 1);
		let num2 = Math.floor(Math.random() * (10 - 1) + 1);
		let result = eval(num1+operator+num2);
		this.setState({operator: operator});
		this.setState({ranNum1: num1});
		this.setState({ranNum2: num2});
		this.setState({goodAnswer: result});
		
		let answer = [];
		
		answer.push(<button key={0} onClick={event => {this.checkResult(event, result)}}>{result}</button>)
		for (let i=0; i< 3; i++) {
			let falseResult = Math.floor(Math.random() * (100 + 9) - 9);
			if (falseResult !== result) {
				answer.push(<button key={i+1} onClick={event => {this.checkResult(event, falseResult)} }>{falseResult}</button>)
			} else {
				falseResult = Math.floor(Math.random() * (100 + 9) - 9);
				answer.push(<button key={i+1} onClick={event => {this.checkResult(event, falseResult)} }>{falseResult}</button>);
				console.log("podwojenie")
			}
		}
		
		function shuffleArray(array) {
		    for (let i = array.length - 1; i > 0; i--) {
		        const j = Math.floor(Math.random() * (i + 1));
		        [array[i], array[j]] = [array[j], array[i]]; 
		    }
		}
		shuffleArray(answer);
		this.setState({answers: answer});
	}

	componentDidMount(){	
			
	   	this.intervalId = setInterval(() => {
	   		this.state.timer > 0 ? this.setState({ timer: this.state.timer-1 }) : this.setState({ msg: "Time is up! Game over!", ranNum1: '', ranNum2: '', operator: '' })
	    }, 1000);
	   	this.setMath();
	} 

	componentWillUnmount(){
	  clearInterval(this.intervalId);
	  }

	checkResult = (event, item) => {
	  	
	  	if (item === this.state.goodAnswer) { 
	  		this.setState({
	  			ranNum1: '',
	  			ranNum2: '',
	  			operator: '',
	  			counter: this.state.counter+1,
	  			timer: 9
	  		})
	  		this.setMath();
	  		} else { 
	  			clearInterval(this.intervalId);
	  			//dorobic wyłączanie guzików
	  			this.setState({
	  				msg: "Game over!",
	  				ranNum1: '',
	  				ranNum2: '',
	  				operator: ''
	  				
	  			})}
	  	
	}

	render() {
		return (
			 <div>
    			<h1>{this.state.ranNum1} {this.state.operator} {this.state.ranNum2} {this.state.msg}</h1>
    			<div>
    				{this.state.answers}

    				</div>
    			<h3>Punkty: {this.state.counter}</h3>
    			<h2>00:0{this.state.timer}</h2>
			</div>
			);
	}
}

class App extends React.Component {
	render() {
		return <MathQuestionGame time={9}/>
	}
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});