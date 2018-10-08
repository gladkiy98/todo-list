import React from 'react'
import Title from '../Title'

class Tasks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    this.request('tasks')()
      .then((response) => response.json())
      .then((tasks) => this.setState({ tasks }))
  }

  request = (url, params={}, options={}) => () => fetch(`/api/v1/${url}`, params, options)

  updateStatusTask = (task, index) => () => {
    const newStatus = {
      active: 'completed',
      completed: 'active'
    }

    this.request(`${newStatus[task.status]}_tasks/${task.id}`, { method: 'PUT' })()
      .then((response) => {
        if (response.status === 200) {
          this.setState((prevState) => {
            prevState.tasks[index].status = newStatus[task.status]
            return { tasks: [...prevState.tasks] }
          })
        }
      })
  }

  deleteTask = (i, task) => () => {
    const row = this.state.tasks
    row.splice(i, 1)
    this.setState({ tasks: row })
    this.request(`tasks/${task.id}`, { method: 'DELETE' })()
  }


  renderTasks = () => {
    const { tasks } = this.state

    return tasks.map((task, i) => {
      return (
        <div className={`row-fluid pt-2 task row-task ${task.status}`} key={i}>
          <div className='col-md-auto col-sm-auto col-auto pr-0'>
            <i className='handle' />
            <input type='checkbox' value={task.status} defaultChecked={task.status === 'completed'} onChange={this.updateStatusTask(task, i)} name='status' id={`checked_${task.id}`} className={`checkbox-status-${task.status}`} />
            <label className='check' htmlFor={`checked_${task.id}`} />
          </div>
          <div className='col-md-10 col-sm-10 col-10 p-0 word-break'>
            <label className={`completed-action w-100 title-${task.status}`}>{task.title}</label>
          </div>
          <div className='col-md-auto col-sm-auto col-auto text-right'>
            <a id={`data_${task.id}`} dataconfirm='Are you sure?' onClick={this.deleteTask(i, task)} className='action delete-action'></a>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <Title />
        <div className='row-fluid content-task pl-0 pr-0'>
          <div className='row-fluid d-flex col-md-12 col-sm-12 col-12 row-create pt-2'>
            <a className='checked-all' />
            <form>
              <div className='col-md-8 col-sm-8 col-7 border-0'>
                <input placeholder='What needs to be done?' className='border-0 input-text' type='text' name='title' autoComplete='off' ></input>
              </div>
              <div className='col-md-4 col-sm-4 col-5 pl-0 pr-0'>
                <input className='border-0 input-data datepicker' type='date' autoComplete='off' name='completed_to' ></input>
              </div>
              <input className='invisible d-none' type='submit' />
            </form>
          </div>
          {this.renderTasks()}
          <div className='row-fluid d-flex w-100 text-center pt-2 m-0'>
            <div className='col-md-3 col-sm-3 col-3'>
              <p className='text-left'>1 item left</p>
            </div>
            <div className='col-md-6 col-sm-6 col-5'>
              <a className='btn btn-sm disabled'>All</a>
              <a className='btn btn-sm'>Active</a>
              <a className='btn btn-sm'>Completed</a>
            </div>
            <div className='col-md-3 col-sm-3 col-3 pl-0'>
              <a className='badge badge-light'>Clear completed</a>
            </div>
          </div>
        </div>
        <div className='row-fluid line1' />
        <div className='row-fluid line2' />
      </div>
    )
  }
}

export default Tasks
