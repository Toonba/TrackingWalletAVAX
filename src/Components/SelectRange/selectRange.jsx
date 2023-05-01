import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectRangeValue } from '../../Store/store'
import '../../Styles/selectRange.css'

function SelectRange() {
  const dispatch = useDispatch()
  const selectedOption = useSelector((state) => state.selectRangeValue)

  const handleSelectChange = (value) => {
    dispatch(setSelectRangeValue(value))
  }

  return (
    //marche pas comme voulu, il va falloir revoir ça
    // <div className="whichRange">
    //   <p>Which range do you want to check ?</p>
    //   <span onClick={handleSelectChange(30)}>7 days</span>
    //   <span onClick={handleSelectChange(30)}>30 days</span>
    //   <span onClick={handleSelectChange(30)}>360 days</span>
    //   {/* <label htmlFor="chooseRange">Which range do you want to check ?</label>
    //   <select name="range" id="chooseRange" className="select" value={selectedOption} >
    //     <option value="7">7 days</option>
    //     <option value="30">30 days</option>
    //     <option value="360">360 days</option>
    //   </select> */}
    //   {/* 
    //   Il faudra chercher une manière de recrer le select sans passer par un select
    //   <p>Which Range do you want to check ?</p>
    //   <div className="choix">
    //     <span value="7" onClick={handleSelectChange}>
    //       7 D
    //     </span>
    //     <span value="30" onClick={handleSelectChange}>
    //       30 D
    //     </span>
    //     <span value="360" onClick={handleSelectChange}>
    //       360 D
    //     </span>
    //   </div> */}
    // </div>
    <div></div>
  )
}

export default SelectRange
