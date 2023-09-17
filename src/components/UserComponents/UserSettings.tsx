import { IUser } from "../../models/IUser";

import { FC } from "react";

import { useForm } from "../../hooks/useForm";

import {
  ModalCheckPassword,
  ModalEmail,
  ModalLogout,
  ModalUploader,
  ModalUsername,
  MyButton,
} from "../UI";

import { barcode } from "../../assets";
import goose from "../../assets/goose.svg";

import { useAppSelector } from "../../hooks/redux";
import ModalNewPassword from "../UI/modal/ModalNewPassword";

interface UserSettingsProps {
  user: IUser;
}

const UserSettings: FC<UserSettingsProps> = ({ user }) => {
  const usernameVisable = useForm();
  const emailVisable = useForm();
  const checkPasswordVisable = useForm();
  const resetPasswordVisable = useForm();
  const photoVisable = useForm();
  const logoutVisable = useForm();

  const { logo } = useAppSelector((store) => store.userReducer);

  return (
    <section className="mb-[30px] flex flex-col items-center  justify-between gap-y-[30px] 2xl:flex-row 2xl:gap-y-0">
      <div className="w-full 2xl:w-[800px]  bg-mooduck-red flex flex-col items-center justify-center gap-y-[30px] rounded-2xl p-[30px] lg:h-[280px] lg:flex-row gap-x-[50px]">
        <div className="w-2/5 flex items-center justify-center">
          <img
            className="w-full h-full rounded-2xl"
            src={logo}
            alt="Картинка не прогрузилась"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = goose;
            }}
          />
        </div>
        <div className="w-full flex gap-y-[30px] flex-col">
          <div className="w-full">
            <img src={barcode} className="w-full" />
          </div>
          <div className="flex flex-col gap-y-[30px] w-full">
            <div className="w-full flex flex-wrap justify-between 2xl:text-xl">
              <p className="font-normal text-[#FFFFFF80]">Имя пользователя</p>
              <p className="text-mooduck-white">{user.username}</p>
            </div>
            <div className="w-full flex flex-wrap justify-between 2xl:text-xl">
              <p className="font-normal text-[#FFFFFF80]">E-mail</p>
              <p className="text-mooduck-white">{user.email}</p>
            </div>
            <div className="w-full flex flex-wrap justify-between 2xl:text-xl">
              <p className="font-normal text-[#FFFFFF80]">Пароль</p>
              <p className="text-mooduck-white">***********</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-y-[20px] md:gap-x-[40px] 2xl:flex-col 2xl:gap-0 2xl:space-y-[20px]">
        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => photoVisable.handleOnClick(true)}
        >
          Изменить фотографию
        </MyButton>
        <ModalUploader
          visable={photoVisable.visable}
          handleOnClick={photoVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => usernameVisable.handleOnClick(true)}
        >
          Изменить имя пользователя
        </MyButton>
        <ModalUsername
          visable={usernameVisable.visable}
          handleOnClick={usernameVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => emailVisable.handleOnClick(true)}
        >
          Изменить E-mail
        </MyButton>
        <ModalEmail
          visable={emailVisable.visable}
          handleOnClick={emailVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] lg:w-[433px] 2xl:w-[286px] "
          onClick={() => checkPasswordVisable.handleOnClick(true)}
        >
          Изменить пароль
        </MyButton>
        <ModalCheckPassword
          visable={checkPasswordVisable.visable}
          handleOnClick={checkPasswordVisable.handleOnClick}
          handleOnClickAnother={resetPasswordVisable.handleOnClick}
        />
        <ModalNewPassword
          visable={resetPasswordVisable.visable}
          handleOnClick={resetPasswordVisable.handleOnClick}
        />

        <MyButton
          className="w-full py-[15px] 2xl:w-[286px] "
          onClick={() => logoutVisable.handleOnClick(true)}
        >
          Выйти из аккаунта
        </MyButton>
        <ModalLogout
          visable={logoutVisable.visable}
          handleOnClick={logoutVisable.handleOnClick}
        />
      </div>
    </section>
  );
};

export default UserSettings;
