interface WelcomeProps {
  username: string,
  isPremium: boolean
}

const Welcome = ({ username, isPremium }: WelcomeProps) => {
  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {isPremium ? (<p>Welcome back, premium user {username}!</p>) : (<p>Welcome, guest {username}!</p>)}
    </div>
  )
}

export default Welcome;