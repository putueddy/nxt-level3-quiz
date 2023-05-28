import Image from 'next/image'
import logoBahram from '@/public/logo_bahram.png'
import RelatedSection from '@/components/RelatedSection'
import Link from 'next/link'

export default function Page({ repo }) {
    return (
        <div>
            <main className='flex flex-col items-center'>
                <section className='max-w-6xl flex flex-col p-4 md:p-16'>
                    {/* Header */}
                    <nav className='grid grid-cols-1 place-items-center mb-20 md:mb-[140px]'>
                        <Link href={'/'}><Image className="place-self-auto" src={logoBahram}
                            alt="Logo Bahram" width={99} height={29} priority={true} /></Link>
                    </nav>

                    {/* Top */}
                    <div className='flex flex-col gap-4 md:gap-7'>
                        <div className='font-bold text-xl text-[#4A4A4A] md:text-4xl md:leading-[58px] md:tracking-[-0.225px]' >{repo.data.title}</div>
                        <div className='font-semibold text-base md:text-lg md:leading-8 md:tracking-[-0.1125px]' >{repo.data.summary}</div>
                        <div className="text-sm md:text-base md:tracking-[-0.1px]">
                            <span className="text-[#9B9B9B]">BY</span> { }
                            {repo.data.author.firstName.toUpperCase()} {repo.data.author.middleName.toUpperCase()} {repo.data.author.lastName.toUpperCase()} { }
                            <span className="text-[#9B9B9B]">IN</span> { }
                            {repo.data.category.name.toUpperCase()}
                        </div>
                    </div>
                </section >
            </main>
            <article className='bg-[#F9F9FB] flex flex-col items-center'>
                {/* First picture and text */}
                <section className='max-w-6xl flex flex-col p-4 mb-5 md:p-16 md:mb-6'>
                    <div className='flex flex-col gap-14 md:gap-7'>
                        <Image src={repo.data.thumbnail} alt={repo.data.title} width={1088} height={612} className="mb-5 rounded-lg" priority={true} />
                    </div>
                    <div className='text-base text-[#4A4A4A] md:text-lg md:leading-8 md:tracking-[-0.1125px]'>{repo.data.content}</div>
                </section>
                {/* Related articles */}
                <section className='max-w-6xl flex flex-col px-4 mb-4 md:px-16 md:mb-16'>
                    <RelatedSection category={repo.data.category.id} id={repo.data.id} />
                </section>
            </article>
        </div>
    )
}

export const getStaticPaths = async () => {
    const res = await fetch(`https://hsi-sandbox.vercel.app/api/articles?perPage=12`)
    const repo = await res.json()
    const paths = repo.data.map((article) => {
        return {
            params: {
                slug: `${article.slug}`
            }
        }
    })

    return {
        paths: paths,
        fallback: false,
    }
}

export const getStaticProps = async (context) => {
    const { params } = context
    const { slug } = params
    const res = await fetch(`https://hsi-sandbox.vercel.app/api/articles/${slug}`)
    const repo = await res.json()
    return { props: { repo } }
};