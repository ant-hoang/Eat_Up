import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postRecipeThunk } from '../../store/recipe';
import './RecipeForm.css'

function RecipeForm() {
  const dispatch = useDispatch();
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

  const [errors, setErrors] = useState({})

  const updateVideo = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPreviewVideo(reader.result);
    }
    setVideo(file);
    setShowVideo(false);
  };

  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setPreviewImage(reader.result);
    }
    setImage(file);
    setShowImage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      title: title, 
      description: description, 
      origin: origin, 
      directions: directions, 
      video: video, 
      image: image
    }

    const postRecipe = await dispatch(postRecipeThunk(payload))
  }

  return (
    <>
      <h1>Add your new Recipe!</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="new-recipe-title">What's the name of your recipe?
            <input
              className='new-recipe-title'
              id='new-recipe-title'
              type='text'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-recipe-description">Tell us more about your recipe!
            <textarea
              className='new-recipe-description'
              id='new-recipe-description'
              type='text'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-recipe-origin">Where did your recipe originate from?
            <input
              className='new-recipe-origin'
              id='new-recipe-origin'
              type='text'
              placeholder='Origin'
              onChange={(e) => setOrigin(e.target.value)}
              value={origin}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-recipe-directions">Tell us how to make this dish
            <textarea
              className='new-recipe-directions'
              id='new-recipe-directions'
              type='text'
              placeholder='Directions'
              onChange={(e) => setDirections(e.target.value)}
              value={directions}
            />
          </label>
        </div>

        <div>
          {showVideo && (
            <label htmlFor='file-upload-video'> Show us a video of how to make this recipe
              <input
                type='file'
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

        <div>
          {showImage && (
            <label htmlFor='file-upload-video'> Show us an image of what the final dish looks like
              <input
                type='file'
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
        <button className='submit-button'>Create Recipe</button>
      </form>
    </>
  )
}

export default RecipeForm