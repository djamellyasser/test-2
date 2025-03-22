"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<{ prediction: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [animateIn, setAnimateIn] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL for the image
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Veuillez sélectionner une image!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setPrediction(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 seconds timeout
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("Une erreur s'est produite lors de l'analyse! Veuillez vérifier que le serveur backend est en cours d'exécution.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-200 transition-opacity duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxNDI1MzQiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzFhMSAxIDAgMTEtMiAwIDEgMSAwIDAxMiAwem0tMTAgMGExIDEgMCAxMS0yIDAgMSAxIDAgMDEyIDB6bTIwIDBhMSAxIDAgMTEtMiAwIDEgMSAwIDAxMiAweiIgZmlsbD0iIzFmMzg1MCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      
      <header className="w-full max-w-4xl mx-auto mb-8 px-4">
        <div className="flex items-center justify-between py-4 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h1 className="text-xl font-semibold tracking-tight">Djamel<span className="text-blue-500">Scan</span></h1>
          </div>
          <div className="text-sm font-medium text-slate-400">
            Système d'Analyse Radiologique par Djamel
          </div>
        </div>
      </header>
      
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-100 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Instructions
            </h2>
            
            <div className="space-y-4 text-slate-300">
              <p className="leading-relaxed">
                Ce système utilise l'intelligence artificielle pour analyser les images radiologiques et détecter d'éventuelles anomalies. Suivez les étapes ci-dessous pour obtenir une analyse précise.
              </p>
              
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li className="pl-2">Sélectionnez une image radiologique claire au format PNG, JPG ou JPEG</li>
                <li className="pl-2">Vérifiez que l'image est bien cadrée et de bonne qualité</li>
                <li className="pl-2">Cliquez sur "Analyser l'image" pour lancer le traitement</li>
                <li className="pl-2">Consultez les résultats de l'analyse et le niveau de confiance</li>
              </ol>
              
              <div className="bg-blue-900/30 border border-blue-800 rounded-md p-4 mt-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold">Note:</span> Ce système est conçu pour aider les professionnels de santé et ne remplace pas un diagnostic médical complet.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-100 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 13L11.2929 15.2929C11.6834 15.6834 12.3166 15.6834 12.7071 15.2929L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Analyse d'Image
            </h2>
            
            <div className="space-y-6">
              <div className="relative group">
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  className="hidden" 
                  id="file-upload"
                  accept="image/*"
                />
                <label 
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-slate-700/50 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:bg-slate-700/70 hover:border-blue-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-slate-400">
                      <span className="font-semibold">Cliquez pour sélectionner</span> ou glissez-déposez
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG, JPEG (Max: 10MB)</p>
                  </div>
                </label>
              </div>

              {previewUrl && (
                <div className="animate-fadeIn">
                  <div className="relative w-full h-48 overflow-hidden rounded-lg border border-slate-700">
                    <img 
                      src={previewUrl} 
                      alt="Aperçu de l'image" 
                      className="w-full h-full object-contain bg-slate-900/50 p-2"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-900/70 backdrop-blur-sm text-xs text-slate-300 py-1 px-2">
                      {file?.name}
                    </div>
                  </div>
                </div>
              )}

      <button
        onClick={handleUpload}
                disabled={loading || !file}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
                  loading || !file 
                    ? 'bg-slate-700 cursor-not-allowed opacity-70' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-900/30'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyse en cours...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Analyser l'image
                  </span>
                )}
      </button>

      {prediction && (
                <div className="animate-fadeIn">
                  <div className="p-5 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-slate-100 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Résultats de l'analyse
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                        <span className="text-slate-400">Diagnostic:</span>
                        <span className="font-semibold text-lg text-slate-100">{prediction.prediction}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Niveau de confiance:</span>
                          <span className="font-semibold text-slate-100">{(prediction.confidence * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                              prediction.confidence > 0.7 
                                ? 'bg-green-500' 
                                : prediction.confidence > 0.4 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400">
                        <p>Date d'analyse: {new Date().toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full max-w-4xl mx-auto mt-auto px-4 py-6 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} DjamelScan | Tous droits réservés
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-slate-500 hover:text-blue-500 transition">Confidentialité</a>
            <a href="#" className="text-sm text-slate-500 hover:text-blue-500 transition">Conditions</a>
            <a href="#" className="text-sm text-slate-500 hover:text-blue-500 transition">Contact</a>
          </div>
        </div>
      </footer>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
