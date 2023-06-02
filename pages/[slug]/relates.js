import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoBahram from '@/public/logo_bahram.png'
import RelatedList from '@/components/RelatedList'


export default function Relates({ data, repo }) {
    const [articles, setArticles] = useState(repo.data)
    const [metadata, setMetadata] = useState(repo.meta)
    const { pagination } = metadata
    const { page, totalPages } = pagination
    const [more, setMore] = useState(page)
    const [isLoading, setIsLoading] = useState(false)

    const handleMore = async () => {
        setIsLoading((state) => state = true)
        const nextPage = more + 1
        fetch(`https://hsi-sandbox.vercel.app/api/articles?categoryId=${data.category.id}&excludedArticleId=${data.id}&page=${nextPage}`)
            .then((res) => res.json())
            .then(({ meta, data }) => {
                setArticles((prev) => [...prev, ...data])
                setMetadata((last) => last = meta)
                setMore((prevPage) => prevPage = nextPage)
            }).finally(() => {
                setIsLoading((state) => state = false)
            })
    }

    return (
        <div>
            <main className='flex flex-col items-center px-4 mb-8 md:mb-16'>
                <section className='max-w-6xl flex flex-col py-4 md:py-16'>
                    {/* Header */}
                    <nav className='w-full grid grid-cols-1 place-items-center mb-20 md:mb-[140px]'>
                        <Link href={'/'}><Image src={logoBahram} alt="Logo Bahram" width={99} height={29} priority={true} /></Link>
                    </nav>

                    {/* Top */}
                    <div className='flex flex-col gap-4 md:gap-9'>
                        <div className='font-bold text-2xl md:text-4xl leading-[58px] tracking-[-0.225px]'>Related Post List</div>
                        <div className='flex flex-col md:flex-row'>
                            <div className='absolute w-[92%] md:w-[196.83px] h-[227.1px]'>
                                <Image src={data.thumbnail} fill={true} alt={data.title} className='rounded-lg' />
                            </div>


                            <div className='relative flex flex-col gap-3 mt-[237.1px] md:mt-0 md:ml-[244.83px]'>
                                <Link href={{
                                    pathname: '/[slug]',
                                    query: { slug: data.slug },
                                }} replace={false} className='font-bold text-2xl text-[#4A4A4A] md:text-4xl md:leading-[58px] md:tracking-[-0.225px]'>{data.title}</Link>
                                <div className='font-semibold text-base md:text-lg md:leading-[32px]'>{data.summary}</div>
                            </div>
                        </div>
                    </div>
                </section >
            </main>
            <article className='bg-[#F9F9FB] flex flex-col gap-5 md:gap-10'>
                {/* Articles */}
                <RelatedList articles={articles} />

                {/* Load more articles */}
                <div className='flex flex-col items-center mb-10 md:mb-20'>
                    {more < totalPages && <button className="w-[140px] h-[50px] md:w-[204px] md:h-[70px] border-2 border-[#FF5480] rounded-full text-lg md:text-2xl text-[#FF5480]" onClick={handleMore}>{isLoading ? "Loading..." : "Load More"}</button>}
                </div>
            </article>
        </div >
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const { slug } = params

    const res1 = await fetch(`https://hsi-sandbox.vercel.app/api/articles/${slug}`)
    const { data } = await res1.json()

    const res2 = await fetch(`https://hsi-sandbox.vercel.app/api/articles?categoryId=${data.category.id}&excludedArticleId=${data.id}`)
    const repo = await res2.json()

    return {
        props: {
            data: data,
            repo: repo
        }
    }
}