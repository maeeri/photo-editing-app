const { Configuration, OpenAIApi } = require('openai')

interface ImgProps {
  prompt: string
  number: number
  size: 'small' | 'medium' | 'large'
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const generateImage = async (req, res) => {
  const { prompt, number, size }: ImgProps = req.body

  console.log(req.body)

  const imgSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

  try {
    const response = await openai.createImage({ prompt, n: number, size: imgSize })

    console.log(response)

    const imgUrls = response.data.data.map((data) => data.url)

    res.status(200).json({
      success: true,
      data: imgUrls,
    })
    console.log(imgUrls)
  } catch (e) {
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    })
    if (e.response) {
      console.log(e.response.status)
      console.log(e.response.data)
    } else {
      console.log(e.message)
    }
  }
}

module.exports = { generateImage }
