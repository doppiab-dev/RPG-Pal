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
  deleteTitle: 'Campaign Delete',
  deleteText: 'Are you sure you want to delete this Campaign? This action cannot be undone, Campaign id: '
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
const activeCampaign = {
  description: 'Description con bottone',
  body: 'body'
}
const lorem = {
  ipsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  bonus: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
}

const en = {
  error,
  login,
  loader,
  home,
  username,
  campaign,
  confirmationDialog,
  userInfo,
  activeCampaign,
  lorem
}

export default en
