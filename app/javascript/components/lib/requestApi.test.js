import api from './requestApi'

const promise = new Promise((resolve) => resolve)

describe('call function', () => {
  document.head.innerHTML =
  '<head>' +
    '<meta content="qqqweqweqweqwe" />' +
    '<meta content="sdhfsjkdgsdkfjsd" />' +
  '</head>'

  it('get', () => {
    expect(api.get()).toEqual(promise)
  })

  it('post', () => {
    expect(api.post()).toEqual(promise)
  })

  it('postSort', () => {
    expect(api.postSort()).toEqual(promise)
  })

  it('put', () => {
    expect(api.put()).toEqual(promise)
  })

  it('destroy', () => {
    expect(api.destroy()).toEqual(promise)
  })
})
