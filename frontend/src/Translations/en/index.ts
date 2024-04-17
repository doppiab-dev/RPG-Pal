/* eslint-disable max-len */
const loader = {
  title: 'RPG-Pal',
  text: '...Loading'
}
const login = {
  signin: 'Sign In',
  language: 'Select Language',
  error: 'Authentication error'
}
const error = {
  title: 'Error :(',
  body: 'Oops, something went wrong!',
  button: 'Back to Home',
  logout: 'Back to LogIn Page'
}
const home = {
  title: 'Enter in RPG-Pal',
  Player: 'enter as Player',
  becomePlayer: 'become a Player',
  Master: 'enter as Master',
  becomeMaster: 'become a Master',
  playerButton1: 'You have',
  playerButton2: 'Character/s',
  emptyPlayer: 'Create you first character',
  masterButton1: 'You have',
  masterButton2: 'Campaign/s',
  emptyMaster: 'Create your first campaign',
  logout: 'Log Out',
  version: 'Frontend Version: ',
  error: 'Data validation failed, try to log in again.'
}
const username = {
  title: 'Choose your username',
  text: 'This can be edited later',
  label: 'Username',
  placeholder: 'Username',
  valid: 'Username is not used',
  send: 'Select Username',
  validationErrorRequired: 'A username is required',
  validationErrorTooLong: 'Username should be 16 character maximum',
  validationErrorInvalid: 'Username contains invalid characters',
  validationErrorUsername: 'Username is already used'
}
const campaign = {
  title: 'Campaigns',
  groups: 'group(s) in this campaign',
  status: 'Campaign status: ',
  home: 'Home',
  user: 'User Info',
  logout: 'Log Out',
  new: 'Create new Campaign',
  validationErrorRequired: 'A name is required',
  validationErrorTooLong: 'Name should be 32 character maximum',
  validationErrorInvalid: 'Name contains invalid characters',
  statusvalidationErrorRequired: 'A status is required',
  validationErrorInvalidStatus: 'Status is invalid',
  createButton: "Let's Start!",
  create: 'Choose a name for your new Campaign',
  editButton: 'Edit',
  edit: 'Edit selected Campaign name',
  active: 'Active',
  on_hold: 'On Hold',
  ended: 'Ended',
  deleteTitle: 'Player Delete',
  deleteText: 'Are you sure you want to delete this Player? Player id: '
}
const confirmationDialog = {
  title: 'Confirm Action',
  dialogText: 'Are you sure you want to perform this action?',
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm'
}
const userInfo = {
  title: 'User Info',
  text: 'We do not store any sensible information (your email and/or your personal data) in our database.',
  changeUsername: 'Do you want to change your Username?',
  deleteTitle: 'Delete all your data',
  delete: 'Delete',
  deleteText: 'Do you want to delete your user? This will delete all your campaigns and their contents (PNG, story, etc.)'
}

const en = {
  error,
  login,
  loader,
  home,
  username,
  campaign,
  confirmationDialog,
  userInfo
}

export default en
