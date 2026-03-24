/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  CheckCircle2, 
  Smartphone, 
  Camera, 
  MessageCircle, 
  PlayCircle, 
  FileText, 
  Headphones, 
  Star,
  Zap,
  ArrowRight,
  Clock,
  ShieldCheck,
  ChevronDown,
  Loader2,
  Unlock,
  AlertTriangle,
  Timer,
  Copy,
  Check,
  FolderDown
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

declare global {
  interface Window {
    fbq: any;
  }
}

// --- MAIN APP CONTROLLER (THE FUNNEL) ---
export default function App() {
  const [funnelStep, setFunnelStep] = useState('hook'); // 'hook', 'quiz', 'analyzing', 'offer'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [funnelStep]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-[#00BFA5] selection:text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {funnelStep === 'hook' && <HookScreen onStart={() => setFunnelStep('quiz')} key="hook" />}
        {funnelStep === 'quiz' && <QuizScreen onComplete={() => setFunnelStep('analyzing')} key="quiz" />}
        {funnelStep === 'analyzing' && <AnalyzingScreen onComplete={() => setFunnelStep('offer')} key="analyzing" />}
        {funnelStep === 'offer' && <OfferScreen key="offer" />}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}

// --- FUNNEL STEP 1: THE HOOK ---
function HookScreen({ onStart }: { onStart: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00BFA5] opacity-20 blur-[120px] rounded-full"></div>
      
      <div className="max-w-xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-8">
          <AlertTriangle className="w-4 h-4" /> 
          <span>El 95% usa el método equivocado</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
          Descubre por qué llevas <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">años sin hablar inglés</span> fluido.
        </h1>
        
        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          Realiza este breve test de 60 segundos para descubrir tu <strong>"Bloqueo Lingüístico"</strong> oculto y cómo reprogramar tu cerebro para pensar en inglés en menos de 90 días.
        </p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#00BFA5] hover:bg-[#00A08A] text-white font-black text-xl md:text-2xl py-6 px-8 rounded-2xl shadow-[0_10px_30px_rgba(0,191,165,0.4)] flex items-center justify-center gap-3 transition-colors border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1"
        >
          INICIAR TEST GRATIS
          <ArrowRight className="w-6 h-6" />
        </motion.button>
        
        <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" /> Toma solo 1 minuto
        </p>
      </div>
    </motion.div>
  );
}

// --- FUNNEL STEP 2: THE QUIZ ---
function QuizScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [currentQ, setCurrentQ] = useState(0);

  const questions = [
    {
      q: "¿Cuál es tu mayor frustración con el inglés hoy en día?",
      options: [
        "Me quedo en blanco al intentar hablar.",
        "La gramática me parece aburrida y confusa.",
        "Entiendo al leerlo, pero no cuando hablan rápido."
      ]
    },
    {
      q: "¿Cuánto tiempo has intentado aprender en el pasado?",
      options: [
        "Años (en institutos o colegios).",
        "Meses (con apps o videos sueltos).",
        "Poco tiempo, me rindo rápido."
      ]
    },
    {
      q: "¿Cuánto tiempo realista tienes al día para practicar?",
      options: [
        "Solo 15 a 30 minutos al día.",
        "Aproximadamente 1 hora.",
        "Solo los fines de semana."
      ]
    },
    {
      q: "Si descubrieras que el problema no eres tú, sino el 'sistema de memorización' tradicional... ¿Estarías dispuesto a probar algo nuevo?",
      options: [
        "Sí, necesito resultados urgentes.",
        "Sí, estoy harto de lo tradicional."
      ]
    }
  ];

  const handleAnswer = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50"
    >
      <div className="max-w-md w-full bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Paso {currentQ + 1} de {questions.length}</span>
            <span className="text-sm font-black text-[#00BFA5]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              className="bg-[#00BFA5] h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 leading-tight">
              {questions[currentQ].q}
            </h2>
            
            <div className="space-y-3">
              {questions[currentQ].options.map((opt, idx) => (
                <button 
                  key={idx}
                  onClick={handleAnswer}
                  className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-[#00BFA5] hover:bg-[#00BFA5]/5 text-slate-700 font-bold text-lg transition-all flex justify-between items-center group active:scale-[0.98]"
                >
                  <span className="pr-4">{opt}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-[#00BFA5] flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 bg-[#00BFA5] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- FUNNEL STEP 3: ANALYZING ---
function AnalyzingScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [step, setStep] = useState(0);
  const steps = [
    "Evaluando respuestas...",
    "Identificando patrón de bloqueo...",
    "Buscando el método ideal...",
    "¡Perfil encontrado!"
  ];

  useEffect(() => {
    let current = 0;
    // Se asegura de que la transición solo corra una vez sin re-renderizados extraños
    const interval = setInterval(() => {
      current++;
      if (current < 4) {
        setStep(current);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []); // Dependencia vacía para máxima estabilidad

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-white"
    >
      <Loader2 className="w-16 h-16 text-[#00BFA5] animate-spin mb-8" />
      <h2 className="text-2xl font-bold mb-8 h-8">{steps[step]}</h2>
      
      <div className="w-full max-w-xs space-y-4">
        {steps.map((text, idx) => (
          <div key={idx} className={`flex items-center gap-3 transition-opacity duration-500 ${idx <= step ? 'opacity-100' : 'opacity-20'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${idx < step ? 'bg-[#00BFA5]' : 'border-2 border-slate-600'}`}>
              {idx < step && <CheckCircle2 className="w-4 h-4 text-slate-900" />}
            </div>
            <span className={idx < step ? 'text-white font-medium' : 'text-slate-500'}>{text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- FUNNEL STEP 4: THE OFFER (THE SLIPPERY SLIDE) ---
function OfferScreen() {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent');
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const scrollToPayment = () => {
    document.getElementById('checkout-pipeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-slate-50 min-h-screen pb-20 relative"
    >
      <LiveFomoNotifications />

      {/* Urgency Sticky Top Banner */}
      <div className="sticky top-0 z-50 bg-red-600 text-white text-center py-3 px-4 shadow-md flex justify-center items-center gap-3">
        <Timer className="w-6 h-6 animate-pulse" />
        <span className="font-bold text-sm md:text-base uppercase tracking-wide">
          TU OFERTA EXCLUSIVA EXPIRA EN: <span className="font-black text-yellow-300 text-lg md:text-xl ml-1">{formatTime(timeLeft)}</span>
        </span>
      </div>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 z-40 md:hidden flex justify-center">
         <button onClick={scrollToPayment} className="w-full max-w-sm bg-[#00BFA5] text-white font-black py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2">
            OBTENER ACCESO - S/ 19.90 <ArrowRight className="w-5 h-5"/>
         </button>
      </div>

      <section className="pt-12 pb-16 bg-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Unlock className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Tenemos tu diagnóstico.
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Tu perfil indica que <strong className="text-slate-900">el sistema tradicional de memorización te está frenando</strong>. Tu cerebro está bloqueado analizando gramática antes de hablar.
          </p>
          <div className="bg-[#00BFA5]/10 border border-[#00BFA5]/30 p-6 rounded-3xl text-left">
            <h3 className="font-black text-xl text-slate-900 mb-2 flex items-center gap-2">
              <Zap className="text-[#00BFA5] w-6 h-6"/> La Solución:
            </h3>
            <p className="text-slate-700 text-lg">
              Necesitas usar el <strong>Neuroaprendizaje (El Método Witix)</strong>. Un sistema de inmersión y asociación subconsciente que te hace absorber el inglés igual que un niño aprende su idioma nativo: <span className="underline decoration-[#00BFA5] decoration-4 font-bold">Escuchando y repitiendo.</span>
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center -mt-6 relative z-10">
        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100">
          <ChevronDown className="w-6 h-6 text-slate-400 animate-bounce" />
        </div>
      </div>

      <section className="py-16 bg-slate-900 text-white px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Todo lo que te llevas <span className="text-[#00BFA5]">HOY</span></h2>
            <p className="text-lg text-slate-400">Acceso inmediato y de por vida a tu Google Drive.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/80 p-5 md:p-6 rounded-3xl border border-slate-700 flex items-center gap-4 md:gap-6 shadow-xl">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
                <PlayCircle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">Curso Completo HD (134 Clases)</h3>
                <p className="text-slate-400 text-sm md:text-base">Módulos en video directo al grano.</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-slate-500 line-through font-bold text-lg">S/ 150</p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-5 md:p-6 rounded-3xl border border-slate-700 flex items-center gap-4 md:gap-6 shadow-xl">
              <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">Libro de Trabajo (PDF)</h3>
                <p className="text-slate-400 text-sm md:text-base">Ejercicios listos para imprimir.</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-slate-500 line-through font-bold text-lg">S/ 50</p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-5 md:p-6 rounded-3xl border border-slate-700 flex items-center gap-4 md:gap-6 shadow-xl">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center shrink-0">
                <Headphones className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">Audios de Reprogramación</h3>
                <p className="text-slate-400 text-sm md:text-base">Escucha en el bus o gimnasio.</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-slate-500 line-through font-bold text-lg">S/ 80</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-[2rem] p-8 text-center text-slate-900 transform rotate-1 shadow-2xl relative border-4 border-[#00BFA5]">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-black px-6 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
               <Clock className="w-5 h-5 animate-spin-slow" /> EXPIRA EN {formatTime(timeLeft)}
            </div>
            
            <p className="text-slate-500 font-bold mb-2 uppercase tracking-widest text-sm mt-4">Valor Total: <span className="line-through">S/ 280</span></p>
            <p className="text-xl font-bold mb-2">Tu oferta especial hoy:</p>
            <p className="text-6xl md:text-7xl font-black text-[#00BFA5] tracking-tighter mb-4">S/ 19.90</p>
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
              <ShieldCheck className="w-4 h-4" /> Pago único, acceso inmediato al Drive.
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE CERO FRICCION */}
      <section id="checkout-pipeline" className="pt-24 pb-20 px-4 bg-slate-50 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Instrucciones para Acceso Inmediato</h2>
            <div className="bg-amber-100/80 text-amber-900 p-5 rounded-2xl border border-amber-200 inline-block text-left shadow-sm">
              <p className="font-bold flex items-center gap-2 mb-2 text-lg"><AlertTriangle className="w-6 h-6 text-amber-600"/> ¡Atención! Lee antes de pagar:</p>
              <p className="text-sm md:text-base font-medium">Para que no se te cierre esta página al abrir tu app de Yape, hemos creado un proceso seguro. <strong>Sigue estos 3 pasos exactos:</strong></p>
            </div>
          </div>

          <div className="space-y-0">
            {/* Step 1: Copiar Número */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-slate-200 relative z-10 hover:border-[#00BFA5]/50 transition-colors">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0">1</div>
                <div className="w-full">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Copia nuestro número</h3>
                  <p className="text-slate-600 mb-4 text-lg">Toca el recuadro verde de abajo para copiar el número a tu celular. <span className="font-bold text-red-500">(¡Aún no abras tu Yape!)</span></p>
                  <CopyNumberBox number="960873225" />
                </div>
              </div>
            </div>

            <div className="w-1.5 h-10 bg-slate-200 ml-12 -my-2 relative z-0"></div>

            {/* Step 2: Ir a WhatsApp (Interactivo) */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-2xl border-2 border-slate-800 relative z-10">
              <CheckoutForm />
            </div>

            <div className="w-1.5 h-10 bg-slate-200 ml-12 -my-2 relative z-0"></div>

            {/* Step 3: Pagar y Enviar desde WA */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-slate-200 relative z-10 hover:border-[#00BFA5]/50 transition-colors">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Yapea y recibe el curso</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-4">
                    Como ya nos enviaste el mensaje por WhatsApp en el paso anterior, ahora sí estás a salvo. 
                  </p>
                  <ul className="space-y-3">
                     <li className="flex items-start gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" /> 
                        Abre tu app de Yape con calma.
                     </li>
                     <li className="flex items-start gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" /> 
                        Pega el número y envía los S/ 19.90.
                     </li>
                     <li className="flex items-start gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-[#00BFA5] shrink-0 mt-0.5" /> 
                        Mándanos la foto del pago ahí mismo en el chat.
                     </li>
                  </ul>
                  <div className="mt-6 bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 flex items-center gap-3">
                     <FolderDown className="w-8 h-8 text-emerald-600 shrink-0" />
                     <p className="font-bold">¡Te responderemos al instante entregándote el link privado del Google Drive!</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TestimonialSlider />

      <footer className="py-8 text-center text-xs text-slate-400 bg-slate-50">
        <p>Pago seguro vía Yape. Entrega en WhatsApp.<br/>© {new Date().getFullYear()} Witix Neuroaprendizaje.</p>
      </footer>
    </motion.div>
  );
}

// --- SUB-COMPONENT: COPY NUMBER BOX ---
function CopyNumberBox({ number }: { number: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = number;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div 
      onClick={handleCopy}
      className={`relative overflow-hidden group border-2 ${copied ? 'border-green-500 bg-green-50' : 'border-[#00BFA5] bg-emerald-50 hover:bg-emerald-100'} rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-colors`}
    >
      <div>
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Número Corporativo Witix</span>
        <span className={`text-3xl md:text-4xl font-black tracking-widest ${copied ? 'text-green-600' : 'text-[#00BFA5]'}`}>
          960 873 225
        </span>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-[#00BFA5] group-hover:scale-105 group-hover:shadow-md'}`}>
        {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: CHECKOUT FORM (WHATSAPP GEN) ---
function CheckoutForm() {
  const [email, setEmail] = useState('');

  const generateDynamicWhatsAppLink = () => {
    const baseMessage = "Hola Witix, quiero asegurar la oferta de S/ 19.90. Ya copié el número, ahora haré el Yape y enviaré la foto por aquí.";
    const emailMessage = email.trim() !== "" ? ` Mi correo para recibir el Drive es: ${email.trim()}` : "";
    const fullMessage = baseMessage + emailMessage;
    return `https://api.whatsapp.com/send?phone=51960873225&text=${encodeURIComponent(fullMessage)}`;
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
  };

  return (
    <div>
      <div className="flex items-start gap-5 mb-6">
        <div className="w-14 h-14 bg-[#00BFA5] text-white rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 animate-pulse shadow-[0_0_20px_rgba(0,191,165,0.4)]">2</div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Asegura tu cupo (Importante)</h3>
          <p className="text-slate-400 text-base leading-relaxed">Déjanos tu correo aquí abajo y toca el botón verde. Se abrirá tu WhatsApp con un mensaje automático listo para enviarnos. <strong>Dale a enviar para guardar tu contacto.</strong></p>
        </div>
      </div>
      
      <div className="relative">
         <FileText className="absolute left-4 top-4 w-6 h-6 text-slate-500 pointer-events-none" />
         <input 
           type="email" 
           placeholder="¿A qué correo te enviamos el Drive?" 
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className="w-full pl-14 pr-5 py-4 bg-slate-800 border-2 border-slate-700 rounded-2xl outline-none font-medium text-white placeholder:text-slate-500 text-lg focus:border-[#00BFA5] focus:bg-slate-800 transition-all mb-5 shadow-inner"
         />
      </div>

      <motion.a 
        href={generateDynamicWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        whileTap={{ scale: 0.96 }}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-b from-[#25D366] to-[#1DA851] text-white text-xl md:text-2xl font-black py-6 px-6 rounded-2xl shadow-[0_10px_30px_rgba(37,211,102,0.3)] active:translate-y-1 hover:brightness-110 transition-all"
      >
        <MessageCircle className="w-8 h-8" />
        IR A WHATSAPP AHORA
      </motion.a>
    </div>
  );
}

// --- SUB-COMPONENT: FOMO LIVE NOTIFICATIONS ---
function LiveFomoNotifications() {
  const [currentNotif, setCurrentNotif] = useState<{name: string, action: string} | null>(null);

  const notifications = [
    { name: "María de Lima", action: "acaba de acceder al Drive ⚡" },
    { name: "Juan de Arequipa", action: "compró el curso (Oferta S/ 19.90)" },
    { name: "Lucía de Cusco", action: "acaba de acceder al Drive ⚡" },
    { name: "Carlos de Trujillo", action: "compró el curso (Oferta S/ 19.90)" },
    { name: "Andrea de Piura", action: "empezó a descargar el PDF ⚡" }
  ];

  useEffect(() => {
    const triggerNotification = () => {
      const randomNotif = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotif(randomNotif);
      setTimeout(() => {
        setCurrentNotif(null);
      }, 4000);
    };

    const initialDelay = setTimeout(triggerNotification, Math.random() * 3000 + 2000);
    const loop = setInterval(triggerNotification, 12000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {currentNotif && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/95 backdrop-blur-md p-3 pr-6 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{currentNotif.name}</p>
              <p className="text-xs text-slate-600">{currentNotif.action}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENT: TESTIMONIAL SLIDER ---
function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Carlos M.",
      text: "En 2 meses ya pude tener mi primera entrevista en inglés. Todo en el Drive está súper ordenado. S/ 19.90 es un regalo."
    },
    {
      name: "Lucía R.",
      text: "Me daba miedo pagar por Yape, pero envié la captura al WhatsApp y me mandaron el enlace del Drive en menos de 2 minutos. ¡Increíble!"
    },
    {
      name: "Jorge T.",
      text: "Los audios de reprogramación son oro puro. Los escucho todos los días en el bus hacia el trabajo. Totalmente recomendado."
    },
    {
      name: "Ana P.",
      text: "Nunca pensé que S/ 19.90 me daría tanto material. Las 134 clases en video son súper claras y directas al grano. Sin relleno."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-white px-4 border-t border-slate-100 overflow-hidden">
      <div className="max-w-md mx-auto text-center h-[220px] flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute w-full top-0"
          >
            <div className="flex justify-center gap-1 text-yellow-400 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-slate-700 italic text-lg mb-6 px-2 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </p>
            <p className="font-bold text-slate-900 flex items-center justify-center gap-2">
              - {testimonials[currentIndex].name}
              <span className="text-xs text-[#00BFA5] font-normal bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                 <CheckCircle2 className="w-3 h-3" /> Alumno Verificado
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-[#00BFA5]' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}