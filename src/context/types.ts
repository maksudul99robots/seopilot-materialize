export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type RegisterParams = {
  token: string
  userData: any
  // rememberMe?: boolean
}
export type VerifyEmailParams = {
  token: string
}
export type UpdateUserParams = {
  first_name: string,
  last_name: string,
  email: string
}
export type AcceptInvitationParams = {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}

export type RedeemCouponParams = {
  coupon: string
  setDisable: any,
  setLoading: any
  // rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  lastName: string
  username: string
  password: string
  avatar?: string | null
  plan?: any | null
  is_active?: string | null
  approle: any | undefined
  workspaces: any | undefined
  workspace_owner_info: any | undefined
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
  acceptInvitation: (params: AcceptInvitationParams, errorCallback?: ErrCallbackType) => void
  redeemCoupon: (params: RedeemCouponParams, errorCallback?: ErrCallbackType) => void
  verifyEmail: (params: VerifyEmailParams, errorCallback?: ErrCallbackType) => void
  updateUser: (params: UpdateUserParams, errorCallback?: ErrCallbackType) => void
  resetToken: (params: {}, errorCallback?: ErrCallbackType) => void
  impersonate: (params: any, errorCallback?: ErrCallbackType) => void
}
