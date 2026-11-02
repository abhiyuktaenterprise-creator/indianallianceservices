/**
 * studentService.ts - Indian Alliance Services
 * Offline-first Student / Candidate Management & Public Verification Service
 */

export interface Student {
  id: string;
  application_number: string;
  registration_number?: string;
  batch_code?: string; // e.g. IAS-TRG-2026/B1
  student_name: string;
  father_name: string;
  date_of_birth: string; // YYYY-MM-DD
  mobile_number: string;
  email?: string | null;
  course_name: string;
  admission_date?: string;
  placement_date?: string | null; // Date of Placement
  visiting_date?: string | null; // Visiting Date
  course_start_date?: string | null;
  course_end_date?: string | null;
  interview_date?: string | null; // e.g. YYYY-MM-DD
  status: 'Active' | 'Completed' | 'Joining' | 'Rejoining' | 'Failed' | 'Discontinued';
  failure_reason?: string | null; // Note explaining failure if candidate failed
  is_archived: boolean;
  photo_url?: string | null; // Base64 data URL or external URL
  created_at?: string;
  updated_at?: string;
}

export type NewStudentInput = Omit<Student, 'id' | 'created_at' | 'updated_at' | 'is_archived'> & {
  is_archived?: boolean;
};

export interface PublicVerificationResult {
  student_name: string;
  father_name: string;
  registration_number?: string;
  application_number: string;
  batch_code?: string;
  date_of_birth?: string;
  course_name: string;
  admission_date?: string;
  placement_date?: string | null;
  visiting_date?: string | null;
  course_start_date?: string | null;
  course_end_date?: string | null;
  interview_date?: string | null;
  status: string;
  failure_reason?: string | null;
  photo_url?: string | null;
}

const LOCAL_STORAGE_KEY = 'ias_students_registry';

// Initial official registered candidates / students for Indian Alliance Services
export const DEFAULT_STUDENTS: Student[] = [
  {
    id: 'ias-std-134803',
    application_number: 'IAS-APP-2026/134803',
    registration_number: 'IAS26Y2NAG2026/134803',
    batch_code: 'IAS-TRG-2026/134803',
    student_name: 'Khushbu Ashok Mahto',
    father_name: 'Ashok Mahto',
    date_of_birth: '2002-04-12',
    mobile_number: '9870761713',
    email: 'khushbu.mahto@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2026-11-26',
    placement_date: '2026-11-29',
    visiting_date: '2027-02-28',
    course_start_date: '2026-11-29',
    course_end_date: '2027-02-28',
    interview_date: '2026-11-20',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2026-11-26').toISOString(),
    updated_at: new Date('2026-11-26').toISOString(),
  },
  {
    id: 'ias-std-134557',
    application_number: 'IAS-APP-2026/134557',
    registration_number: 'IAS26Y2BBI2026/134557',
    batch_code: 'IAS-TRG-2026/134557',
    student_name: 'Alraza Khan',
    father_name: 'Samsuddin Khan',
    date_of_birth: '2001-09-18',
    mobile_number: '9651212713',
    email: 'alraza.khan@indianallianceservices.com',
    course_name: 'Aviation Customer Service & Airline Operations',
    admission_date: '2026-10-26',
    placement_date: '2026-11-27',
    visiting_date: '2027-02-27',
    course_start_date: '2026-11-27',
    course_end_date: '2027-02-27',
    interview_date: '2026-10-22',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2026-10-26').toISOString(),
    updated_at: new Date('2026-10-26').toISOString(),
  },
  {
    id: 'ias-std-139960',
    application_number: 'IAS-APP-2026/139960',
    registration_number: 'IAS26Y2PUN2026/139960',
    batch_code: 'IAS-TRG-2026/139960',
    student_name: 'Kiran Ishwar Kurhe',
    father_name: 'Ishwar Kurhe',
    date_of_birth: '2000-11-05',
    mobile_number: '8707617134',
    email: 'kiran.kurhe@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2026-10-26',
    placement_date: '2026-11-29',
    visiting_date: '2027-02-28',
    course_start_date: '2026-11-29',
    course_end_date: '2027-02-28',
    interview_date: '2026-10-20',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2026-10-26').toISOString(),
    updated_at: new Date('2026-10-26').toISOString(),
  },
  {
    id: 'ias-std-8425',
    application_number: 'IAS-APP-2026/8425',
    registration_number: 'IAS27Y2GV2026/8425',
    batch_code: 'IAS-TRG-2024/8425',
    student_name: 'Abhishek Navnath Arkas',
    father_name: 'Navnath Namdev Arkas',
    date_of_birth: '2001-08-15',
    mobile_number: '8858453069',
    email: 'abhishek.arkas@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2024-01-15',
    placement_date: '2024-02-01',
    visiting_date: '2024-11-30',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-30',
    interview_date: '2024-02-10',
    status: 'Completed',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'ias-std-8420',
    application_number: 'IAS-APP-2026/8420',
    registration_number: 'IAS27Y2GV2026/8420',
    batch_code: 'IAS-TRG-2024/8420',
    student_name: 'Rohit Kumar',
    father_name: 'Chandilal',
    date_of_birth: '2002-06-20',
    mobile_number: '8858453069',
    email: 'rohit.kumar@indianallianceservices.com',
    course_name: 'Aviation Customer Service & Airline Operations',
    admission_date: '2024-01-15',
    placement_date: '2024-02-01',
    visiting_date: '2024-11-30',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-30',
    interview_date: '2024-02-12',
    status: 'Failed',
    failure_reason: 'Did not meet the mandatory spoken English communication benchmarks and minimum physical grooming criteria required for airline airport passenger services.',
    is_archived: false,
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'ias-std-100',
    application_number: 'IAS-APP-2026-100',
    registration_number: 'IAS-2026-100',
    batch_code: 'IAS-TRG-2024/100',
    student_name: 'Aarav Sharma',
    father_name: 'Ramesh Sharma',
    date_of_birth: '2002-05-15',
    mobile_number: '9876543210',
    email: 'aarav.sharma@example.com',
    course_name: 'Cabin Crew & In-Flight Safety Training',
    admission_date: '2024-02-10',
    placement_date: '2024-03-01',
    visiting_date: '2024-12-15',
    course_start_date: '2024-03-01',
    course_end_date: '2024-12-15',
    interview_date: '2024-03-05',
    status: 'Completed',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2024-02-10').toISOString(),
    updated_at: new Date('2024-02-10').toISOString(),
  },
  {
    id: 'ias-std-101',
    application_number: 'IAS-APP-2026-101',
    registration_number: 'IAS-2026-101',
    batch_code: 'IAS-TRG-2024/101',
    student_name: 'Pooja Verma',
    father_name: 'Suresh Verma',
    date_of_birth: '2003-09-12',
    mobile_number: '9876543211',
    email: 'pooja.verma@example.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2024-03-01',
    placement_date: '2024-03-15',
    visiting_date: '2024-12-30',
    course_start_date: '2024-03-15',
    course_end_date: '2024-12-30',
    interview_date: '2024-03-20',
    status: 'Active',
    failure_reason: null,
    is_archived: false,
    created_at: new Date('2024-03-01').toISOString(),
    updated_at: new Date('2024-03-01').toISOString(),
  },
  {
    id: 'ias-std-8899',
    application_number: 'IAS-APP-2026/8899',
    registration_number: 'IAS-APP-2026/8899',
    batch_code: 'IAS-TRG-2024/8899',
    student_name: 'Aakash Verma',
    father_name: 'Dharmendra Verma',
    date_of_birth: '2001-05-18',
    mobile_number: '9876501234',
    email: 'aakash.verma@indianallianceservices.com',
    course_name: 'Airport Ground Staff & Passenger Services',
    admission_date: '2024-01-20',
    placement_date: '2024-02-01',
    visiting_date: '2024-11-15',
    course_start_date: '2024-02-01',
    course_end_date: '2024-11-15',
    interview_date: '2024-03-15',
    status: 'Failed',
    failure_reason: 'Candidate did not clear the mandatory aviation English communication fluency assessment during the panel round.',
    is_archived: false,
    created_at: new Date('2024-01-20').toISOString(),
    updated_at: new Date('2024-01-20').toISOString(),
  },
];

// Helper to get local students
const getLocalStudents = (): Student[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    let list: Student[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      } catch {
        list = [];
      }
    }

    if (list.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }

    // Auto-merge any default official students that may be missing from existing local storage
    let modified = false;
    for (const def of DEFAULT_STUDENTS) {
      const idx = list.findIndex(
        (s) =>
          s.id === def.id ||
          s.application_number.toLowerCase() === def.application_number.toLowerCase() ||
          s.student_name.toLowerCase() === def.student_name.toLowerCase()
      );
      if (idx === -1) {
        list.push(def);
        modified = true;
      } else {
        if (!list[idx].batch_code && def.batch_code) {
          list[idx].batch_code = def.batch_code;
          modified = true;
        }
        if (!list[idx].placement_date && def.placement_date) {
          list[idx].placement_date = def.placement_date;
          modified = true;
        }
        if (!list[idx].visiting_date && def.visiting_date) {
          list[idx].visiting_date = def.visiting_date;
          modified = true;
        }
      }
    }

    // Ensure all stored students have batch_code and placement_date populated
    for (const s of list) {
      if (!s.batch_code) {
        s.batch_code = `IAS-TRG-${s.application_number.replace(/\D/g, "") || "2026"}`;
        modified = true;
      }
      if (!s.placement_date && s.course_start_date) {
        s.placement_date = s.course_start_date;
        modified = true;
      }
      if (!s.visiting_date && s.course_end_date) {
        s.visiting_date = s.course_end_date;
        modified = true;
      }
    }

    if (modified) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
    return list;
  } catch (err) {
    console.error('Error reading students registry from localStorage:', err);
    return DEFAULT_STUDENTS;
  }
};

// Helper to save local students
const saveLocalStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  } catch (err) {
    console.error('Error saving students registry to localStorage:', err);
  }
};

export const studentService = {
  /**
   * Fetch all students with optional search query & archive filter
   */
  async getStudents(
    query?: string,
    includeArchived: boolean = false
  ): Promise<{ data: Student[]; error: string | null }> {
    try {
      let list = getLocalStudents();

      if (!includeArchived) {
        list = list.filter((s) => !s.is_archived);
      }

      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        list = list.filter((s) => {
          return (
            s.student_name.toLowerCase().includes(q) ||
            s.father_name.toLowerCase().includes(q) ||
            s.application_number.toLowerCase().includes(q) ||
            (s.registration_number && s.registration_number.toLowerCase().includes(q)) ||
            s.mobile_number.toLowerCase().includes(q) ||
            (s.email && s.email.toLowerCase().includes(q)) ||
            s.course_name.toLowerCase().includes(q)
          );
        });
      }

      return { data: list, error: null };
    } catch {
      return { data: [], error: 'Failed to fetch student registry.' };
    }
  },

  /**
   * Get single student by ID
   */
  async getStudentById(id: string): Promise<{ data: Student | null; error: string | null }> {
    const list = getLocalStudents();
    const found = list.find((s) => s.id === id);
    if (!found) {
      return { data: null, error: 'Student record not found.' };
    }
    return { data: found, error: null };
  },

  /**
   * Add a new student record
   */
  async addStudent(
    student: NewStudentInput
  ): Promise<{ data: Student | null; error: string | null }> {
    const appNo = student.application_number.trim();
    const regNo = (student.registration_number?.trim() || appNo);
    const batchCode = (student.batch_code?.trim() || `IAS-TRG-${appNo.replace(/\D/g, "") || "2026"}`).toUpperCase();
    const placementDate = student.placement_date?.trim() || student.course_start_date?.trim() || null;
    const visitingDate = student.visiting_date?.trim() || student.course_end_date?.trim() || null;

    const payload = {
      ...student,
      application_number: appNo,
      registration_number: regNo,
      batch_code: batchCode,
      student_name: student.student_name.trim(),
      father_name: student.father_name.trim(),
      mobile_number: student.mobile_number.trim(),
      email: student.email?.trim() || null,
      course_name: student.course_name.trim(),
      admission_date: student.admission_date || new Date().toISOString().split("T")[0],
      placement_date: placementDate,
      visiting_date: visitingDate,
      course_start_date: placementDate,
      course_end_date: visitingDate,
      interview_date: student.interview_date?.trim() || null,
      failure_reason: student.failure_reason?.trim() || null,
      is_archived: student.is_archived ?? false,
      photo_url: student.photo_url || null,
    };

    const list = getLocalStudents();

    if (
      list.some(
        (s) => s.application_number.toLowerCase() === payload.application_number.toLowerCase()
      )
    ) {
      return {
        data: null,
        error: `Application Number "${payload.application_number}" already exists.`,
      };
    }

    const newStudent: Student = {
      ...payload,
      id: `ias-std-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    list.unshift(newStudent);
    saveLocalStudents(list);

    return { data: newStudent, error: null };
  },

  /**
   * Update an existing student record
   */
  async updateStudent(
    id: string,
    updates: Partial<Student>
  ): Promise<{ data: Student | null; error: string | null }> {
    const cleanUpdates = { ...updates };
    delete (cleanUpdates as any).id;
    delete (cleanUpdates as any).created_at;
    delete (cleanUpdates as any).updated_at;

    const list = getLocalStudents();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) {
      return { data: null, error: 'Candidate record not found.' };
    }

    if (cleanUpdates.application_number) {
      const appDup = list.some(
        (s) =>
          s.id !== id &&
          s.application_number.toLowerCase() === cleanUpdates.application_number!.toLowerCase()
      );
      if (appDup) {
        return {
          data: null,
          error: `Application Number "${cleanUpdates.application_number}" already exists on another candidate.`,
        };
      }
    }

    if (cleanUpdates.batch_code) {
      cleanUpdates.batch_code = cleanUpdates.batch_code.trim().toUpperCase();
    }
    if (cleanUpdates.placement_date !== undefined) {
      cleanUpdates.course_start_date = cleanUpdates.placement_date;
    } else if (cleanUpdates.course_start_date !== undefined) {
      cleanUpdates.placement_date = cleanUpdates.course_start_date;
    }
    if (cleanUpdates.visiting_date !== undefined) {
      cleanUpdates.course_end_date = cleanUpdates.visiting_date;
    } else if (cleanUpdates.course_end_date !== undefined) {
      cleanUpdates.visiting_date = cleanUpdates.course_end_date;
    }

    const updated: Student = {
      ...list[idx],
      ...cleanUpdates,
      updated_at: new Date().toISOString(),
    };

    list[idx] = updated;
    saveLocalStudents(list);

    return { data: updated, error: null };
  },

  /**
   * Soft archive / unarchive student
   */
  async setArchived(
    id: string,
    is_archived: boolean
  ): Promise<{ success: boolean; error: string | null }> {
    const list = getLocalStudents();
    const student = list.find((s) => s.id === id);
    if (student) {
      student.is_archived = is_archived;
      student.updated_at = new Date().toISOString();
      saveLocalStudents(list);
      return { success: true, error: null };
    }
    return { success: false, error: 'Candidate record not found.' };
  },

  /**
   * Permanently delete a student record
   */
  async deleteStudent(id: string): Promise<{ success: boolean; error: string | null }> {
    const list = getLocalStudents();
    const filtered = list.filter((s) => s.id !== id);
    if (filtered.length === list.length) {
      return { success: false, error: 'Candidate record not found.' };
    }
    saveLocalStudents(filtered);
    return { success: true, error: null };
  },

  /**
   * Public Verification Lookup
   * Checks by Application Number (or fallback Registration Number)
   */
  async verifyStudent(
    queryNumber: string,
    dateOfBirth?: string
  ): Promise<{ data: PublicVerificationResult | null; verified: boolean; error: string | null }> {
    const queryTrimmed = queryNumber.trim();
    const dobTrimmed = dateOfBirth?.trim();

    if (!queryTrimmed) {
      return { data: null, verified: false, error: 'Application Number is required.' };
    }

    const list = getLocalStudents();
    const cleanQuery = queryTrimmed.toUpperCase();

    const match = list.find((s) => {
      const appClean = s.application_number.trim().toUpperCase();
      const regClean = s.registration_number ? s.registration_number.trim().toUpperCase() : '';

      const appMatches =
        appClean === cleanQuery ||
        appClean.endsWith(`/${cleanQuery}`) ||
        appClean.endsWith(`-${cleanQuery}`);

      const regMatches =
        regClean === cleanQuery ||
        regClean.endsWith(`/${cleanQuery}`) ||
        regClean.endsWith(`-${cleanQuery}`);

      if ((!appMatches && !regMatches) || s.is_archived) return false;
      if (dobTrimmed) return s.date_of_birth === dobTrimmed;
      return true;
    });

    if (match) {
      const publicResult: PublicVerificationResult = {
        student_name: match.student_name,
        father_name: match.father_name,
        registration_number: match.registration_number || match.application_number,
        application_number: match.application_number,
        batch_code: match.batch_code || `IAS-TRG-${match.application_number.replace(/\D/g, "")}`,
        date_of_birth: match.date_of_birth,
        course_name: match.course_name,
        admission_date: match.admission_date,
        placement_date: match.placement_date || match.course_start_date,
        visiting_date: match.visiting_date || match.course_end_date,
        course_start_date: match.placement_date || match.course_start_date,
        course_end_date: match.visiting_date || match.course_end_date,
        interview_date: match.interview_date,
        status: match.status,
        failure_reason: match.failure_reason,
        photo_url: match.photo_url || null,
      };
      return { data: publicResult, verified: true, error: null };
    }

    return { data: null, verified: false, error: null };
  },

  /**
   * Reset local storage to default registry
   */
  async resetToRegistry(): Promise<Student[]> {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    } catch {
      return DEFAULT_STUDENTS;
    }
  },

  /**
   * Import students list (e.g. from JSON backup)
   */
  async importStudents(
    importedStudents: Student[]
  ): Promise<{ count: number; error: string | null }> {
    try {
      if (!Array.isArray(importedStudents) || importedStudents.length === 0) {
        return { count: 0, error: 'Invalid or empty backup data.' };
      }
      const valid = importedStudents.filter(
        (s) => s.student_name && s.application_number
      );
      saveLocalStudents(valid);
      return { count: valid.length, error: null };
    } catch {
      return { count: 0, error: 'Failed to import records.' };
    }
  },
};
