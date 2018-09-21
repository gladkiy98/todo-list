import React from "react";
import PropTypes from "prop-types";

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    fetch('/api/v1/tasks')
      .then((response) => response.json())
      .then((data) => this.setState({ tasks: data }));
  }


  renderTasks = () => {
    const { tasks } = this.state;

    return tasks.map(({ id, title }) => {
      return (
        <div key={id}>
          <h1>{title}</h1>
        </div>
      )
    })
  }

  render() {
    return this.renderTasks()
  }
}

export default Tasks;
