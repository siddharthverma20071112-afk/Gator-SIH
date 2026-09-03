import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Bot, 
  User, 
  RefreshCw,
  Send,
  HelpCircle,
  TrendingUp,
  MapPin,
  Building,
  Coins
} from 'lucide-react';
import { ExtractedFacts, ChatMessage, BusinessType } from '../types';
import { SAMPLE_PRESETS, PresetDemo } from '../data/samplePresets';

interface VoiceCallSimulatorProps {
  currentFacts: ExtractedFacts;
  setCurrentFacts: React.Dispatch<React.SetStateAction<ExtractedFacts>>;
  onPipelineTrigger: (facts: ExtractedFacts) => Promise<void>;
  isProcessingPipeline: boolean;
  onViewReport: () => void;
}

export const VoiceCallSimulator: React.FC<VoiceCallSimulatorProps> = ({
  currentFacts,
  setCurrentFacts,
  onPipelineTrigger,
  isProcessingPipeline,
  onViewReport
}) => {
  const [callActive, setCallActive] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'नमस्ते! ग्रामीण सेतु हेल्पलाइन (1800-889-SETU) में आपका स्वागत है। बताइए, आप कौन सा व्यवसाय शुरू करना चाहते हैं और आपके पास कितनी जमा पूंजी है?',
      audioText: 'नमस्ते! ग्रामीण सेतु हेल्पलाइन में आपका स्वागत है। बताइए, आप कौन सा व्यवसाय शुरू करना चाहते हैं?',
      timestamp: 'Just now'
    }
  ]);

  const [recognitionSupported, setRecognitionSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  // Initialize Web Speech Recognition if available
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setRecognitionSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'hi-IN'; // Default to Hindi

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserSpokenInput(transcript);
        setIsListening(false);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Call duration timer
  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callActive]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAiThinking]);

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Text-to-Speech speaking assistant
  const speakText = (text: string) => {
    if (!isTtsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis unsupported or silent fallback
    }
  };

  const startCall = () => {
    setCallActive(true);
    speakText('नमस्ते! ग्रामीण सेतु हेल्पलाइन में आपका स्वागत है। बताइए, आप कौन सा व्यवसाय शुरू करना चाहते हैं और आपके पास कितनी जमा पूंजी है?');
  };

  const endCall = () => {
    setCallActive(false);
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      // Graceful fallback without blocking window.alert
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleUserSpokenInput = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    // Add user message to history
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: spokenText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setTextInput('');
    setIsAiThinking(true);

    try {
      const response = await fetch('/api/voice/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: spokenText,
          history: chatHistory.map((m) => ({ role: m.sender, text: m.text })),
          currentFacts
        })
      });

      const data = await response.json();
      setIsAiThinking(false);

      if (data.extracted) {
        setCurrentFacts((prev) => ({ ...prev, ...data.extracted }));
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.replyText,
        audioText: data.replyAudioText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory((prev) => [...prev, aiMsg]);
      speakText(data.replyAudioText || data.replyText);

      // If conversation complete or user said enough, trigger data engine & pipeline!
      if (data.isComplete) {
        const mergedFacts = { ...currentFacts, ...data.extracted };
        // Small delay to simulate rural data engine lookup
        setTimeout(() => {
          onPipelineTrigger(mergedFacts);
        }, 1200);
      }
    } catch {
      setIsAiThinking(false);
    }
  };

  // Quick preset loading for judges
  const handleQuickPreset = (preset: PresetDemo) => {
    setCurrentFacts(preset.facts);
    handleUserSpokenInput(preset.voiceScriptHi);
  };

  const requiredFields = [
    { key: 'business', label: 'व्यवसाय (Business)', ok: Boolean(currentFacts.business), val: currentFacts.business },
    { key: 'marginCapital', label: 'जमा पूंजी (Capital)', ok: Boolean(currentFacts.marginCapital), val: currentFacts.marginCapital ? `₹${currentFacts.marginCapital.toLocaleString('en-IN')}` : null },
    { key: 'location', label: 'स्थान (Village/District)', ok: Boolean(currentFacts.village || currentFacts.district), val: currentFacts.village ? `${currentFacts.village}, ${currentFacts.district || ''}` : null },
    { key: 'experienceYears', label: 'अनुभव (Experience)', ok: currentFacts.experienceYears !== undefined, val: currentFacts.experienceYears !== undefined ? `${currentFacts.experienceYears} Years` : null },
    { key: 'hasLandOrShop', label: 'जमीन / दुकान (Premise)', ok: currentFacts.hasLandOrShop !== undefined, val: currentFacts.hasLandOrShop ? 'उपलब्ध' : 'किराये पर' }
  ];

  const completedCount = requiredFields.filter((f) => f.ok).length;
  const isAllReady = completedCount >= 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Phone Call Simulator Frame (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        {/* Mobile Header / Status */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight text-white">
                  ग्रामीण सेतु Voice AI Consultant
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live IVR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Toll-Free Dial: <span className="text-slate-200 font-mono font-medium">1800-889-SETU</span> (Hindi / Hinglish)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTtsEnabled(!isTtsEnabled)}
              className={`p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors border ${
                isTtsEnabled ? 'bg-slate-800 text-indigo-300 border-slate-700' : 'bg-slate-800/60 text-slate-500 border-slate-800'
              }`}
              title={isTtsEnabled ? 'Speech Voice Sound On' : 'Speech Voice Muted'}
            >
              {isTtsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400 shadow-2xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{callActive ? formatCallTime(callDuration) : '00:00'}</span>
            </div>
          </div>
        </div>

        {/* Active Call HUD Banner */}
        <div className="bg-slate-800/90 px-4 py-2.5 text-slate-200 flex items-center justify-between border-b border-slate-700/80">
          <div className="flex items-center gap-3">
            {callActive ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-emerald-300">कॉल चालू है (Call Connected & Active)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span className="text-xs text-slate-400">कॉल शुरू करने के लिए नीचे हरा बटन दबाएं</span>
              </div>
            )}
          </div>

          {/* Soundwave Animation during call */}
          {callActive && (
            <div className="flex items-center gap-1 h-4">
              <span className="w-1 bg-emerald-400 rounded-full h-2 animate-bounce"></span>
              <span className="w-1 bg-emerald-400 rounded-full h-4 animate-pulse"></span>
              <span className="w-1 bg-emerald-300 rounded-full h-3 animate-bounce"></span>
              <span className="w-1 bg-emerald-400 rounded-full h-4 animate-pulse"></span>
              <span className="w-1 bg-emerald-300 rounded-full h-1 animate-bounce"></span>
            </div>
          )}
        </div>

        {/* Conversation Message Stream */}
        <div className="p-4 h-80 sm:h-96 overflow-y-auto bg-slate-50/60 space-y-3">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-xl bg-slate-900 text-indigo-400 flex items-center justify-center text-xs shrink-0 mt-1 shadow-2xs border border-slate-800">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1 font-mono ${
                    msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 text-slate-200 flex items-center justify-center text-xs shrink-0 mt-1 shadow-2xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isAiThinking && (
            <div className="flex gap-2.5 items-center text-xs text-slate-600 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs w-fit">
              <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
              <span>AI विश्लेषण कर रहा है (Gemini reasoning)...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Chips for Evaluators & Fast Testing */}
        <div className="p-3 bg-slate-50 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              बोलने के नमूने (Click to Speak Preset to AI):
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">SIH Fast Demo</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  if (!callActive) setCallActive(true);
                  handleQuickPreset(preset);
                }}
                className="px-2.5 py-1 text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              >
                {preset.title.split(' ')[0]}: "{preset.voiceScriptHi.slice(0, 32)}..."
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Call Controls */}
        <div className="p-3.5 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-2.5">
          {/* Main Call Button (Green Dial / Red Hangup) */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            {!callActive ? (
              <button
                onClick={startCall}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl font-semibold text-xs shadow-xs transition-all cursor-pointer w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                <span>कॉल शुरू करें (Start Call)</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white rounded-xl font-semibold text-xs shadow-xs transition-all cursor-pointer w-full sm:w-auto"
              >
                <PhoneOff className="w-4 h-4" />
                <span>समाप्त (End)</span>
              </button>
            )}

            {/* Mic Toggle */}
            <button
              onClick={toggleMic}
              disabled={!callActive}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : callActive
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
              title="Click to speak through microphone"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Spoken Text Input (For testing or noisy environments) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (textInput.trim()) {
                if (!callActive) setCallActive(true);
                handleUserSpokenInput(textInput);
              }
            }}
            className="flex items-center gap-1.5 w-full flex-1"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={isListening ? '🎤 आपकी आवाज रिकॉर्ड हो रही है...' : 'हिंदी या अंग्रेजी में बोलें या टाइप करें...'}
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden transition-all"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || isAiThinking}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN: Real-Time Fact Extraction HUD & Pipeline Trigger (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        {/* Extraction Progress Card */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Information Extraction HUD</span>
              </h3>
              <p className="text-xs text-slate-500">
                Real-time factual parameters parsed by Gemini LLM
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              {completedCount} / {requiredFields.length} Ready
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / requiredFields.length) * 100}%` }}
            ></div>
          </div>

          {/* Checklist of facts */}
          <div className="space-y-2">
            {requiredFields.map((field) => (
              <div
                key={field.key}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                  field.ok
                    ? 'bg-emerald-50/60 border-emerald-200/80 text-slate-900'
                    : 'bg-slate-50/80 border-slate-200/80 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  {field.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                  <span className={field.ok ? 'font-medium text-slate-800' : 'text-slate-500'}>
                    {field.label}
                  </span>
                </div>
                <span className="font-semibold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200/80 shadow-2xs">
                  {field.val || 'प्रतीक्षारत (Pending)'}
                </span>
              </div>
            ))}
          </div>

          {/* Pipeline Trigger Action Button */}
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => onPipelineTrigger(currentFacts)}
              disabled={isProcessingPipeline}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isProcessingPipeline ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-200" />
                  <span>डाटा एवं व्यवहार्यता गणना चालू है...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Feasibility & Loan Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={onViewReport}
              className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl font-semibold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              View Generated WhatsApp & Bank Dossier
            </button>
          </div>
        </div>

        {/* Architecture Note for SIH Judges */}
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 text-xs border border-slate-800 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>SIH Evaluation Flow (Stage 1 to 7)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            In standard IVR, the villager simply speaks in natural Hindi. Our LLM parses the transcript, asks <strong className="text-white">only the missing fields</strong>, and automatically executes the Census & OSM Data Engine without any manual form filling.
          </p>
        </div>
      </div>
    </div>
  );
};
