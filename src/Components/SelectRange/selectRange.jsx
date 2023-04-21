import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectRangeValue } from '../../Store/store'

function SelectRange() {
  const dispatch = useDispatch()
  const selectedOption = useSelector((state) => state.selectRangeValue)
  console.log(selectedOption)

  const handleSelectChange = (event) => {
    dispatch(setSelectRangeValue(event.target.value))
  }

  return (
    <div className="whichRange">
      <label htmlFor="chooseRange">Which range do you want to check ?</label>
      <select name="range" id="chooseRange" value={selectedOption} onChange={handleSelectChange}>
        <option value="7">7 days</option>
        <option value="30">30 days</option>
        <option value="360">360 days</option>
      </select>
    </div>
  )
}

export default SelectRange
