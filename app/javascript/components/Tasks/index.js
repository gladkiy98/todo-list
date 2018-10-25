import React from 'react'
import Title from '../Title'
import isEmpty from 'lodash.isempty'
import api from '../lib/requestApi'
import InlineEdit from '../InlineEdit'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class Tasks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
      title: '',
      completed_to: null,
      errors: {},
      activeTaskCount: ''
    }
  }

  componentDidMount() {
    api.get('tasks').then((tasks) => this.setState({
      tasks,
      activeTaskCount: this.handleItemLeft(tasks)
    }))
  }

  handleChangeText = (e) => this.setState({ [e.target.name]: e.target.value })

  handleChangeDate = (date) => this.setState({ completed_to: date })

  handleFocusOut = (id, text) => api.put(`tasks/${id}`, { title: text })

  handleItemLeft = (tasks={}) => {
    const number = this.filterState(tasks, 'active').length
    return `${number} item${(number == 1 && ' left' || 's left')}`
  }

  filterState = (state, params) => {
    const filteredArray = state.slice()
    return filteredArray.filter(task => task.status === params)
  }

  isValidation = () => {
    const { title, completed_to } = this.state
    const errors = {}
    let formIsValid = true

    if (isEmpty(title)) {
      formIsValid = false
      errors.title = 'Title cannot be empty'
    }

    if (isEmpty(completed_to)) {
      formIsValid = false
      errors.completed_to = 'Date cannot be emty'
    }

    this.setState({ errors })
    return formIsValid
  }

  createTask = (e) => {
    e.preventDefault()
    if (this.isValidation()) {
      const { title, completed_to } = this.state

      api.post('tasks', { title, completed_to }).then((task) => {
        this.setState(prevState => ({
          tasks: [...prevState.tasks, task],
          activeTaskCount: this.handleItemLeft([...prevState.tasks, task]),
          title: ''
        }))
        this.inputDate.clear()
      })
    }
  }

  updateStatusTask = (task, index) => () => {
    const newStatus = {
      active: 'completed',
      completed: 'active'
    }

    api.put(`${newStatus[task.status]}_tasks/${task.id}`).then(() => {
      this.setState((prevState) => {
        prevState.tasks[index].status = newStatus[task.status]
        return {
          tasks: [...prevState.tasks],
          activeTaskCount: this.handleItemLeft(this.state.tasks)
        }
      })
    })
  }

  checkAll = () => {
    const { tasks } = this.state
    const activeTasks = this.filterState(tasks, 'active')
    const url = isEmpty(activeTasks) ? 'active_tasks' : 'completed_tasks'

    api.get(url).then((tasks) => this.setState({
      tasks,
      activeTaskCount: this.handleItemLeft(tasks)
    }))
  }

  deleteTask = (i, task) => () => {
    const row = this.state.tasks
    row.splice(i, 1)
    this.setState({
      tasks: row,
      activeTaskCount: this.handleItemLeft(row)
    })
    api.destroy(`tasks/${task.id}`)
  }

  deleteCompletedTask = () => {
    const { tasks } = this.state
    const activeTasks = this.filterState(tasks, 'active')
    this.setState({ tasks: activeTasks })
    api.get('completed_tasks/new')
  }

  filterButton = (params='') => () => {
    api.get(`tasks?status=${params}`).then((tasks) => this.setState({ tasks }))
  }

  renderTasks = () => {
    const { tasks } = this.state

    return tasks.map((task, i) => {
      return (
        <div className={`row-fluid pt-2 task row-task ${task.status}`} key={task.id}>
          <div className='col-md-auto col-sm-auto col-auto pr-0'>
            <i className='handle' />
            <input
              type='checkbox'
              checked={task.status === 'completed'}
              onChange={this.updateStatusTask(task, i)}
              name='status'
              id={`checked_${task.id}`}
              className={`checkbox-status-${task.status}`}
            />
            <label className='check' htmlFor={`checked_${task.id}`} />
          </div>
          <div className='col-md-10 col-sm-10 col-10 p-0 word-break'>
            <InlineEdit
              text={task.title}
              labelClassName={`completed-action w-100 title-${task.status}`}
              labelId={task.id}
              inputDisabled={task.status}
              onFocusOut={this.handleFocusOut}
            />
          </div>
          <div className='col-md-auto col-sm-auto col-auto text-right'>
            <a
              data-confirm='Are you sure?'
              id={`data_${task.id}`}
              onClick={this.deleteTask(i, task)}
              className='action delete-action'
            />
          </div>
        </div>
      )
    })
  }

  render() {
    const { title, completed_to, activeTaskCount } = this.state

    return (
      <div>
        <Title />
        <div className='row-fluid content-task pl-0 pr-0'>
          <div className='row-fluid d-flex col-md-12 col-sm-12 col-12 row-create pt-2'>
            <a className='checked-all' onClick={this.checkAll} />
            <form>
              <div className='col-md-8 col-sm-8 col-7 border-0'>
                <input
                  placeholder='What needs to be done?'
                  className='border-0 input-text'
                  type='text'
                  name='title'
                  autoComplete='off'
                  value={title}
                  onChange={this.handleChangeText}
                />
              </div>
              <div className='col-md-4 col-sm-4 col-5 pl-0 pr-0'>
                <DatePicker
                  ref={(input) => (this.inputDate = input)}
                  className='border-0 input-data'
                  placeholderText='Click to select a date'
                  dateFormat='DD/MM/YYYY'
                  minDate={moment()}
                  selected={completed_to}
                  onChange={this.handleChangeDate}
                />
              </div>
              <input className='invisible d-none' type='submit' onClick={this.createTask} />
            </form>
          </div>
          {this.renderTasks()}
          <div className='row-fluid d-flex w-100 text-center pt-2 m-0'>
            <div className='col-md-3 col-sm-3 col-3'>
              <p className='text-left'>{activeTaskCount}</p>
            </div>
            <div className='col-md-6 col-sm-6 col-5'>
              <a className='btn btn-sm' onClick={this.filterButton()}>All</a>
              <a className='btn btn-sm' onClick={this.filterButton(0)}>Active</a>
              <a className='btn btn-sm' onClick={this.filterButton(1)}>Completed</a>
            </div>
            <div className='col-md-3 col-sm-3 col-3 pl-0'>
              <a className='badge badge-light' onClick={this.deleteCompletedTask}>Clear completed</a>
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
