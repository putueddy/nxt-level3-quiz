import Link from "next/link";
import Image from "next/image";

export default function RelatedList({ articles }) {

    return (
        <div className="flex flex-col items-center gap-5 mt-8 md:gap-10 md:mt-16">
            {
                articles.map((item, index) => {
                    const { author, category } = item
                    return (
                        <div key={item.id} className="max-w-sm md:max-w-6xl flex flex-col md:flex-row rounded-lg" style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.0835598)" }}>
                            <div className="md:w-[584px] py-5 px-4 md:py-10 md:px-14">
                                <div className="font-normal text-sm md:text-2xl md:leading-[58px] md:tracking-[-0.15px]">{zeroPad(index + 1, 2)}</div>
                                <Link href={{
                                    pathname: '/[slug]',
                                    query: { slug: item.slug },
                                }} replace={true} className="h-[129px] font-semibold text-sm md:text-2xl text-[#111210] md:text-[28px] md:leading-[46px] md:tracking-[-0.175px]" >
                                    {item.title}
                                </Link>
                                <div className="font-normal text-sm md:text-base text-[#9B9B9B] md:leading-[32px] md:tracking-[-0.1px]">{item.summary}</div>
                            </div>
                            <div className='relative w-full h-[227.09px] md:w-[636px] md:h-[358px] order-first md:order-last'>
                                <Image src={item.thumbnail} fill={true} alt={item.title} className='rounded-[8px_8px_0px_0px] md:rounded-[0px_8px_8px_0px]' />
                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
}

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}