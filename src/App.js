import React, { createElement, useEffect, useRef, useState } from 'react'
import './styles/main.scss'
import ml5 from 'ml5'
import { isEmpty } from './functions'
import FoodList from './components/FoodList'
import { RadialChart } from 'react-vis'
import Header from './components/Header'

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
    // const imageRef = useRef()
    // const [shouldClassify, setShouldClassify] = useState(false);
    const foodList = JSON.parse(localStorage.getItem('foodList')) || []
    const [imageFile, setImageFile] = useState()
    const [backgroundImage, setBackgroundImage] = useState([])
    const [category, setCategory] = useState(foodList)
    const [menu, setMenu] = useState([])
    const [foodTime, setFoodTime] = useState('전체')
    const [isLoading, setIsLoading] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setIsLoading(true)
            }, 1000)
        }
        classifier = ml5.imageClassifier('./my-model/model.json', () => {
            console.log('model loaded!')
        })
        if (!isEmpty(backgroundImage) && !isEmpty(classifier) && isReady) {
            console.log(backgroundImage)
            const promises = []
            const classifyFunction = async () => {
                for (let i = 0; i < backgroundImage.length; i++) {
                    promises.push(
                        new Promise(() => {
                            let imageElement = document.createElement('img')
                            imageElement.src = backgroundImage[i]
                            console.log('dd')
                            classifier.classify(
                                imageElement,
                                (error, results) => {
                                    if (error) {
                                        console.error(error)
                                        return
                                    }
                                    results.sort((a, b) =>
                                        a.confidence < b.confidence ? 1 : -1
                                    )
                                    console.log(results)
                                    setCategory((prev) => [
                                        ...prev,
                                        results[0].label,
                                    ])
                                }
                            )
                        })
                    )
                }
                await Promise.all(promises)
            }

            classifyFunction()
            setIsReady(false)
            setBackgroundImage([])
        }
        console.log(menu)
    }, [backgroundImage, isReady])
    useEffect(() => {
        localStorage.setItem('foodList', JSON.stringify(category))

        console.log(category)
    }, [category])
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
                    <Header />
                    {/* <div
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
                    
                    <RadialChart
                        data={myData}
                        className="food-chart"
                        width={230}
                        height={230}
                        colorRange={myColor}
                    /> */}
                    <FoodList />
                    <input
                        accept="image/*"
                        // className={classes.input}
                        style={{
                            display: 'none',
                        }}
                        id="contained-button-file"
                        type="file"
                        multiple
                        onChange={(e) => {
                            const imageList = []
                            const promises = []
                            const solve = async () => {
                                for (
                                    let i = 0;
                                    i < e.target.files.length;
                                    i++
                                ) {
                                    promises.push(
                                        new Promise(() => {
                                            var reader = new FileReader()
                                            reader.readAsDataURL(
                                                e.target.files[i]
                                            )

                                            reader.onloadend = () => {
                                                setBackgroundImage((prev) => [
                                                    ...prev,
                                                    reader.result,
                                                ])
                                                // imageList.push(reader.result)
                                            }
                                        })
                                    )
                                }
                                await Promise.all(promises).then(() => {})
                            }
                            solve()

                            // for (let i = 0; i < e.target.files.length; i++) {
                            //     var reader = new FileReader()
                            //     testList.push('t')
                            //     reader.readAsDataURL(e.target.files[i])
                            //     console.log(e.target.files[i])
                            //     reader.onloadend = () => {
                            //         imageList.push(reader.result)
                            //         setBackgroundImage(imageList)
                            //         console.log(reader.result)
                            //     }
                            //     console.log(imageList)
                            //     console.log(testList)
                            // }
                        }}
                    />
                    <label
                        // className={classes.photoArea}
                        htmlFor="contained-button-file"
                        className="plus-wrap"
                    >
                        <img className="plus" src="/plus.png" />
                    </label>
                    <div
                        style={{
                            padding: '0 20px 0 20px',
                            display: 'flex',
                            margin: '0 auto',
                            justifyContent: 'center',
                        }}
                    >
                        {!isEmpty(backgroundImage) &&
                            backgroundImage.map((data, i) => {
                                return (
                                    <>
                                        <img
                                            src={data}
                                            style={{
                                                width: '100px',
                                            }}
                                            alt="이미지"
                                            key={i}
                                        />
                                    </>
                                )
                            })}
                    </div>{' '}
                    {!isEmpty(backgroundImage) && (
                        <div
                            onClick={() => {
                                setIsReady(true)
                            }}
                            style={{
                                margin: '0 auto',
                                display: 'flex',
                                width: '280px',
                                height: '58px',
                                textAlign: 'center',
                                fontSize: '18px',
                                backgroundColor: '#254F54',
                                borderRadius: '20px',
                                color: 'white',
                                fontWeight: ' bold',
                                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.3)',
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            추가하기
                        </div>
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
                    <div
                        style={{
                            margin: '0 auto',
                            maxWidth: '375px',
                            textAlign: 'center',
                        }}
                    >
                        {!isEmpty(category) &&
                            category.map((data, i) => {
                                console.log(i)
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '18px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            paddingBottom: ' 20px',
                                            paddingTop: '20px',
                                            borderBottom: '1px solid #f5f5f5',
                                        }}
                                    >
                                        <span>{data}</span>
                                        <div>
                                            <span>2인분</span>
                                            <span
                                                style={{
                                                    paddingLeft: '10px',
                                                    color: 'red',
                                                }}
                                                onClick={() => {
                                                    console.log(category)
                                                    let idx = category.indexOf(
                                                        data
                                                    )

                                                    console.log(idx)
                                                    if (idx > -1) {
                                                        category.splice(idx, 1)
                                                        setCategory([
                                                            ...category,
                                                        ])
                                                    }
                                                }}
                                            >
                                                삭제
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    {!isEmpty(category) && (
                        <div
                            onClick={() => {}}
                            style={{
                                margin: '0 auto',
                                display: 'flex',
                                width: '280px',
                                height: '58px',
                                textAlign: 'center',
                                fontSize: '18px',
                                backgroundColor: '#254F54',
                                borderRadius: '20px',
                                color: 'white',
                                fontWeight: ' bold',
                                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.3)',
                                marginTop: '20px',
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            분석하기
                        </div>
                    )}
                </>
            )}
        </React.Fragment>
    )
}

export default App
