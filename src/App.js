import React, { createElement, useEffect, useRef, useState } from 'react'
import './styles/main.scss'
import ml5 from 'ml5'
import { isEmpty } from './functions'
import FoodList from './components/FoodList'
import { RadialChart } from 'react-vis'

let classifier
const myData = [
    { angle: 1 },
    { angle: 5 },
    { angle: 2 },
    { angle: 3 },
    { angle: 4 },
]
const myColor = ['#5BB486', '#45936A', '#366A72', '#254F54', '#EAF8F2']
const chartStyle = {
    margin: '0 auto',
}
function App() {
    const imageRef = useRef()
    // const [shouldClassify, setShouldClassify] = useState(false);
    const [imageFile, setImageFile] = useState()
    const [backgroundImage, setBackgroundImage] = useState()
    const [category, setCatetory] = useState()
    const [menu, setMenu] = useState([])
    const [foodTime, setFoodTime] = useState('전체')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setIsLoading(true)
            }, 1000)
        }
        classifier = ml5.imageClassifier('./my-model/model.json', () => {
            console.log('model loaded!')
        })
        if (backgroundImage && classifier) {
            console.log(imageRef.current)
            console.log(backgroundImage)
            let imageElement = document.createElement('img')
            imageElement.src = backgroundImage
            console.log(imageElement)
            classifier.classify(imageElement, (error, results) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log('test start!')
                console.log(results)
                results.sort((a, b) => (a.confidence < b.confidence ? 1 : -1))
                console.log(results)
                // setBackgroundImage()
                setCatetory(results[0].label)
                // setMenu(menu => menu.concat(JSON.parse(menu.data)));
                // setMenu({ ...menu, label: results[0].label })
            })
        }
        console.log(menu)
    }, [backgroundImage])

    return (
        <React.Fragment>
            {!isLoading ? (
                <div
                    style={{
                        width: '100%',
                        height: '100vh',
                        backgroundColor: '#5BB486',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <img
                        src="/splash.png"
                        style={{
                            width: '30%',
                            maxWidth: '200px',
                        }}
                    />
                </div>
            ) : (
                <>
                    {/* <div
                        style={{
                            height: '20px',
                            textAlign: 'center',
                            backgroundColor: '#5BB486',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    ></div> */}
                    <div className="food-time-wrap">
                        <div
                            className={`food-time-btn${
                                foodTime === '전체' ? '-clicked' : ''
                            }`}
                            onClick={() => {
                                if (foodTime === '전체') setFoodTime('전체')
                                else setFoodTime('전체')
                            }}
                        >
                            <span>전체</span>
                        </div>
                        <div
                            className={`food-time-btn${
                                foodTime === '아침' ? '-clicked' : ''
                            }`}
                            onClick={() => {
                                if (foodTime === '아침') setFoodTime('전체')
                                else setFoodTime('아침')
                            }}
                        >
                            <span>아침</span>
                        </div>
                        <div
                            className={`food-time-btn${
                                foodTime === '점심' ? '-clicked' : ''
                            }`}
                            onClick={() => {
                                if (foodTime === '점심') setFoodTime('전체')
                                else setFoodTime('점심')
                            }}
                        >
                            <span>점심</span>
                        </div>
                        <div
                            className={`food-time-btn${
                                foodTime === '저녁' ? '-clicked' : ''
                            }`}
                            onClick={() => {
                                if (foodTime === '저녁') setFoodTime('전체')
                                else setFoodTime('저녁')
                            }}
                        >
                            <span>저녁</span>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '20px',
                            marginTop: '40px',
                            fontWeight: 'bold',
                        }}
                    >
                        <span>9월 27일 (수)</span>
                    </div>
                    {/* <div style={{ width: '100%', padding: '0 10px 0 10px' }}> */}
                    <RadialChart
                        // style={{ margin: '0 auto', width: '300px', height: '300px' }}
                        data={myData}
                        className="food-chart"
                        width={230}
                        height={230}
                        colorRange={myColor}
                    />

                    <FoodList />
                    <input
                        accept="image/*"
                        // className={classes.input}
                        style={{
                            display: 'none',
                        }}
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                            var file = e.target.files[0]
                            setImageFile(file)
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onloadend = () => {
                                setBackgroundImage([reader.result])
                                console.log(reader.result)
                            }
                        }}
                    />
                    {isEmpty(backgroundImage) && (
                        <label
                            // className={classes.photoArea}
                            htmlFor="contained-button-file"
                            className="plus-wrap"
                        >
                            <img className="plus" src="/plus.png" />
                        </label>
                    )}
                    {!isEmpty(backgroundImage) && (
                        <>
                            <img
                                src={backgroundImage}
                                style={{
                                    width: '300px',
                                    margin: '0 auto',
                                }}
                                alt="이미지"
                                ref={imageRef}
                            />
                        </>
                    )}

                    {/* {!isEmpty(menu) && (
                <div>
                    {menu.map((data, i) => {
                        return (
                            <div key={i}>
                                <span>data.label</span>
                            </div>
                        )
                    })}
                </div>
            )} */}
                    {!isEmpty(category) && (
                        <div
                            style={{
                                fontSize: '40px',
                            }}
                        >
                            <div>{category}</div>
                            <>500kcal</>
                        </div>
                    )}
                </>
            )}
        </React.Fragment>
    )
}

export default App
