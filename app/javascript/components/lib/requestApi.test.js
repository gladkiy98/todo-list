import api from './requestApi'

const promise = new Promise((resolve) => resolve)

describe('call function', () => {
  it('get', () => {
    expect(api.get()).toEqual(promise)
  })

  it('post', () => {
    expect(api.post()).toEqual(promise)
  })

  it('put', () => {
    expect(api.put()).toEqual(promise)
  })

  it('destroy', () => {
    expect(api.destroy()).toEqual(promise)
  })
})
