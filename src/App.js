import "./styles.css";
import { useState } from "react";

const initialList = [];
export default function App() {
  const [list, setList] = useState(initialList);
  const [name, setName] = useState("");
  const [follower, setFollower] = useState("");
  const [following, setFollowing] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleChangeFollower(event) {
    setFollower(event.target.value);
  }

  function handleChangeFollowing(event) {
    setFollowing(event.target.value);
  }

  function handleAdd(event) {
    event.preventDefault();
    const newList = list.concat({ name, id: name, follower: 0, following: 0 });

    setList(newList);
    console.log(newList);
    setName("");
  }

  function SubmitFollower() {
    if (follower === following) {
      alert("you can't follow yourself");
      return false;
    }

    if (list.length === 0) {
      alert("list is empty");
      return false;
    }

    let fllwr = list.find((item) => item.name === follower);
    let fllwng = list.find((item) => item.name === following);

    if (!fllwr || !fllwng) {
      alert("user not found");
      return false;
    }

    for (let i = 0; i < list.length; i++) {
      if (list[i].name === follower) {
        list[i].following = list[i].following + 1;
      }
      if (list[i].name === following) {
        list[i].follower = list[i].follower + 1;
      }
    }

    setList(list);

    setFollower("");
    setFollowing("");
  }

  function showingData(val) {
    alert(
      val.name +
        " has " +
        val.follower +
        " follower and is following " +
        val.following +
        " people"
    );
  }

  return (
    <div>
      <AddItem name={name} onChange={handleChange} onAdd={handleAdd} />
      <h2>User List</h2>
      <List list={list} showData={showingData} />

      <FollowFollowing
        follower={follower}
        following={following}
        onAdd={SubmitFollower}
        changeFollower={handleChangeFollower}
        changeFollowing={handleChangeFollowing}
      />
    </div>
  );
}

const AddItem = ({ name, onChange, onAdd }) => (
  <div>
    <form onSubmit={onAdd}>
      <input type="text" value={name} onChange={onChange} />
    </form>
  </div>
);

const List = ({ list, showData }) => (
  <ul>
    {list.map((item) => (
      <li key={item.id} onClick={showData.bind(this, item)}>
        {item.name}
      </li>
    ))}
  </ul>
);

const FollowFollowing = ({
  follower,
  following,
  onAdd,
  changeFollower,
  changeFollowing,
}) => (
  <div>
    <input type="text" value={follower} onChange={changeFollower} />
    <span>Will now follow</span>
    <input type="text" value={following} onChange={changeFollowing} />
    <button type="button" onClick={onAdd}>
      Add
    </button>
  </div>
);
