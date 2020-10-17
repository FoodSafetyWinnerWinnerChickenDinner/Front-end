import React, { createElement, useEffect, useRef, useState } from 'react'
import '../../styles/main.scss'
import ml5 from 'ml5'
import Modal from 'react-modal'
import { isEmpty } from '../../functions'
import Header from '../../components/Header'
import foodService from '../../services/foodService'
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button'
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
function Main() {
    // const imageRef = useRef()
    // const [shouldClassify, setShouldClassify] = useState(false);
    const foodList = JSON.parse(localStorage.getItem('foodList')) || []
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || []
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [imageFile, setImageFile] = useState()
    const [backgroundImage, setBackgroundImage] = useState([])
    const [category, setCategory] = useState(foodList)
    const [menu, setMenu] = useState([])
    const [foodTime, setFoodTime] = useState('전체')
    const [isLoading, setIsLoading] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [data, setData] = useState([])
    const [doRedirect, setDoRedirect] = useState(false)
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

    useEffect(() => {
        const data = ['밥 1', '생선구이 1', '돼지구이 1', '김치 1']
        const postData = async (data) => {
            const res = await foodService.postFood(data)
            return res
        }
        postData(data)
    }, [])

    const onAnalyze = (data) => {
        // 분석을 위한 메뉴들을 정리해서 담을 MAP 변수
        let menu = new Map()

        // 받은 데이터를 바탕으로 for문을 통해, API에 넘겨줄 데이터를 정리한다.
        for (let i = 0; i < data.length; i++) {
            let isInMenu = false
            for (let [key, value] of menu) {
                if (data[i] === key) {
                    value++
                    menu.set(key, value)
                    isInMenu = true
                    break
                }
            }
            if (!isInMenu) {
                menu.set(data[i], 1)
            }
        }
        let menuArray = []
        menu.forEach((value, key) => {
            let str = key + ' ' + value
            menuArray.push(str)
        })
        console.log(menuArray)
        setDoRedirect(true)
    }
    return (
        <React.Fragment>
            {doRedirect && <Redirect to="/anaylize" />}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
            >
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
                </div>
                {!isEmpty(backgroundImage) && (
                    <>
                        <Button
                            text="닫기"
                            full={false}
                            left="20"
                            func={() => {
                                setModalIsOpen(false)
                                setBackgroundImage([])
                            }}
                        />
                        <Button
                            text="추가하기"
                            full={false}
                            color
                            right="20"
                            func={() => {
                                setIsReady(true)
                                setModalIsOpen(false)
                            }}
                        />
                    </>
                )}
            </Modal>
            {isEmpty(userInfo) && <Redirect to="/landing" />}

            {!isLoading ? (
                <div
                    style={{
                        width: '100%',
                        height: '100vh',
                        backgroundColor: '#54c284',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <img
                        src="/splash.png"
                        style={{
                            width: '100px',
                            maxWidth: '200px',
                        }}
                    />
                </div>
            ) : (
                <>
                    <Header />
                    <div className="foodlist">
                        <div>
                            <span>식단</span>
                        </div>
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
                                    if (e.target.files.length === 0)
                                        setModalIsOpen(false)
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
                                                    setBackgroundImage(
                                                        (prev) => [
                                                            ...prev,
                                                            reader.result,
                                                        ]
                                                    )
                                                    // imageList.push(reader.result)
                                                }
                                            })
                                        )
                                    }
                                    await Promise.all(promises).then(() => {})
                                }
                                solve()
                            }}
                        />
                        <label
                            htmlFor="contained-button-file"
                            className="plus-wrap"
                            onClick={() => setModalIsOpen(true)}
                        >
                            <img className="plus" src="/plus.png" />
                        </label>
                    </div>

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
                                            {/* <span>2인분</span> */}
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
                    <label htmlFor="contained-button-file">
                        <Button
                            text="추가하기"
                            full={false}
                            left="20"
                            func={() => {
                                setModalIsOpen(true)
                            }}
                        />
                    </label>
                    <Button
                        text="분석하기"
                        full={false}
                        color
                        right="20"
                        func={() => onAnalyze(category)}
                    />
                    {/* {!isEmpty(category) ? (
                        <div
                            className="food-analyze-btn"
                            onClick={() => onAnalyze(category)}
                        >
                            분석하기
                        </div>
                    ) : (
                        <label
                            htmlFor="contained-button-file"
                            className="food-analyze-btn"
                            onClick={() => setModalIsOpen(true)}
                        >
                            추가하기
                        </label>
                    )} */}
                </>
            )}
        </React.Fragment>
    )
}
const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgb(0,0,0,0.7)',
        padding: 0,
    },
    content: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0,0,0,0.7)',
        borderRadius: '0px',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        // transform: 'translate(-50%, -50%)',
    },
}

export default Main
