import GetHistory from '../../Components/GetHistory/getHistory'
import GetAddyForm from '../../Components/GetAddyForm/getAddyForm'
import GetBalance from '../../Components/GetBalance/getBalance'
import '../../Styles/trackingWallet.css'

function TrackingWallet() {
  return (
    <>
      <GetAddyForm />
      <GetBalance />
      <GetHistory />
    </>
  )
}

export default TrackingWallet
