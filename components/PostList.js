import Image from "next/image"
import Link from "next/link"

export default function PostList({ articles, sorting }) {
    const sort = sorting ? sorting : 'new'
    return (
        <div className="flex flex-col items-center">
            {
                articles.map((item) => {
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
        </div>
    )
}