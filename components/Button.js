import Link from 'next/link'

export default function Button({ sorting, title, setSorting, setMore }) {
    const lowercase = title.toLowerCase()
    const stylesButton = 'w-full h-8 flex items-center justify-center cursor-pointer'

    const handleClick = () => {
        setSorting(lowercase)
        setMore((prev) => prev = 1)
    }

    return (
        <div className={stylesButton} style={sorting === `${lowercase}` ?
            { color: "#FFFFFF", backgroundColor: "#FF5480", borderRadius: "8px" } :
            { color: "#000000", backgroundColor: "#FFFFFF", borderRadius: "8px" }}
            onClick={handleClick}>
            <Link href={`?sort=${lowercase}`} replace={true} ><strong>{title}</strong></Link>
        </div>
    )
}