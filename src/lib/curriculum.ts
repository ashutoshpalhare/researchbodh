export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  idea: string; // one-line big idea, plain words
  body: string[]; // paragraphs
  points?: string[];
  example: { title: string; text: string };
  exercise: string;
  term?: string; // terminology introduced AFTER the concept
};
export type Question = { q: string; options: string[]; answer: number; why: string };
export type Module = {
  id: string;
  n: number;
  stage: "Foundations" | "Investigate" | "Analyse" | "Communicate" | "Capstone";
  title: string;
  summary: string;
  lessons: Lesson[];
  quiz: Question[];
  assignment: string;
};

export const modules: Module[] = [
  {
    id: "curiosity",
    n: 1,
    stage: "Foundations",
    title: "Curiosity & Critical Thinking",
    summary: "Turn everyday wondering into careful thinking. Learn to notice, question, and separate what you know from what you assume.",
    lessons: [
      {
        id: "noticing",
        title: "Research starts with noticing",
        minutes: 8,
        idea: "Every investigation begins with something that surprises or puzzles you.",
        body: [
          "Research is not a special activity reserved for scientists in lab coats. At its heart, it is a disciplined way of answering a question you genuinely care about — and being honest about how sure you are of the answer.",
          "Most good questions start as a small itch: Why does my phone battery die faster in winter? Why do some classmates remember vocabulary easily? Why is the canteen queue always longest on Mondays? Noticing these patterns is the first skill of a researcher.",
          "The difference between casual curiosity and research is what you do next. A curious person wonders; a researcher writes the question down, asks what is already known, and plans a fair way to find out.",
        ],
        points: ["Keep a 'wonder list' for one week", "Write questions, not answers", "Prefer specific puzzles over vague topics"],
        example: { title: "From itch to inquiry", text: "Riya notices her plants on the balcony grow faster than the ones in her room. Instead of concluding 'sunlight is better', she writes: 'Does the amount of daily sunlight change how fast a money plant grows?' That single sentence is the seed of a project." },
        exercise: "Write down five things you noticed this week that puzzled you. Circle the one you would most like to understand.",
      },
      {
        id: "assumptions",
        title: "Facts, opinions, and assumptions",
        minutes: 10,
        idea: "Good thinkers can tell what is shown by evidence and what is simply believed.",
        body: [
          "A fact can be checked: 'Water boils at 100 °C at sea level.' An opinion is a judgement: 'Tea tastes better than coffee.' An assumption is a hidden belief we take for granted without checking: 'Students who sit in front are smarter.'",
          "Critical thinking means slowing down to ask: How do we know this? Who says so? What would change my mind? It is not about being negative — it is about being fair to the truth.",
          "One powerful habit is to look for the strongest version of the view you disagree with. If you can explain it well, you understand the problem better.",
        ],
        points: ["Ask 'How do we know?'", "Look for what's missing", "Consider other explanations"],
        example: { title: "Spot the assumption", text: "Claim: 'Our school's toppers all use the same app, so the app makes students score higher.' Hidden assumption: the app caused the scores. Alternative: high-scoring students may simply be more likely to try study apps." },
        exercise: "Find one headline or social media post. Label each statement inside it as fact, opinion, or assumption.",
        term: "Bias — a tendency that pushes thinking in one direction, often without us noticing.",
      },
    ],
    quiz: [
      { q: "Which statement is an assumption rather than a fact?", options: ["The library opens at 9 a.m.", "Students who read more must be happier", "The school has 1,200 students", "Chlorophyll is green"], answer: 1, why: "It links reading and happiness without evidence — a belief taken for granted." },
      { q: "What separates research from casual curiosity?", options: ["Using expensive equipment", "Having a planned, honest way to find out", "Already knowing the answer", "Writing long reports"], answer: 1, why: "Research is curiosity plus a fair method and honesty about uncertainty." },
      { q: "A good critical thinker…", options: ["Rejects every claim", "Accepts claims from popular people", "Asks how we know something", "Avoids opposing views"], answer: 2, why: "Critical thinking is fair questioning, not automatic rejection." },
    ],
    assignment: "Keep a wonder list for three days. Pick one item and explain in 100 words why it is worth investigating and what you currently assume about it.",
  },
  {
    id: "reasoning",
    n: 2,
    stage: "Foundations",
    title: "How Scientific Reasoning Works",
    summary: "Understand observation, explanation, testing, and why 'correlation is not causation' matters everywhere.",
    lessons: [
      {
        id: "cycle",
        title: "The research cycle",
        minutes: 9,
        idea: "Research is a loop: observe, ask, predict, test, reflect — then ask again.",
        body: [
          "Scientists rarely move in a straight line. They observe something, propose a possible explanation, predict what should happen if that explanation is right, test it, and compare the results to the prediction.",
          "If the result matches, confidence grows a little. If it doesn't, the explanation needs to change. Either outcome is useful — a failed prediction teaches you something real.",
        ],
        points: ["Observe", "Ask", "Predict", "Test", "Reflect & revise"],
        example: { title: "The bread mould test", text: "Observation: bread goes mouldy faster in summer. Explanation: warmth speeds mould growth. Prediction: identical slices kept in a warm place will mould sooner than ones in the fridge. Test: compare slices daily. Reflect: what else differed between the places, such as humidity?" },
        exercise: "Draw the research cycle for a question from your wonder list. Fill in each stage in one sentence.",
        term: "Empirical — based on observation or experiment rather than pure opinion.",
      },
      {
        id: "causation",
        title: "Correlation is not causation",
        minutes: 10,
        idea: "Two things happening together does not prove one causes the other.",
        body: [
          "Ice cream sales and drowning incidents both rise in summer. Ice cream doesn't cause drowning — hot weather increases both. That hidden third factor is called a confounding variable.",
          "To claim cause, researchers try to control other factors, change only one thing at a time, compare with a group that didn't get the change, and repeat the test.",
        ],
        example: { title: "Screen time and sleep", text: "A survey finds students with more screen time sleep less. Possible explanations: screens delay sleep; stressed students both use screens and sleep less; or late sleepers fill time with screens. The survey alone can't tell which." },
        exercise: "Write down two things that tend to happen together. List at least two other explanations besides 'A causes B'.",
        term: "Confounding variable — a hidden factor that affects both things you are comparing.",
      },
    ],
    quiz: [
      { q: "Ice cream sales and sunburn both rise together. The most likely explanation is…", options: ["Ice cream causes sunburn", "Sunburn makes people buy ice cream", "Hot sunny weather increases both", "It's pure coincidence"], answer: 2, why: "Weather is a confounding variable affecting both." },
      { q: "If your prediction fails, you should…", options: ["Hide the result", "Change the data", "Revise your explanation", "Stop researching"], answer: 2, why: "Failed predictions are useful evidence that your idea needs updating." },
      { q: "Which is a prediction?", options: ["Plants are nice", "If plants get more light, they will grow taller in 3 weeks", "Why do plants grow?", "Plants need care"], answer: 1, why: "A prediction says what should happen under specific conditions." },
    ],
    assignment: "Find a news claim that implies one thing causes another. Write a short paragraph identifying a possible confounding variable and what evidence would be needed to show cause.",
  },
  {
    id: "questions",
    n: 3,
    stage: "Investigate",
    title: "Topics, Questions & Hypotheses",
    summary: "Narrow a broad interest into a focused, answerable research question — and turn it into a testable hypothesis.",
    lessons: [
      {
        id: "narrowing",
        title: "From topic to focused question",
        minutes: 12,
        idea: "A topic is a field; a research question is a single path through it.",
        body: [
          "'Climate change' is a topic. 'Has the average April temperature in Pune changed between 2000 and 2023?' is a research question. The second one tells you exactly what to look for.",
          "A strong question is focused (one main idea), feasible (you can actually answer it with your time and tools), researchable (evidence exists or can be collected), and meaningful (someone benefits from the answer).",
          "Narrow by adding who, where, when, and what exactly you will measure.",
        ],
        points: ["Focused", "Feasible", "Researchable", "Meaningful", "Ethical"],
        example: { title: "Narrowing ladder", text: "Social media → Social media and students → Instagram use and sleep in students → Does daily Instagram use after 10 p.m. relate to sleep duration among Class 10 students at my school?" },
        exercise: "Take a broad topic you like and narrow it in four steps using who, where, when, and what.",
        term: "Scope — the boundaries of what your research will and won't cover.",
      },
      {
        id: "hypotheses",
        title: "Writing a testable hypothesis",
        minutes: 10,
        idea: "A hypothesis is a clear, testable guess about what you expect to find — and why.",
        body: [
          "A hypothesis turns your question into a statement that evidence could support or contradict. It usually names what you change or compare (independent variable) and what you measure (dependent variable).",
          "Format that works: 'If [change], then [measurable effect], because [reason].' Researchers also write a null hypothesis — the statement that there is no effect — which the data may or may not challenge.",
          "Not every project needs a hypothesis. Exploratory and qualitative studies often begin with open questions instead.",
        ],
        example: { title: "Hypothesis pair", text: "Hypothesis: Students who review flashcards for 10 minutes daily will score higher on a weekly vocabulary test than students who don't, because spaced repetition strengthens memory. Null: There is no difference in scores between the groups." },
        exercise: "Write one hypothesis and its null version for your narrowed question. Underline the independent and dependent variables.",
        term: "Variable — anything that can change or be measured in a study.",
      },
    ],
    quiz: [
      { q: "Which is the most focused research question?", options: ["What about pollution?", "Is pollution bad?", "Did PM2.5 levels near my school differ between weekdays and weekends in March?", "How can we save the world?"], answer: 2, why: "It specifies what, where, and when — and is measurable." },
      { q: "In 'If students sleep 8 hours, test scores improve', the dependent variable is…", options: ["Students", "Sleep hours", "Test scores", "The school"], answer: 2, why: "Test scores are what you measure as the outcome." },
      { q: "A null hypothesis states that…", options: ["Your idea is definitely right", "There is no effect or difference", "The study failed", "Data is missing"], answer: 1, why: "The null is the 'no effect' baseline you test against." },
    ],
    assignment: "Use the Question Builder in the Toolkit to create a research question. Paste it here with a hypothesis and a one-line justification of why it is feasible.",
  },
  {
    id: "sources",
    n: 4,
    stage: "Investigate",
    title: "Credible Sources & Literature Reviews",
    summary: "Find out what is already known, judge whether a source deserves your trust, and summarise the conversation honestly.",
    lessons: [
      {
        id: "credibility",
        title: "Is this source trustworthy?",
        minutes: 12,
        idea: "Not all information is equal. Check who made it, why, and on what evidence.",
        body: [
          "Before using a source, ask five questions: Who wrote it and what is their expertise? Why was it created — to inform, sell, or persuade? When was it published? What evidence does it show? Can you confirm it elsewhere?",
          "Primary sources are original evidence (a study's data, an interview, a government dataset). Secondary sources explain or summarise primary ones (textbooks, review articles, news reports).",
          "Peer-reviewed journals are generally strong, but even they can contain errors. Always read critically and never cite a source you haven't actually read.",
        ],
        points: ["Author", "Purpose", "Date", "Evidence", "Corroboration"],
        example: { title: "Two articles, one claim", text: "A blog selling supplements claims 'Vitamin X boosts memory by 40%'. It links no study. A university health page explains that small trials show mixed results. The second is more credible because it shows uncertainty and evidence." },
        exercise: "Pick two sources on the same topic and score each using the Source Checklist in the Toolkit.",
        term: "Peer review — experts checking a study before it is published.",
      },
      {
        id: "litreview",
        title: "Writing a literature review",
        minutes: 12,
        idea: "A literature review maps what others found, where they agree, and what is still unknown.",
        body: [
          "A literature review is not a list of summaries. It groups sources by theme, compares their findings, and points out gaps — the questions no one has answered well yet.",
          "Use a synthesis table: rows for sources, columns for question, method, key finding, and limitation. Patterns jump out when you see them side by side.",
          "The gap you find often becomes the justification for your own study.",
        ],
        example: { title: "Synthesis sentence", text: "Weak: 'Smith says X. Lee says Y.' Strong: 'While several studies link morning exercise to better attention, most involve adults; few examine teenagers, which this study addresses.'" },
        exercise: "Build a 3-row synthesis table for sources you have actually read, then write one sentence describing the gap.",
        term: "Research gap — an unanswered or under-studied part of a topic.",
      },
    ],
    quiz: [
      { q: "Which is a primary source?", options: ["A textbook chapter", "A news summary of a study", "The original survey data from a study", "A Wikipedia article"], answer: 2, why: "Primary sources are original evidence." },
      { q: "A site selling a product claims it is 'scientifically proven' but links nothing. You should…", options: ["Cite it", "Treat it as weak until verified", "Assume it's false", "Copy the claim"], answer: 1, why: "Commercial purpose and no evidence = low credibility until corroborated." },
      { q: "A strong literature review mainly…", options: ["Lists summaries", "Compares themes and identifies gaps", "Uses as many sources as possible", "Agrees with every source"], answer: 1, why: "Synthesis and gaps are what make a review useful." },
    ],
    assignment: "Evaluate three real sources you have found for your question using the Source Checklist. Record each title, its score, and one limitation.",
  },
  {
    id: "methods",
    n: 5,
    stage: "Investigate",
    title: "Research Design & Methods",
    summary: "Choose between qualitative and quantitative approaches, design a fair study, and collect data ethically.",
    lessons: [
      {
        id: "qualquant",
        title: "Numbers or meanings?",
        minutes: 11,
        idea: "Quantitative research measures how much; qualitative research explores how and why.",
        body: [
          "Quantitative methods collect numbers: test scores, temperatures, survey ratings. They are good for comparing groups and spotting patterns across many people.",
          "Qualitative methods collect words, images, and experiences: interviews, open-ended responses, observations. They are good for understanding reasons, feelings, and context.",
          "Mixed methods combine both — for example, a survey to see how common something is, then interviews to understand why.",
        ],
        example: { title: "Same topic, two lenses", text: "Quantitative: 'What percentage of students skip breakfast?' Qualitative: 'What reasons do students give for skipping breakfast?' Both are valid; they answer different questions." },
        exercise: "For your question, decide whether quantitative, qualitative, or mixed methods fit best. Explain why in three sentences.",
        term: "Sample — the group of people or things you actually study.",
      },
      {
        id: "design",
        title: "Designing a fair study",
        minutes: 12,
        idea: "A fair test changes one thing, keeps the rest the same, and compares carefully.",
        body: [
          "Experiments change an independent variable and measure the effect, keeping controlled variables constant. A control group, which doesn't receive the change, gives you a baseline.",
          "Surveys need clear, neutral questions. Avoid leading questions like 'Don't you agree homework is too much?' Pilot your survey with a few people first.",
          "Think about sample size and selection. Asking only your friends gives a biased picture. Random or varied selection makes findings more representative.",
        ],
        points: ["One change at a time", "Control group", "Neutral wording", "Pilot first", "Representative sample"],
        example: { title: "Fixing a leading question", text: "Leading: 'How much do you love the new canteen menu?' Neutral: 'How would you rate the new canteen menu? (1 = very poor, 5 = excellent)'" },
        exercise: "Draft three neutral survey questions or one simple experiment design with variables identified.",
        term: "Reliability — getting consistent results when repeated. Validity — measuring what you intend to measure.",
      },
      {
        id: "ethics",
        title: "Ethics & protecting participants",
        minutes: 10,
        idea: "People who help your research deserve respect, honesty, and privacy.",
        body: [
          "Ethical research gets informed consent: participants know what's involved and agree freely. They can stop at any time without penalty. For anyone under 18, a parent or guardian should also consent.",
          "Protect privacy: collect only what you need, remove names (anonymise), store data securely, and never share identifiable information.",
          "Avoid harm — physical, emotional, or social. If a question might upset someone, rethink it or ask an adult mentor.",
        ],
        points: ["Informed consent", "Right to withdraw", "Anonymity", "Minimal data", "No harm"],
        example: { title: "Consent in one paragraph", text: "'I'm researching study habits for a school project. The survey takes 5 minutes, is anonymous, and you can skip any question or stop anytime. Responses will only be reported as group totals.'" },
        exercise: "Write a short consent note for your planned study.",
      },
    ],
    quiz: [
      { q: "Which method best explores why students feel exam stress?", options: ["Counting exam dates", "Interviews", "Measuring room temperature", "Weighing textbooks"], answer: 1, why: "Interviews capture reasons and experiences — qualitative depth." },
      { q: "A control group is…", options: ["The researcher's friends", "A group that doesn't receive the change, for comparison", "The largest group", "A group that controls the study"], answer: 1, why: "It gives a baseline to compare against." },
      { q: "Which is an ethical practice?", options: ["Recording names with sensitive answers", "Pressuring classmates to participate", "Letting participants stop anytime", "Sharing raw data on social media"], answer: 2, why: "The right to withdraw is a core ethical principle." },
    ],
    assignment: "Write a one-page method plan: approach, sample, data collection steps, variables or themes, and ethical safeguards.",
  },
  {
    id: "analysis",
    n: 6,
    stage: "Analyse",
    title: "Analysing & Interpreting Data",
    summary: "Organise raw data, use simple statistics and themes, read charts honestly, and interpret results without overclaiming.",
    lessons: [
      {
        id: "numbers",
        title: "Making sense of numbers",
        minutes: 12,
        idea: "Simple summaries — average, spread, and a good chart — reveal most patterns.",
        body: [
          "Start by cleaning data: check for typos, missing values, and impossible entries (like a sleep duration of 30 hours). Note what you removed and why.",
          "The mean is the average; the median is the middle value and resists extreme outliers; the range shows spread. Report more than one.",
          "Choose charts carefully: bar charts compare categories, line charts show change over time, scatter plots show relationships. Always label axes and start bar charts at zero.",
        ],
        example: { title: "Mean vs median", text: "Pocket money of five students: ₹100, ₹120, ₹130, ₹150, ₹2,000. Mean = ₹500 (misleading). Median = ₹130 (more representative)." },
        exercise: "Collect 10 numbers (e.g., minutes of daily reading among family members). Calculate mean, median, and range.",
        term: "Outlier — a value far from the rest of the data.",
      },
      {
        id: "themes",
        title: "Finding themes in words",
        minutes: 10,
        idea: "Qualitative analysis groups what people said into meaningful patterns.",
        body: [
          "Read all responses once without judging. Then highlight phrases and give them short labels (codes) like 'time pressure' or 'family expectations'.",
          "Group related codes into themes. Support each theme with anonymised quotes. Note responses that don't fit — they matter too.",
        ],
        example: { title: "Coding responses", text: "'I skip breakfast because the bus comes early' → code: time. 'I'm not hungry in the morning' → code: appetite. Theme: practical vs. physical reasons for skipping breakfast." },
        exercise: "Ask five people one open question and code their answers into at least two themes.",
      },
      {
        id: "interpreting",
        title: "Interpreting results honestly",
        minutes: 10,
        idea: "Say what your data shows — no more, no less — and name its limits.",
        body: [
          "Compare results to your hypothesis and to earlier studies. Did they agree? If not, suggest reasons carefully.",
          "Use cautious language: 'suggests', 'is associated with', 'in this sample'. Avoid 'proves' unless you truly have strong, repeated evidence.",
          "Every study has limitations — small sample, one school, self-reported data. Stating them makes your work more trustworthy, not less.",
        ],
        example: { title: "Overclaim vs honest claim", text: "Overclaim: 'Flashcards make everyone smarter.' Honest: 'In our sample of 24 students, those using flashcards scored on average 2 points higher; a larger study would be needed to confirm this.'" },
        exercise: "Rewrite three overconfident claims using careful, honest language.",
        term: "Limitation — a weakness in a study that affects how far results can be trusted or generalised.",
      },
    ],
    quiz: [
      { q: "Which measure best resists one extreme outlier?", options: ["Mean", "Median", "Total", "Maximum"], answer: 1, why: "The median is the middle value and isn't pulled by extremes." },
      { q: "To show change in temperature over 12 months, use a…", options: ["Pie chart", "Line chart", "Word cloud", "Table of names"], answer: 1, why: "Line charts show trends over time." },
      { q: "Which is the most honest conclusion?", options: ["This proves our theory", "This suggests a link in our sample", "Everyone everywhere will behave like this", "Other studies are wrong"], answer: 1, why: "Cautious, scoped language matches what the evidence supports." },
    ],
    assignment: "Analyse a small dataset you collected (real data only). Report two summary numbers or two themes, one chart or quote, and two limitations.",
  },
  {
    id: "writing",
    n: 7,
    stage: "Communicate",
    title: "Academic Writing, Citations & Integrity",
    summary: "Structure a research paper, write clearly, cite correctly in APA and MLA, avoid plagiarism, and use AI responsibly.",
    lessons: [
      {
        id: "structure",
        title: "The shape of a research paper",
        minutes: 12,
        idea: "Papers follow a predictable map so readers find what they need fast.",
        body: [
          "Most papers use IMRaD: Introduction (why it matters and your question), Methods (what you did), Results (what you found), and Discussion (what it means, limitations, next steps). Add a title, abstract, and references.",
          "The abstract is a 150–250 word summary of everything — write it last.",
          "Clear academic writing uses short sentences, precise words, and one idea per paragraph. Formal doesn't mean complicated.",
        ],
        points: ["Title", "Abstract", "Introduction", "Methods", "Results", "Discussion", "References"],
        example: { title: "Clear vs cluttered", text: "Cluttered: 'It is of considerable importance to note that a significant number of participants indicated…' Clear: 'Most participants (18 of 24) reported…'" },
        exercise: "Use the Outline Builder to draft headings and one sentence per section for your project.",
      },
      {
        id: "citing",
        title: "Citations: APA & MLA",
        minutes: 12,
        idea: "Citing credits others' ideas and lets readers check your evidence.",
        body: [
          "Cite whenever you use someone else's words, data, ideas, or images — even if you paraphrase. Common knowledge (e.g., 'The Earth orbits the Sun') usually doesn't need citing.",
          "APA (7th) is common in sciences and social sciences: Author, A. A. (Year). Title of work. Publisher. In-text: (Author, Year).",
          "MLA (9th) is common in humanities: Author Last, First. Title of Work. Publisher, Year. In-text: (Author page).",
          "Only cite sources you have actually located and read. Never invent a citation.",
        ],
        example: { title: "Same book, two styles", text: "Use the Citation Helper with the real details of a book you own — note how author order, punctuation, italics, and date position differ between APA and MLA." },
        exercise: "Create APA and MLA citations for two real sources you used, using the Citation Helper. Check them against the source itself.",
        term: "Paraphrase — restating an idea fully in your own words and structure (still cited).",
      },
      {
        id: "integrity",
        title: "Plagiarism & responsible AI",
        minutes: 10,
        idea: "Integrity means your work honestly shows your thinking — and credits everyone else's.",
        body: [
          "Plagiarism includes copying text without quotation marks, close paraphrasing that keeps the original structure, reusing your own old work without saying so, and submitting work written by others or by AI as your own.",
          "AI tools can help you brainstorm, check grammar, or explain a confusing concept. But they can produce confident errors and even fake references. Verify everything, never let AI write your findings, and disclose how you used it.",
          "A simple disclosure: 'I used an AI assistant to suggest clearer wording in the introduction. All ideas, data, and analysis are my own, and all sources were verified by me.'",
        ],
        points: ["Quote + cite exact words", "Paraphrase genuinely", "Verify every AI claim", "Disclose AI use", "Never fabricate"],
        example: { title: "The fake reference trap", text: "A student asks an AI for sources and receives a perfect-looking citation. Searching the journal shows the article doesn't exist. Lesson: always locate the actual source before citing." },
        exercise: "Write your own AI-use disclosure statement for your capstone, even if it says 'No AI tools were used.'",
      },
    ],
    quiz: [
      { q: "Which section explains what you did step by step?", options: ["Abstract", "Methods", "Discussion", "References"], answer: 1, why: "Methods let others understand and repeat your work." },
      { q: "An AI gives you a citation. You should…", options: ["Use it immediately", "Find and read the actual source first", "Change the author name", "Cite the AI instead"], answer: 1, why: "AI can fabricate references — verification is essential." },
      { q: "Which is plagiarism?", options: ["Quoting with marks and citation", "Paraphrasing in your own structure with citation", "Swapping a few words in a copied paragraph", "Stating common knowledge"], answer: 2, why: "Close paraphrasing without real rewording is still plagiarism." },
    ],
    assignment: "Write the Introduction (150–250 words) for your capstone with at least two real, verified citations and your AI disclosure statement.",
  },
  {
    id: "sharing",
    n: 8,
    stage: "Communicate",
    title: "Peer Review, Publishing & Presenting",
    summary: "Give and receive useful feedback, understand how publication works, and present your findings with confidence.",
    lessons: [
      {
        id: "peerreview",
        title: "Giving and receiving feedback",
        minutes: 9,
        idea: "Feedback is a gift that makes research stronger before the world sees it.",
        body: [
          "Good reviewers are specific, kind, and focused on the work: 'Your sample is only from one class — could that limit your conclusion?' is more useful than 'Weak study.'",
          "When receiving feedback, listen first, ask clarifying questions, and decide what to change. You don't have to accept everything, but explain why.",
        ],
        points: ["Praise one strength", "Ask one question", "Suggest one improvement"],
        example: { title: "Feedback sandwich, upgraded", text: "'Your research question is impressively focused. I wasn't sure how you chose participants — could you add that to Methods? Consider a bar chart for the survey results.'" },
        exercise: "Swap outlines with a friend and give feedback using strength–question–suggestion.",
      },
      {
        id: "publishing",
        title: "Publishing & presenting",
        minutes: 10,
        idea: "Sharing your work completes the research cycle and invites others to build on it.",
        body: [
          "For school students, realistic outlets include science fairs, school magazines, student research journals, and conferences for young researchers. Check each outlet's guidelines and whether it is reputable — avoid any that charge high fees with no real review.",
          "A presentation tells a story: the puzzle, what you did, what you found, what it means. Use one idea per slide, large visuals, and minimal text.",
          "Practise out loud, time yourself, and prepare for questions about limitations.",
        ],
        example: { title: "A 5-slide story", text: "1. The puzzle (a striking observation) 2. Question & hypothesis 3. Method in a diagram 4. Key result as one chart 5. Meaning, limitations, what's next." },
        exercise: "Sketch a five-slide outline for your capstone presentation.",
        term: "Predatory journal — a publisher that charges fees without proper peer review.",
      },
    ],
    quiz: [
      { q: "Which feedback is most useful?", options: ["Bad work", "Great!", "Your chart has no axis labels — adding them would clarify the trend", "I don't like the topic"], answer: 2, why: "Specific, actionable, focused on the work." },
      { q: "A journal offers instant publication for a large fee with no review. It's likely…", options: ["Prestigious", "Predatory", "Government-run", "Free"], answer: 1, why: "No genuine review plus fees are warning signs." },
      { q: "A good presentation slide has…", options: ["Full paragraphs", "One key idea and a clear visual", "Ten bullet points", "Tiny fonts"], answer: 1, why: "One idea per slide keeps audiences focused." },
    ],
    assignment: "Prepare and rehearse a 3-minute presentation of your project. Note two questions you expect and how you'd answer them.",
  },
  {
    id: "capstone",
    n: 9,
    stage: "Capstone",
    title: "Capstone: Your Research Project",
    summary: "Put everything together: plan, conduct, analyse, write, and present an original small-scale research project.",
    lessons: [
      {
        id: "plan",
        title: "Plan your project",
        minutes: 15,
        idea: "A clear plan prevents most problems before they happen.",
        body: [
          "Choose a question you care about and can answer in 3–6 weeks. Confirm it is ethical and that data is accessible.",
          "Write a one-page proposal: question, why it matters, what is known (2–4 real sources), method, timeline, ethics, and expected challenges.",
          "Get feedback from a teacher or mentor before collecting any data.",
        ],
        points: ["Week 1: question + sources", "Week 2: method + ethics", "Weeks 3–4: collect data", "Week 5: analyse", "Week 6: write + present"],
        example: { title: "See the worked example", text: "The Worked Example page follows one student project — morning light and plant growth — from first observation to final presentation." },
        exercise: "Complete your proposal using the Outline Builder and Notes workspace.",
      },
      {
        id: "conduct",
        title: "Conduct, write & submit",
        minutes: 15,
        idea: "Follow your plan, record everything, and write honestly about what happened.",
        body: [
          "Keep a research log: dates, what you did, problems, decisions. This protects your integrity and makes the Methods section easy to write.",
          "Analyse only the data you actually collected. If something went wrong, report it — that's part of real research.",
          "Use the Final Submission Checklist before you hand in or present.",
        ],
        example: { title: "Honest problem reporting", text: "'Three plants were knocked over in week 2 and were excluded from analysis, reducing the sample from 12 to 9.'" },
        exercise: "Run the Final Submission Checklist and resolve any unchecked items.",
      },
    ],
    quiz: [
      { q: "Before collecting data, you should…", options: ["Write the conclusion", "Get feedback on your plan and ethics", "Choose a chart", "Publish"], answer: 1, why: "Early feedback catches design and ethics problems." },
      { q: "Some data was lost. You should…", options: ["Invent replacement data", "Hide it", "Report it as a limitation", "Abandon research"], answer: 2, why: "Honest reporting is central to research integrity." },
      { q: "A research log helps mainly by…", options: ["Making the paper longer", "Recording decisions so Methods are accurate", "Impressing judges", "Replacing citations"], answer: 1, why: "It documents what actually happened." },
    ],
    assignment: "Submit your capstone abstract (150–250 words) summarising your real question, method, findings, and one limitation.",
  },
];

export const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, key: `${m.id}/${l.id}` })));
export const getModule = (id: string) => modules.find((m) => m.id === id);
export const stages = ["Foundations", "Investigate", "Analyse", "Communicate", "Capstone"] as const;
