import { Component } from 'react'
import { toast } from 'react-toastify'

class Notification extends Component {

  toastId = null

  static showToast (msg, toastType) {
    if (!toast.isActive(this.toastId)) {
      if (toastType === 'success') {
        this.toastId = toast.success(msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        })
      }
      else if (toastType === 'error') {
        this.toastId = toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000
        })
      }
    }
  }
}

export default Notification