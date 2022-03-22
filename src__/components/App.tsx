import { FC, useState, useCallback, useEffect } from 'react'

const App: FC = () => {
  const [amount, setAmount] = useState<number>(0)
  const [className, setClassName] = useState<boolean>(false)
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
  })
  const renderNotes = () => {
    return Object.entries(requiredNotes)
      ?.reverse()
      ?.map((el, i) => {
        return (
          <div role="listitem" key={i} className="item">
            <span className="custom-span-notes">
              <strong> {el[0]} </strong>
            </span>
            <span className="custom-span">
              rs. {el[0] === `1` ? `coin` : `note${el[1] > 1 ? 's' : ''}`} will
              be
            </span>
            <span className="custom-span">
              <strong> {el[1]} </strong>
            </span>
          </div>
        )
      })
  }
  const totalNotes = () => {
    return Object.entries(requiredNotes)?.reduce((a, num) => {
      return a + num[1]
    }, 0)
  }
  const handleChange = (e: any) => {
    const { value } = e.target
    const regexp1 = new RegExp('[^0-9]')
    if (regexp1?.test(value)) {
      setClassName(true)
      setAmount(0)
      return false
    } else {
      setClassName(false)
      setAmount(value)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  const calNotes = useCallback(() => {
    const notes = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
    let amo = amount
    let req = requiredNotes
    notes.forEach((note) => {
      let c = Math?.floor(amount / note)
      amo = amo - note * Math?.floor(amo / note)
      req = { ...req, [note]: c }
    })
    setRequiredNotes(req)
  }, [amount, requiredNotes])
  useEffect(() => {
    calNotes()
  }, [amount, calNotes])
  return (
    <div className="ui container">
      <div className="custom-div">
        <h1 className="ui header">welcome to note counter</h1>
      </div>

      <div className="ui segment">
        <div className="ui two column very relaxed grid">
          <div className="column">
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Enter Amount</label>
                <input
                  className={`input ${className ? 'custom-input' : ''}`}
                  type="text"
                  name="amount"
                  onChange={handleChange}
                  value={amount}
                  placeholder="Enter Amount"
                />
                <div
                  className={`ui red message ${
                    className ? 'visible' : 'hidden'
                  }`}
                >
                  Enter Number's only
                </div>
              </div>
              <button className="ui button" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="column">
            <div role="list" className="ui list">
              {renderNotes()}
            </div>

            <div>
              <h2>
                Total numbers of Notes : <strong>{totalNotes()}</strong>
              </h2>
            </div>
          </div>
        </div>
        <div className="ui vertical divider">and</div>
      </div>
    </div>
  )
}
export default App
