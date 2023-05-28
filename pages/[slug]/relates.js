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

    const handleMore = async () => {
        const nextPage = more + 1
        setMore((prevPage) => prevPage = nextPage)
        fetch(`https://hsi-sandbox.vercel.app/api/articles?categoryId=${data.category.id}&excludedArticleId=${data.id}&page=${nextPage}`)
            .then((res) => res.json())
            .then(({ meta, data }) => {
                setArticles((prev) => [...prev, ...data])
                setMetadata((last) => last = meta)
            })
    }

    return (
        <div>
            <main className='flex flex-col items-center'>
                <section className='max-w-6xl flex flex-col py-4 md:py-16'>
                    {/* Header */}
                    <nav className='grid grid-cols-1 place-items-center mb-20 md:mb-[140px]'>
                        <Link href={'/'}><Image className="place-self-auto" src={logoBahram}
                            alt="Logo Bahram" width={99} height={29} priority={true} /></Link>
                    </nav>

                    {/* Top */}
                    <div className='flex flex-col gap-4 md:gap-9'>
                        <div className='font-bold text-2xl md:text-4xl leading-[58px] tracking-[-0.225px]'>Related Post List</div>
                        <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
                            <div style={{ backgroundImage: `url(${data.thumbnail})`, backgroundPosition: "top", backgroundSize: "cover", width: "265px", height: "227.1px", borderRadius: "8px", backgroundRepeat: "no-repeat" }} />
                            <div className='flex flex-col gap-3'>
                                <div className='font-bold text-2xl text-[#4A4A4A] md:text-4xl md:leading-[58px] md:tracking-[-0.225px]'>{data.title}</div>
                                <div className='font-semibold text-base md:text-lg md:leading-[32px]'>{data.summary}</div>
                            </div>
                        </div>
                    </div>
                </section >
            </main>
            <article className='bg-[#F9F9FB] flex flex-col gap-10'>
                {/* Articles */}
                <RelatedList articles={articles} />

                {/* Load more articles */}
                <div className='flex flex-col items-center mb-20'>
                    {more < totalPages && <button className="w-[140px] h-[50px] md:w-[204px] md:h-[70px] border-2 border-[#FF5480] rounded-full text-lg md:text-2xl text-[#FF5480]" onClick={handleMore}>Load More</button>}
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
    const { category } = data

    const res2 = await fetch(`https://hsi-sandbox.vercel.app/api/articles?categoryId=${category.id}&excludedArticleId=${data.id}`)
    const repo = await res2.json()

    return {
        props: {
            data: data,
            repo: repo
        }
    }
}