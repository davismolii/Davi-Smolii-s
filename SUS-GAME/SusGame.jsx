import React, { useState } from 'react';
import { Heart, Leaf, Sparkles } from 'lucide-react';
import { questions } from './questions';
import './styles.css';

export default function SustentabilityGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setGameFinished(false);
  };

  if (gameFinished) {
    return (
      <div className="game-container result-screen">
        <div className="result-card">
          <div className="sparkle-icon">
            <Sparkles className="sparkle" />
          </div>
          <h2 className="result-title">VOCÊ TERMINOU!</h2>
          <p className="result-score">{score} de {questions.length}</p>
          <p className="result-message">
            {score >= 8 ? "🌟 INCRÍVEL! Você sabe muito sobre sustentabilidade!" :
             score >= 5 ? "🌱 MUITO BOM! Continue aprendendo!" :
             "🌈 QUE LEGAL! Agora você sabe mais sobre cuidar do planeta!"}
          </p>
          <button onClick={restartGame} className="restart-button">
            JOGAR DE NOVO! 🔄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container question-screen">
      <div className="game-card">
        {/* Header */}
        <div className="header">
          <div className="question-counter">
            <Leaf className="leaf-icon" />
            <span className="counter-text">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <div className="score-badge">
            <Heart className="heart-icon" />
            <span className="score-text">{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="image-container">
            <img 
              src={questions[currentQuestion].image} 
              alt="Imagem da pergunta"
              className="question-image"
            />
          </div>
          <p className="question-text">
            {questions[currentQuestion].text}
          </p>
        </div>

        {/* Buttons */}
        {!showFeedback ? (
          <div className="answer-buttons">
            <button
              onClick={() => handleAnswer(true)}
              className="answer-button true-button"
            >
              ✓ VERDADEIRO
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="answer-button false-button"
            >
              ✗ FALSO
            </button>
          </div>
        ) : (
          <div className="feedback-container">
            <div className={`feedback-message ${
              selectedAnswer === questions[currentQuestion].answer 
                ? 'feedback-correct' 
                : 'feedback-incorrect'
            }`}>
              {selectedAnswer === questions[currentQuestion].answer 
                ? questions[currentQuestion].feedback.correct
                : questions[currentQuestion].feedback.incorrect}
            </div>
            <button onClick={nextQuestion} className="next-button">
              {currentQuestion < questions.length - 1 ? 'PRÓXIMA ➜' : 'VER RESULTADO 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}