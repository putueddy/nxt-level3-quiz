import Link from 'next/link'

export default function Button({ sorting, title, setSorting }) {
    const lowercase = title.toLowerCase()
    const stylesButton = 'w-full h-8 flex items-center justify-center cursor-pointer'
    return (
        <div className={stylesButton} style={sorting === `${lowercase}` ?
            { color: "#FFFFFF", backgroundColor: "#FF5480", borderRadius: "8px" } :
            { color: "#000000", backgroundColor: "#FFFFFF", borderRadius: "8px" }}
            onClick={() => { setSorting(lowercase) }}>
            <Link href={`?sort=${lowercase}`} replace={true} ><strong>{title}</strong></Link>
        </div>
    )
}