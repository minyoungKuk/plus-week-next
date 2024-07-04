"use client";

import { Fragment, useCallback, useEffect, useRef } from "react";
import PokemonCard from "../PokemonCard";
import Spinner from "../Spinner";
import { usePokemonInfiniteQuery } from "./hooks/usePokemonInfiniteQuery";

function PokemonList() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonInfiniteQuery();

  const observerElem = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [handleObserver]);

  if (isLoading) return <Spinner />;
  if (isError) return <div> error.. </div>;

  return (
    <div className="px-12 py-20">
      <h1 className="text-lg text-center pb-20"> 포켓몬 리스트 </h1>
      <div className="max-w-[1024px] mx-auto">
        <ol className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </Fragment>
          ))}
        </ol>
        {isFetchingNextPage && <Spinner />}
        <div ref={observerElem} className="h-1"></div>
      </div>
    </div>
  );
}

export default PokemonList;
