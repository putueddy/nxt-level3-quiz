import Link from 'next/link'

export default function Button({ sorting, title, setPageIndex }) {
    const autoSelect = sorting ? sorting : 'new'
    const stylesButton = 'w-full h-8 flex items-center justify-center cursor-pointer'
    return (
        <div className={stylesButton} style={autoSelect === title.toLowerCase() ?
            { color: "#FFFFFF", backgroundColor: "#FF5480", borderRadius: "8px" } :
            { color: "#000000", backgroundColor: "#FFFFFF", borderRadius: "8px" }}
            onClick={() => setPageIndex(1)}>
            <Link href={`?sort=${title.toLowerCase()}`} replace={true} ><strong>{title}</strong></Link>
        </div>
    )
}