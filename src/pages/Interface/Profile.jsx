import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectUser, updateUserName } from "../../features/auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const globalError = useSelector((s) => s.auth.error);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || "");
  useEffect(() => {
    if (!isEditing && user?.userName) setUserName(user.userName);
  }, [isEditing, user?.userName]);

  async function handleSubmit(e) {
    e.preventDefault();
    const value = userName.trim();
    if (!value) return;
    if (value === user?.userName) {
      setIsEditing(false);
      return;
    }
    await dispatch(updateUserName(value)).unwrap();
    setIsEditing(false);
  }
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user?.firstName} {user?.lastName}
        </h1>
        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit Name
        </button>
        {isEditing && (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div>
              <label>FirstName</label>
              <input value={user?.firstName || ""} readOnly disabled />
            </div>
            <div>
              <label>Last Name</label>
              <input value={user?.lastName || ""} readOnly disabled />
            </div>
            <div>
              <label>User Name</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your user name"
              />
            </div>
            <div className="actions">
              <button
                type="submit"
                disabled={
                  userName.trim() === "" || userName.trim() === user?.userName
                }
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setUserName(user?.userName || "");
                }}
              >
                Cancel
              </button>
            </div>

            {globalError && <p className="error">{globalError}</p>}
          </form>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
