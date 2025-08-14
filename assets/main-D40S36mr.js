(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class l{constructor(){this.currentChapter=1,this.playerProgress={completedChapters:[],currentLocation:"start",inventory:[],health:100,faith:50},this.gameSettings={audioEnabled:!0,musicVolume:.7,sfxVolume:.8,accessibilityMode:!1},this.isPaused=!1,this.isLoading=!1}getCurrentChapter(){return this.currentChapter}setCurrentChapter(e){this.currentChapter=e,this.saveProgress()}completeChapter(e){this.playerProgress.completedChapters.includes(e)||(this.playerProgress.completedChapters.push(e),this.saveProgress())}saveProgress(){try{localStorage.setItem("gospel-game-progress",JSON.stringify({currentChapter:this.currentChapter,playerProgress:this.playerProgress,gameSettings:this.gameSettings})),console.log("💾 Game progress saved")}catch(e){console.error("Failed to save progress:",e)}}loadProgress(){try{const e=localStorage.getItem("gospel-game-progress");if(e){const t=JSON.parse(e);return t.currentChapter!==void 0&&t.currentChapter!==null&&(this.currentChapter=t.currentChapter),t.playerProgress&&t.playerProgress!==null&&(this.playerProgress={...this.playerProgress,...t.playerProgress,completedChapters:t.playerProgress.completedChapters||[]}),t.gameSettings&&t.gameSettings!==null&&(this.gameSettings={...this.gameSettings,...t.gameSettings}),console.log("📂 Game progress loaded"),!0}}catch(e){console.error("Failed to load progress:",e)}return!1}updateSettings(e){this.gameSettings={...this.gameSettings,...e},this.saveProgress()}pause(){this.isPaused=!0}resume(){this.isPaused=!1}resetProgress(){this.currentChapter=1,this.playerProgress={completedChapters:[],currentLocation:"start",inventory:[],health:100,faith:50},localStorage.removeItem("gospel-game-progress"),console.log("🔄 Game progress reset")}getProgressPercentage(){return Math.round(this.playerProgress.completedChapters.length/14*100)}}const s=new l;class c{constructor(){this.loadingScreen=document.getElementById("loading-screen"),this.gameContainer=document.getElementById("game-container"),this.isLoaded=!1}async init(){console.log("🎮 Gospel Game - The Pilgrim's Progress"),console.log("🚀 Initializing game...");try{await this.simulateLoading(),await this.initializeGame(),this.showGame(),console.log("✅ Game initialized successfully!")}catch(e){console.error("❌ Failed to initialize game:",e),this.showError("Failed to load game. Please refresh the page.")}}async simulateLoading(){return new Promise(e=>{setTimeout(e,2e3)})}async initializeGame(){console.log("🎯 Initializing game systems..."),s.loadProgress()&&console.log(`📂 Loaded progress: Chapter ${s.getCurrentChapter()}`),console.log("🎯 Game systems initialized")}showGame(){this.loadingScreen.style.display="none",this.gameContainer.style.display="block",this.isLoaded=!0,this.createTestInterface()}createTestInterface(){const e=document.getElementById("game-container");e.innerHTML=`
      <div style="padding: 20px; color: white; font-family: Arial, sans-serif;">
        <h1>🎮 Gospel Game - Development Mode</h1>
        <p>Welcome to the Gospel Game! This is the development interface.</p>
        
        <div style="margin: 20px 0;">
          <h3>Game State:</h3>
          <p>Current Chapter: ${s.getCurrentChapter()}</p>
          <p>Progress: ${s.getProgressPercentage()}%</p>
          <p>Completed Chapters: ${s.playerProgress.completedChapters.length}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Development Tools:</h3>
          <button onclick="window.runHelperTests()" style="margin: 5px; padding: 10px; background: #4ecdc4; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Run Helper Tests
          </button>
          <button onclick="gameState.completeChapter(${s.getCurrentChapter()})" style="margin: 5px; padding: 10px; background: #45b7d1; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Complete Current Chapter
          </button>
          <button onclick="gameState.setCurrentChapter(${s.getCurrentChapter()+1})" style="margin: 5px; padding: 10px; background: #96ceb4; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Next Chapter
          </button>
          <button onclick="gameState.resetProgress()" style="margin: 5px; padding: 10px; background: #ff6b6b; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Reset Progress
          </button>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Console Output:</h3>
          <div id="console-output" style="background: #1a1a1a; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;">
            Check the browser console for detailed output...
          </div>
        </div>
      </div>
    `,window.gameState=s}showError(e){const t=this.loadingScreen.querySelector(".loading-content");t.innerHTML=`
      <h1>Gospel Game</h1>
      <p style="color: #ff6b6b;">${e}</p>
      <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #4ecdc4; border: none; border-radius: 5px; color: white; cursor: pointer;">
        Try Again
      </button>
    `}}document.addEventListener("DOMContentLoaded",()=>{new c().init()});window.addEventListener("error",a=>{console.error("Global error:",a.error)});window.addEventListener("unhandledrejection",a=>{console.error("Unhandled promise rejection:",a.reason)});
//# sourceMappingURL=main-D40S36mr.js.map
