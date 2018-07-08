interface UserPermissions {
  canAddPost: boolean,
  canEditPost: boolean,
}

export class User {
  id: number;
  isAdmin: boolean;

  constructor(id: number, isAdmin: boolean) {
    this.id = id;
    this.isAdmin = isAdmin;
  }

  get permissions(): UserPermissions {
    return {
      canAddPost: this.isAdmin,
      canEditPost: this.isAdmin,
    };
  }
}

export const ANONYMOUS_USER = new User(null, false);
