import { FC, useEffect } from "react";

import { Modal, MyButton, Popup } from "..";

import { useInput } from "../../../hooks/useInput";
import { useParams } from "react-router-dom";
import { useCheckUserPasswordMutation } from "../../../services/api/user.api";

import { lock, see } from "../../../assets";

import { useForm } from "../../../hooks/useForm";
import { useMessage } from "../../../hooks/useMessage";
import { useSee } from "../../../hooks/useSee";
import { ReactSVG } from "react-svg";

interface ModalCheckPasswordProps {
  visable: boolean;
  handleOnClick: (visable: boolean) => void;
  handleOnClickAnother: (visable: boolean) => void;
}

const ModalCheckPassword: FC<ModalCheckPasswordProps> = ({
  visable,
  handleOnClick,
  handleOnClickAnother,
}) => {
  const [checkUserPassword, { isLoading, error }] =
    useCheckUserPasswordMutation();
  const { bind, reset, value } = useInput("");
  const { id } = useParams();
  const modal = useForm();
  const message = useMessage("");
  const seePassword = useSee(false);

  useEffect(() => {
    if (error) {
      if ("originalStatus" in error) {
        handleOnClick(false);
        handleOnClickAnother(true);
      } else if ("status" in error) {
        if (error.status === 400) {
          if ("data" in error) {
            const test: any = error.data;
            if ("message" in test) {
              message.setMessage(test.message);
            }
          }
        }
      }
    }
  }, [error]);

  return (
    <>
      <Modal
        visable={visable}
        setVisable={handleOnClick}
        title={"Изменение пароля"}
      >
        <div className=" flex w-full items-center gap-x-5 rounded-sm border-[2px] border-mooduck-gray p-3 font-normal">
          <ReactSVG src={lock} />
          <input
            {...bind}
            placeholder="Введите ваш новый пароль"
            type={`${seePassword.visable ? "text" : "password"}`}
            className="w-full"
          />
          <ReactSVG
            src={see}
            className="noselect stroke-mooduck-gray hover:cursor-pointer hover:stroke-mooduck-blue"
            onClick={seePassword.handleOnClick}
          />
        </div>
        <MyButton
          className="w-full py-[15px]"
          disabled={isLoading}
          onClick={() => {
            checkUserPassword({ id: id, password: value });
            reset();
            modal.handleOnClick(true);
          }}
        >
          Подтвердить
        </MyButton>
        {message.message && (
          <Popup message={message.message} handleOnClose={message.setMessage} />
        )}
      </Modal>
    </>
  );
};

export default ModalCheckPassword;
