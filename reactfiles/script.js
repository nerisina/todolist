var Todo = React.createClass({
	getInitialState: function(){
		return{editing:false}
	},
	edit: function(){
		alert("edit todo");
		this.setState({editing:true});
	},
	remove: function(){
		alert("todo removed");
		this.props.onRemove(this.props.index);
	},
	save: function(){
		var newValue = this.refs.newValue.getDOMNode().value;
		// alert("Todo:" + val + "saved");
		// console.log(this);
		this.props.onChange(newValue, this.props.index);
		this.setState({editing: false});

	},
	todoDisplay: function(){
		return (
			
				<li className="todo">
				 	<span onClick={this.edit}>
				 		{this.props.children}
				 	</span>
				 	<button className="btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right" onClick={this.remove}></button>
				</li>
		);
	},
	todoForm: function(){
		return (
			
				<li className="todo">
				 	<span>
				 		<input type="text" placeholder="Edit Todo" ref="newValue" defaultValue={this.props.children} />
				 	</span>
				 	<button className="btn btn-default btn-sm glyphicon glyphicon-floppy-disk remove pull-right" onClick={this.save}></button>
				</li>
		);
	},
	render: function(){
		if (this.state.editing) {
			return this.todoForm();
		}else{
			return this.todoDisplay();
		}
		
	}
});


var TodoList = React.createClass({
	getInitialState: function() {
	    return {
	         todos: [
	         'Call Guilhem',
	         'Call Guilhem',
	         'Call Guilhem'
	         ],
	         text: "",
	         placeholder: "Add Todo",
	         input_style: "form-control"
	    };
	},
	onChange: function(){
		this.setState({text: e.target.value});
	},
	add: function() {
		var arr = this.state.todos;
		var newTodo = this.refs.newTodo.getDOMNode().value;
		
		if(!newTodo){
			e.preventDefault();
			this.setState({placeholder: "Please add Todo", input_style: "form-control red"});
		}else{
			arr.push(newTodo);
			this.setState({todos:arr});
		}

	},
	update: function(newValue, i){
		var arr = this.state.todos;
		arr[i] = newValue;
		this.setState({todos: arr, text: null, placeholder:"Add Todo", input_style: "form-control"}); 
	},
	remove: function(i){
		var arr = this.state.todos;
		arr.splice(i, 1);
		this.setState({todos: arr});
	},
	eachTodo: function(todo, i){
		return <Todo key={i} index={i} onChange={this.update} onRemove={this.remove}>{todo}</Todo>
	},
	render: function(){
			return(
				<div>
					<h1>Things to do </h1>
					<div className="form-inline">
						<div className="form-group">
							<input className={this.state.input_style} placeholder={this.state.placeholder} ref="newTodo" value={this.state.text} onChanage={this.onChange}/>
							<button className="btn btn-default btn-sm" onClick={this.add}>+</button>
						</div>
					</div>
					<ul>
					{this.state.todos.map(this.eachTodo)}
					</ul>
				</div>
			);
	}
});

React.render(<TodoList />, document.getElementById('todo'));