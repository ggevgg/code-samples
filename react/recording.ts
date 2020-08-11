import {
  RECORDING_ADD_STREAM,
  RECORDING_START,
  RECORDING_STOP,
  RECORDING_REMOVE_STREAM,
  MEDIA_STREAM,
  RESOLVED,
  RECORDING_TIMESTAMP,
  RECORDING_BLOB,
} from '../constants'
import {
  RecordingAddStreamAction,
  RecordingStartRecordingAction,
  RecordingStopRecordingAction,
  RecordingRemoveStreamAction,
  RecordingLocalMediaStream,
  RecordingTimeStampAction,
  RecordingBlobAction,
} from '../actions/RecordingActions'

// @ts-ignore
import { MultiStreamRecorder } from 'recordrtc'

export interface RecordingState {
  recording: boolean
  recorder: MultiStreamRecorder
  streams: MediaStream[]
  timestamp: number
  blob: Blob | null
}

const defaultState: RecordingState = {
  recording: false,
  recorder: null,
  streams: [],
  timestamp: new Date().getTime(),
  blob: null,
}

export default function recording (
  state = defaultState,
  action: RecordingAddStreamAction |
    RecordingStartRecordingAction | 
    RecordingStopRecordingAction |
    RecordingRemoveStreamAction |
    RecordingLocalMediaStream |
    RecordingTimeStampAction |
    RecordingBlobAction,
): RecordingState {

  switch (action.type) {

    case MEDIA_STREAM: 
      if (!state.recording || action.status !== RESOLVED) {
        return state
      }
      if (!state.streams.find(stream => stream.id === action.payload.stream.id)) {
        state.recorder.addStreams([action.payload.stream])
      }
      return {
        ...state,
        streams: [
          ...state.streams,
          action.payload.stream,
        ],
      }

    case RECORDING_ADD_STREAM:
      return {
        ...state,
        streams: [
          ...state.streams,
          action.payload.stream,
        ],
      }

    case RECORDING_REMOVE_STREAM:
      return {
        ...state,
        streams: state.streams.filter(stream => stream.id !== action.payload.streamId),
      }

    case RECORDING_START: {
      return {
        ...state,
        recording: true,
        recorder: action.payload.recorder,
      }
    }

    case RECORDING_STOP:
      return {
        ...state,
        recording: false,
      }

    case RECORDING_TIMESTAMP:
      return {
        ...state,
        timestamp: action.payload.timestamp,
      }

    case RECORDING_BLOB:
      return {
        ...state,
        blob: action.payload.blob,
      }

    default:
      return state
  }
}
