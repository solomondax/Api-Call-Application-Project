
import React, { useEffect, useState } from 'react'
import './index.css'
const ApiCall = () => {
    const [searchElement, setSearchElement] = useState(" ")
    const [loader, setLoader] = useState(false)
    const [isError, setIsError] = useState({ status: false, msg: "" })
    const [data, setData] = useState([])

    const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    const dataFetching = async (url) => {
        setIsError({ status: false, msg: "" })
        setLoader(true)

        try {
            const fetchData = await fetch(url)
            console.log(fetchData)
            const { drinks } = await fetchData.json()
            setData(drinks)
            setLoader(false)
            setIsError({ status: false, msg: "" })

            if (!drinks) {
                throw new Error("dataNotFound")
            }
        } catch (error) {
            console.log(error.message)
            setLoader(false)
            setIsError({ status: true, msg: error.message || "somthing went wrong..!" })
        }
    }

    useEffect(() => {
        const newData = `${url}${searchElement}`
        dataFetching(newData)
    }, [searchElement])




    return (
        < div className='main' >
            <h1 className='head'>Apicalls &Datafetching </h1>
            <input type="search"
                name="searchElement"
                onChange={(e) => setSearchElement(e.target.value)}
            />

            {loader && !isError?.status && <h2>Loading....</h2>}
            {isError.status && <p style={{ color: "red", fontSize: "25px", fontWeight: "bold" }}>{isError.msg}</p>}
            {!isError?.status && !loader && (<ul className='dax'>
                {data.map((each) =>
                    <li key={each.idDrink}>
                        <div>
                            <img src={each.strDrinkThumb} alt="dax" className="img-tag" />
                        </div>
                        <div>
                            <p className='para'>{each.strCategory}</p>
                        </div>
                    </li>

                )}
            </ul>)}

        </div>
    )
}

export default ApiCall




















