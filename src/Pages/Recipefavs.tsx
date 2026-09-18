import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavs } from '../Slices/recipefavs.slice'

type FavoriteRecipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
};

const Recipefavs = () => {
    const favs = useSelector((state: any) => state.favs.favs as FavoriteRecipe[]);
    const dispatch = useDispatch();

  return (
    <main className="favorites_page">
      <section className="favorites_heading">
        <div>
          <span className="eyebrow">Your personal cookbook</span>
          <h1>My <em>Favorites</em></h1>
          <p>All the recipes you love, saved in one delicious place.</p>
        </div>
        <div className="favorites_heading_art" aria-hidden="true">♥</div>
      </section>

      <section className="favorites_content">
        <div className="favorites_section_title">
          <div>
            <h2>Saved recipes</h2>
            <span>{favs.length} {favs.length === 1 ? 'recipe' : 'recipes'} saved</span>
          </div>
        </div>

        {favs.length > 0 ? (
          <div className="recipe_grid favorites_grid">
            {favs.map((item, index) => (
              <article
                className="recipe_card favorite_card"
                key={item.id}
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <div className="recipe_image_wrap">
                  <img src={item.image} alt={item.name} className="recipe_image" />
                  <button
                    className="remove_favorite_button"
                    onClick={() => dispatch(removeFavs(item.id))}
                    aria-label={`Remove ${item.name} from favorites`}
                  >
                    <span aria-hidden="true">♥</span> Remove
                  </button>
                  <span className="difficulty_badge">{item.difficulty}</span>
                </div>
                <div className="recipe_card_body">
                  <div className="recipe_meta">
                    <span>{item.cuisine}</span>
                    <span className="rating">★ {item.rating.toFixed(1)}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <div className="recipe_details">
                    <span>◷ {item.prepTimeMinutes + item.cookTimeMinutes} min</span>
                    <span>♧ {item.servings} servings</span>
                  </div>
                  <button className="view_recipe_button">View recipe <span>→</span></button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty_state favorites_empty_state">
            <div className="favorites_empty_icon">♡</div>
            <h3>Your favorite recipes will appear here</h3>
            <p>Tap the heart on any recipe to save it for later.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Recipefavs
