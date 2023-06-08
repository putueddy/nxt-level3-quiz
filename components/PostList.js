import Image from "next/image"
import Link from "next/link"
import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useArticles(sort, page) {
    const { data, error, isLoading } = useSWR(`https://hsi-sandbox.vercel.app/api/articles?sort=${sort}&page=${page}`, fetcher)

    return {
        repo: data,
        error,
        isLoading
    }
}

export default function PostList({ page }) {

    const router = useRouter()
    const sort = router.query.sort ? router.query.sort : 'new'

    const { repo, error, isLoading } = useArticles(sort, page)

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>

    const { data } = repo

    return data && data.map((item) => {
        const { author, category } = item
        return (
            <div key={item.id} className="max-w-[972px] flex flex-col items-start mb-16 md:mb-[105px]">
                <Image src={item.thumbnail} alt={item.title} width={972} height={607} className="mb-5 rounded-lg" priority={true} />
                <p className="text-sm md:text-base md:tracking-[-0.1px] mb-2">
                    <span className="text-[#9B9B9B]">BY { }</span>
                    {author.firstName.toUpperCase()} {author.middleName.toUpperCase()} {author.lastName.toUpperCase()} { }
                    <span className="text-[#9B9B9B]">IN { }</span>
                    {category.name.toUpperCase()}</p>
                <Link href={`/${item.slug}`}
                    replace={false}
                    className="text-2xl md:text-5xl md:leading-[61px] md:tracking-[-0.3px]">
                    <strong>{item.title}</strong>
                </Link>
            </div>
        )
    })

}