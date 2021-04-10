const Rank = ({ user }) => {
  return (
    <div>
      <div className="white f3">{`${user.name}, you are currently logged-in. Your entries are ${user.entries}`}</div>
    </div>
  );
};

export default Rank;
