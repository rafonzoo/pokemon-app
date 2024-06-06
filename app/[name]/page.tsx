import { getPokemonByName } from '@/tools/api'
import { notFound, redirect } from 'next/navigation'
import { setPokeName } from '@/tools/helpers'
import PageTitle from '@/components/PageTitle'
import PokemonDetail from '@/app/[name]/_partials/PokemonDetail'
import CatchPokeButton from '@/app/[name]/_partials/CatchPokeButton'

type PokemonDetailPageProps = {
  params: {
    name: string
    id: string
  }
}

const DynamicPage = async (props: PokemonDetailPageProps) => {
  const { name } = props.params
  const pokemon = await getPokemonByName(name)

  if (!pokemon) {
    redirect(notFound())
  }

  return (
    <div className='flex h-[calc(100vh_-_56px)] min-h-[568px] flex-col'>
      <div className='mb-auto before:table'>
        <header className='mt-8'>
          <figure className='mx-auto mb-3 max-w-[96px] overflow-hidden rounded-3xl bg-zinc-100'>
            {pokemon.sprites.front_default && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                width={96}
                height={96}
                src={pokemon.sprites.front_default}
                alt='Pokemon avatar'
              />
            )}
          </figure>
          <PageTitle>{setPokeName(pokemon.name)}</PageTitle>
        </header>
        <PokemonDetail {...pokemon} />
      </div>
      <div
        className='fixed bottom-0 left-0 right-0 bg-white/30 pb-6 pt-3'
        style={{ WebkitBackdropFilter: 'blur(12px)' }}
      >
        <CatchPokeButton
          name={pokemon.name}
          imageUrl={pokemon.sprites.front_default}
        />
      </div>
    </div>
  )
}

export default DynamicPage
