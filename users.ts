type UserRole = 'member' | 'contributor' | 'admin'

type User = {
  id: number,
  userName: string,
  role: UserRole,
};

type UpdatedUser = Partial<User>;

let nextUserId = 1;

const users: User[] = [
  {
    id: nextUserId++,
    userName: 'string1',
    role: 'member',
  },
  {
    id: nextUserId++,
    userName: 'string2',
    role: 'contributor',
  },
  {
    id: nextUserId++,
    userName: 'string3',
    role: 'admin',
  }
];

function fetchUserDetails(userName: string): User | undefined {
  const user = users.find(user => user.userName === userName);
  if (!user) {
    console.error('not find user by name');
    return;
  }
  return user;
}

function updateUser(id: number, updates: UpdatedUser): undefined {
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    console.error('not find user by id');
    return;
  }

  Object.assign(foundUser, updates);
};

function addNewUser(newUser: Omit<User, 'id'>): User {
  const user: User = {
    id: nextUserId++,
    ...newUser,
  };

  users.push(user);
  return user;
}
