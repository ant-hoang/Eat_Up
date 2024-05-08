import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postRecipeThunk } from '../../store/recipe';
import './RecipeForm.css'

function RecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [origin, setOrigin] = useState('')
  const [directions, setDirections] = useState('')
  const [video, setVideo] = useState('')
  const [showVideo, setShowVideo] = useState(true)
  const [previewVideo, setPreviewVideo] = useState('')

  const [image, setImage] = useState('')
  const [showImage, setShowImage] = useState(true)
  const [previewImage, setPreviewImage] = useState('')

  const [errors, setErrors] = useState([])

  const updateVideo = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewVideo(reader.result);
    }
    setVideo(file);
    setShowVideo(false);
  };

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    }
    setImage(file);
    setShowImage(false);
  };

  const checkErrors = (title, description, origin, directions) => {
    const errorList = []
    if (!title) errorList.push('Title is required')
    if (title.length > 50) errorList.push('Number of Title characters too long')
    if (!description) errorList.push('Description is required')
    if (title.length > 50) errorList.push('Number of Description characters too long')
    if (!origin) errorList.push('Origin is required')
    if (title.length > 50) errorList.push('Number of Origin characters too long')
    if (!directions) errorList.push('Directions is required')

    return errorList
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors([])
    const errorList = checkErrors(title, description, origin, directions)
    setErrors(errorList)
    if (errorList.length) return

    const payload = {
      title: title,
      description: description,
      origin: origin,
      directions: directions,
      video: video,
      image: image
    }

    return await dispatch(postRecipeThunk(payload))
      .then(() => {
        navigate('/')
      })
      .catch((data) => {
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
  }

  return (
    <>
      <h1 className='recipe-form-header'>Add your new Recipe!</h1>
      {errors.length > 0 ? errors.map((error) => {
        return (
          <>
            <ul className='error' id='recipe-form-error'>
              <li>{error}</li>
            </ul>
          </>
        )
      }) : ''}

      <form className='recipe-form' onSubmit={handleSubmit}>
        <div className='new-recipe-container'>
          <label htmlFor="new-recipe-title">What is the name of your recipe?
            <input
              className='new-recipe-input'
              id='new-recipe-title'
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
        </div>

        <div className='new-recipe-container'>
          <label htmlFor="new-recipe-description">Tell us more about your recipe!
            <textarea
              className='new-recipe-input'
              id='new-recipe-description'
              type='text'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
        </div>

        <div className='new-recipe-container'>
          <label htmlFor="new-recipe-origin">Where did your recipe originate from?
            <input
              className='new-recipe-input'
              id='new-recipe-origin'
              type='text'
              placeholder='Origin'
              onChange={(e) => setOrigin(e.target.value)}
              value={origin}
            />
          </label>
        </div>

        <div className='new-recipe-container'>
          <label htmlFor="new-recipe-directions">Tell us how to make this dish
            <textarea
              className='new-recipe-input'
              id='new-recipe-directions'
              type='text'
              placeholder='Directions'
              onChange={(e) => setDirections(e.target.value)}
              value={directions}
            />
          </label>
        </div>

        <div className='new-recipe-container'>
          {showVideo && (
            <label htmlFor='file-upload-video'> Show us a video of how to make this recipe
              <input
                type='file'
                className='new-recipe-input'
                id='file-upload-video'
                name="video_url"
                onChange={updateVideo}
                accept='video/*'
              />
            </label>
          )}
          {!showVideo && (
            <div>
              <video
                src={previewVideo} width="500" height="200"
                alt='preview-video'
                controls
              />
            </div>
          )}
        </div>

        <div className='new-recipe-container'>
          {showImage && (
            <label htmlFor='file-upload-video'> Show us an image of what the final dish looks like
              <input
                type='file'
                className='new-recipe-input'
                id='file-upload-video'
                name="img_url"
                onChange={updateImage}
                accept='image/*'
              />
            </label>
          )}
          {!showImage && (
            <div>
              <img
                src={previewImage} width="500" height="200"
                alt='preview-image'
              />
            </div>
          )}
        </div>
        <div className='new-recipe-container'>
          <button className='submit-button' id='new-recipe-button'>Create Recipe</button>
        </div>
      </form>
    </>
  )
}

export default RecipeForm