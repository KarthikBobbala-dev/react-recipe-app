import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipe } from '../Slices/recipe.slice';
import { addFavs, removeFavs } from '../Slices/recipefavs.slice';
import { toast } from 'react-toastify';

type Recipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  rating: number;
  mealType?: string[];
  tags?: string[];
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All recipes');
  const { recipes, loading, error } = useSelector((state: any) => state.recipes);
  const { favs } = useSelector(
  (state: any) => state.favs
);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipe() as any);
  }, [dispatch]);

  //favorites
  const handleStoreFavs = (value:any) =>{
      const alreadyFavorite = favs.some(
    (item: any) => item.id === value.id
  );

  if (alreadyFavorite) {
    dispatch(removeFavs(value.id));
      toast("Unfavorited! Maybe we'll meet again 😋");
  } else {
    dispatch(addFavs(value));
    toast("Great taste! Recipe saved to your favorites 👨‍🍳")

  }
  }
  const categories = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
  const filteredRecipes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return (recipes as Recipe[]).filter((item) => {
      const searchableText = [item.name, item.cuisine, ...(item.tags ?? []), ...(item.mealType ?? [])]
        .join(' ')
        .toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesCategory =
        activeCategory === 'All recipes' ||
        (item.mealType ?? []).some((meal) => meal.toLowerCase() === activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, recipes, searchTerm]);

  if (loading) {
    return (
      <main className="recipes_page">
        <section className="recipes_hero skeleton_hero" aria-label="Loading recipes">
          <div className="skeleton skeleton_title" />
          <div className="skeleton skeleton_copy" />
        </section>
        <div className="recipe_grid loading_grid">
          {Array.from({ length: 6 }).map((_, index) => <div className="recipe_card skeleton_card" key={index} />)}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="recipes_page centered_state">
        <div className="state_icon">🥄</div>
        <h2>We couldn’t fetch the recipes</h2>
        <p>Something went wrong while setting the table. Please try again.</p>
        <button className="primary_button" onClick={() => dispatch(fetchRecipe() as any)}>Try again</button>
      </main>
    );
  }

  return (
    <main className="recipes_page">
      {/* <section className="recipes_hero">
        <div className="hero_content">
          <span className="eyebrow">A little inspiration for every day</span>
          <h1>Good food starts<br /><em>with a good idea.</em></h1>
          <p>Explore hand-picked recipes made for busy mornings, slow Sundays, and everything in between.</p>
          <div className="hero_metrics">
            <span><strong>100+</strong> recipes</span>
            <span><strong>15 min</strong> quick picks</span>
            <span><strong>4.8</strong> average rating</span>
          </div>
        </div>
        <div className="hero_art" aria-hidden="true">
          <div className="hero_blob" />
          <span className="hero_emoji hero_emoji_main">🥗</span>
          <span className="hero_emoji hero_emoji_small">🍋</span>
          <span className="hero_sparkle">✦</span>
        </div>
      </section> */}

      <section className="recipe_section">
        <div className="section_heading">
          <div>
            <span className="eyebrow">Find your next favorite</span>
            <h2>Browse recipes</h2>
          </div>
          <label className="recipe_search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search recipes, cuisines..."
              aria-label="Search recipes"
            />
          </label>
        </div>

        <div className="category_row" role="tablist" aria-label="Recipe categories">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? 'category_button active' : 'category_button'}
              key={category}
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="recipe_grid">
            {filteredRecipes.map((item, index) => (
              <article className="recipe_card" key={item.id} style={{ '--card-index': index } as React.CSSProperties}>
                <div className="recipe_image_wrap">
                  <img src={item.image} alt={item.name} className="recipe_image" />
                  <button className="save_button" aria-label={`Save ${item.name}`}
                   onClick={()=>handleStoreFavs(item)}>
                     {favs.some((fav: Recipe) => fav.id === item.id)
    ? "♥"
    : "♡"}
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
          <div className="empty_state">
            <div className="state_icon">🍽️</div>
            <h3>No recipes found</h3>
            <p>Try another search or explore all of our delicious recipes.</p>
            <button className="text_button" onClick={() => { setSearchTerm(''); setActiveCategory('All recipes'); }}>Show all recipes</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Recipes
