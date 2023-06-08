import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoBahram from '@/public/logo_bahram.png'
import RelatedList from '@/components/RelatedList'


export default function Relates({ result, totalPages }) {
    const [pageIndex, setPageIndex] = useState(1)

    const pages = []

    for (let i = 1; i <= pageIndex; i++) {
        pages.push(<RelatedList page={i} key={i} articleId={result.id} categoryId={result.category.id} />)
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
                                <Image src={result.thumbnail} fill={true} alt={result.title} className='rounded-lg' priority={true} />
                            </div>


                            <div className='relative flex flex-col gap-3 mt-[237.1px] md:mt-0 md:ml-[244.83px]'>
                                <Link href={`/${result.slug}`} replace={false} className='font-bold text-2xl text-[#4A4A4A] md:text-4xl md:leading-[58px] md:tracking-[-0.225px]'>{result.title}</Link>
                                <div className='font-semibold text-base md:text-lg md:leading-[32px]'>{result.summary}</div>
                            </div>
                        </div>
                    </div>
                </section >
            </main>
            <article className='bg-[#F9F9FB] flex flex-col gap-5 md:gap-10'>
                {/* Articles */}
                <div className="flex flex-col items-center gap-5 mt-8 md:gap-10 md:mt-16">
                    {pages}
                </div>
                <div className='flex flex-col items-center mb-10 md:mb-20'>
                    {pageIndex < totalPages && <button
                        className="flex flex-col items-center justify-center w-[140px] h-[50px] md:w-[204px] md:h-[70px] border-2 border-[#FF5480] rounded-full text-lg md:text-2xl text-[#FF5480]"
                        onClick={() => setPageIndex(pageIndex + 1)}>
                        Load More
                    </button>}
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
    const { meta } = await res2.json()
    const { pagination } = meta

    return {
        props: { result: data, totalPages: pagination.totalPages }
    }
}