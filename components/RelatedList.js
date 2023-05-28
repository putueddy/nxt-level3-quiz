import Link from "next/link";

export default function RelatedList({ articles }) {

    return (
        <div className="flex flex-col items-center gap-5 md:gap-10 md:mt-16">
            {
                articles.map((item, index) => {
                    const { author, category } = item
                    return (
                        <div key={item.id} className="max-w-[1168px] flex flex-col md:flex-row rounded-lg" style={{ boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.0835598)" }}>
                            <div className="md:w-[584px]  py-10 px-14">
                                <div className="font-normal text-base md:text-2xl md:leading-[58px] md:tracking-[-0.15px]">{zeroPad(index + 1, 2)}</div>
                                <Link href={{
                                    pathname: '/[slug]',
                                    query: { slug: item.slug },
                                }} replace={true} className="h-[129px] font-semibold text-2xl text-[#111210] md:text-[28px] md:leading-[46px] md:tracking-[-0.175px]" >
                                    {item.title}
                                </Link>
                                <div className="text-base text-[#9B9B9B] md:leading-[32px] md:tracking-[-0.1px]">{item.summary}</div>
                            </div>
                            <div style={{ backgroundImage: `url(${item.thumbnail})`, backgroundPosition: "top", backgroundSize: "cover", width: "636px", height: "358px", borderRadius: "0px 8px 8px 0px", backgroundRepeat: "no-repeat" }} />
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