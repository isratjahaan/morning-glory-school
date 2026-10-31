export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: "Administration" | "Science & STEM" | "Mathematics" | "Humanities & Languages" | "Primary Wing" | "Sports & Arts";
  qualification: string;
  experience: string;
  bio: string;
  email: string;
  specialization: string;
}

export const PRINCIPAL_INFO = {
  name: "Dr. Shamsul Alam",
  title: "Principal & Academic Director",
  qualification: "Ph.D. in Educational Leadership (UK), M.Sc. (First Class, DU)",
  experience: "24+ Years in Premier Educational Institutions",
  image: "/images/students/hero-students-2x.jpg", // placeholder photo or campus
  quote: "At Morning Glory School, we do not merely instruct; we ignite curiosity, cultivate integrity, and empower each child to author their own story of excellence.",
  message: [
    "Welcome to Morning Glory School. For over fifteen years, our campus has stood as a beacon of intellectual rigor and compassionate learning. We believe that true education extends beyond rote memorization — it is the deliberate cultivation of critical inquiry, moral fortitude, and creative problem-solving.",
    "Our world-class faculty, modern digital STEM laboratories, and vibrant arts and sports programs are engineered to provide a balanced ecosystem where every young learner is valued, supported, and challenged to achieve their personal best.",
    "Whether your child is taking their first steps in our joyful Primary Wing or preparing for competitive senior secondary board examinations, we partner closely with families to ensure their journey is enriching, inspiring, and transformative.",
  ],
};

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Dr. Shamsul Alam",
    designation: "Principal & Academic Director",
    department: "Administration",
    qualification: "Ph.D. in Educational Leadership, M.Sc.",
    experience: "24 Years",
    bio: "Visionary educator with extensive leadership experience in national curriculum and international benchmark standards.",
    email: "principal@morningglory.edu.bd",
    specialization: "Educational Policy & Strategic Leadership",
  },
  {
    id: "fac-2",
    name: "Mrs. Fahmida Yasmin",
    designation: "Vice Principal & Head of English",
    department: "Administration",
    qualification: "M.A. in English Literature, B.Ed. (Distinction)",
    experience: "18 Years",
    bio: "Passionate pedagogue focusing on holistic language acquisition, elocution, and student welfare counselling.",
    email: "viceprincipal@morningglory.edu.bd",
    specialization: "English Language Arts & Curriculum Design",
  },
  {
    id: "fac-3",
    name: "Mr. Tanvir Ahmed",
    designation: "Head of Science & Physics Lead",
    department: "Science & STEM",
    qualification: "M.Sc. in Physics, Cambridge Certified Educator",
    experience: "14 Years",
    bio: "National Science Olympiad mentor guiding students through experimental mechanics, astrophysics, and electronics.",
    email: "t.ahmed@morningglory.edu.bd",
    specialization: "Experimental Physics & STEM Olympiads",
  },
  {
    id: "fac-4",
    name: "Mrs. Nusrat Jahan",
    designation: "Senior Mathematics Specialist",
    department: "Mathematics",
    qualification: "M.Sc. in Applied Mathematics",
    experience: "12 Years",
    bio: "Specializes in demystifying higher mathematics, algebraic reasoning, and competitive mathematical problem solving.",
    email: "n.jahan@morningglory.edu.bd",
    specialization: "Advanced Calculus & Analytical Geometry",
  },
  {
    id: "fac-5",
    name: "Engr. Arifur Rahman",
    designation: "Head of ICT & Robotics Lab",
    department: "Science & STEM",
    qualification: "B.Sc. in Computer Science & Engineering",
    experience: "9 Years",
    bio: "Leads the Morning Glory Robotics Club, teaching computational thinking, Python coding, and AI foundations.",
    email: "a.rahman@morningglory.edu.bd",
    specialization: "Robotics, Microcontrollers & Web Technologies",
  },
  {
    id: "fac-6",
    name: "Dr. Farhana Rashid",
    designation: "Senior Chemistry & Biology Instructor",
    department: "Science & STEM",
    qualification: "Ph.D. in Biochemistry, M.Sc.",
    experience: "11 Years",
    bio: "Inspires students with practical laboratory chemistry, molecular genetics, and environmental science research.",
    email: "f.rashid@morningglory.edu.bd",
    specialization: "Organic Chemistry & Bio-Medical Sciences",
  },
  {
    id: "fac-7",
    name: "Mr. Mahmudul Hasan",
    designation: "Head of Humanities & Social Sciences",
    department: "Humanities & Languages",
    qualification: "M.A. in World History & International Relations",
    experience: "15 Years",
    bio: "Model United Nations coach and mentor for debate, constitutional history, and civic awareness.",
    email: "m.hasan@morningglory.edu.bd",
    specialization: "Global History, Civics & Parliamentary Debate",
  },
  {
    id: "fac-8",
    name: "Ms. Sabrina Chowdhury",
    designation: "Coordinator, Primary & Early Years Wing",
    department: "Primary Wing",
    qualification: "M.Ed. in Early Childhood Development",
    experience: "13 Years",
    bio: "Expert in phonics-based reading, experiential numeracy, and child-centered Montessori-inspired pedagogy.",
    email: "s.chowdhury@morningglory.edu.bd",
    specialization: "Early Childhood Pedagogy & Phonics",
  },
  {
    id: "fac-9",
    name: "Coach Zahirul Islam",
    designation: "Director of Physical Education & Athletics",
    department: "Sports & Arts",
    qualification: "B.P.Ed., Certified National Track & Field Coach",
    experience: "16 Years",
    bio: "Former national athletics medalist fostering teamwork, sportsmanship, and fitness across football, cricket, and basketball.",
    email: "sports@morningglory.edu.bd",
    specialization: "Athletic Conditioning & Competitive Team Sports",
  },
];
