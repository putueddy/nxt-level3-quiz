import { Open_Sans } from 'next/font/google'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import logoBahram from '@/public/logo_bahram.png'
import Button from '@/components/Button'
import PostList from '@/components/PostList'

const openSans = Open_Sans({
    weight: ['400', '600', '700'],
    style: ['normal'],
    subsets: ['latin'],
})

export default function Home({ meta, data }) {
    const [sorting, setSorting] = useState('')
    const [articles, setArticles] = useState(data)
    const [metadata, setMetadata] = useState(meta)
    const { pagination } = metadata
    const { page, totalPages } = pagination
    const [isLoading, setIsLoading] = useState(false)
    const [more, setMore] = useState(page)

    useEffect(() => {
        const queryString = sorting != '' ? `sort=${sorting}` : 'sort=new'
        fetch(`https://hsi-sandbox.vercel.app/api/articles?${queryString}`)
            .then((res) => res.json())
            .then(({ meta, data }) => {
                setArticles(data)
                setMetadata(meta)
            })
    }, [sorting])

    const handleMore = async () => {
        setIsLoading((state) => state = true)
        const nextPage = more + 1
        const queryString = sorting != '' ? `sort=${sorting}` : 'sort=new'
        fetch(`https://hsi-sandbox.vercel.app/api/articles?${queryString}&page=${nextPage}`)
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
        <main className='flex flex-col items-center'>
            <section className={`max-w-7xl flex flex-col p-4 md:p-16 ${openSans.className}`}>
                {/* Navigation links */}
                <nav className='grid grid-cols-8 place-items-center mb-5 md:mb-[100px]'>
                    <div className='w-20 md:w-40 col-start-1 col-end-2 place-self-start order-last md:order-first'>
                        <div className='flex flex-col md:flex-row py-5'>
                            <Button sorting={sorting} title='Popular' setSorting={setSorting} />
                            <Button sorting={sorting} title='New' setSorting={setSorting} />
                        </div>
                    </div>
                    <Image className="col-start-2 col-end-8 place-self-auto" src={logoBahram}
                        alt="Logo Bahram" width={99} height={29} priority={true} />
                </nav>

                {/* Articles */}
                <PostList className="max-w-[972px] flex flex-col" articles={articles} sorting={sorting} />

                {/* Load more articles */}
                <div className='flex flex-col items-center'>
                    {more < totalPages && <button className="w-[140px] h-[50px] md:w-[204px] md:h-[70px] border-2 border-[#FF5480] rounded-full text-lg md:text-2xl text-[#FF5480]" onClick={handleMore}>{isLoading ? "Loading..." : "Load More"}</button>}
                </div>

            </section >
        </main>
    )
}

export async function getServerSideProps(context) {
    const { query } = context
    const { sort } = query
    const queryString = sort ? `sort=${sort}` : 'sort=new'
    const res = await fetch(`https://hsi-sandbox.vercel.app/api/articles?${queryString}`)
    const repo = await res.json()
    const { meta, data } = repo
    return {
        props: {
            meta: meta,
            data: data
        }
    }
}