import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';
import RecipeForm from './components/RecipeForm/RecipeForm';
import DeleteRecipeModal from './components/DeleteRecipeModal';
import UpdateRecipeForm from './components/UpdateRecipeForm';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/recipes/:recipeId',
        element: <RecipeDetails />
      },
      {
        path: '/recipes/new',
        element: <RecipeForm />
      },
      {
        path: 'recipes/:recipeId/delete',
        element: <DeleteRecipeModal />
      },
      {
        path: 'recipes/:recipeId/update',
        element: <UpdateRecipeForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;