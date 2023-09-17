import { FC, useEffect } from "react";

import { useChangeUserEmailMutation } from "../../../services/api/user.api";

import { useParams } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";

import { Modal, MyButton, Popup } from "..";
import { useMessage } from "../../../hooks/useMessage";

interface ModalEmailProps {
  visable: boolean;
  handleOnClick: (visable: boolean) => void;
}

const ModalEmail: FC<ModalEmailProps> = ({ visable, handleOnClick }) => {
  const { id } = useParams();
  const { bind, reset, value } = useInput("");
  const [changeEmail, { error, isLoading }] = useChangeUserEmailMutation();
  const message = useMessage("");

  useEffect(() => {
    if (error) {
      if ("originalStatus" in error) {
        handleOnClick(false);
      } else if ("status" in error) {
        if (error.status === 400) {
          if ('data' in error) {
            const test:any = error.data
            if ('message' in test) {
              message.setMessage(
                test.message
              );
            }
          }
        }
      }
    }
  }, [error]);

  return (
    <Modal
      visable={visable}
      setVisable={handleOnClick}
      title={"Изменение E-mail"}
    >
      <input
        className="w-full rounded-[2px] border-[2px] border-mooduck-gray px-3 py-[15px]"
        placeholder="Введите новый адрес E-mail"
        name="changeUsername"
        type="text"
        {...bind}
      />
      {value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? (
        <p className="text-mooduck-red">Неправильный формат e-mail</p>
      ) : (
        ""
      )}
      <MyButton
        disabled={isLoading}
        className="w-full py-[15px]"
        onClick={() => {
          changeEmail({ id: id, email: value });
          reset();
        }}
      >
        Сохранить изменения
      </MyButton>
      {message.message && <Popup message={message.message} handleOnClose={message.setMessage}/>}
    </Modal>
  );
};

export default ModalEmail;
