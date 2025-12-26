import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const messagesEndRef = useRef(null);
  const pesoUsuario = userInfo?.infoPersonal?.peso;


  const questions = [
    {
      id: "dias_entrenamiento",
      text: "¿Cuántos días a la semana puedes entrenar?",
      type: "number",
      options: ["3 días", "4 días", "5 días", "6 días"]
    },
    {
      id: "duracion_entrenamiento",
      text: "¿Cuánto tiempo puedes dedicar a cada entrenamiento?",
      type: "select",
      options: ["30 minutos", "45 minutos", "60 minutos", "90 minutos"]
    },
    {
      id: "experiencia",
      text: "¿Cuál es tu nivel de experiencia?",
      type: "select",
      options: ["Principiante", "Intermedio", "Avanzado"]
    },
    {
      id: "peso_objetivo",
      text: `Veo que tu peso actual es ${pesoUsuario} kg, ¿Cuál es tu peso objetivo?`,
      type: "number",
      min: 40,
      max: 200
    },    
    {
      id: "horario_preferido",
      text: "¿En qué horario prefieres entrenar?",
      type: "select",
      options: ["Mañana", "Mediodía", "Tarde", "Noche"]
    }
  ];


  useEffect(() => {
    document.title = "Mi Entrenador Personal - Fitness App";
    
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUserInfo(data);
          // Iniciar conversación
          startConversation(data);
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
        alert("No se pudo cargar tu información");
      }
    };

    fetchUserInfo();
  }, [userId, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    // Agregar mensaje del usuario
    const question = questions.find(q => q.id === questionId);
    setMessages(prev => [...prev, {
      type: "user",
      text: answer
    }]);

    // Avanzar a la siguiente pregunta
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setMessages(prev => [...prev, {
          type: "bot",
          text: questions[currentQuestion + 1].text
        }]);
      }, 500);
    } else {
      // Última pregunta respondida, generar plan
      setTimeout(() => {
        generatePlan(newAnswers);
      }, 500);
    }
  };

  const generatePlan = async (allAnswers) => {
    setIsGenerating(true);
    setMessages(prev => [...prev, {
      type: "bot",
      text: "Perfecto! Estoy generando tu rutina y dieta personalizada... ⏳"
    }]);

    try {
      const res = await fetch(`${API_BASE}/api/users/${userId}/generate-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInfo,
          answers: allAnswers
        })
      });

      const data = await res.json();
      if (res.ok) {
        setGeneratedPlan(data);
        setShowResults(true);
        setMessages(prev => [...prev, {
          type: "bot",
          text: "¡Listo! He creado tu plan personalizado. Revisa los detalles abajo 👇"
        }]);
      } else {
        throw new Error(data.error || "Error al generar el plan");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        type: "bot",
        text: "Lo siento, hubo un error al generar tu plan. Por favor intenta de nuevo."
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const startConversation = (info = userInfo) => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setGeneratedPlan(null);
    setMessages([{
      type: "bot",
      text: info?.infoPersonal?.nombre ? `¡Hola ${info.infoPersonal.nombre}! 👋 Soy tu entrenador personal virtual. Voy a ayudarte a crear una rutina y dieta personalizada basada en tu perfil.` : "¡Hola! 👋"
    }, {
      type: "bot",
      text: questions[0].text
    }]);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button
          type="button"
          onClick={() => navigate("/main-menu")}
          className="back-button"
        >
          ← Volver
        </button>
        <h2>💪 Mi Entrenador Personal</h2>
      </div>

      <div className="chatbot-content">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          
          {!showResults && currentQ && !isGenerating && (
            <div className="question-options">
              {currentQ.type === "number" ? (
                currentQ.options && currentQ.options.length > 0 ? (
                  // Caso con opciones predefinidas
                  currentQ.options.map((option, idx) => (
                    <button
                      key={idx}
                      className="option-button"
                      onClick={() => handleAnswer(currentQ.id, option)}
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  // Caso input libre con rango
                <>
                  <input
                    type="number"
                    min={currentQ.min || 40}
                    max={currentQ.max || 200}
                    value={answers[currentQ.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [currentQ.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const value = Number(e.target.value);
                        const min = currentQ.min || 40;
                        const max = currentQ.max || 200;
                  
                        if (value >= min && value <= max) {
                          handleAnswer(currentQ.id, value);
                        } else {
                          setMessages(prev => [
                            ...prev,
                            {
                              type: "bot",
                              text: `Por favor ingresa un valor entre ${min} y ${max} kg 🙏`
                            }
                          ]);
                        }
                      }
                    }}                                     
                    className="option-input"
                  />
                 
                    <button
                      className="option-button confirm-button"
                      onClick={() => {
                        const value = Number(answers[currentQ.id]); // conversión a número
                        const min = currentQ.min || 40;
                        const max = currentQ.max || 200;
                      
                        if (value >= min && value <= max) {
                          handleAnswer(currentQ.id, value);
                        } else {
                          setMessages(prev => [
                            ...prev,
                            {
                              type: "bot",
                              text: `Por favor ingresa un valor entre ${min} y ${max} kg 🙏`
                            }
                          ]);
                        }
                      }}                      
                    >
                      Continuar
                    </button>
                </>        
                )
              ) : currentQ.type === "select" ? (
                currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="option-button"
                    onClick={() => handleAnswer(currentQ.id, option)}
                  >
                    {option}
                  </button>
                ))
              ) : currentQ.type === "multi" ? (
                <>
                  {currentQ.options.map((option, idx) => (
                    <button
                      key={idx}
                      className="option-button"
                      onClick={() => {
                        const current = answers[currentQ.id] || [];
                        const newValue = current.includes(option)
                          ? current.filter(o => o !== option)
                          : [...current, option];
                        setAnswers({ ...answers, [currentQ.id]: newValue });
                      }}
                      style={{
                        backgroundColor: (answers[currentQ.id] || []).includes(option) ? "#009BD8" : "#fff",
                        color: (answers[currentQ.id] || []).includes(option) ? "#fff" : "#009BD8"
                      }}
                    >
                      {option}
                    </button>
                  ))}
                  {(answers[currentQ.id] || []).length > 0 && (
                    <button
                      className="option-button confirm-button"
                      onClick={() => {
                        const selected = answers[currentQ.id] || [];
                        if (selected.length > 0) {
                          handleAnswer(currentQ.id, selected);
                        }
                      }}
                    >
                      Continuar
                    </button>
                  )}
                </>
              ) : null}
            </div>
          )}

          {isGenerating && (
            <div className="message bot">
              <div className="message-content">
                <div className="loading-spinner"></div>
                Generando tu plan personalizado...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {showResults && generatedPlan && (
          <div className="plan-results">
            <h3>📋 Tu Rutina Personalizada</h3>
            <div className="plan-section">
              <h4>Rutina de Entrenamiento</h4>
              <div dangerouslySetInnerHTML={{ __html: generatedPlan.rutina.replace(/\n/g, '<br/>') }} />
            </div>

            <h3>🍎 Tu Dieta Personalizada</h3>
            <div className="plan-section">
              <h4>Plan Alimentario</h4>
              <div dangerouslySetInnerHTML={{ __html: generatedPlan.dieta.replace(/\n/g, '<br/>') }} />
            </div>

            <button
              className="restart-button"
              onClick={startConversation}
            >
              Crear Nuevo Plan
            </button>
          </div>
        )}

        {showResults && !generatedPlan && (
          <button
            className="restart-button"
            onClick={startConversation}
          >
            Iniciar Nueva Conversación
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;

