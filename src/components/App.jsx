/** @format */

// import React, { Component } from 'react';

// class App extends Component {
// 	state = {
// 		amount: '',
// 		className: false,
// 		requiredNotes: {
// 			2000: 0,
// 			500: 0,
// 			200: 0,
// 			100: 0,
// 			50: 0,
// 			20: 0,
// 			10: 0,
// 			5: 0,
// 			2: 0,
// 			1: 0,
// 		},
// 		notes: [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1],
// 	};
// 	handleChange = (e) => {
// 		var regexp1 = new RegExp('[^0-9]');
// 		if (regexp1.test(e.target.value)) {
// 			this.setState({ className: true });
// 			return false;
// 		} else {
// 			this.setState({ className: false });
// 		}
// 		this.setState(
// 			{
// 				[e.target.name]: e.target.value,
// 			},
// 			() => {
// 				this.calNotes();
// 			}
// 		);
// 	};
// 	calNotes = () => {
// 		let amount = this.state.amount;
// 		const notes = this.state.notes;
// 		let requiredNotes = this.state.requiredNotes;
// 		notes.map((el) => {
// 			let c = Math.floor(amount / el);
// 			amount = amount - el * Math.floor(amount / el);
// 			requiredNotes = { ...requiredNotes, [el]: c };
// 			return true;
// 		});
// 		this.setState({ requiredNotes });
// 	};
// 	renderNotes = () => {
// 		return Object.entries(this.state.requiredNotes)
// 			.reverse()
// 			.map((el, i) => {
// 				return (
// 					<div role='listitem' key={i} className='item'>
// 						<span className='custom-span-notes'>
// 							<strong> {el[0]} </strong>
// 						</span>
// 						<span className='custom-span'>
// 							rs. note{el[1] > 1 ? 's' : ''} will be
// 						</span>
// 						<span className='custom-span'>
// 							<strong> {el[1]} </strong>
// 						</span>
// 					</div>
// 				);
// 			});
// 	};
// 	totalNotes = () => {
// 		return (
// 			this.state.requiredNotes &&
// 			Object.entries(this.state.requiredNotes).reduce((a, num) => {
// 				return a + num[1];
// 			}, 0)
// 		);
// 	};
// 	handleSubmit = (e) => {
// 		e.preventDefault();
// 	};
// 	render() {
// 		return (
// 			<div className='ui container'>
// 				<div className='custom-div'>
// 					<h1 className='ui header'>welcome to atm</h1>
// 				</div>

// 				<div className='ui segment'>
// 					<div className='ui two column very relaxed grid'>
// 						<div className='column'>
// 							<form className='ui form' onSubmit={this.handleSubmit}>
// 								<div className='field'>
// 									<label>Enter Amount</label>
// 									<input
// 										className={`input ${
// 											this.state.className ? 'custom-input' : ''
// 										}`}
// 										type='text'
// 										name='amount'
// 										onChange={this.handleChange}
// 										value={this.state.amount}
// 										placeholder='Enter Amount'
// 									/>
// 									<div
// 										className={`ui red message ${
// 											this.state.className ? 'visible' : 'hidden'
// 										}`}>
// 										Enter Number's only{' '}
// 									</div>
// 								</div>
// 								<button className='ui button' type='submit'>
// 									Submit
// 								</button>
// 							</form>
// 						</div>
// 						<div className='column'>
// 							<div role='list' className='ui list'>
// 								{this.renderNotes()}
// 							</div>

// 							<div>
// 								<h2>
// 									Total numbers of Notes : <strong>{this.totalNotes()}</strong>
// 								</h2>
// 							</div>
// 						</div>
// 					</div>
// 					<div className='ui vertical divider'>and</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
// export default App;

import React, { useState, useEffect } from 'react';

const App = () => {
	const [amount, setAmount] = useState(0);
	const [className, setClassName] = useState(false);
	const [requiredNotes, setRequiredNotes] = useState({
		2000: 0,
		500: 0,
		200: 0,
		100: 0,
		50: 0,
		20: 0,
		10: 0,
		5: 0,
		2: 0,
		1: 0,
	});
	let notes = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
	const calNotes = (amo, req) => {
		let amount = amo;
		let requiredNotes = req;
		notes.map((el) => {
			let c = Math.floor(amount / el);
			amount = amount - el * Math.floor(amount / el);
			requiredNotes = { ...requiredNotes, [el]: c };
			// return true;
		});
		setRequiredNotes(requiredNotes);
	};
	const renderNotes = () => {
		return Object.entries(requiredNotes)
			.reverse()
			.map((el, i) => {
				return (
					<div role='listitem' key={i} className='item'>
						<span className='custom-span-notes'>
							<strong> {el[0]} </strong>
						</span>
						<span className='custom-span'>
							rs. {el[0] === `1` ? `coin` : `note${el[1] > 1 ? 's' : ''}`} will
							be
						</span>
						<span className='custom-span'>
							<strong> {el[1]} </strong>
						</span>
					</div>
				);
			});
	};
	const totalNotes = () => {
		return (
			requiredNotes &&
			Object.entries(requiredNotes).reduce((a, num) => {
				return a + num[1];
			}, 0)
		);
	};
	const handleChange = (e) => {
		var regexp1 = new RegExp('[^0-9]');
		if (regexp1.test(e.target.value)) {
			setClassName(true);
			setAmount(0);
			return false;
		} else {
			setClassName(false);
			setAmount(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	useEffect(() => {
		//   calNotes()
		calNotes(amount, requiredNotes);
	}, [amount]);
	return (
		<div className='ui container'>
			<div className='custom-div'>
				<h1 className='ui header'>welcome to atm</h1>
			</div>

			<div className='ui segment'>
				<div className='ui two column very relaxed grid'>
					<div className='column'>
						<form className='ui form' onSubmit={handleSubmit}>
							<div className='field'>
								<label>Enter Amount</label>
								<input
									className={`input ${className ? 'custom-input' : ''}`}
									type='text'
									name='amount'
									onChange={handleChange}
									value={amount.amount}
									placeholder='Enter Amount'
								/>
								<div
									className={`ui red message ${
										className ? 'visible' : 'hidden'
									}`}>
									Enter Number's only
								</div>
							</div>
							<button className='ui button' type='submit'>
								Submit
							</button>
						</form>
					</div>
					<div className='column'>
						<div role='list' className='ui list'>
							{renderNotes()}
						</div>

						<div>
							<h2>
								Total numbers of Notes : <strong>{totalNotes()}</strong>
							</h2>
						</div>
					</div>
				</div>
				<div className='ui vertical divider'>and</div>
			</div>
		</div>
	);
};
export default App;
