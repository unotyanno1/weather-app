import React, { useState } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Results from './components/Results';
import Loading from './components/Loading';

type ResultsState = {
    country: string
    cityName: string
    temperature: string
    conditionText: string
    icon: string
}

const App = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [city, setCity] = useState<string>("")
    const [results, setResults] = useState<ResultsState>({
        country: "",
        cityName: "",
        temperature: "",
        conditionText: "",
        icon: "",
    })

    const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        fetch(`https://api.weatherapi.com/v1/current.json?key=6507a18b8e25444381a130413250703 &q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                setResults({
                    country: data.location.country,
                    cityName: data.location.name,
                    temperature: data.current.temp_c,
                    conditionText: data.current.condition.text,
                    icon: data.current.condition.icon,
                })
                setLoading(false)
                setCity("")
            })
            .catch(() => alert("エラーが発生しました。ページをリロードしてもう一度入力してください"))
    }

    return (
        <div className="wrapper">
            <div className="container">
                <Title />
                <Form getWeather={getWeather} 
                    setCity={setCity} 
                    city={city}
                />
                {loading ? <Loading/> : <Results results={results}/>}
            </div>
        </div>
    )
}

export default App;