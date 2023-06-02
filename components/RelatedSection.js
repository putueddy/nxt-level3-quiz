import useSWR from 'swr';
import Image from 'next/image';
import Link from "next/link"
import { useRouter } from 'next/router';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function RelatedSection({ category, id }) {
    const { data, error } = useSWR(`https://hsi-sandbox.vercel.app/api/articles?perPage=2&categoryId=${category}&excludedArticleId=${id}`, fetcher)

    const router = useRouter()

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        data.data.length != 0 && <div className='flex flex-col'>
            {/* Title */}
            <div className='flex justify-between mb-7 md:mb-14'>
                <div className='font-semibold text-[#111210] text-xl md:text-4xl md:leading-[58px] md:tracking-[-0.225px]'>You might also like</div>
                <div className='font-normal text-[#9B9B9B] md:leading-[58px] md:tracking-[-0.1px]'>
                    <Link href={{
                        pathname: '/[slug]/relates',
                        query: { slug: router.query.slug },
                    }} replace={true}>More</Link>
                </div>
            </div>
            {/* Related articles */}
            <div className='flex flex-col gap-4 md:flex-row md:gap-7'>
                {
                    data.data.map((item) => {
                        const { author, category } = item
                        return (
                            <div key={item.id} className='w-[380px] md:w-[573px] flex flex-col'>
                                <div className='flex flex-col'>
                                    <Image src={item.thumbnail} alt={item.title} width={544} height={306} className="md:h-[311px] mb-2 md:mb-5 rounded-lg" loading='lazy' />
                                    <p className="text-sm md:text-base md:tracking-[-0.1px] mb-2 md:mb-5">
                                        <span className="text-[#9B9B9B]">BY { }</span>
                                        {author.firstName.toUpperCase()} {author.middleName.toUpperCase()} {author.lastName.toUpperCase()} { }
                                        <span className="text-[#9B9B9B]">IN { }</span> {category.name.toUpperCase()}
                                    </p>
                                    <Link href={{
                                        pathname: '/[slug]',
                                        query: { slug: item.slug },
                                    }} replace={false} className='md:h-[138px] font-semibold text-[#111210] text-lg md:text-4xl md:leading-[46px] md:tracking-[-0.175px]'>{item.title}</Link>
                                </div>
                                <div className='flex font-normal text-[#9B9B9B] md:leading-[32px] md:tracking-[-0.1px]'>{item.summary}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}