import React, { useState, useEffect, useRef } from 'react';
    import { useSpring, animated } from 'react-spring';

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function FlyingHeart() {
      const startX = getRandom(0, window.innerWidth);
      const startY = getRandom(0, window.innerHeight);
      const endX = getRandom(0, window.innerWidth);
      const endY = getRandom(0, window.innerHeight);
      const duration = getRandom(2000, 5000);

      const props = useSpring({
        from: { left: startX, top: startY, opacity: 0, transform: 'scale(0.5)' },
        to: { left: endX, top: endY, opacity: 1, transform: 'scale(1)' },
        config: { duration: duration },
        loop: true,
      });

      return <animated.span style={props} className="heart">❤️</animated.span>;
    }

    function FallingSmile() {
      const startX = getRandom(0, window.innerWidth);
      const startY = -50;
      const endX = getRandom(0, window.innerWidth);
      const endY = window.innerHeight + 50;
      const duration = getRandom(3000, 7000);

      const props = useSpring({
        from: { left: startX, top: startY, opacity: 0, transform: 'scale(0.5)' },
        to: { left: endX, top: endY, opacity: 1, transform: 'scale(1)' },
        config: { duration: duration },
        loop: true,
      });

      return <animated.span style={props} className="smile">😊</animated.span>;
    }

    function App() {
      const [lovePercent, setLovePercent] = useState('');
      const [showResult, setShowResult] = useState(false);
      const [hearts, setHearts] = useState([]);
      const [showCanvas, setShowCanvas] = useState(false);
      const canvasRef = useRef(null);
      const [drawing, setDrawing] = useState(false);
      const [context, setContext] = useState(null);
      const [brushColor, setBrushColor] = useState('#000');
      const [brushSize, setBrushSize] = useState(3);
      const [showImagePage, setShowImagePage] = useState(false);
      const [smiles, setSmiles] = useState([]);
      const [showQuiz, setShowQuiz] = useState(true);
      const [quizAnswers, setQuizAnswers] = useState({
        question1: null,
        question2: null,
        question3: null,
      });
      const [showGift, setShowGift] = useState(false);

      useEffect(() => {
        const interval = setInterval(() => {
          setHearts((prevHearts) => [...prevHearts, <FlyingHeart key={Date.now()} />]);
        }, 500);

        return () => clearInterval(interval);
      }, []);

      useEffect(() => {
        if (showImagePage) {
          const interval = setInterval(() => {
            setSmiles((prevSmiles) => [...prevSmiles, <FallingSmile key={Date.now()} />]);
          }, 500);
          return () => clearInterval(interval);
        }
      }, [showImagePage]);

      useEffect(() => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          setContext(ctx);
          ctx.strokeStyle = brushColor;
          ctx.lineWidth = brushSize;
        }
      }, [showCanvas, brushColor, brushSize]);

      const handleInputChange = (event) => {
        setLovePercent(event.target.value);
      };

      const handleSubmit = () => {
        setShowResult(true);
      };

      const handleContinue = () => {
        setShowCanvas(true);
      };

      const startDrawing = (e) => {
        if (!context) return;
        setDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        context.beginPath();
        context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      };

      const draw = (e) => {
        if (!drawing || !context) return;
        const rect = canvasRef.current.getBoundingClientRect();
        context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        context.stroke();
      };

      const stopDrawing = () => {
        setDrawing(false);
      };

      const handleColorChange = (color) => {
        setBrushColor(color);
        if (context) {
          context.strokeStyle = color;
        }
      };

      const handleBrushSizeChange = (size) => {
        setBrushSize(size);
        if (context) {
          context.lineWidth = size;
        }
      };

      const handleSaveAndContinue = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        requestAnimationFrame(() => {
          const ctx = canvas.getContext('2d');
          const dataURL = canvas.toDataURL('image/jpeg');

          requestAnimationFrame(() => {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'drawing.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setShowImagePage(true);
          });
        });
      };

      const handleQuizAnswer = (question, answer) => {
        setQuizAnswers(prevAnswers => ({ ...prevAnswers, [question]: answer }));
      };

      const handleQuizSubmit = () => {
        if (
          quizAnswers.question1 === '30 lipca' &&
          quizAnswers.question2 === 'Alex' &&
          quizAnswers.question3 === 'ide wypic setke'
        ) {
          setShowQuiz(false);
        } else {
          setQuizAnswers({
            question1: null,
            question2: null,
            question3: null,
          });
          alert('Błędna odpowiedź, spróbuj ponownie!');
        }
      };

      const handleGiftClick = () => {
        setShowGift(true);
      };

      const heartAnimation = useSpring({
        from: { opacity: 0, transform: 'scale(0.5)' },
        to: { opacity: 1, transform: 'scale(1)' },
        config: { duration: 500 },
      });

      const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#a52a2a'];

      return (
        <div>
          {hearts}
          {showQuiz ? (
            <div className="container quiz-container">
              <h1>Quiz który sprawdzi czy to prawdziwa Wikusia</h1>
              <div className="quiz-question">Kiedy sie urodzilem?</div>
              <div className="quiz-options">
                <div
                  className={`quiz-option ${quizAnswers.question1 === '29 lipca' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question1', '29 lipca')}
                >
                  29 lipca
                </div>
                <div
                  className={`quiz-option ${quizAnswers.question1 === '30 lipca' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question1', '30 lipca')}
                >
                  30 lipca
                </div>
                <div
                  className={`quiz-option ${quizAnswers.question1 === '31 lipca' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question1', '31 lipca')}
                >
                  31 lipca
                </div>
              </div>
              <div className="quiz-question">Jak nazywa sie moj pies?</div>
              <div className="quiz-options">
                <div
                  className={`quiz-option ${quizAnswers.question2 === 'Burek' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question2', 'Burek')}
                >
                  Burek
                </div>
                <div
                  className={`quiz-option ${quizAnswers.question2 === 'Alex' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question2', 'Alex')}
                >
                  Alex
                </div>
                <div
                  className={`quiz-option ${quizAnswers.question2 === 'Reksio' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question2', 'Reksio')}
                >
                  Reksio
                </div>
              </div>
              <div className="quiz-question">Co robie jak mowie ze ide sie odrobaczyc?</div>
              <div className="quiz-options">
                <div
                  className={`quiz-option ${quizAnswers.question3 === 'ide spac' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question3', 'ide spac')}
                >
                  ide spac
                </div>
                <div
                  className={`quiz-option ${quizAnswers.question3 === 'ide wypic setke' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question3', 'ide wypic setke')}
                >
                  ide wypic setke
                </div>
                <div
                  className={`quiz-option ${quizAnswers.question3 === 'ide do lekarza' ? 'selected' : ''}`}
                  onClick={() => handleQuizAnswer('question3', 'ide do lekarza')}
                >
                  ide do lekarza
                </div>
              </div>
              <button onClick={handleQuizSubmit}>Sprawdź odpowiedzi</button>
            </div>
          ) : (
            !showImagePage ? (
              <div className="container">
                {!showCanvas ? (
                  <>
                    <h1>Na ile procent Wikusia kocha Sebe?</h1>
                    <input
                      type="number"
                      placeholder="Wpisz procent miłości"
                      value={lovePercent}
                      onChange={handleInputChange}
                    />
                    <br />
                    <button onClick={handleSubmit}>Oblicz</button>
                    {showResult && (
                      <div className="result">
                        <animated.span style={heartAnimation} className="heart">
                          ❤️
                        </animated.span>
                        Błędna odpowiedź, bo Seba kocha Wikusie na nieskończoną liczbę procent!
                        <animated.span style={heartAnimation} className="heart">
                          ❤️
                        </animated.span>
                        <button className="heart-button" onClick={handleContinue}>
                          ❤️
                          <span>Przejdz dalej</span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="canvas-container">
                    <div className="canvas-label">Namaluj mi cos ladnego bo malujesz najladniej na swiecie</div>
                    <div className="controls">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className="color-picker"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        />
                      ))}
                      <select
                        className="brush-size"
                        value={brushSize}
                        onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
                      >
                        <option value={1}>Cienki</option>
                        <option value={3}>Sredni</option>
                        <option value={5}>Gruby</option>
                      </select>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={300}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                    />
                    <button className="save-button" onClick={handleSaveAndContinue}>
                      Zapisz i przejdź dalej
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="image-container">
                {smiles}
                <div className="message">Chcialbym zebys zawsze byla usmiechnieta</div>
                {!showGift ? (
                  <div className="gift-box" onClick={handleGiftClick}>
                    🎁
                  </div>
                ) : (
                  <Bouquet />
                )}
              </div>
            )
          )}
        </div>
      );
    }

    export default App;
