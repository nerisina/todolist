var Todo = React.createClass({displayName: "Todo",
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
			
				React.createElement("li", {className: "todo"}, 
				 	React.createElement("span", {onClick: this.edit}, 
				 		this.props.children
				 	), 
				 	React.createElement("button", {className: "btn btn-default btn-sm glyphicon glyphicon-trash remove pull-right", onClick: this.remove})
				)
		);
	},
	todoForm: function(){
		return (
			
				React.createElement("li", {className: "todo"}, 
				 	React.createElement("span", null, 
				 		React.createElement("input", {type: "text", placeholder: "Edit Todo", ref: "newValue", defaultValue: this.props.children})
				 	), 
				 	React.createElement("button", {className: "btn btn-default btn-sm glyphicon glyphicon-floppy-disk remove pull-right", onClick: this.save})
				)
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


var TodoList = React.createClass({displayName: "TodoList",
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
		return React.createElement(Todo, {key: i, index: i, onChange: this.update, onRemove: this.remove}, todo)
	},
	render: function(){
			return(
				React.createElement("div", null, 
					React.createElement("h1", null, "Things to do "), 
					React.createElement("div", {className: "form-inline"}, 
						React.createElement("div", {className: "form-group"}, 
							React.createElement("input", {className: this.state.input_style, placeholder: this.state.placeholder, ref: "newTodo", value: this.state.text, onChanage: this.onChange}), 
							React.createElement("button", {className: "btn btn-default btn-sm", onClick: this.add}, "+")
						)
					), 
					React.createElement("ul", null, 
					this.state.todos.map(this.eachTodo)
					)
				)
			);
	}
});

React.render(React.createElement(TodoList, null), document.getElementById('todo'));