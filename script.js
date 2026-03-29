/* ═══════════════════════════════════════════════════════════════
   SCRIPT.JS — vroblok1064 portfolio
   All interactivity: overlays, nav, like, chat, projects, highlights
═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   DATA — Projects & Highlights
───────────────────────────────────────────── */
const PROJECTS = [
  {
    title:       "Finance Faceoff",
    tag:         "Case Comp · Finance",
    description: "One of 10 National , Perosnal Finance, Case Study Competition.",
    date:        "2024",
    color:       "#1a1a2e",
  },
  {
    title:       "Innovators, Nova'25",
    tag:         "Web Design · Creativity",
    description: "abcd.",
    date:        "Dec 2025",
    color:       "#0d1b2a",
  },
  {
    title:       "Resume Website",
    tag:         "Web Designing · VS Code",
    description: "Built this very portfolio — an Instagram-UI-inspired personal website using vanilla HTML, CSS, and JavaScript. No frameworks, no libraries. Just craft.",
    date:        "March 2026",
    color:       "#1a0a00",
  },
  {
    title:       "BBA-DBE Notion Tracker",
    tag:         "Systems Thinking · Notion Design",
    description: "Designed a complete visual identity system for a college cultural fest — logo, typography, colour palette, poster templates, and social media kit.",
    date:        "Feb 2026",
    color:       "#0a1a0a",
  },
  {
    title:       "Sandwich Stand",
    tag:         "Business · Hands-On",
    description: "Conducted a sector analysis report on EdTech startups in Tier-2 Indian cities, examining funding patterns, user retention strategies, and market gaps.",
    date:        "Dec 2023",
    color:       "#1a0a1a",
  },
];

const HIGHLIGHTS = [
  {
    emoji: "🏙️",
    label: "'25",
    content: "A year of firsts. New college, new city, new version of me.",
  },
  {
    emoji: "🎨",
    label: "De-Cocoon-i...",
    content: "Breaking out — projects, events, and everything in between.",
  },
  {
    emoji: "🌟",
    label: "🌟 frenz",
    content: "The people who make it worth it. You know who you are.",
  },
  {
    emoji: "➕",
    label: "New",
    content: "More coming soon...",
  },
];

/* ─────────────────────────────────────────────
   UTILITY HELPERS
───────────────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function openOverlay(overlay) {
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeOverlay(overlay) {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

/* ═══════════════════════════════════════════════════════════════
   1. ACTIVE NAV — highlight pill on scroll
═══════════════════════════════════════════════════════════════ */
(function initScrollNav() {
  const sections = $$(".section");
  const navPills  = $$(".nav-pill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navPills.forEach((pill) => {
            pill.classList.toggle("active", pill.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();


/* ═══════════════════════════════════════════════════════════════
   2. LIKE / HEART BUTTON
═══════════════════════════════════════════════════════════════ */
(function initLikeBtn() {
  const btn = $("#likeBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("liked");
    btn.classList.add("pop");
    btn.addEventListener("animationend", () => btn.classList.remove("pop"), { once: true });
  });
})();


/* ═══════════════════════════════════════════════════════════════
   3. CHAT TOGGLE — show/hide 3 platform icons
═══════════════════════════════════════════════════════════════ */
(function initChatToggle() {
  const toggleBtn  = $("#chatToggle");
  const chatOptions = $("#chatOptions");
  if (!toggleBtn || !chatOptions) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatOptions.classList.toggle("open");
  });

  // Close when clicking anywhere else
  document.addEventListener("click", (e) => {
    if (!chatOptions.contains(e.target) && e.target !== toggleBtn) {
      chatOptions.classList.remove("open");
    }
  });
})();


/* ═══════════════════════════════════════════════════════════════
   4. FOLLOWING LIST DIALOG
═══════════════════════════════════════════════════════════════ */
(function initFollowingDialog() {
  const trigger  = $("#followingTrigger");
  const overlay  = $("#followingOverlay");
  const closeBtn = $("#closeFollowing");
  if (!trigger || !overlay || !closeBtn) return;

  trigger.addEventListener("click", () => openOverlay(overlay));
  closeBtn.addEventListener("click", () => closeOverlay(overlay));

  // Close on backdrop click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay(overlay);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   5. HIGHLIGHTS VIEWER
═══════════════════════════════════════════════════════════════ */
(function initHighlights() {
  const items    = $$(".highlight-item");
  const overlay  = $("#highlightOverlay");
  const closeBtn = $("#closeHighlight");
  const content  = $("#highlightContent");
  if (!overlay || !closeBtn || !content) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const idx  = parseInt(item.dataset.highlight, 10);
      const data = HIGHLIGHTS[idx];
      if (!data) return;

      content.innerHTML = `
        <div style="text-align:center; padding: 24px;">
          <div style="font-size:56px; margin-bottom:16px;">${data.emoji}</div>
          <p style="font-family:'Space Mono',monospace; font-size:13px; color:#a8a8a8; margin-bottom:12px;">${data.label}</p>
          <p style="font-size:15px; color:#f5f5f5; line-height:1.7; max-width:220px; margin:0 auto;">${data.content}</p>
        </div>
      `;
      openOverlay(overlay);
    });
  });

  closeBtn.addEventListener("click", () => closeOverlay(overlay));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay(overlay);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   6. PROJECT CARDS — overlay with prev / next
═══════════════════════════════════════════════════════════════ */
(function initProjects() {
  const cards       = $$(".project-card");
  const overlay     = $("#projectOverlay");
  const closeBtn    = $("#closeProject");
  const prevBtn     = $("#projPrev");
  const nextBtn     = $("#projNext");
  const carousel    = $("#projCarousel");
  const description = $("#projDescription");
  const dateEl      = $("#projDate");

  if (!overlay || !closeBtn || !prevBtn || !nextBtn) return;

  let current = 0;

  function renderProject(idx) {
    const p = PROJECTS[idx];
    if (!p) return;

    // Update carousel background colour
    if (carousel) {
      carousel.style.background = p.color;
      carousel.innerHTML = `
        <div style="text-align:center;">
          <span style="font-family:'Space Mono',monospace; font-size:13px; color:rgba(255,255,255,0.3);">&lt;project carousel&gt;</span>
          <div style="margin-top:24px; font-size:52px; opacity:0.15; font-family:'Space Mono',monospace; font-weight:700;">
            0${idx + 1}
          </div>
        </div>
      `;
    }

    // Build description lines
    if (description) {
      const lines = p.description.match(/.{1,42}(\s|$)/g) || [p.description];
      description.innerHTML = lines
        .map((line) => `<p>${line.trim()}</p>`)
        .join("");
    }

    // Date
    if (dateEl) dateEl.textContent = p.date;

    // Disable / enable nav buttons
    prevBtn.style.opacity = idx === 0 ? "0.3" : "1";
    prevBtn.style.pointerEvents = idx === 0 ? "none" : "auto";
    nextBtn.style.opacity = idx === PROJECTS.length - 1 ? "0.3" : "1";
    nextBtn.style.pointerEvents = idx === PROJECTS.length - 1 ? "none" : "auto";
  }

  // Open from card click
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      current = parseInt(card.dataset.project, 10);
      renderProject(current);
      openOverlay(overlay);
    });
  });

  // Prev
  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      current--;
      renderProject(current);
    }
  });

  // Next
  nextBtn.addEventListener("click", () => {
    if (current < PROJECTS.length - 1) {
      current++;
      renderProject(current);
    }
  });

  // Close
  closeBtn.addEventListener("click", () => closeOverlay(overlay));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay(overlay);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft")  prevBtn.click();
    if (e.key === "Escape")     closeOverlay(overlay);
  });
})();


/* ═══════════════════════════════════════════════════════════════
   7. CLOSE ALL OVERLAYS ON ESCAPE (global fallback)
═══════════════════════════════════════════════════════════════ */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  $$(".overlay.open").forEach((o) => closeOverlay(o));
});


/* ═══════════════════════════════════════════════════════════════
   8. FADE-UP SCROLL ANIMATIONS
═══════════════════════════════════════════════════════════════ */
(function initFadeAnimations() {
  // Add fade-up class to elements we want to animate
  const targets = [
    ".hero-inner",
    ".highlights-row",
    ".about-content",
    ".edu-skills-grid",
    ".project-card",
    ".acad-card",
    ".section-header",
  ];

  targets.forEach((sel) => {
    $$(sel).forEach((el, i) => {
      el.classList.add("fade-up");
      // Stagger cards
      if (sel === ".project-card") {
        el.style.transitionDelay = `${i * 0.07}s`;
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  $$(".fade-up").forEach((el) => observer.observe(el));
})();


/* ═══════════════════════════════════════════════════════════════
   9. STICKY WIDGET — click scrolls to top / shows reaction
═══════════════════════════════════════════════════════════════ */
(function initStickyWidget() {
  const widget = $("#stickyWidget");
  if (!widget) return;

  widget.addEventListener("click", () => {
    // Bounce animation
    widget.style.transform = "translateY(-6px) scale(1.04)";
    setTimeout(() => {
      widget.style.transform = "";
    }, 200);

    // Clear notif badge
    const badge = widget.querySelector(".sticky-notif");
    if (badge) {
      badge.style.transition = "opacity 0.3s";
      badge.style.opacity = "0";
      setTimeout(() => badge.remove(), 300);
    }

    // Update text after interaction
    const text = widget.querySelector(".sticky-text");
    if (text) {
      text.textContent = "glad you liked it! 🎉";
      setTimeout(() => {
        text.textContent = "how did you like it?";
      }, 3000);
    }
  });
})();


/* ═══════════════════════════════════════════════════════════════
   10. SMOOTH SIDEBAR NAV — scroll to section on click
═══════════════════════════════════════════════════════════════ */
(function initSmoothNav() {
  $$(".nav-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      const target = $(pill.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════
   11. PROFILE PIC — subtle parallax tilt on hover
═══════════════════════════════════════════════════════════════ */
(function initProfileTilt() {
  const ring = $(".profile-ring");
  if (!ring) return;

  ring.addEventListener("mousemove", (e) => {
    const rect   = ring.getBoundingClientRect();
    const cx     = rect.left + rect.width / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const tiltX  = dy * -8;
    const tiltY  = dx *  8;

    ring.style.transform    = `perspective(300px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
    ring.style.transition   = "transform 0.1s ease";
  });

  ring.addEventListener("mouseleave", () => {
    ring.style.transform  = "";
    ring.style.transition = "transform 0.4s ease";
  });
})();
