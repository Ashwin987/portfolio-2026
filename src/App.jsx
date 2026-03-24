import React, { useState, useEffect } from 'react';

// 6-Second Auto-Rotating Slideshow Component with Manual Arrows
const TacticalCarousel = ({ images, linksToApp = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Rotates every 6 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[350px] md:h-[450px] rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm bg-[#f8fafc] group mb-[15px]">
      {images.map((img, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          {linksToApp ? (
            <a href="https://huggingface.co/spaces/ashwinramaseshan/tactical-ai-analyzer" target="_blank" rel="noreferrer" className="w-full h-full block relative cursor-pointer">
              <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-contain p-[10px]" />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-[#111827] px-[20px] py-[10px] rounded-full font-[700] text-[0.9rem]">View Live App</span>
              </div>
            </a>
          ) : (
            <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-contain p-[10px]" />
          )}
        </div>
      ))}
      
      {/* Left Arrow */}
      <button onClick={goToPrevious} className="absolute left-[15px] top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-[40px] h-[40px] rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <i className="fas fa-chevron-left"></i>
      </button>

      {/* Right Arrow */}
      <button onClick={goToNext} className="absolute right-[15px] top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-[40px] h-[40px] rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-[15px] left-0 right-0 flex justify-center gap-[8px] z-20">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-[10px] h-[10px] rounded-full transition-all shadow-sm ${idx === currentIndex ? 'bg-[#2563eb] w-[25px]' : 'bg-[#d1d5db] hover:bg-[#9ca3af]'}`} />
        ))}
      </div>
    </div>
  );
};
// --- TYPEWRITER COMPONENT ---
const Typewriter = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const phrases = ["a Data Scientist.", "a Full-Stack Developer.", "an AI Engineer.", "a Sports Analyst.", "a Researcher."];

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-[#2563eb] font-[600]">
      {text}
      <span className="animate-pulse border-r-[2px] border-[#2563eb] ml-[1px]">&nbsp;</span>
    </span>
  );
};

// --- TACTICAL ENGINE CAROUSEL COMPONENT ---
const ProjectCarousel = () => {
  const images = ["/Preview.png", "/Squad.png", "/moneyball.png", "/player.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <a 
      href="https://tactical-recruitment-engine.streamlit.app/" 
      target="_blank" 
      rel="noreferrer" 
      className="block w-full mb-[30px] rounded-[12px] overflow-hidden border border-black/5 shadow-inner group relative aspect-video bg-gray-50"
    >
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt="Project Preview"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
        <span className="bg-white text-[#2563eb] px-[24px] py-[12px] rounded-full font-bold shadow-xl border border-blue-100">
          Show Website
        </span>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5'
            }`}
          />
        ))}
      </div>
    </a>
  );
};

// --- MAIN APPLICATION ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const NavButton = ({ page, label }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`transition text-[0.95rem] font-[500] relative pb-[4px] ${
        currentPage === page 
          ? 'text-[#2563eb]' 
          : 'text-[#111827] hover:text-[#2563eb]'
      }`}
    >
      {label}
      <span className={`absolute bottom-[-4px] left-0 h-[2px] bg-[#2563eb] transition-all duration-300 ${currentPage === page ? 'w-full' : 'w-0'}`}></span>
    </button>
  );

  return (
    <div className="bg-[#f3f4f6] text-[#111827] min-h-screen font-sans flex flex-col items-center">
      
      {/* Global Navigation Bar */}
      <div className="w-full max-w-[850px] px-[20px]">
        <nav className="py-[30px] flex justify-end gap-[25px] animate-fade-in w-full">
            <NavButton page="home" label="Home" />
            <NavButton page="thesis" label="Thesis" />
            <NavButton page="academic" label="Academic Projects" />
            <NavButton page="sports" label="Sports Analytics" />
            <NavButton page="resume" label="Resume" />
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[850px] px-[20px] pb-[40px]">
        
        {/* ================= HOME PAGE ================= */}
        {currentPage === 'home' && (
          <div className="flex flex-col justify-center items-center text-center animate-fade-in mt-[40px]">
            <div className="bg-[#ffffff] border border-white/50 rounded-[20px] px-[40px] py-[60px] w-full shadow-[0_15px_50px_-10px_rgba(0,0,0,0.1)] relative transition-all duration-300 transform-gpu hover:scale-[1.01] hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]">

              <img 
                src="/linkedin.jpg" 
                alt="Ashwin Ramaseshan" 
                className="w-[160px] h-[160px] rounded-full object-cover border-[4px] border-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] mx-auto mb-[25px] transition-transform duration-300 hover:scale-[1.05]"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Ashwin+Ramaseshan&background=0D8ABC&color=fff&size=150' }}
              />

              <h1 className="text-[2.5rem] font-[800] tracking-[-0.5px] text-[#111827] m-0 mb-[10px]">
                Ashwin Ramaseshan
              </h1>

              <div className="text-[1.1rem] text-[#2563eb] font-[600] mb-[20px] h-[1.5em]">
                I am <Typewriter />
              </div>

              <div className="flex justify-center gap-[20px] my-[20px] mb-[30px]">
                <a href="https://www.linkedin.com/in/ashwin-ramaseshan-a63188201/" target="_blank" rel="noreferrer" className="text-[#6b7280] hover:text-[#2563eb] hover:-translate-y-[3px] text-[1.6rem] transition-all"><i className="fab fa-linkedin"></i></a>
                <a href="mailto:ashwin.ramaseshan@ucla.edu" className="text-[#6b7280] hover:text-[#2563eb] hover:-translate-y-[3px] text-[1.6rem] transition-all"><i className="fas fa-envelope"></i></a>
                <a href="https://github.com/Ashwin987" target="_blank" rel="noreferrer" className="text-[#6b7280] hover:text-[#2563eb] hover:-translate-y-[3px] text-[1.6rem] transition-all"><i className="fab fa-github"></i></a>
              </div>

              <div className="text-[1.15rem] text-[#6b7280] max-w-[680px] mx-auto font-[300] leading-[1.6] mb-[30px] space-y-[15px]">
                <p>
                  I am a Master’s student in Applied Statistics and Data Science at UCLA and a UC Riverside Alumni in Computer Science. My technical expertise sits at the intersection of AI, Machine Learning, and Full-Stack Data Science.
                </p>
                <p>
                  I have extensive experience designing end-to-end data systems, from building predictive machine learning models and automating data workflows to deploying full-stack applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= THESIS PAGE ================= */}
        {currentPage === 'thesis' && (
          <div className="animate-fade-in w-full max-w-[850px] mx-auto">
            
            {/* Thesis Header */}
            <div className="text-center mb-[40px]">
              <div className="inline-block bg-[#fffbeb] text-[#92400e] px-[16px] py-[6px] rounded-[50px] text-[0.85rem] font-[700] mb-[15px] border border-[#fcd34d] tracking-[0.5px] uppercase">
                <i className="fas fa-tools mr-2"></i> Work in Progress
              </div>
              <h1 className="text-[2.2rem] font-[800] m-0 mb-[15px] tracking-[-0.5px] text-[#111827]">
                Spatial Modeling of Los Angeles County Fires
              </h1>
              <p className="text-[#6b7280] text-[1.1rem] font-[300] max-w-[600px] mx-auto m-0 leading-[1.6]">
                Master's Dissertation • UCLA (Expected Finish 2026)
              </p>
            </div>

            {/* Thesis Content Card */}
            <main className="bg-[#ffffff] rounded-[20px] p-[30px] md:p-[50px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border-t-[6px] border-t-[#7c3aed]">
              
              {/* Draft Notice Box */}
              <div className="bg-[#f9fafb] border-l-[4px] border-l-[#7c3aed] px-[20px] py-[15px] rounded-[6px] text-[0.95rem] text-[#6b7280] mb-[30px]">
                <strong className="text-[#111827]">Current Status: Rough Draft.</strong> The methodology, results, and text presented below represent ongoing research. This document is actively being updated as the thesis progresses toward final publication.
              </div>
              
              <h3 className="text-[1.25rem] font-[700] text-[#111827] mt-[35px] mb-[15px] border-l-[4px] border-l-[#7c3aed] pl-[15px]">
                Overview: The Escalating Crisis
              </h3>
              <p className="text-[#6b7280] mb-[20px] text-[1.05rem] text-justify leading-[1.6]">
                Wildfire risk has become an urgent concern across the western United States, with California experiencing unprecedented fire seasons over the last two decades. According to Cal Fire, seven of the ten largest wildfires in state history have occurred since 2017. Los Angeles County represents a particularly compelling study area due to its heterogeneous geography—encompassing coastal regions, dense urban development, and mountainous terrain. The interplay of Santa Ana winds, prolonged droughts, and development at the wildland–urban interface (WUI) has amplified the frequency and destructiveness of these events, overwhelming response capabilities and creating billions of dollars in economic losses.
              </p>

              <h3 className="text-[1.25rem] font-[700] text-[#111827] mt-[35px] mb-[15px] border-l-[4px] border-l-[#7c3aed] pl-[15px]">
                Methodological Challenges
              </h3>
              <p className="text-[#6b7280] mb-[20px] text-[1.05rem] text-justify leading-[1.6]">
                Efforts to model wildfire occurrence span a wide spectrum, yet significant gaps remain. Traditional regression-based approaches (Logistic, Poisson) offer interpretability but struggle with complex, nonlinear interactions. Conversely, modern Machine Learning methods (Random Forests, Neural Networks) excel at capturing nonlinearities but suffer from a "black box" nature that limits statistical inference. Furthermore, many survival analysis approaches focus purely on the temporal aspect (time-to-fire), often failing to fully integrate the critical spatial dependencies inherent in wildfire spread.
              </p>

              <h3 className="text={1.25rem] font-[700] text-[#111827] mt-[35px] mb-[15px] border-l-[4px] border-l-[#7c3aed] pl-[15px]">
                The Solution: Spatio-Temporal SG Models
              </h3>
              <p className="text-[#6b7280] mb-[20px] text-[1.05rem] text-justify leading-[1.6]">
                This thesis bridges these gaps by applying and extending the <strong className="text-[#111827]">Stoyan–Grabarnik (SG)</strong> framework. Unlike purely temporal or spatial models, the SG model treats fire ignitions as "events" in continuous space and time. It integrates spatial kernels and temporal decay functions into a unified conditional intensity model.
              </p>
              
              <p className="text-[#6b7280] mb-[20px] text-[1.05rem] text-justify leading-[1.6]">
                By explicitly incorporating covariates—such as temperature, wind speed, and, crucially, <strong className="text-[#111827]">time-since-burn metrics</strong>—the model captures both external environmental drivers and internal fuel dynamics. This contribution applies the SG framework to the county level, offering a rigorous, interpretable method for understanding where and when fires are most likely to recur in high-risk regions like Los Angeles.
              </p>

              <div className="mt-[40px] flex gap-[15px] justify-center flex-wrap">
                <span className="px-[30px] py-[12px] rounded-[8px] font-[600] text-[1rem] inline-flex items-center gap-[10px] bg-[#7c3aed] text-white shadow-[0_4px_15px_rgba(124,58,237,0.3)] cursor-default opacity-70">
                  <i className="fab fa-github"></i> Repository Coming Soon
                </span>
                <span className="px-[30px] py-[12px] rounded-[8px] font-[600] text-[1rem] inline-flex items-center gap-[10px] bg-transparent text-[#111827] border border-[#e5e7eb] cursor-default opacity-70">
                  <i className="fas fa-file-pdf"></i> PDF Coming Soon
                </span>
              </div>

            </main>
          </div>
        )}

        {/* ================= ACADEMIC PROJECTS PAGE ================= */}
        {currentPage === 'academic' && (
          <div className="animate-fade-in flex flex-col">
            <div className="text-center mb-[40px]">
              <h1 className="text-[2.2rem] font-[800] tracking-[-0.5px] mb-[10px] text-[#111827] m-0">Academic & Technical Projects</h1>
              <p className="text-[1.1rem] font-[300] text-[#6b7280] m-0">Statistical modeling, full-stack development, and Generative AI research.</p>
            </div>

            {[
              { 
                title: "Predicting & Generative AI for Digital Marketing Data", 
                stack: "Python • PyTorch • CTGAN • GPT-2 • Synthetic Data", 
                desc: "Collaborated on a project evaluating generative models (CTGAN, TabDDPM, TVAE, GPT-2) for synthesizing digital marketing datasets to improve ad targeting. CTGAN achieved the best overall performance, demonstrating its suitability for privacy-sensitive environments.",
                code: "https://github.com/Ashwin987/generative-ai-digital-marketing/tree/main",
                report: "https://github.com/Ashwin987/generative-ai-digital-marketing/raw/main/Predictive%20%26%20Generative%20AI%20for%20Digital%20Marketing%20Data.pdf"
              },
              { 
                title: "Predicting Sales Revenue", 
                stack: "R • Lasso & Ridge Regression • PCR • OLS", 
                desc: "Developed predictive models to forecast sales revenue using a dataset of 2,000 observations. Results showed that Lasso and PCR achieved the highest predictive accuracy (RMSE ≈ 96.5).",
                code: "https://github.com/Ashwin987/Predicting-Sales-Revenue",
                report: "https://github.com/Ashwin987/Predicting-Sales-Revenue/raw/main/412_Final_Report-.pdf"
              },
              { 
                title: "Modeling U.S. Inflation Using Macroeconomic Indicators", 
                stack: "R • Generalized Additive Models (GAM) • C Integration", 
                desc: "Analyzed 33 years of U.S. economic data to identify drivers of inflation. The GAM approach achieved a significantly better fit (R² ≈ 0.581) than linear models. Implemented custom C functions for efficiency.",
                code: "https://github.com/Ashwin987/Modeling-U.S.-Inflation-Using-Macroeconomic-Indicators",
                report: "https://github.com/Ashwin987/Modeling-U.S.-Inflation-Using-Macroeconomic-Indicators/raw/main/Inflation_Project__404__Final_Report.pdf"
              },
              { 
                title: "Spotify Weekly Playlist Archiver", 
                stack: "Python • Spotify Web API • OAuth • Automation", 
                desc: "Built an automated solution using the Spotify Web API that extracts tracks from the temporary weekly playlist and archives them into a permanent collection.",
                code: "https://github.com/Ashwin987/SpotifyAPI"
              },
              { 
                title: "Predicting Student GPA Using Lifestyle Factors", 
                stack: "R • Multinomial Logistic Regression", 
                desc: "Analyzed the influence of lifestyle factors (sleep, study habits) on academic performance. Built four Multinomial Logistic Regression models to classify GPA into tiers.",
                code: "https://github.com/Ashwin987/Applied-Statistics-Modeling-Project"
              },
              { 
                title: "FastWeather App", 
                stack: "JavaScript • OpenWeatherMap API • HTML/CSS", 
                desc: "Developed a responsive weather application that leverages the OpenWeatherMap API and browser Geolocation API.",
                code: "https://github.com/Ashwin987/FastWeather"
              },
              { 
                title: "Life Insurance Market Targeting Analysis", 
                stack: "R • Data Scraping • Excel • FRED Economic Data", 
                desc: "Analyzed age-related premature death rates in 36 California counties to optimize life insurance targeting strategies using FRED data.",
                code: "https://github.com/Ashwin987/Insurance-Data-Project"
              }
            ].map((proj, idx) => (
              <div key={idx} className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
                <div className="text-[1.4rem] font-[700] text-[#111827] mb-[8px]">{proj.title}</div>
                <span className="text-[0.9rem] text-[#2563eb] font-[600] mb-[15px] block uppercase tracking-[0.5px]">{proj.stack}</span>
                <p className="text-[#6b7280] mb-[15px] text-[1rem]">{proj.desc}</p>
                <div className="mt-[25px] flex flex-wrap gap-[12px]">
                  <a href={proj.code} target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                    <i className="fab fa-github"></i> View Code
                  </a>
                  {proj.report && (
                    <a href={proj.report} target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-transparent text-[#111827] border border-[#e5e7eb] hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all">
                      <i className="fas fa-file-pdf"></i> View Final Report
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        
       {/* ================= SPORTS ANALYTICS PAGE ================= */}
        {currentPage === 'sports' && (
          <div className="animate-fade-in flex flex-col">
            <div className="text-center mb-[40px]">
              <h1 className="text-[2.2rem] font-[800] tracking-[-0.5px] mb-[10px] text-[#111827] m-0">Sports Analytics</h1>
              <p className="text-[1.1rem] font-[300] text-[#6b7280] m-0">Data-driven insights into the EPL, NBA, and modern football tactics.</p>
            </div>

            {/* NEW FEATURED PROJECT: AI TACTICAL GAME ANALYZER (THE HOOK) */}
            <div 
              onClick={() => setCurrentPage('tactical-ai')}
              className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_15px_40px_-10px_rgba(37,99,235,0.15)] border-l-[6px] border-l-[#2563eb] border border-black/5 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.25)] cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row gap-[30px] items-center">
                <div className="w-full md:w-1/3 overflow-hidden rounded-[12px] bg-[#f8fafc]">
                  <img src="/Overview.png" alt="AI Tactical Game Analyzer" className="w-full h-auto object-contain p-[5px] group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between items-center mb-[8px]">
                    <div className="text-[1.8rem] font-[800] text-[#111827]">AI Tactical Game Analyzer</div>
                    <span className="text-[#2563eb] bg-[#eff6ff] px-[12px] py-[4px] rounded-full text-[0.85rem] font-[700] uppercase tracking-[1px]">Live AI Engine</span>
                  </div>
                  <span className="text-[0.95rem] text-[#2563eb] font-[700] mb-[15px] block uppercase tracking-[1px]">Python • Gemini 2.5 Flash • OpenCV • Hugging Face</span>
                  <p className="text-[#6b7280] text-[1.05rem] leading-[1.7] text-justify mb-[20px]">
                    A fully autonomous tactical analysis pipeline that bridges the gap between raw video footage and structured, actionable coaching data. By seamlessly watching and interpreting live match events, the engine translates complex on-field advanced tactics into clear, strategic insights—acting as a virtual assistant coach.
                  </p>
                  <div className="inline-flex items-center gap-[8px] text-[#2563eb] font-[600]">
                    View Full Model & Engine <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURED PROJECT: TACTICAL RECRUITMENT ENGINE */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-[1.8rem] font-[800] text-[#111827] mb-[8px]">Tactical Recruitment Engine</div>
              <span className="text-[0.95rem] text-[#2563eb] font-[700] mb-[20px] block uppercase tracking-[1px]">Python  • KNN • PCA • K-Means • FBref Data</span>
              
              {/* Slideshow Carousel */}
              <ProjectCarousel />

              <div className="text-[#6b7280] space-y-[20px] text-[1.05rem] leading-[1.7] text-justify">
                <p>
                  In modern scouting, the question is often whether a player is good enough. But maybe the better question is whether the player is truly understood. A scout may naturally overvalue a player’s aesthetic flair while missing the underlying, repetitive actions that actually drive winning football.
                </p>
                <p>
                  This project introduces the Pro-Vision Tactical Analysis, an automated, data-driven recruitment and tactical evaluation platform designed for Directors of Football and recruitment analysts. Utilizing comprehensive player data from the 2024-2025 season via FBref, the project leverages unsupervised machine learning algorithms—specifically K-Nearest Neighbors (KNN), Principal Component Analysis (PCA), and K-Means Clustering—alongside a custom algorithmic profiling engine. The platform objectively maps player DNA across 17 distinct tactical archetypes. The resulting tool enables automated statistical cloning, precise positional profiling, objective head-to-head squad evaluation, and market-value-adjusted scouting, effectively bridging the gap between raw statistical data and real-world tactical application on the pitch.
                </p>
              </div>

              <div className="mt-[35px] flex flex-wrap gap-[12px]">
                <a href="https://github.com/Ashwin987/tactical-recruitment-engine" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                  <i className="fab fa-github"></i> View Code
                </a>
                <a href="/Tactical DNA Scouting Report.pdf" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-transparent text-[#111827] border border-[#e5e7eb] hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all">
                  <i className="fas fa-file-pdf"></i> Scouting Report
                </a>
              </div>
            </div>

            {/* AFC Bournemouth */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-[1.4rem] font-[700] text-[#111827] mb-[8px]">AFC Bournemouth Scouting Report - Summer 2025</div>
              <span className="text-[0.9rem] text-[#2563eb] font-[600] mb-[15px] block uppercase tracking-[0.5px]">R • Clustering • Radar Charts • Efficiency Scoring</span>
              <p className="text-[#6b7280] mb-[15px] text-[1rem]">Developed a data-driven recruitment strategy to support AFC Bournemouth's summer transfer window. Utilized K-Means clustering and custom Efficiency Scores to identify players fitting the tactical profile. The analysis successfully identified Bafodé Diakité as a top target.</p>
              <div className="mt-[25px] flex flex-wrap gap-[12px]">
                <a href="https://github.com/Ashwin987/afc-bournemouth-" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                  <i className="fab fa-github"></i> View Code
                </a>
                <a href="/Bournmouth_project-3.pdf" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-transparent text-[#111827] border border-[#e5e7eb] hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all">
                  <i className="fas fa-file-pdf"></i> Scouting Report
                </a>
              </div>
            </div>

            {/* Chelsea FC */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-[1.4rem] font-[700] text-[#111827] mb-[8px]">Monitoring Injury Risk & Performance: Chelsea FC</div>
              <span className="text-[0.9rem] text-[#2563eb] font-[600] mb-[15px] block uppercase tracking-[0.5px]">Python • Power BI • Random Forest • Time-Series</span>
              <p className="text-[#6b7280] mb-[15px] text-[1rem]">Developed the Load Balance Efficiency Score (LBES), a composite metric that unifies GPS, wellness, and physical testing data to quantify player readiness. Implemented a Random Forest Classifier to predict injury risk sessions with 100% precision.</p>
              <div className="mt-[25px] flex flex-wrap gap-[12px]">
                <a href="https://github.com/Ashwin987/Chelsea-FC-Vizathon-2025" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                  <i className="fab fa-github"></i> View Code
                </a>
                <a href="/Chelsea_Vizathon_Final_Report.pdf" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-transparent text-[#111827] border border-[#e5e7eb] hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all">
                  <i className="fas fa-file-pdf"></i> Final Report
                </a>
              </div>
            </div>

            {/* NBA Rookie */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-[1.4rem] font-[700] text-[#111827] mb-[8px]">2022 NBA Rookie Impact Prediction</div>
              <span className="text-[0.9rem] text-[#2563eb] font-[600] mb-[15px] block uppercase tracking-[0.5px]">Python • Machine Learning • Sports Reference API</span>
              <p className="text-[#6b7280] mb-[15px] text-[1rem]">Utilized data science techniques to analyze the 2022-2023 NBA draft class. Applied machine learning models to historical stats to predict the immediate impact prospects would have in their rookie season.</p>
              <div className="mt-[25px] flex flex-wrap gap-[12px]">
                <a href="https://github.com/Ashwin987/2022-NBA-Rookie-Project" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                  <i className="fab fa-github"></i> View Code
                </a>
                <a href="https://medium.com/@ashwin.ramases/rookies-prediction-nba-2023-7e0f9b40d5a1" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-transparent text-[#111827] border border-[#e5e7eb] hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all">
                  <i className="fas fa-newspaper"></i> Read Article
                </a>
              </div>
            </div>

            {/* FPL */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-[1.4rem] font-[700] text-[#111827] mb-[8px]">Optimizing FPL Scoring for Defensive Midfielders</div>
              <span className="text-[0.9rem] text-[#2563eb] font-[600] mb-[15px] block uppercase tracking-[0.5px]">Python • Web Scraping • FBref Data</span>
              <p className="text-[#6b7280] mb-[15px] text-[1rem]">Built a web scraper to extract player data from the FPL archive and match reports from FBref. Proposed and tested a new scoring metric: awarding 1 point for every 3 ball recoveries, closing the point gap between defensive midfielders and attacking players.</p>
              <div className="mt-[25px] flex flex-wrap gap-[12px]">
                <a href="https://github.com/Ashwin987/FPL-Fantasy-Project" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                  <i className="fab fa-github"></i> View Code
                </a>
              </div>
            </div>

            {/* EPL Performance */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]">
              <div className="text-[1.4rem] font-[700] text-[#111827] mb-[8px]">EPL Team Performance & Spending Efficiency</div>
              <span className="text-[0.9rem] text-[#2563eb] font-[600] mb-[15px] block uppercase tracking-[0.5px]">R • Poisson Regression • K-Means • Tableau</span>
              <p className="text-[#6b7280] mb-[15px] text-[1rem]">Investigated the efficiency of Premier League clubs by analyzing the relationship between financial resources and on-field success. Applied K-Means Clustering to identify "efficient buyers" and implemented Poisson Regression models to predict win totals.</p>
              <div className="mt-[25px] flex flex-wrap gap-[12px]">
                <a href="https://github.com/Ashwin987/EPL-Performance-Analysis" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#2563eb] transition-all">
                  <i className="fab fa-github"></i> View Code
                </a>
                <a href="/Project Writeup.pdf" target="_blank" rel="noreferrer" className="px-[20px] py-[10px] rounded-[8px] font-[500] text-[0.9rem] inline-flex items-center gap-[8px] bg-transparent text-[#111827] border border-[#e5e7eb] hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all">
                  <i className="fas fa-file-pdf"></i> View Writeup
                </a>
              </div>
            </div>

          </div>
        )}

{/* ================= NEW: AI TACTICAL GAME ANALYZER DEDICATED PAGE ================= */}
        {currentPage === 'tactical-ai' && (
          <div className="animate-fade-in flex flex-col max-w-[1000px] mx-auto">
            {/* Back Button */}
            <div 
              onClick={() => setCurrentPage('sports')}
              className="mb-[30px] inline-flex items-center gap-[8px] text-[#6b7280] hover:text-[#2563eb] cursor-pointer font-[600] transition-colors w-fit"
            >
              <i className="fas fa-arrow-left"></i> Back to Sports Analytics
            </div>

            {/* Header Section */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_15px_40px_-10px_rgba(37,99,235,0.15)] border-t-[6px] border-t-[#2563eb]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] gap-[15px]">
                <h1 className="text-[2.2rem] font-[800] tracking-[-0.5px] text-[#111827] m-0">AI Tactical Game Analyzer</h1>
                
                <div className="flex gap-[10px]">
                  <a href="https://huggingface.co/spaces/ashwinramaseshan/tactical-ai-analyzer" target="_blank" rel="noreferrer" className="px-[16px] py-[8px] rounded-[8px] font-[600] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#ffd21e] text-[#111827] hover:bg-[#eab308] transition-all shadow-sm">
                    <span className="text-[1.2rem]">🤗</span> Live App on Hugging Face
                  </a>
                  <a href="https://github.com/Ashwin987/Elite-Tactical-Game-AI-Analyzer/tree/main" target="_blank" rel="noreferrer" className="px-[16px] py-[8px] rounded-[8px] font-[600] text-[0.9rem] inline-flex items-center gap-[8px] bg-[#111827] text-white hover:bg-[#374151] transition-all shadow-sm">
                    <i className="fab fa-github"></i> GitHub Repo
                  </a>
                </div>
              </div>

              {/* 6-Second Auto-Rotating UI Slideshow with Arrows */}
              <TacticalCarousel 
                images={['/LoadingScreen.png', '/ActuvePossession.png', '/BlockHeight.png', '/Momentum.png', '/MinutebyMinute.png']} 
                linksToApp={true} 
              />
              <p className="text-center text-[0.85rem] text-[#6b7280] italic mt-[10px] mb-[30px]">Click any image to access the live engine on Hugging Face</p>

              {/* Project Intro */}
              <div className="text-[#4b5563] space-y-[20px] text-[1.1rem] leading-[1.8] text-justify">
                <p>
                   Elite coaching staffs are no longer satisfied with simple possession statistics or pass completion rates; they require deep insights into pressing triggers, defensive block heights, attacking biases, and rest-defense structures. However, generating this data typically requires an army of video analysts coding events by hand, a process that is too slow to influence critical halftime team talks.
                </p>
                <p>
                  The objective of this applied data science project was to build a fully autonomous tactical analysis pipeline that bridges the gap between raw video footage and structured, actionable coaching data. By moving away from simple 2D ball-tracking and leveraging a natively multimodal AI, the engine acts as a virtual assistant coach.
                </p>
              </div>
            </div>

            {/* Quantifying Tactics Section */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5">
              <h2 className="text-[1.8rem] font-[800] text-[#111827] mb-[20px]">Quantifying Tactics & Automated Diagnostic Reporting</h2>
              
              {/* 6-Second Auto-Rotating Quantifying Slideshow */}
              <TacticalCarousel 
                images={['/DataDriven.png', '/Overview.png', '/Momentum.png']} 
              />

              <div className="text-[#4b5563] space-y-[20px] text-[1.05rem] leading-[1.8] text-justify mt-[30px]">
                <p>
                  To uncover the true story of a match, this engine ignores basic possession and instead calculates an <strong>Absolute Threat Score</strong>, weighing pitch zones, attacking tempo, and half-space occupancy to quantify actual danger. Crucially, it also decouples a team's physical positioning from their defensive aggression. By mapping <strong>Defensive Block Height</strong> separately from <strong>Pressing Intensity</strong>, the AI reveals true tactical intent—proving instantly whether a team is being forcefully pinned back by the opponent, or strategically deploying a deep, highly aggressive trap.
                </p>
                <p>
                  By automating these complex observations, this pipeline effectively renders the traditional role of a manual sports video analyst obsolete. Designed specifically for assistant managers and tactical coaches, the system eliminates the hours spent manually coding match events. Instead of waiting days for a breakdown, coaching staffs receive immediate, objective diagnostics on match momentum. The engine ensures that the true violence of transition states is accurately visualized, preventing sudden, high-intensity counter-attacks from being hidden or smoothed over by an opponent's sustained, non-threatening possession.
                </p>
                <p>
                  However, raw data is useless in a high-pressure dugout environment. To bridge the gap between the analytics department and the coaching bench, the final stage of the pipeline acts as an automated tactical translator. The engine feeds its strict tactical calculations into a constrained AI to instantly generate a natural-language scouting report. It synthesizes complex variables to diagnose holistic game plans—immediately identifying if an opponent is executing a "High-Line Gegenpress" or a "Deep-Lying Counter." Ultimately, it provides an executive summary of exactly how the midfield is being bypassed, delivering actionable, data-driven adjustments that can be communicated directly to players before the second half begins.
                </p>
              </div>
            </div>

            {/* Architecture Section */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5">
              <h2 className="text-[1.8rem] font-[800] text-[#111827] mb-[20px]">AI Architecture</h2>
              
              {/* 6-Second Auto-Rotating Architecture Slideshow */}
              <TacticalCarousel 
                images={['/Overview.png', '/TeamMapping.png', '/UploadMatchFootageScreen.png']} 
              />

              <div className="text-[#4b5563] space-y-[20px] text-[1.05rem] leading-[1.8] text-justify mt-[30px]">
                <p>
                  <strong className="text-[#111827] block mb-[5px] text-[1.1rem]">1. The Video Pipeline (Micro-Batching)</strong>
                  To guarantee accuracy, the engine doesn't just watch a massive video straight through. Instead, the Python backend uses a Local Micro-Batching Protocol to physically slice the match footage into strict one-minute intervals. These short clips are processed sequentially by Google's Gemini 2.5 Flash model. This "tunnel vision" approach prevents the AI from getting overwhelmed or losing focus over long periods, ensuring it catches every pressing trigger and defensive shift just like a dedicated human scout would.
                </p>
                <p>
                  <strong className="text-[#111827] block mb-[5px] text-[1.1rem]">2. Fine-Tuning & Logic Locks</strong>
                  To stop the AI from making common mistakes—like only watching the ball and ignoring the rest of the pitch—the system relies on Architectural Constraint Fine-Tuning. It uses strict logic locks and structured prompts to force the AI into the mindset of a professional analyst. When writing the final tactical report, the engine feeds the AI exact, pre-calculated math (like momentum scores and attacking zones). This eliminates guesswork and hallucinations, resulting in a clean, data-driven executive summary that coaches can actually trust.
                </p>
                <p>
                  <strong className="text-[#111827] block mb-[5px] text-[1.1rem]">3. Intelligence system</strong>
                  The true intelligence of the system relies on highly specialized prompt engineering. Rather than asking the AI generic questions, the engine injects heavily structured, multi-shot system prompts—essentially forcing the AI to adopt the strict persona of an elite tactical analyst. When generating the final diagnostic report, these carefully crafted prompt injections feed the AI exact, pre-calculated match variables (like threat scores and counter-attack counts), guiding it to output a highly accurate, natural-language executive summary without hallucinating.
                </p>
              </div>
            </div>

            {/* Live Engine Demo Video */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5">
              <h2 className="text-[1.8rem] font-[800] text-[#111827] mb-[20px]">Live Results Dashboard Demo</h2>
              <p className="text-[#4b5563] text-[1.05rem] leading-[1.8] text-justify mb-[20px]">
                Watch the final output of the tactical engine. See how the AI generates the fully interactive dashboard and complete natural-language scouting report from raw match footage.
              </p>
              
              {/* Video Container with Zoom Icon Mask */}
              <div className="relative w-full rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm bg-[#ffffff]">
                
                {/* THE MASK: Solid white box to cover the Zoom icon */}
                {/* Note: pointer-events-none ensures it doesn't block video clicks */}
                <div className="absolute top-0 right-0 w-[200px] h-[70px] bg-white z-10 pointer-events-none"></div>
                
                {/* The Video Player - Now pointing to Google Drive via iframe */}
                <iframe 
                  src="https://drive.google.com/file/d/1uyLcB3USwlvgv7yqaSp17H4TlSRBIz0J/preview" 
                  className="w-full aspect-video border-0"
                  allow="autoplay"
                >
                </iframe>
              </div>
            </div>

            {/* How To Use It */}
            <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[40px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5">
              <h2 className="text-[1.8rem] font-[800] text-[#111827] mb-[20px]">How It Works</h2>
              <p className="text-[#4b5563] text-[1.05rem] leading-[1.8] text-justify mb-[20px]">
                Simply upload your match footage directly to the web engine (Maximum file size: 2GB). Because the AI processes video contextually, the longer the video, the longer the extraction takes. For example, a 25-minute match clip takes approximately 20–25 minutes to process. Once the processing is complete, you will be able to view the full footage details, interactive tactical dashboards, and the automated AI scouting report.
              </p>
              <div className="bg-[#f8fafc] p-[20px] rounded-[12px] border border-[#e2e8f0] mb-[25px]">
                <p className="text-[#334155] text-[0.95rem] m-0">
                  <span className="font-[700] text-[#2563eb]">💡 Pro-Tip:</span> If you already have a pre-processed JSON or CSV file that matches the engine's schema, you can bypass the video upload to instantly generate the AI match report and visual dashboard. Since this is an independent project, it is currently hosted on Hugging Face Spaces to efficiently manage CPU and RAM processing loads without cost constraints.
                </p>
              </div>

              {/* Sample Data Downloads */}
              <h3 className="text-[1.3rem] font-[700] text-[#111827] mb-[15px] border-b border-[#e5e7eb] pb-[10px]">Sample Tactical Data & Documentation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] mb-[30px]">
                <a href="/Real Madrid_vs_Barcalona_tactical_data(1).csv" download className="flex items-center justify-between px-[20px] py-[15px] bg-white border border-[#e5e7eb] rounded-[10px] hover:border-[#2563eb] hover:shadow-md transition-all group">
                  <div className="flex flex-col">
                    <span className="font-[600] text-[#111827]">El Clásico Tactical Data</span>
                    <span className="text-[0.8rem] text-[#6b7280]">Real Madrid vs Barcelona • CSV</span>
                  </div>
                  <i className="fas fa-download text-[#9ca3af] group-hover:text-[#2563eb]"></i>
                </a>
                <a href="/Marseille_vs_Lyon_tactical_data.csv" download className="flex items-center justify-between px-[20px] py-[15px] bg-white border border-[#e5e7eb] rounded-[10px] hover:border-[#2563eb] hover:shadow-md transition-all group">
                  <div className="flex flex-col">
                    <span className="font-[600] text-[#111827]">Choc des Olympiques Data</span>
                    <span className="text-[0.8rem] text-[#6b7280]">Marseille vs Lyon • CSV</span>
                  </div>
                  <i className="fas fa-download text-[#9ca3af] group-hover:text-[#2563eb]"></i>
                </a>
                <a href="/Manchester City_vs_Chelsea_tactical_data(1).csv" download className="flex items-center justify-between px-[20px] py-[15px] bg-white border border-[#e5e7eb] rounded-[10px] hover:border-[#2563eb] hover:shadow-md transition-all group">
                  <div className="flex flex-col">
                    <span className="font-[600] text-[#111827]">Premier League Data</span>
                    <span className="text-[0.8rem] text-[#6b7280]">Man City vs Chelsea • CSV</span>
                  </div>
                  <i className="fas fa-download text-[#9ca3af] group-hover:text-[#2563eb]"></i>
                </a>
                <a href="/Liverpool_vs_PSG_tactical_data(2).csv" download className="flex items-center justify-between px-[20px] py-[15px] bg-white border border-[#e5e7eb] rounded-[10px] hover:border-[#2563eb] hover:shadow-md transition-all group">
                  <div className="flex flex-col">
                    <span className="font-[600] text-[#111827]">Champions League Data</span>
                    <span className="text-[0.8rem] text-[#6b7280]">Liverpool vs PSG • CSV</span>
                  </div>
                  <i className="fas fa-download text-[#9ca3af] group-hover:text-[#2563eb]"></i>
                </a>
                <a href="/Tactical_Vision.pdf" target="_blank" rel="noreferrer" className="md:col-span-2 flex items-center justify-between px-[20px] py-[15px] bg-[#111827] border border-[#111827] rounded-[10px] hover:bg-[#374151] transition-all group mt-[10px]">
                  <div className="flex flex-col">
                    <span className="font-[600] text-white text-[1.1rem]">Official Project Architecture & Documentation</span>
                    <span className="text-[0.85rem] text-[#9ca3af]">Tactical_Vision.pdf • View Report</span>
                  </div>
                  <i className="fas fa-file-pdf text-white text-[1.5rem]"></i>
                </a>
              </div>

              {/* Live Embedded Match Footage Slideshow */}
              <h3 className="text-[1.3rem] font-[700] text-[#111827] mb-[15px] border-b border-[#e5e7eb] pb-[10px]">Sample Input Match Footage</h3>
              <p className="text-[0.9rem] text-[#6b7280] mb-[20px]">Scroll horizontally to view the raw 15-30 minute match inputs processed by the AI.</p>
              
              <div className="flex overflow-x-auto gap-[20px] snap-x snap-mandatory pb-[15px] custom-scrollbar">
                
                {/* Video 1: Real Madrid vs Barcelona */}
                <div className="snap-center shrink-0 w-[90%] md:w-[65%] bg-[#f9fafb] rounded-[12px] border border-[#e5e7eb] overflow-hidden flex flex-col">
                  <div className="w-full aspect-video bg-black">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/COQhT_7FOoc" title="Real Madrid vs Barcelona" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <div className="p-[20px] flex flex-col justify-between h-full">
                    <div>
                      <div className="font-[800] text-[#111827] text-[1.1rem]">Real Madrid vs Barcelona (0-4)</div>
                      <div className="text-[0.85rem] text-[#2563eb] font-[700] mb-[10px]">October 26th, 2024 • Santiago Bernabeu • LaLiga</div>
                      <p className="text-[0.95rem] text-[#4b5563] mb-[15px]">The match footage supplied to the AI engine shows Minute 51 to Minute 79.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1eaVCYabNh5nxQ4PMvQacxpcnxFV_usos/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-[8px] text-[0.85rem] font-[700] text-[#111827] bg-[#e5e7eb] hover:bg-[#d1d5db] px-[12px] py-[8px] rounded-[6px] transition-colors">
                      <i className="fas fa-download"></i> Download Raw Video (.mp4)
                    </a>
                  </div>
                </div>

                {/* Video 2: Marseille vs Lyon */}
                <div className="snap-center shrink-0 w-[90%] md:w-[65%] bg-[#f9fafb] rounded-[12px] border border-[#e5e7eb] overflow-hidden flex flex-col">
                  <div className="w-full aspect-video bg-black">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/UxWdLdMZwOU" title="Marseille vs Lyon" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <div className="p-[20px] flex flex-col justify-between h-full">
                    <div>
                      <div className="font-[800] text-[#111827] text-[1.1rem]">Marseille vs Lyon (3-2)</div>
                      <div className="text-[0.85rem] text-[#2563eb] font-[700] mb-[10px]">February 2nd, 2025 • Orange Velodrome • Ligue 1</div>
                      <p className="text-[0.95rem] text-[#4b5563] mb-[15px]">The match footage supplied to the AI engine shows Minute 22 to Minute 45.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1dcsV7pwEZvHKMhKilUc8dudPIqLaQuVu/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-[8px] text-[0.85rem] font-[700] text-[#111827] bg-[#e5e7eb] hover:bg-[#d1d5db] px-[12px] py-[8px] rounded-[6px] transition-colors">
                      <i className="fas fa-download"></i> Download Raw Video (.mp4)
                    </a>
                  </div>
                </div>

                {/* Video 3: Chelsea vs Manchester City */}
                <div className="snap-center shrink-0 w-[90%] md:w-[65%] bg-[#f9fafb] rounded-[12px] border border-[#e5e7eb] overflow-hidden flex flex-col">
                  <div className="w-full aspect-video bg-black">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/DMk-uqtEtes" title="Chelsea vs Manchester City" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <div className="p-[20px] flex flex-col justify-between h-full">
                    <div>
                      <div className="font-[800] text-[#111827] text-[1.1rem]">Manchester City vs Chelsea (1-1)</div>
                      <div className="text-[0.85rem] text-[#2563eb] font-[700] mb-[10px]">January 4th, 2026 • Etihad Stadium • English Premier League</div>
                      <p className="text-[0.95rem] text-[#4b5563] mb-[15px]">The match footage supplied to the AI engine shows Minute 31 to Minute 45.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1Bz2fhxVNWKYPsI7-J61ZFjwEyGiP6kp5/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-[8px] text-[0.85rem] font-[700] text-[#111827] bg-[#e5e7eb] hover:bg-[#d1d5db] px-[12px] py-[8px] rounded-[6px] transition-colors">
                      <i className="fas fa-download"></i> Download Raw Video (.mp4)
                    </a>
                  </div>
                </div>

                {/* Video 4: PSG vs Liverpool */}
                <div className="snap-center shrink-0 w-[90%] md:w-[65%] bg-[#f9fafb] rounded-[12px] border border-[#e5e7eb] overflow-hidden flex flex-col">
                  <div className="w-full aspect-video bg-black">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/zS2cOQxQikc" title="Liverpool vs PSG" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                  <div className="p-[20px] flex flex-col justify-between h-full">
                    <div>
                      <div className="font-[800] text-[#111827] text-[1.1rem]">Liverpool vs PSG (0-1)</div>
                      <div className="text-[0.85rem] text-[#2563eb] font-[700] mb-[10px]">March 11th, 2025 • Anfield • Champions League (Round of 16)</div>
                      <p className="text-[0.95rem] text-[#4b5563] mb-[15px]">The match footage supplied to the AI engine shows Minute 12 to Minute 40.</p>
                    </div>
                    <a href="https://drive.google.com/file/d/1QOd9WvYdVOIpXxPm7_YbZYlyd4jFSkwG/view?usp=sharing" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-[8px] text-[0.85rem] font-[700] text-[#111827] bg-[#e5e7eb] hover:bg-[#d1d5db] px-[12px] py-[8px] rounded-[6px] transition-colors">
                      <i className="fas fa-download"></i> Download Raw Video (.mp4)
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
        {/* ================= RESUME PAGE ================= */}
        {currentPage === 'resume' && (
          <div className="animate-fade-in w-full max-w-[850px] mx-auto">
            
            <div className="text-center mb-[40px]">
              <h1 className="text-[2.2rem] font-[800] tracking-[-0.5px] text-[#111827] m-0">
                Professional Experience
              </h1>
            </div>

            {/* Download Button */}
            <div className="text-center mb-[50px]">
              <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-[10px] bg-[#111827] text-white px-[30px] py-[14px] rounded-[50px] font-[600] text-[1.05rem] shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-[#2563eb] hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] transition-all duration-300">
                <i className="fas fa-file-download"></i> Download Full Resume
              </a>
            </div>

            <div className="flex flex-col">

              {/* 1. Citizens Bank (Upcoming) */}
              <div className="bg-gradient-to-r from-[#fafffc] to-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 border-l-[5px] border-l-[#008751] transition-transform duration-300 hover:-translate-y-[2px]">
                <span className="inline-block bg-[#dcfce7] text-[#008751] text-[0.75rem] font-[700] px-[12px] py-[4px] rounded-[20px] uppercase tracking-[0.5px] mb-[10px]">
                  Upcoming
                </span>
                <div className="flex flex-col md:flex-row justify-between items-start gap-[10px]">
                  <div>
                    <h3 className="text-[1.3rem] font-[700] text-[#111827] m-0">Data Management Graduate Intern</h3>
                    <span className="text-[1.1rem] text-[#2563eb] font-[600] mt-[5px] block"><i className="fas fa-university mr-2"></i>Citizens Bank</span>
                  </div>
                </div>
              </div>

              {/* 2. UCLA Anderson */}
              <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-transform duration-300 hover:-translate-y-[2px]">
                <div className="flex flex-col md:flex-row justify-between items-start mb-[15px] gap-[10px]">
                  <div>
                    <h3 className="text-[1.3rem] font-[700] text-[#111827] m-0">Graduate Teaching Assistant – Retail Analytics</h3>
                    <span className="text-[1.1rem] text-[#2563eb] font-[600] mt-[5px] block">UCLA Anderson School of Management</span>
                  </div>
                  <div className="text-left md:text-right text-[0.9rem] text-[#6b7280] flex-shrink-0">
                    <span className="block font-medium">Sept 2025 – Dec 2025</span>
                    <span className="block">Los Angeles, CA</span>
                  </div>
                </div>
                <div className="text-[0.95rem] text-[#6b7280] mb-[20px] italic leading-[1.5] border-l-[3px] border-[#e5e7eb] pl-[15px] bg-[#f9fafb] py-[10px] pr-[15px] rounded-r-[8px]">
                  The UCLA Anderson Master of Business Analytics (MSBA) is ranked the #1 business analytics program globally by QS World Rankings. I served as a Teaching Assistant for Data Visualization (MGMTMSA 435) and Retail Analytics (MGMTMSA 440).
                </div>
                <ul className="pl-[20px] text-[#6b7280] m-0 list-disc space-y-[10px]">
                  <li>Supported MSBA students in applying customer segmentation, cohort analysis, CLV modeling, and price elasticity concepts to real-world datasets.</li>
                  <li>Facilitated the application of descriptive, predictive, and prescriptive analytics to solve real-world retail challenges such as promotion analysis, assortment planning, and demand forecasting.</li>
                  <li>Instructed students on the principles of effective data visualization, teaching them to build interactive dashboards in Tableau.</li>
                </ul>
              </div>

              {/* 3. Jora */}
              <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-transform duration-300 hover:-translate-y-[2px]">
                <div className="flex flex-col md:flex-row justify-between items-start mb-[15px] gap-[10px]">
                  <div>
                    <h3 className="text-[1.3rem] font-[700] text-[#111827] m-0">Data Scientist</h3>
                    <span className="text-[1.1rem] text-[#2563eb] font-[600] mt-[5px] block">Jora</span>
                  </div>
                  <div className="text-left md:text-right text-[0.9rem] text-[#6b7280] flex-shrink-0">
                    <span className="block font-medium">Mar 2024 – Dec 2024</span>
                    <span className="block">Los Angeles, CA</span>
                  </div>
                </div>
                <div className="text-[0.95rem] text-[#6b7280] mb-[20px] italic leading-[1.5] border-l-[3px] border-[#e5e7eb] pl-[15px] bg-[#f9fafb] py-[10px] pr-[15px] rounded-r-[8px]">
                  An all-in-one ecosystem for the live music industry, providing musicians, managers, and venues with integrated tools for networking, booking, and data-driven event management.
                </div>
                <ul className="pl-[20px] text-[#6b7280] m-0 list-disc space-y-[10px]">
                  <li>Built and productionized logistic regression models in Python and R to predict weekly active users, driving an 18% lift in retention.</li>
                  <li>Developed linear regression models to quantify the impact of marketing campaigns on user growth and ROI.</li>
                  <li>Automated ETL workflows using SQL and Python (pandas) to extract, transform, and load engagement data for model training and monitoring.</li>
                  <li>Designed time series forecasts for user activity using R, improving the accuracy of growth planning.</li>
                </ul>
              </div>

              {/* 4. Behavioral Economics Lab */}
              <div className="bg-[#ffffff] rounded-[16px] p-[35px] mb-[30px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-transform duration-300 hover:-translate-y-[2px]">
                <div className="flex flex-col md:flex-row justify-between items-start mb-[15px] gap-[10px]">
                  <div>
                    <h3 className="text-[1.3rem] font-[700] text-[#111827] m-0">Data Scientist Research Intern</h3>
                    <span className="text-[1.1rem] text-[#2563eb] font-[600] mt-[5px] block">Behavioral Economics and Decision Making Lab</span>
                  </div>
                  <div className="text-left md:text-right text-[0.9rem] text-[#6b7280] flex-shrink-0">
                    <span className="block font-medium">Aug 2023 – Jun 2024</span>
                    <span className="block">Riverside, CA</span>
                  </div>
                </div>
                <div className="text-[0.95rem] text-[#6b7280] mb-[20px] italic leading-[1.5] border-l-[3px] border-[#e5e7eb] pl-[15px] bg-[#f9fafb] py-[10px] pr-[15px] rounded-r-[8px]">
                  A premier research hub at UC Riverside investigating the intersection of behavioral economics, consumer psychology, and organizational behavior.
                </div>
                <ul className="pl-[20px] text-[#6b7280] m-0 list-disc space-y-[10px]">
                  <li>Developed a financial sentiment analysis model using text mining to improve tone extraction in corporate earnings calls, achieving 87% accuracy.</li>
                  <li>Analyzed linguistic and sentiment features from 500+ earnings call transcripts using NLP techniques.</li>
                  <li>Researched, fine-tuned, and integrated Large Language Models (LLMs) for sentiment classification.</li>
                </ul>
              </div>

              {/* 5. NFL Sherpa */}
              <div className="bg-[#ffffff] rounded-[16px] p-[35px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-black/5 transition-transform duration-300 hover:-translate-y-[2px]">
                <div className="flex flex-col md:flex-row justify-between items-start mb-[15px] gap-[10px]">
                  <div>
                    <h3 className="text-[1.3rem] font-[700] text-[#111827] m-0">Data Scientist Intern</h3>
                    <span className="text-[1.1rem] text-[#2563eb] font-[600] mt-[5px] block">NFL Sherpa Analytics</span>
                  </div>
                  <div className="text-left md:text-right text-[0.9rem] text-[#6b7280] flex-shrink-0">
                    <span className="block font-medium">Aug 2022 – Sep 2023</span>
                    <span className="block">Remote</span>
                  </div>
                </div>
                <div className="text-[0.95rem] text-[#6b7280] mb-[20px] italic leading-[1.5] border-l-[3px] border-[#e5e7eb] pl-[15px] bg-[#f9fafb] py-[10px] pr-[15px] rounded-r-[8px]">
                  A specialized sports analytics consultancy leveraging advanced statistical modeling and machine learning to derive performance metrics for the NFL fantasy market.
                </div>
                <ul className="pl-[20px] text-[#6b7280] m-0 list-disc space-y-[10px]">
                  <li>Built forecasting models to project player fantasy performance trends across a season, improving predictive accuracy for draft decisions.</li>
                  <li>Performed clustering (K-Means) on 2,000+ players to group skill levels and inform draft recommendations.</li>
                  <li>Improved forecasting precision by 85% (AUC +0.12 vs. baseline) using decision trees and random forests.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Global Footer */}
      <footer className="py-[40px] text-center text-[#9ca3af] text-[0.9rem] mt-auto w-full">
        <p className="m-0">&copy; 2026 Ashwin Ramaseshan. All rights reserved.</p>
      </footer>
      
    </div>
  );
}