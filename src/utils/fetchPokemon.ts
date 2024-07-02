export async function fetchPokemon(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error(`${id}번째 포켓몬 패치 실패`);
  }

  return response.json();
}
