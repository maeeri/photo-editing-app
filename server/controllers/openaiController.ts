const { Configuration, OpenAIApi } = require('openai')
const log = require('../utils/logger')
const fs = require('fs')

interface ImgProps {
  prompt: string
  number: number
  size: 'small' | 'medium' | 'large'
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export const generateImage = async (req, res) => {
  const { prompt, number, size }: ImgProps = req.body

  const imgSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

  try {
    const response = await openai.createImage({
      prompt,
      n: number,
      size: imgSize,
    })

    const imgUrls = response.data.data.map((data) => data.url)

    res.status(200).json({
      success: true,
      data: imgUrls,
    })

    log.info(imgUrls)
  } catch (e) {
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    })
    if (e.response) {
      log.error(e.response.status)
      log.error(e.response.data)
    } else {
      log.error(e.message)
    }
  }
}

export const editImage = async (req, res) => {
  const { img, mask, prompt, size } = req.body
  const imgSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

  try {
    const response = await openai.createImageEdit(
      fs.createReadStream(img),
      fs.createReadStream(mask),
      prompt,
      1,
      imgSize
    )
    const imgUrl = response.data.data[0].url

    res.status(200).json({
      success: true,
      data: imgUrl,
    })

    log.info(imgUrl)
  } catch (e) {
    res.status(400).json({
      success: false,
      error: 'The image could not be edited',
    })
    if (e.response) {
      log.error(e.response.status)
      log.error(e.response.data)
    } else {
      log.error(e.message)
    }
  }
}
