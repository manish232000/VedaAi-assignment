# 🎓 VedaAI - AI Assessment & Question Paper Mapping Engine

A modern, responsive AI-powered Question Paper Extraction and Answer Sheet Evaluation interface built with **React**, **Vite**, **Vanilla CSS**, and **PDF.js**.

---

## 🚀 Live Demo & Deployment
- **Local Dev Server**: `http://localhost:5173/`
- **Build Status**: Production Ready (`npm run build`)

---

## 📖 1. Brief Explanation of the Approach

The application uses an **End-to-End Client-First Architecture** designed for high visual fidelity and responsive document processing:

1. **3-Step Workflow**:
   - **Upload State**: Dual dropzones for Question Paper and Student Answer Sheet with drag-and-drop validation, file badges, and upload progress bars.
   - **Extraction State**: Animated 3-star gradient sparkle loader simulating real-time AI OCR extraction.
   - **Evaluated Mapping View**: Split-pane interface displaying extracted questions on the left and the student's answer sheet on the right.

2. **Interactive Bidirectional Highlighting**:
   - Clicking any question in the left panel dynamically identifies and maps the corresponding answer region on the student's answer sheet with smooth auto-scrolling.

3. **Responsive Dual-State Layout**:
   - **Desktop**: Split-pane canvas with collapsed icon-only sidebar and side-by-side question-answer layout.
   - **Mobile**: Segmented pill tab switcher (`[ Questions ]` & `[ Answer Sheet ]`) with slide-out drawer navigation matching Figma specifications.

---

## 🤖 2. AI Model & API Used

- **PDF.js Core (`pdfjs-dist`)**:
  - Client-side document processing engine used for parsing uploaded PDFs, extracting text glyphs, calculating bounding boxes, and rendering high-resolution vector canvas pages.
- **LLM / Gemini 1.5 Semantic Pipeline Pattern**:
  - Semantic question segmentation parser to identify printed question structures, numbered sections, and sub-parts (`11a`, `11b`).
  - Automated grading rubric pipeline calculating score awards (`full`, `mid`, `zero`) and generating contextual pedagogical AI feedback.

---

## ✨ 3. Key Features & Handled Requirements

| # | Requirement | Implementation Details |
|---|---|---|
| 1 | **Upload both files & show processing progress** | Dual dropzone upload cards with progress bars and "Extracting..." state screen. |
| 2 | **Extract every question in printed order** | Sequential document parser maintaining original printed question order. |
| 3 | **Treat labelled sub-parts as separate questions** | `11 (a)` and `11 (b)` are extracted and scored as independent entries. |
| 4 | **Preserve original question numbering** | Retains original numbers (`Q1` to `Q12`, `11 a.`, `11 b.`) without re-indexing. |
| 5 | **Handle questions answered out of order** | Highlight jumps accurately to answers written anywhere on the sheet with `⇄ Out of Order` tags. |
| 6 | **Handle unanswered questions** | Displays `⚠ Unanswered` badge, `0/2` score, and floating sheet alerts for missing answers. |
| 7 | **Handle unmatched student answers** | Dedicated `Unmatched Student Responses` section for orphan/extra student answers. |
| 8 | **Highlight exact answer region** | Identifies and focuses on specific student response coordinates on the sheet. |
| 9 | **Multi-page answer spanning** | Supports questions spanning across pages (`Page 1 → Page 2`) with page divider connectors. |

---

## ⚠️ 4. Key Assumptions & Limitations

### **Assumptions:**
- Uploaded files are standard PDFs, images (PNG/JPG), or text documents.
- Sub-parts follow standard hierarchical numbering (e.g., `(a)`, `(b)`).
- Long descriptive answers may span contiguous pages.

### **Limitations:**
- Pure low-resolution / blurry handwritten photo scans require backend cloud Vision OCR for 100% handwriting text decoding.
- Document processing runs client-side within the active browser session without persistent remote database storage.

---

## 🛠️ 5. Getting Started (Installation & Running Locally)

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Setup Steps
```bash
# 1. Clone or navigate to the repository
cd VedaAi

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Production Build
```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Design System & Aesthetics
- **Fonts**: `Plus Jakarta Sans`, `Outfit`
- **Color Palette**: VedaAI Coral (`#FF5A22`), Charcoal (`#121417`), Slate (`#64748B`), Success Green (`#22C55E`)
- **Icons**: Lucide React Icons & Custom SVGs
