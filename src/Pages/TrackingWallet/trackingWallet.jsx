import GetHistory from '../../Components/GetHistory/getHistory'
import GetAddyForm from '../../Components/GetAddyForm/getAddyForm'
import '../../Styles/trackingWallet.css'

function TrackingWallet() {
  return (
    <>
      <GetAddyForm />
      <GetHistory />
    </>
  )
}

export default TrackingWallet
