function RecipeInProgress() {
  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="foodImg" />
      <h1 data-testid="recipe-title">TITULO</h1>
      <button type="button" data-testid="share-btn">COMPARTILHAR</button>
      <button type="button" data-testid="favorite-btn">FAVORITAR</button>
      <p data-testid="recipe-category">TEXTO DA CATEGORIA</p>
      <label htmlFor="ingredient">
        ingredients
        <input type="checkbox" />
      </label>
      <p data-testid="instructions">INSTRUÇÕES</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        FINNISH RECIPE
      </button>
    </div>
  );
}

export default RecipeInProgress;
