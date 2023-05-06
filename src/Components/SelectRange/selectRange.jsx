import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectRangeValue } from '../../Store/store'
import '../../Styles/selectRange.css'

function SelectRange() {
  const dispatch = useDispatch()
  const [active, setActive] = useState(0)

  const handleSelectChange = (value, active) => {
    dispatch(setSelectRangeValue(value))
    setActive(active)
  }

  // Marche pas le rerender quand je change la range
  return (
    <div className="whichRange">
      <p>Which range do you want to check ?</p>
      <span className={active === 0 ? 'active' : ''} onClick={() => handleSelectChange(7, 0)}>
        7 days
      </span>
      <span className={active === 1 ? 'active' : ''} onClick={() => handleSelectChange(30, 1)}>
        30 days
      </span>
      <span className={active === 2 ? 'active' : ''} onClick={() => handleSelectChange(180, 2)}>
        180 days
      </span>
      <span className={active === 3 ? 'active' : ''} onClick={() => handleSelectChange(365, 3)}>
        365 days
      </span>
    </div>
  )
}

export default SelectRange
