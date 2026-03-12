export interface SubjectTopic {
  id: string;
  name: string;
  children?: SubjectTopic[];
}

export interface Subject {
  id: string;
  name: string;
  prereqs: string[];
  semester: number;
  core: boolean;
  description: string;
  careers: string[];
  materials: string[];
  tracks?: string[]; // which tracks this belongs to
  topicTree?: SubjectTopic; // learning sub-diagram
}

export interface Track {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Major {
  id: string;
  name: string;
  icon: string;
  color: string;
  tracks: Track[];
  subjects: Subject[];
}

export const majors: Major[] = [
  {
    id: "se",
    name: "Công nghệ phần mềm",
    icon: "💻",
    color: "from-blue-500 to-cyan-400",
    tracks: [
      { id: "fe", name: "Frontend", icon: "🎨", description: "Phát triển giao diện người dùng" },
      { id: "be", name: "Backend", icon: "⚙️", description: "Phát triển hệ thống server" },
      { id: "fs", name: "Fullstack", icon: "🔗", description: "Kết hợp Frontend & Backend" },
    ],
    subjects: [
      {
        id: "cs101", name: "Nhập môn lập trình", prereqs: [], semester: 1, core: true,
        description: "Giới thiệu về lập trình với Python/C.",
        careers: ["Software Developer", "Data Analyst"],
        materials: ["Slides tuần 1-15", "Đề thi mẫu"],
        tracks: ["fe", "be", "fs"],
        topicTree: {
          id: "cs101-root", name: "Nhập môn lập trình",
          children: [
            { id: "cs101-1", name: "Biến & Kiểu dữ liệu", children: [
              { id: "cs101-1a", name: "Số nguyên & Số thực" },
              { id: "cs101-1b", name: "Chuỗi ký tự" },
            ]},
            { id: "cs101-2", name: "Cấu trúc điều khiển", children: [
              { id: "cs101-2a", name: "If / Else" },
              { id: "cs101-2b", name: "Vòng lặp" },
            ]},
            { id: "cs101-3", name: "Hàm & Module" },
            { id: "cs101-4", name: "File I/O" },
          ]
        }
      },
      {
        id: "cs102", name: "Cấu trúc dữ liệu", prereqs: ["cs101"], semester: 2, core: true,
        description: "Array, linked list, tree, graph và thuật toán.",
        careers: ["Backend Developer", "Algorithm Engineer"],
        materials: ["Bài tập thực hành", "Video bài giảng"],
        tracks: ["fe", "be", "fs"],
        topicTree: {
          id: "cs102-root", name: "Cấu trúc dữ liệu",
          children: [
            { id: "cs102-1", name: "Array & Linked List" },
            { id: "cs102-2", name: "Stack & Queue" },
            { id: "cs102-3", name: "Tree", children: [
              { id: "cs102-3a", name: "Binary Tree" },
              { id: "cs102-3b", name: "BST" },
            ]},
            { id: "cs102-4", name: "Graph", children: [
              { id: "cs102-4a", name: "BFS / DFS" },
              { id: "cs102-4b", name: "Shortest Path" },
            ]},
          ]
        }
      },
      {
        id: "cs103", name: "Thuật toán", prereqs: ["cs102"], semester: 3, core: true,
        description: "Phân tích và thiết kế thuật toán.",
        careers: ["Algorithm Engineer", "Software Architect"],
        materials: ["Problem sets", "Online judge"],
        tracks: ["be", "fs"],
        topicTree: {
          id: "cs103-root", name: "Thuật toán",
          children: [
            { id: "cs103-1", name: "Độ phức tạp" },
            { id: "cs103-2", name: "Chia để trị" },
            { id: "cs103-3", name: "Quy hoạch động" },
            { id: "cs103-4", name: "Tham lam" },
          ]
        }
      },
      {
        id: "cs201", name: "Cơ sở dữ liệu", prereqs: ["cs101"], semester: 2, core: true,
        description: "SQL, thiết kế CSDL, normalization.",
        careers: ["Database Admin", "Data Engineer"],
        materials: ["Lab exercises", "Project mẫu"],
        tracks: ["be", "fs"],
        topicTree: {
          id: "cs201-root", name: "Cơ sở dữ liệu",
          children: [
            { id: "cs201-1", name: "SQL cơ bản", children: [
              { id: "cs201-1a", name: "SELECT / JOIN" },
              { id: "cs201-1b", name: "INSERT / UPDATE / DELETE" },
            ]},
            { id: "cs201-2", name: "Thiết kế CSDL" },
            { id: "cs201-3", name: "Normalization" },
            { id: "cs201-4", name: "Indexing & Optimization" },
          ]
        }
      },
      {
        id: "cs202", name: "Lập trình Web", prereqs: ["cs102"], semester: 3, core: false,
        description: "HTML, CSS, JavaScript và frameworks.",
        careers: ["Frontend Developer", "Full-stack Developer"],
        materials: ["Code templates", "Tutorial videos"],
        tracks: ["fe", "fs"],
        topicTree: {
          id: "cs202-root", name: "Lập trình Web",
          children: [
            { id: "cs202-1", name: "HTML & CSS", children: [
              { id: "cs202-1a", name: "Responsive Design" },
              { id: "cs202-1b", name: "Flexbox & Grid" },
            ]},
            { id: "cs202-2", name: "JavaScript", children: [
              { id: "cs202-2a", name: "DOM Manipulation" },
              { id: "cs202-2b", name: "ES6+" },
            ]},
            { id: "cs202-3", name: "React / Vue" },
          ]
        }
      },
      {
        id: "cs203", name: "Lập trình Backend", prereqs: ["cs201", "cs102"], semester: 3, core: false,
        description: "Node.js, REST API, authentication.",
        careers: ["Backend Developer", "DevOps Engineer"],
        materials: ["API documentation", "Server projects"],
        tracks: ["be", "fs"],
        topicTree: {
          id: "cs203-root", name: "Lập trình Backend",
          children: [
            { id: "cs203-1", name: "Node.js / Express" },
            { id: "cs203-2", name: "REST API Design" },
            { id: "cs203-3", name: "Authentication & Authorization" },
            { id: "cs203-4", name: "Deployment" },
          ]
        }
      },
      {
        id: "cs301", name: "Công nghệ phần mềm", prereqs: ["cs202", "cs203"], semester: 4, core: true,
        description: "Quy trình phát triển phần mềm, Agile, Scrum.",
        careers: ["Project Manager", "Tech Lead"],
        materials: ["Case studies", "Group project guidelines"],
        tracks: ["fe", "be", "fs"],
        topicTree: {
          id: "cs301-root", name: "Công nghệ phần mềm",
          children: [
            { id: "cs301-1", name: "Agile & Scrum" },
            { id: "cs301-2", name: "Git & Version Control" },
            { id: "cs301-3", name: "Testing", children: [
              { id: "cs301-3a", name: "Unit Test" },
              { id: "cs301-3b", name: "Integration Test" },
            ]},
            { id: "cs301-4", name: "CI/CD" },
          ]
        }
      },
      {
        id: "cs302", name: "UI/UX Design", prereqs: ["cs202"], semester: 4, core: false,
        description: "Thiết kế giao diện và trải nghiệm người dùng.",
        careers: ["UI Designer", "UX Researcher"],
        materials: ["Figma files", "Design system docs"],
        tracks: ["fe"],
        topicTree: {
          id: "cs302-root", name: "UI/UX Design",
          children: [
            { id: "cs302-1", name: "Design Principles" },
            { id: "cs302-2", name: "Wireframing" },
            { id: "cs302-3", name: "Prototyping" },
            { id: "cs302-4", name: "User Testing" },
          ]
        }
      },
      {
        id: "cs303", name: "Hệ thống phân tán", prereqs: ["cs203"], semester: 4, core: false,
        description: "Microservices, message queues, scaling.",
        careers: ["System Architect", "Cloud Engineer"],
        materials: ["Architecture diagrams", "Case studies"],
        tracks: ["be"],
        topicTree: {
          id: "cs303-root", name: "Hệ thống phân tán",
          children: [
            { id: "cs303-1", name: "Microservices" },
            { id: "cs303-2", name: "Message Queues" },
            { id: "cs303-3", name: "Load Balancing" },
            { id: "cs303-4", name: "Caching" },
          ]
        }
      },
    ],
  },
  {
    id: "gd",
    name: "Thiết kế đồ họa",
    icon: "🎨",
    color: "from-pink-500 to-rose-400",
    tracks: [
      { id: "ui", name: "UI/UX Design", icon: "📱", description: "Thiết kế giao diện & trải nghiệm" },
      { id: "motion", name: "Motion Design", icon: "🎬", description: "Thiết kế chuyển động & video" },
    ],
    subjects: [
      {
        id: "gd101", name: "Nguyên lý thiết kế", prereqs: [], semester: 1, core: true,
        description: "Màu sắc, bố cục, typography cơ bản.",
        careers: ["Graphic Designer", "UI Designer"],
        materials: ["Bài tập thiết kế", "Mood board mẫu"],
        tracks: ["ui", "motion"],
        topicTree: { id: "gd101-root", name: "Nguyên lý thiết kế", children: [
          { id: "gd101-1", name: "Màu sắc" },
          { id: "gd101-2", name: "Typography" },
          { id: "gd101-3", name: "Bố cục & Layout" },
        ]}
      },
      {
        id: "gd102", name: "Thiết kế UI/UX", prereqs: ["gd101"], semester: 2, core: true,
        description: "User research, wireframing, prototyping.",
        careers: ["UX Designer", "Product Designer"],
        materials: ["Figma templates", "Case studies"],
        tracks: ["ui"],
        topicTree: { id: "gd102-root", name: "Thiết kế UI/UX", children: [
          { id: "gd102-1", name: "User Research" },
          { id: "gd102-2", name: "Wireframing" },
          { id: "gd102-3", name: "Prototyping" },
        ]}
      },
      {
        id: "gd201", name: "Motion Graphics", prereqs: ["gd101"], semester: 3, core: false,
        description: "Animation cơ bản với After Effects.",
        careers: ["Motion Designer", "Video Editor"],
        materials: ["Project files", "Tutorials"],
        tracks: ["motion"],
        topicTree: { id: "gd201-root", name: "Motion Graphics", children: [
          { id: "gd201-1", name: "Keyframe Animation" },
          { id: "gd201-2", name: "After Effects Basics" },
          { id: "gd201-3", name: "Compositing" },
        ]}
      },
    ],
  },
  {
    id: "ib",
    name: "Kinh doanh quốc tế",
    icon: "🌍",
    color: "from-emerald-500 to-teal-400",
    tracks: [
      { id: "trade", name: "Thương mại", icon: "📊", description: "Xuất nhập khẩu & thương mại" },
      { id: "marketing", name: "Marketing", icon: "📣", description: "Tiếp thị & truyền thông" },
    ],
    subjects: [
      {
        id: "ib101", name: "Kinh tế vi mô", prereqs: [], semester: 1, core: true,
        description: "Cung cầu, thị trường, hành vi người tiêu dùng.",
        careers: ["Business Analyst", "Economist"],
        materials: ["Textbook chapters", "Bài tập tình huống"],
        tracks: ["trade", "marketing"],
        topicTree: { id: "ib101-root", name: "Kinh tế vi mô", children: [
          { id: "ib101-1", name: "Cung & Cầu" },
          { id: "ib101-2", name: "Cấu trúc thị trường" },
          { id: "ib101-3", name: "Hành vi tiêu dùng" },
        ]}
      },
      {
        id: "ib102", name: "Marketing căn bản", prereqs: [], semester: 1, core: true,
        description: "4P, segmentation, branding.",
        careers: ["Marketing Manager", "Brand Strategist"],
        materials: ["Campaign examples", "Quiz bank"],
        tracks: ["marketing"],
        topicTree: { id: "ib102-root", name: "Marketing căn bản", children: [
          { id: "ib102-1", name: "4P Marketing" },
          { id: "ib102-2", name: "Segmentation" },
          { id: "ib102-3", name: "Branding" },
        ]}
      },
      {
        id: "ib201", name: "Thương mại quốc tế", prereqs: ["ib101"], semester: 2, core: true,
        description: "Chính sách thương mại, WTO, FTA.",
        careers: ["Trade Analyst", "Export Manager"],
        materials: ["Research papers", "Case studies"],
        tracks: ["trade"],
        topicTree: { id: "ib201-root", name: "Thương mại quốc tế", children: [
          { id: "ib201-1", name: "WTO & FTA" },
          { id: "ib201-2", name: "Xuất nhập khẩu" },
        ]}
      },
    ],
  },
  {
    id: "ai",
    name: "Trí tuệ nhân tạo",
    icon: "🤖",
    color: "from-violet-500 to-purple-400",
    tracks: [
      { id: "ml", name: "Machine Learning", icon: "🧠", description: "Học máy & mô hình" },
      { id: "ds", name: "Data Science", icon: "📈", description: "Phân tích & khoa học dữ liệu" },
    ],
    subjects: [
      {
        id: "ai101", name: "Toán rời rạc", prereqs: [], semester: 1, core: true,
        description: "Logic, tập hợp, đồ thị, tổ hợp.",
        careers: ["AI Researcher", "Data Scientist"],
        materials: ["Problem sets", "Lecture notes"],
        tracks: ["ml", "ds"],
        topicTree: { id: "ai101-root", name: "Toán rời rạc", children: [
          { id: "ai101-1", name: "Logic mệnh đề" },
          { id: "ai101-2", name: "Lý thuyết đồ thị" },
          { id: "ai101-3", name: "Tổ hợp" },
        ]}
      },
      {
        id: "ai102", name: "Xác suất thống kê", prereqs: [], semester: 1, core: true,
        description: "Phân phối, kiểm định, hồi quy.",
        careers: ["Statistician", "ML Engineer"],
        materials: ["R exercises", "Datasets"],
        tracks: ["ml", "ds"],
        topicTree: { id: "ai102-root", name: "Xác suất thống kê", children: [
          { id: "ai102-1", name: "Phân phối xác suất" },
          { id: "ai102-2", name: "Kiểm định giả thuyết" },
          { id: "ai102-3", name: "Hồi quy" },
        ]}
      },
      {
        id: "ai201", name: "Machine Learning", prereqs: ["ai101", "ai102"], semester: 3, core: true,
        description: "Supervised, unsupervised learning, neural networks.",
        careers: ["ML Engineer", "AI Developer"],
        materials: ["Jupyter notebooks", "Papers"],
        tracks: ["ml"],
        topicTree: { id: "ai201-root", name: "Machine Learning", children: [
          { id: "ai201-1", name: "Supervised Learning" },
          { id: "ai201-2", name: "Unsupervised Learning" },
          { id: "ai201-3", name: "Neural Networks" },
        ]}
      },
    ],
  },
  {
    id: "lang",
    name: "Ngôn ngữ Anh",
    icon: "📚",
    color: "from-amber-500 to-orange-400",
    tracks: [
      { id: "trans", name: "Biên phiên dịch", icon: "🗣️", description: "Dịch thuật chuyên nghiệp" },
      { id: "teach", name: "Sư phạm", icon: "👩‍🏫", description: "Giảng dạy tiếng Anh" },
    ],
    subjects: [
      {
        id: "en101", name: "Ngữ pháp nâng cao", prereqs: [], semester: 1, core: true,
        description: "Grammar structures for academic writing.",
        careers: ["Translator", "Content Writer"],
        materials: ["Grammar exercises", "Writing samples"],
        tracks: ["trans", "teach"],
        topicTree: { id: "en101-root", name: "Ngữ pháp nâng cao", children: [
          { id: "en101-1", name: "Tenses & Modals" },
          { id: "en101-2", name: "Clauses & Phrases" },
          { id: "en101-3", name: "Academic Writing" },
        ]}
      },
      {
        id: "en102", name: "Nghe nói học thuật", prereqs: [], semester: 1, core: true,
        description: "Academic listening and speaking skills.",
        careers: ["Interpreter", "Teacher"],
        materials: ["Audio files", "Discussion topics"],
        tracks: ["trans", "teach"],
        topicTree: { id: "en102-root", name: "Nghe nói học thuật", children: [
          { id: "en102-1", name: "Listening Strategies" },
          { id: "en102-2", name: "Presentation Skills" },
          { id: "en102-3", name: "Discussion & Debate" },
        ]}
      },
    ],
  },
];
