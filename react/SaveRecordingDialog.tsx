import React from 'react'
import { connect } from 'react-redux'
import { uploadRecording, uploadCancel, saveRecordingLocally } from '../actions/SaveRecordingActions'
import { State } from '../store'
import { RecordingState } from '../reducers/recording'

export interface SaveRecordingProps {
  uploadRecording: () => void
  uploadCancel: () => void
  saveRecordingLocally: () => void
  recording: RecordingState
  url: string | undefined
  saved: boolean
  uploading: boolean
  uploadProgress: number
  onClose: () => void
}

export class SaveRecordingDialog extends React.PureComponent<SaveRecordingProps> {
  constructor(props: SaveRecordingProps) {
    super(props)
  }
  saveLocallyHandler() {
    this.props.saveRecordingLocally()
  }
  saveS3Handler() {
    this.props.uploadRecording()
  }
  closeHandler() {
    this.props.uploadCancel()
    this.props.onClose()
  }
  render() {
    const { uploading, uploadProgress, url } = this.props
    return (
      <div className="save-recording-container">
        <form className="save-recording-form">
          <h3>
            Your recording is ready
            <br/>
            What would you like to do with it?
            <br/>
          </h3>
          <span className="warn">Note: If you close this page, you will lose you recording</span>

          <div className="controls">

            <button
              type="button"
              onClick={() => this.saveLocallyHandler()}>
              Save locally
            </button>
            
            {this.props.url ?
              <input type="text" disabled value={url}/> :
              
              <button
              type="button"
              onClick={() => this.saveS3Handler()}
              disabled={uploading}>
                {uploading ? `${uploadProgress}%` : 'Upload to the cloud'}
              </button>
            }
            
          </div>

          <button
            type="button"
            onClick={() => this.closeHandler()}
            disabled={uploading}>
            Close
          </button>
          
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => ({
  recording: state.recording,
  uploading: state.saveRecording.uploading,
  uploadProgress: state.saveRecording.uploadProgress,
  url: state.saveRecording.url,
  saved: state.saveRecording.saved,
})

const actionsCreator = {
  uploadRecording,
  uploadCancel,
  saveRecordingLocally,
}

export default connect(mapStateToProps, actionsCreator)(SaveRecordingDialog)