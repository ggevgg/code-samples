import {
  RECORDING_START,
  RECORDING_ADD_STREAM,
  RECORDING_STOP,
  RECORDING_REMOVE_STREAM,
  RECORDING_TIMESTAMP,
  RECORDING_BLOB,
} from '../constants'
import { StreamsState } from '../reducers/streams'
// @ts-ignore
import { MultiStreamRecorder } from 'recordrtc'
import { Dispatch, GetState, ThunkResult } from '../store'
import { recordRTCDefaultOptions } from '../config'

export interface RecordingAddStreamAction {
  type: 'RECORDING_ADD_STREAM'
  payload: Stream
}

export interface Stream {
  userId: string
  stream: MediaStream
}

export interface RecordingStartRecordingAction {
  type: 'RECORDING_START'
  payload: {
    streams: StreamsState
    recorder: MultiStreamRecorder
  }
}

export interface RecordingStopRecordingAction {
  type: 'RECORDING_STOP'
}

export interface RecordingLocalMediaStream {
  type: 'MEDIA_STREAM'
  status: string
  payload: {
    stream: MediaStream
  }
}

export interface RecordingRemoveStreamAction {
  type: 'RECORDING_REMOVE_STREAM'
  payload: {
    streamId: string
  }
}

export interface RecordingBlobAction {
  type: 'RECORDING_BLOB'
  payload: {
    blob: Blob
  }
}

export const addStreamAction = (stream: MediaStream): ThunkResult<void> => {
  return (dispatch: Dispatch, getState: GetState) => {
    const { recorder, recording } = getState().recording
    if (!recording) {
      return
    }
    recorder.addStreams([stream])
    dispatch({
      type: RECORDING_ADD_STREAM,
      payload: {
        stream,
      },
    })
  }
}

export const removeStreamAction = (stream: MediaStream): ThunkResult<void> => {
  return (dispatch: Dispatch, getState: GetState) => {
    const { streams, recorder, recording } = getState().recording
    if (!recording) {
      return
    }
    const _streams = streams.filter(_stream => _stream.id !== stream.id)
    recorder.resetVideoStreams(_streams)
    dispatch({
      type: RECORDING_REMOVE_STREAM,
      payload: {
        streamId: stream.id,
      },
    })
  }
}

export const recordingStartAction = (streams: StreamsState): ThunkResult<void> => {
  return (dispatch: Dispatch) => {
    const combinedStreams = combineStreams(streams)
    const startTime = new Date().getTime()

    const recordRTCOptions = {
      ...recordRTCDefaultOptions,
      onTimeStamp: (timestamp: number) => dispatch({
        type: RECORDING_TIMESTAMP,
        payload: {
          timestamp: normalizeTime(timestamp - startTime),
        },
      }),
    }
    const recorder = new MultiStreamRecorder(combinedStreams, recordRTCOptions)
    recorder.record()

    dispatch({
      type: RECORDING_START,
      payload: {
        streams,
        recorder,
      },
    })
  }
}

export const recordingStopAction = (): ThunkResult<void> => {
  return (dispatch: Dispatch, getState: GetState) => {
    const { recorder, recording } = getState().recording

    if (recording) {
      recorder.stop((blob: string, type: string) => {
        console.log('stop recording', blob, type)
        dispatch({
          type: RECORDING_BLOB,
          payload: {
            blob,
          },
        })
      })
    }

    dispatch({
      type: RECORDING_STOP,
    })
  }
}

export interface RecordingTimeStampAction {
  type: 'RECORDING_TIMESTAMP'
  payload: {
    timestamp: number
  }
}

export const recordingTimeStampAction = (timestamp: number): RecordingTimeStampAction => ({
  type: RECORDING_TIMESTAMP,
  payload: {
    timestamp,
  },
}) 

function combineStreams (streams: StreamsState) {
  return Object.values(streams).reduce((acc, streamInfo) => {
    acc = acc.concat(streamInfo.streams.map(({stream}) => stream))
    return acc
  }, [] as MediaStream[])
}

function normalizeTime (timestamp: number): string {
  const date = new Date(0)
  date.setSeconds(timestamp / 1000)
  return date.toISOString().substr(11, 8)
}