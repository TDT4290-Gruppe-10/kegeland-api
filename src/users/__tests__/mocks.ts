import { UpdateSessionDto } from 'src/sessions/dto/update-session.dto';
import { timestamp } from 'src/utils/timestamp';

export const serviceMockForController = {
  findAllPatients: jest.fn((x) => x),
  findOne: jest.fn((x) => x),
  getPatientOverview: jest.fn((x) => x),
  delete: jest.fn((x) => x),
};

export const firebaseMock = {
  userDetails: [
    {
      id: '_id',
      roles: ['patient'],
      email: 'arne.bente@ntnu.no',
      name: {
        lastName: 'Arnhildsson',
        firstName: 'Arne-Bente',
      },
    },
  ],
  sessions: [
    {
      userId: '_id',
      createdAt: 1667810961876,
      data: {
        1234: [1, 2, 3, 4, 5],
        2345: [1, 3, 4, 5, 6],
      },
      sensor: 'femfit',
      id: '_id',
    },
  ],
  sensors: [
    {
      labels: ['HR', 'Speed', 'Altitude'],
      name: 'empatica',
    },
  ],
};

export const adminMock = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  auth: jest.fn((x) => ({
    deleteUser: jest.fn((x) => x),
  })),
};

export class FirebaseMock {
  db = {
    userDetails: [
      new FirebaseDocMock('_id', {
        id: '_id',
        roles: ['patient'],
        email: 'arne.bente@ntnu.no',
        name: {
          lastName: 'Arnhildsson',
          firstName: 'Arne-Bente',
        },
      }),
    ],
    sessions: [
      new FirebaseDocMock('_id', {
        userId: '_id',
        createdAt: 1667810961876,
        data: {
          1234: [1, 2, 3, 4, 5],
          2345: [1, 3, 4, 5, 6],
        },
        sensor: 'femfit',
      }),
    ],
    sensors: [
      new FirebaseDocMock('_id', {
        labels: ['HR', 'Speed', 'Altitude'],
        name: 'empatica',
      }),
    ],
    questionnaires: [
      new FirebaseDocMock('_id', {
        name: 'Registration',
        questionList: [
          {
            key: 'Q1',
            maxVal: 'Always',
            minVal: 'Never',
            text: 'It is very hard for me to concentrate on a difficult task when there are noises around',
          },
        ],
      }),
    ],
    questions: [
      new FirebaseDocMock('_id', {
        sensor: 'femfit',
        name: 'Test quest',
        questions: [{ maxVal: 'Very', minVal: 'Not', question: 'How?' }],
      }),
    ],
    answers: [
      new FirebaseDocMock('_id', {
        userId: '_id',
        answeredAt: timestamp(),
        answers: [1, 2, 3],
        sessionId: '_id',
      }),
    ],
  };
  res: any = {};

  collection(name: string) {
    this.res = this.db[name];
    this.docs = this.res;
    return this;
  }

  doc(id: string) {
    this.res = this.res.find((e) => e.id === id);
    return this;
  }

  where(field: string, condition: string, value: string) {
    this.res = this.res.filter((e) => {
      switch (condition) {
        case '==':
          return e.entries[field] === value;
        case 'array-contains':
          return e.entries[field].includes(value);
      }
    });
    this.docs = this.res;
    return this;
  }

  get() {
    if (this.res instanceof Object) {
      this.id = this.res.id;
    }
    return this;
  }

  data() {
    if (this.res instanceof Object) {
      return this.res.data();
    }
    if (this.res instanceof Array) {
      return this.res;
    } else {
      console.log('ERRROR');
      return this.res;
    }
  }
  delete() {
    return this.res;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orderBy(field: string, order: string) {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(data: Record<string, unknown>) {
    this.id = '_id2';
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set(data: UpdateSessionDto, obj: Record<string, unknown>) {
    return this;
  }

  docs = this.res;
  id = this.res.id;
}

class FirebaseDocMock {
  id: string;
  createTime = {
    toDate: () => {
      return new Date(null);
    },
  };
  entries: Record<string, unknown>;
  constructor(id: string, dat: Record<string, unknown>) {
    this.id = id;
    this.entries = dat;
  }
  data() {
    return this.entries;
  }
}
