import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { SearchInput } from "../molecules/SearchInput";
import { UserCard } from "../organisms/user/UserCard";

import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import axios from "axios";
const users = [...Array(10).keys()].map((val) => {
  return {
    id: val,
    name: `sample-${val}`,
    image: "https://source.unsplash.com/Sg3XwuEpybU",
    email: "xxxx@hoge.com",
    phone: "000-1234-5678",
    company: {
      name: "テスト株式会社"
    },
    website: "https://google.co.jp"
  };
});

export const Users = () => {
  console.log("Users");
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const onClickSwitch = () => setUserInfo({ isAdmin: !userInfo.isAdmin });

  const onClickUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickUsers1 = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SContainer>
      <h2>ユーザー一覧</h2>
      <SecondaryButton onClick={onClickUsers}>user</SecondaryButton>
      <br />
      <SecondaryButton onClick={onClickUsers1}>id=1のユーザー</SecondaryButton>
      <br />
      <SearchInput />
      <br />
      <SecondaryButton onClick={onClickSwitch}>切り替え</SecondaryButton>
      <SUserArea>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </SUserArea>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;
