(function(){
  const audio = new Audio();
  let hasTrack = false;
  let isPlaying = false;

  const els = {
    fileInput: document.getElementById('fileInput'),
    menuBtn: document.getElementById('menuBtn'),
    clearBtn: document.getElementById('clearBtn'),
    title: document.getElementById('title'),
    artist: document.getElementById('artist'),
    art: document.getElementById('art'),
    seek: document.getElementById('seek'),
    seekFill: document.getElementById('seekFill'),
    curTime: document.getElementById('curTime'),
    durTime: document.getElementById('durTime'),
    playBtn: document.getElementById('playBtn'),
    playIcon: document.getElementById('playIcon'),
    backBtn: document.getElementById('backBtn'),
    fwdBtn: document.getElementById('fwdBtn'),
  };

  function fmtTime(sec){
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec/60);
    const s = Math.floor(sec%60);
    return m + ':' + String(s).padStart(2,'0');
  }

  function guessMeta(filename){
    const base = filename.replace(/\.[^/.]+$/, '');
    const parts = base.split(/\s*-\s*/);
    if (parts.length >= 2) return { title: parts.slice(1).join(' - '), artist: parts[0] };
    return { title: base, artist: 'Unknown artist' };
  }

  function updatePlayIcon(){
    els.playIcon.innerHTML = isPlaying
      ? '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>'
      : '<path d="M8 5v14l11-7z"/>';
  }

  function loadFile(file){
    const url = URL.createObjectURL(file);
    const meta = guessMeta(file.name);
    audio.src = url;
    els.title.textContent = meta.title;
    els.artist.textContent = meta.artist;
    hasTrack = true;
  }

  function clearTrack(){
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    hasTrack = false;
    isPlaying = false;
    updatePlayIcon();
    els.art.classList.remove('spinning');
    els.title.textContent = 'No song added';
    els.artist.textContent = 'Tap the menu icon to choose a track';
    els.seek.value = 0;
    els.seekFill.style.width = '0%';
    els.curTime.textContent = '0:00';
    els.durTime.textContent = '0:00';
  }

  els.menuBtn.addEventListener('click', () => els.fileInput.click());
  els.clearBtn.addEventListener('click', clearTrack);
  els.fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]){
      loadFile(e.target.files[0]);
    }
    e.target.value = '';
  });

  els.playBtn.addEventListener('click', () => {
    if (!hasTrack){ els.fileInput.click(); return; }
    if (isPlaying) audio.pause(); else audio.play();
  });

  els.backBtn.addEventListener('click', () => {
    if (!hasTrack) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });
  els.fwdBtn.addEventListener('click', () => {
    if (!hasTrack) return;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
  });

  let seeking = false;
  els.seek.addEventListener('input', () => {
    seeking = true;
    els.seekFill.style.width = els.seek.value + '%';
  });
  els.seek.addEventListener('change', () => {
    if (audio.duration){
      audio.currentTime = (els.seek.value/100) * audio.duration;
    }
    seeking = false;
  });

  audio.addEventListener('play', () => {
    isPlaying = true;
    updatePlayIcon();
    els.art.classList.add('spinning');
  });
  audio.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayIcon();
    els.art.classList.remove('spinning');
  });
  audio.addEventListener('timeupdate', () => {
    els.curTime.textContent = fmtTime(audio.currentTime);
    if (audio.duration && !seeking){
      const pct = (audio.currentTime/audio.duration)*100;
      els.seek.value = pct;
      els.seekFill.style.width = pct + '%';
    }
  });
  audio.addEventListener('loadedmetadata', () => {
    els.durTime.textContent = fmtTime(audio.duration);
  });
  audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayIcon();
    els.art.classList.remove('spinning');
    audio.currentTime = 0;
    els.seek.value = 0;
    els.seekFill.style.width = '0%';
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space'){ e.preventDefault(); els.playBtn.click(); }
  });
})();