import PokemonDetail from "@/components/PokemonDetail";
import { fetchPokemon } from "@/utils/fetchPokemon";
import { Metadata } from "next";

export type ParamsProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const id = params.id;
  const pokemon = await fetchPokemon(id);

  return {
    title: pokemon.name,
    description: `${pokemon.name}의 상세 정보`,
  };
}

function DetailPage({ params }: ParamsProps) {
  const { id } = params;

  return (
    <div>
      <PokemonDetail id={id} />
    </div>
  );
}

export default DetailPage;
