import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectRangeValue } from '../../Store/store'
import '../../Styles/selectRange.css'

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
      <select name="range" id="chooseRange" className="select" value={selectedOption} onChange={handleSelectChange}>
        <option value="7">7 days</option>
        <option value="30">30 days</option>
        <option value="360">360 days</option>
      </select>
      {/* 
      Il faudra chercher une manière de recrer le select sans passer par un select
      <p>Which Range do you want to check ?</p>
      <div className="choix">
        <span value="7" onClick={handleSelectChange}>
          7 D
        </span>
        <span value="30" onClick={handleSelectChange}>
          30 D
        </span>
        <span value="360" onClick={handleSelectChange}>
          360 D
        </span>
      </div> */}
    </div>
  )
}

export default SelectRange
