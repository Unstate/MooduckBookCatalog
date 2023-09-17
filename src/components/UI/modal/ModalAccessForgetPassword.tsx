import { FC } from "react";
import Modal from "../Modal";
import { useSee } from "../../../hooks/useSee";
import { see, lock, code } from "../../../assets";
import MyButton from "../MyButton";
import { ReactSVG } from "react-svg";
import AuthService from "../../../services/AuthService";
import { useInput } from "../../../hooks/useInput";

interface ModalAccessForgetPasswordProps {
  visable: boolean;
  handleOnClick: (visable: boolean) => void;
}

const ModalAccessForgetPassword: FC<ModalAccessForgetPasswordProps> = ({
  visable,
  handleOnClick,
}) => {
  const seeNewPassword = useSee(false);
  const seeRepeatNewPassword = useSee(false);
  const newPasswordInput = useInput("");
  const repeatPasswordInput = useInput("");
  const tokenInput = useInput("");

  const handleOnSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    AuthService.resetChangePassword(tokenInput.value, newPasswordInput.value);
    handleOnClick(false);
    tokenInput.reset()
    newPasswordInput.reset()
    repeatPasswordInput.reset()
  };

  return (
    <Modal visable={visable} setVisable={handleOnClick} title={"Сброс пароля"}>
      <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
        <ReactSVG src={code} />
        <input
          {...tokenInput.bind}
          name="confirmationСode"
          placeholder="Введите код с e-mail"
          type="text"
          className="w-full"
        />
      </div>

      <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
        <ReactSVG src={lock} />
        <input
          name="newPassword"
          placeholder="Введите ваш новый пароль"
          type={`${seeNewPassword.visable ? "text" : "password"}`}
          {...newPasswordInput.bind}
          className=" w-full"
        />

        <ReactSVG
          src={see}
          className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
          onClick={seeNewPassword.handleOnClick}
        />
      </div>
      <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
        <ReactSVG src={lock} />
        <input
          name="repeatNewPassword"
          placeholder="Повторите пароль"
          type={`${seeRepeatNewPassword.visable ? "text" : "password"}`}
          {...repeatPasswordInput.bind}
          className=" w-full"
        />
        <ReactSVG
          src={see}
          className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
          onClick={seeRepeatNewPassword.handleOnClick}
        />
      </div>
      {newPasswordInput.value !== repeatPasswordInput.value && (
        <div className="text-mooduck-red">Пароли не совпадают</div>
      )}
      <MyButton
        type="submit"
        className="w-full py-4"
        onClick={(e) => {
          handleOnSubmit(e)
        }}
      >
        Сбросить пароль
      </MyButton>
    </Modal>
  );
};

export default ModalAccessForgetPassword;
