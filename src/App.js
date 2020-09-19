import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import ml5 from 'ml5'
import GaugeChart from './GaugeChart'
import useInterval from './useInterval'
import { isEmpty } from './functions'

let classifier

function App() {
    // const videoRef = useRef();
    const imageRef = useRef()
    // const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
    // const [shouldClassify, setShouldClassify] = useState(false);
    const [imageFile, setImageFile] = useState()
    const [backgroundImage, setBackgroundImage] = useState()
    const [category, setCatetory] = useState()
    const [menu, setMenu] = useState([])
    useEffect(() => {
        classifier = ml5.imageClassifier('./my-model/model.json', () => {
            console.log('model loaded!')
        })
        if (backgroundImage && classifier) {
            console.log(imageRef.current)
            classifier.classify(imageRef.current, (error, results) => {
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

    // useInterval(() => {
    //   if (classifier && shouldClassify) {
    //     classifier.classify(imageRef.current, (error, results) => {
    //       if (error) {
    //         console.error(error);
    //         return;
    //       }
    //       console.log("test start!");
    //       console.log(results);
    //       results.sort((a, b) => (a.confidence < b.confidence) ? 1 : -1);
    //       // results.sort((a, b) => b.label.localeCompare(a.label));
    //       console.log(results);
    //       // setGaugeData(results.map(entry => entry.confidence));
    //     });
    //   }
    // }, 500);

    return (
        <React.Fragment>
            <h1
                style={{
                    fontSize: '50px',
                    fontWeight: 'lighter',
                    marginBottom: '100px',
                }}
            >
                식단 조절기
            </h1>
            <div style={{ marginBottom: '50px' }}>
                <button>아침</button>
                <button>점심</button>
                <button>저녁</button>
            </div>
            {/* {isEmpty(category) ? (
                <h2>무엇을 드셨나요?</h2>
            ) : (
                <h2>{category}</h2>
            )} */}
            {/* <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? "Stop classifying" : "Start classifying"}
      </button> */}
            {/* <img src="/kimchi.jpeg" alt="빵" ref={imageRef} /> */}
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
                    style={{
                        display: 'flex',
                        backgroundColor: 'grey',
                        backgroundPosition: 'center center',
                        border: 'none',
                        color: 'white',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '300px',
                        height: '300px',
                        margin: '0 auto',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '50px',
                            fontWeight: 'bold',
                        }}
                    >
                        +
                    </p>
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
        </React.Fragment>
    )
}

export default App
