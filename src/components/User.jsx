const User = ({user}) => {
  return (
    <ul>
      <li>{user.id}</li>
      <li>{user.first_name}</li>
      <li>{user.last_name}</li>
      <li>{user.email}</li>
      <li>{user.avatar}</li>
    </ul>
  )
}

export default User
