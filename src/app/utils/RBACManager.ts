import React, { useState } from "react";

enum Role {
  Guest = 0,
  User = 1,
  Admin = 2,
}

interface IPermission {
  role: Role;
  permissions: number;
}

const permissions: IPermission[] = [
  { role: Role.Guest, permissions: 1 },
  { role: Role.User, permissions: 2 },
  { role: Role.Admin, permissions: 4 },
];

// const hasPermission = (role: Role, requiredPermission: number) =>
//   (permissions.find(p => p.role === role)?.permissions & requiredPermission) === requiredPermission;
