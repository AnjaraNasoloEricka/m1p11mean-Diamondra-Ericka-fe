export const publicRoutes : string[] = [
  "/users/signIn",
  "/users/signUp",
  "/users/register-success",
  "/users/confirmRegister",
  "landing"
]

export type ButtonType = {
  type : string,
  label : string,
  icon ?: string,
  color ?: string
};

export const buttonTypesData : ButtonType[] = [
  {
    type : "create",
    label : "Add New",
    icon : "fas fa-plus mr-2",
    color : "emerald"
  },
  {
    type : "update",
    label : "Edit",
    icon : "fas fa-edit mr-2",
    color : "orange"
  }
];
