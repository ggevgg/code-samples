import { Request, Response } from 'express'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'
import {
  accessKeyId,
  secretAccessKey,
  region,
  bucket,
} from '../config'

import _debug from 'debug'
const debug = _debug('peercalls:aws')

const signatureVersion = 'v4'
const useAccelerateEndpoint = false
const s3ForcePathStyle = false
const Expires = 60 * 5
const bucketEndpoint = `https://${bucket}.s3.${region}.amazonaws.com`

debug('init params', {
  accessKeyId,
  secretAccessKey,
  region,
  bucket,
  signatureVersion,
  useAccelerateEndpoint,
  s3ForcePathStyle,
  Expires,
  bucketEndpoint,
})

const AWSConfig = {
  region,
  signatureVersion,
  useAccelerateEndpoint,
}

if (accessKeyId && secretAccessKey) {
  Object.assign(AWSConfig, {
    accessKeyId,
    secretAccessKey
  })
}
  
AWS.config.update(AWSConfig)

const options = {
  signatureVersion,
  region,
  endpoint: new AWS.Endpoint(bucketEndpoint),
  useAccelerateEndpoint,
  s3ForcePathStyle,
}

class AWSController {

  static generatePresignedFormUpload = async (req: Request, res: Response) => {

    const key = v4() + '.webm'

    debug('generatePresignedFormUpload options', options)
  
    const client = new AWS.S3(options)

    const params = {
      Bucket: bucket,
      Key: key,
      Fields: {
        Key: key,
      },
      Expires,
    }

    debug('generatePresignedFormUpload params', params)
  
    try {
      const form: AWS.S3.PresignedPost = await (new Promise((resolve, reject) =>
        client.createPresignedPost(params, (err, data) => 
          err ? reject(err) : resolve(data),
        ),
      ))
      const response = {
        form: {
          ...form,
          url: options.endpoint,
        },
        uuid: key,
      }
      debug('generatePresignedFormUpload response', params)
      return res.json(response)
    } catch(e) {
      debug('generatePresignedFormUpload error', e)
      return res.send(e)
    }
  }

  static generatePresignedUrlUpload = async (req: Request, res: Response) => {
    const command = String(req.query.command) || 'putObject'
    const key = String(req.query.key) || v4() + '.webm'

    const bucketEndpoint = `https://s3.${region}.amazonaws.com`
    const endpoint = new AWS.Endpoint(bucketEndpoint)

    const options = {
      signatureVersion,
      region,
      endpoint,
      useAccelerateEndpoint,
      s3ForcePathStyle,
    }

    const s3 = new AWS.S3(options)

    const params = {
      Bucket: bucket,
      Key: key,
      Expires,
    }

    const url = s3.getSignedUrl(command, params)

    debug('generatePresignedUrlUpload url', url)
  
    res.send({
      url,
      uuid: key,
    })
  }

  static play = async (req: Request, res: Response) => {
    const { key } = req.query

    const bucketEndpoint = `https://s3.${region}.amazonaws.com`

    const options = {
      signatureVersion,
      region,
      endpoint: new AWS.Endpoint(bucketEndpoint) as unknown as string,
      useAccelerateEndpoint,
      s3ForcePathStyle,
    }

    const s3 = new AWS.S3(options)

    const params = {
      Bucket: bucket,
      Key: key,
      Expires,
    }

    const url = s3.getSignedUrl('getObject', params)

    debug('generatePresignedUrlUpload url', url)
  
    res.send(url)
  }

}

export default AWSController