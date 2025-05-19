# 🧪 YAML Test Case Generator

A beautifully designed, modern web application that converts complex Excel-based test case data into structured YAML format. Built for manual testers, QA teams, and data engineers who need to validate large test suites efficiently—without writing YAML manually.

![YAML Generator Screenshot](./assets/screenshot.png)

## 🚀 Live Demo

👉 [Launch App](https://brilliant-wisp-fbbee7.netlify.app)

---

## 📌 Key Features

- 🎨 **Apple-Inspired Design**: Clean, minimalist UI following Apple’s Human Interface Guidelines.
- 🧱 **Modular Form Builder**: Add/remove test steps dynamically.
- 🧾 **Live YAML Preview**: Real-time YAML output updates as you type.
- 📤 **Download YAML**: One-click export without extra line breaks.
- 📋 **Copy to Clipboard**: Instant YAML copying with smooth animations.
- ⚙️ **Resizable Panels**: Drag to resize the form and preview sections.
- 💡 **Tooltips & Validation**: Inline hints and form validation.
- 🪄 **Micro Animations**: Elegant UI transitions and hover effects.

---

## 🧰 Tech Stack

| Frontend     | Tooling       | Styling        |
|--------------|---------------|----------------|
| React + TypeScript | Vite | Tailwind CSS |
| Zustand (state mgmt) | YAML | Apple HIG-inspired design |
| React Split Pane | PrismJS (syntax highlight) | Custom scrollbar, transitions |

---

## 📂 Project Structure

```bash
├── src/
│   ├── components/
│   │   ├── TestCaseForm.tsx       # Main test case input form
│   │   ├── StepForm.tsx           # Individual test step form
│   │   ├── YAMLPreview.tsx        # Real-time YAML preview panel
│   │   ├── YAMLGenerator.tsx      # Root layout with resizable panels
│   │   └── ResizablePanel.tsx     # Draggable resizable divider
│   ├── types/
│   │   └── index.ts               # Type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # Global styles and custom animations
⚙️ Setup Instructions

    Make sure you have Node.js installed.

🛠 Installation

git clone https://github.com/your-username/yaml-testcase-generator.git
cd yaml-testcase-generator
npm install

🧪 Start Dev Server

npm run dev

    The app will be available at http://localhost:5173

🖼 Usage

    Fill in the Test Case Metadata fields.

    Add as many Steps as needed with SQL, expected results, etc.

    View the YAML Preview live as you type.

    Click Download or Copy to get your YAML instantly.

📸 UI Highlights

    ✅ Responsive design for desktop and mobile.

    🖱️ Drag-and-resize panel divider.

    💾 Real-time download-ready YAML output.

    📎 Clean copy-to-clipboard UX with success animations.

🧱 YAML Output Format

Test ID: RD253_OPQ_CUR_CML_UPDATE_TC003
Subject: Use Case\RD253_OPQ_CUR_CML_TC001\OPQ Testing
Test Name: RD253_OPQ_CUR_CML_TC003 | Verify the table structure and data integrity for Curated_Current.Contact
Description: |-
  Verify the table structure and data integrity between staging to curated layer for Curated_Current.Contact
Type: Manual
Category: Validation Not Relevant
Owner: X256438
GxP: Y
Steps:
  - Step ID: Step-1
    Step Description: |-
      Login to snowflake and capture the Userid.
      Attach the Screenshot
    SQL Query: null
    Check description: null
    Expected Result: |-
      User is able to login to snowflake and capture the Userid.
      Logged in Userid is captured
      Screenshot is attached
    Evidence Required: Y
    Status: null
  ...

    ⚠️ All spacing, indentations, and |- line breaks are preserved as per YAML standards.

📦 Deployment

This app is deployed to Netlify.
🧾 Build for Production

npm run build

🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
🧩 Suggestions

Dark mode support

Excel file import for test cases

    Support for other output formats (JSON, XML)

📄 License

This project is open-sourced under the MIT License.
🧑‍💻 Author

Santanu Adhikary
GitHub • LinkedIn

    Built with ❤️ to make test case management simpler, faster, and prettier.